<?php
//require('../fpdf181/fpdf.php');
require('../tfpdf/tfpdf.php');
$pre = $_GET['preId'];
$visId = $_GET['visId'];
$prescriptionsId = explode(",",$pre);
$prescriptions = Array();


require('../connect.php');        
@$db=new mysqli($server,$user,$password,$dataBase);
$preDetail="";
if(mysqli_connect_errno())
    $preDetail=1;											//jesli błąd bazy to zwracamy 1
else{
    for($i=0; $i<count($prescriptionsId); $i+=1){
        $db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
        $query="SELECT PRE_ID,prescription.DATE,FIRST_NAME,LAST_NAME FROM PRESCRIPTION JOIN VISIT USING(VIS_ID) JOIN DOCTOR USING(DOC_ID) WHERE PRE_ID=".$prescriptionsId[0];	//pobieramy recepty
        $result=$db->query($query);																
        if($result->num_rows==0)
            $prescriptions[$i]=0;
        else{
            $data=$result->fetch_assoc();
            $prescriptions[$i]['DOC_FIRST_NAME'] = $data['FIRST_NAME'];
            $prescriptions[$i]['DOC_LAST_NAME'] = $data['LAST_NAME'];
            $prescriptions[$i]['DATE'] = $data['DATE'];
            $prescriptions[$i]['MEDICINES']=Array();
            $query2="SELECT NAME FROM PRESCRIPTION_MEDICINE JOIN MEDICINE USING(MED_ID) WHERE PRE_ID=".$prescriptionsId[$i];
            $result2=$db->query($query2);																
            if($result2->num_rows==0)
                $prescriptions[$i]['MEDICINES']=0;
            else{																			
                $prescriptions[$i]['MEDICINES']=Array();
                $tmp=0;
                while($medicine=$result2->fetch_assoc())
                    $prescriptions[$i]['MEDICINES'][$tmp++]=$medicine['NAME'];
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
        $this->Cell(90,10,'Recepta',1,0,'C');
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

for($i=0; $i<count($prescriptions); $i+=1){
    $pdf->AddPage();
    
    $pdf->Ln();
    $pdf->Cell(80,10,'Data wystawienia:',1,0,'C');
    $pdf->Cell(100,10,$prescriptions[$i]['DATE'],1,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,10,'Lekarz:',1,0,'C');
    $pdf->Cell(100,10,$prescriptions[$i]['DOC_FIRST_NAME'].' '.$prescriptions[$i]['DOC_LAST_NAME'],1,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,100,'Leki:',1,0,'C');
    $medicines = "";
    foreach($prescriptions[$i]['MEDICINES'] as $value){
        $medicines .= $value.',' ;
    }
    $pdf->SetFillColor(255,255,255);
    $pdf->MultiCell(100,100,$medicines,1,0,'C');
    
    

}


// $pdf->Ln();
// $pdf->Cell($w[0],10,'Godzina wizyty:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['VISIT_HOUR'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Gatunek zwierzęcia:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['SPECIES'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Rasa zwierzęcia:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['RACE'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Imię zwierzęcia:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['NAME'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Data urodzenia:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['BIRTH_DATE'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Płeć:',1,0,'C');
// if($visDetail['GENDER'] === 'FEMALE')
//     $gender = 'Żeńska';
// else
//     $gender = 'Męska';
// $pdf->Cell($w[1],10,$gender,1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Waga:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['WEIGHT'].' kg',1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Wzrost:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['HEIGHT'].' cm',1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Właściciel:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['FIRST_NAME'].' '.$visDetail['LAST_NAME'],1,0,'C');

// $pdf->Ln();
// $pdf->Cell($w[0],10,'Lekarz przyjmujący:',1,0,'C');
// $pdf->Cell($w[1],10,$visDetail['DOCTOR_FIRST_NAME'].' '.$visDetail['DOCTOR_LAST_NAME'],1,0,'C');

// $pdf->Ln();
// $pdf->setFillColor(255,255,255);
// $pdf->Cell($w[0],10,'Opis:',1,0,'C');
// $pdf->SetFont('DejaVu','',10);
// $pdf->MultiCell($w[1],10,$visDetail['VISIT_DESCRIPTION'], 1, 'J', 1, 2, '' ,'', true);
// $pdf->SetFont('DejaVu','',12);

// if($visDetail['DISEASES'] != 0){
//     $pdf->Cell($w[0],10,'Zdiagnozowane choroby:',1,0,'C');
//     $diseases = "";
//     foreach($visDetail['DISEASES'] as $value){
//         $diseases .= $value.',' ;
//     }
//     $pdf->setFillColor(255,255,255); 
//     $pdf->MultiCell($w[1],10,$diseases,1,0,'C');
// }

// if($visDetail['SERVICES'] != 0){
//     $pdf->Cell($w[0],10,'Świadczone usługi:',1,0,'C');
//     $services = "";
//     foreach($visDetail['SERVICES'] as $value){
//         $services .= $value.',' ;
//     }
//     $pdf->setFillColor(255,255,255); 
//     $pdf->MultiCell($w[1],10,$services,1,0,'C');
// }

$pdf->Output("prescription.pdf", "I");

?>