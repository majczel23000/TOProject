<?php
require('../fpdf181/fpdf.php');
$cusAniId = $_GET['cusAniId'];
$visId = $_GET['visId'];


require('../connect.php');        
@$db=new mysqli($server,$user,$password,$dataBase);
$visDetail="";
if(mysqli_connect_errno())
    $visDetail=1;											//jesli błąd bazy to zwracamy 1
else{
    $db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
    $query="SELECT NAME,WEIGHT,HEIGHT,GENDER,BIRTH_DATE FROM CUSTOMER_ANIMAL WHERE CUS_ANI_ID=".$cusAniId;		//pobieramy dane
    $result=$db->query($query);																
    if($result->num_rows==0)
        $visDetail=0;																	//jesli 0 wierszy to zwracamy 0
    else
        $visDetail=$result->fetch_assoc();	
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


class PDF extends FPDF
{
    function Header()
    {
        $this->SetFont('Arial','B',15);
        $this->Cell(70);
        $this->Cell(50,10,'Rezultat wizyty',1,0,'C');
        $this->Ln(20);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial','I',8);
        $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
    }
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('arial','',12);
$w = array(80, 110);
$pdf->Cell($w[0],10,'Imie zwierzecia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['NAME'],1,0,'C');
$pdf->Ln();
$pdf->Cell($w[0],10,'Data urodzenia:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['BIRTH_DATE'],1,0,'C');
$pdf->Ln();
$pdf->Cell($w[0],10,'Plec:',1,0,'C');
if($visDetail['GENDER'] === 'FEMALE')
    $gender = 'zenska';
else
    $gender = 'zenska';
$pdf->Cell($w[1],10,$gender,1,0,'C');
$pdf->Ln();
$pdf->Cell($w[0],10,'Waga:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['WEIGHT'].' kg',1,0,'C');
$pdf->Ln();
$pdf->Cell($w[0],10,'Wzrost:',1,0,'C');
$pdf->Cell($w[1],10,$visDetail['HEIGHT'].' cm',1,0,'C');
$pdf->Output("visit.pdf", "I");

?>