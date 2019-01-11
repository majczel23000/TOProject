<?php
//require('../fpdf181/fpdf.php');
require('../tfpdf/tfpdf.php');
$cusAniId = $_GET['cusAniId'];
$visId = $_GET['visId'];


require('../connect.php');        
@$db=new mysqli($server,$user,$password,$dataBase);
$visDetail="";
if(mysqli_connect_errno())
    $visDetail=1;											//jesli błąd bazy to zwracamy 1
else{
    $db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
    $query="SELECT NAME,WEIGHT,HEIGHT,GENDER,BIRTH_DATE,RACE,SPECIES,FIRST_NAME,LAST_NAME FROM CUSTOMER_ANIMAL JOIN customer USING(CUS_ID) JOIN animal_race USING(ANI_RAC_ID) JOIN animal_species USING(ANI_SPE_ID) WHERE CUS_ANI_ID=".$cusAniId;		//pobieramy dane
    $result=$db->query($query);																
    if($result->num_rows==0)
        $visDetail=0;																	//jesli 0 wierszy to zwracamy 0
    else
        $visDetail=$result->fetch_assoc();
        
    $query="SELECT DATE, HOUR, DESCRIPTION, FIRST_NAME, LAST_NAME FROM visit JOIN DOCTOR USING(DOC_ID) WHERE VIS_ID=".$visId;	// pobieramy dane wizyty
    $result=$db->query($query);															
    if($result->num_rows==0){                           // jak brak
        $visDetail['VISIT_DATE']='Brak danych';
        $visDetail['VISIT_HOUR']='Brak danych';
        $visDetail['VISIT_DESCRIPTION']='Brak danych';
        $visDetail['DOCTOR_FIRST_NAME']='Brak danych';
        $visDetail['DOCTOR_LAST_NAME']='Brak danych';
    } else{												// inaczej zapisujemy
        $dis=$result->fetch_assoc();
        $visDetail['VISIT_DATE']=$dis['DATE'];
        $visDetail['VISIT_HOUR']=$dis['HOUR'];
        $visDetail['VISIT_DESCRIPTION']=$dis['DESCRIPTION'];
        $visDetail['DOCTOR_FIRST_NAME']=$dis['FIRST_NAME'];
        $visDetail['DOCTOR_LAST_NAME']=$dis['LAST_NAME'];
    }
        
    $query="SELECT NAME FROM VISIT_DISEASE JOIN DISEASE USING(DIS_ID) WHERE VIS_ID=".$visId;	//pobieramy choroby
    $result=$db->query($query);																
    if($result->num_rows==0)
        $visDetail['DISEASES']=0;														//jesli 0 wierszy to wpisujemy, ze 0 chorób
    else{																				//inaczej zapisujemy je w tabeli
        $visDetail['DISEASES']=Array();
        $tmp=0;
        while($dis=$result->fetch_assoc())
            $visDetail['DISEASES'][$tmp++]=$dis['NAME'];
    }
    $query="SELECT NAME FROM VISIT_SERVICE JOIN SERVICE USING(SER_ID) WHERE VIS_ID=".$visId;	//pobieramy zabiegi
    $result=$db->query($query);																
    if($result->num_rows==0)
        $visDetail['SERVICES']=0;														//jesli 0 wierszy to wpisujemy, ze 0 zabiegów
    else{																				//inaczej zapisujemy je w tabeli
        $visDetail['SERVICES']=Array();
        $tmp=0;
        while($ser=$result->fetch_assoc())
            $visDetail['SERVICES'][$tmp++]=$ser['NAME'];
    }
    $query="SELECT PRE_ID,DATE FROM PRESCRIPTION WHERE VIS_ID=".$visId;	//pobieramy recepty
    $result=$db->query($query);																
    if($result->num_rows==0)
        $visDetail['PRESCRIPTIONS']=0;														//jesli 0 wierszy to wpisujemy, ze 0 zabiegów
    else{																				//inaczej zapisujemy je w tabeli
        $visDetail['PRESCRIPTIONS']=Array();
        $tmp=0;
        while($pre=$result->fetch_assoc()){
            $visDetail['PRESCRIPTIONS'][$tmp]=$pre;
            $query2="SELECT NAME FROM PRESCRIPTION_MEDICINE JOIN MEDICINE USING(MED_ID) WHERE PRE_ID=".$pre['PRE_ID'];	//pobieramy leków z recepty
            $result2=$db->query($query2);																
            if($result2->num_rows==0)
                $visDetail['PRESCRIPTIONS'][$tmp++]['MEDICINES']=0;										//jesli 0 wierszy to wpisujemy, ze 0 leków
            else{																				//inaczej zapisujemy je w tabeli
                $visDetail['PRESCRIPTIONS'][$tmp++]['MEDICINES']=Array();
                $tmp2=0;
                while($med=$result2->fetch_assoc())
                    $visDetail['PRESCRIPTIONS'][$tmp-1]['MEDICINES'][$tmp2++]=$med['NAME'];
            }
        }
    }
}


class PDF extends TFPDF
{
    function Header()
    {
        $this->SetFont('DejaVu','',18);
        $this->Cell(50);
        $this->Cell(90,10,'Rezultat wizyty',1,0,'C');
        $this->Ln(20);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Courier','I',8);
        $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
    }
}

$pdf = new PDF();
$pdf->AddFont('DejaVu','','DejaVuSansMono.ttf',true);
$pdf->AddFont('DejaVu2','','DejaVuSerif-Bold.ttf',true);
$pdf->SetFont('DejaVu','',12);
$pdf->AliasNbPages();
$pdf->AddPage();
$w = array(80, 110);

$pdf->Ln();
$pdf->Cell($w[0],10,'Data wizyty:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['VISIT_DATE'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Godzina wizyty:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['VISIT_HOUR'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Gatunek zwierzęcia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['SPECIES'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Rasa zwierzęcia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['RACE'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Imię zwierzęcia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['NAME'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Data urodzenia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['BIRTH_DATE'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Płeć:',1,0,'C');
if($visDetail['GENDER'] === 'FEMALE')
    $gender = 'Samica';
else
    $gender = 'Samiec';
$pdf->Cell($w[1],10,$gender,1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Waga:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['WEIGHT'].' kg',1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Wzrost:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['HEIGHT'].' cm',1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Właściciel:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['FIRST_NAME'].' '.$visDetail['LAST_NAME'],1,0,'C');

$pdf->Ln();
$pdf->Cell($w[0],10,'Lekarz przyjmujący:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['DOCTOR_FIRST_NAME'].' '.$visDetail['DOCTOR_LAST_NAME'],1,0,'C');

$pdf->Ln();
$pdf->setFillColor(255,255,255);
$pdf->Cell($w[0],10,'Opis:',1,0,'C');
$pdf->SetFont('DejaVu','',10);
$pdf->MultiCell($w[1],10,$visDetail['VISIT_DESCRIPTION'], 1, 'J', 1, 2, '' ,'', true);
$pdf->SetFont('DejaVu','',12);

if($visDetail['DISEASES'] != 0){
    $pdf->Cell($w[0],10,'Zdiagnozowane choroby:',1,0,'C');
    $diseases = "";
    foreach($visDetail['DISEASES'] as $value){
        $diseases .= $value.',' ;
    }
    $pdf->setFillColor(255,255,255); 
    $pdf->MultiCell($w[1],10,$diseases,1,0,'C');
}

if($visDetail['SERVICES'] != 0){
    $pdf->Cell($w[0],10,'Świadczone usługi:',1,0,'C');
    $services = "";
    foreach($visDetail['SERVICES'] as $value){
        $services .= $value.',' ;
    }
    $pdf->setFillColor(255,255,255); 
    $pdf->MultiCell($w[1],10,$services,1,0,'C');
}

$pdf->Output("visit.pdf", "I");

?>