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
    
    $pdf->SetFont('DejaVu','',10);
    $pdf->Ln();
    $pdf->Cell(80,6,'Gabinet weterynaryjny VetManager',0,0,'C');
    $pdf->Cell(100,6,'',0,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,6,'31-678 Kraków',0,0,'C');
    $pdf->Cell(100,6,'',0,0,'C');
    
    $pdf->Ln();
    $pdf->Cell(80,6,'ul. Warszawska 15,',0,0,'C');
    $pdf->Cell(100,6,'',0,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,6,'Tel: 856 145 996',0,0,'C');
    $pdf->Cell(100,6,'',0,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,2,'.................................',0,0,'C');
    $pdf->Cell(100,2,'',0,0,'C');

    $pdf->SetFont('DejaVu','',8);
    $pdf->Ln();
    $pdf->Cell(80,5,'Wystawiający receptę',0,0,'C');
    $pdf->Cell(100,5,'',0,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,20,'',0,0,'C');
    $pdf->Cell(100,20,'',0,0,'C');

    $pdf->SetFont('DejaVu','',10);
    $pdf->Ln();
    $pdf->Cell(80,10,'Data wystawienia:',1,0,'C');
    $pdf->Cell(100,10,$prescriptions[$i]['DATE'],1,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,10,'Lekarz:',1,0,'C');
    $pdf->Cell(100,10,$prescriptions[$i]['DOC_FIRST_NAME'].' '.$prescriptions[$i]['DOC_LAST_NAME'],1,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,80,'Leki:',1,0,'C');
    $medicines = "";
    foreach($prescriptions[$i]['MEDICINES'] as $value){
        $medicines .= $value.',' ;
    }
    $pdf->SetFillColor(255,255,255);
    $pdf->MultiCell(100,80,$medicines,1,0,'C');

    $pdf->SetFont('DejaVu','',8);
    $pdf->Cell(80,20,'',0,0,'C');
    $pdf->Cell(100,20,'',0,0,'C');
    $pdf->Ln();
    $pdf->Cell(80,2,'.......................................',0,0,'C');
    $pdf->Cell(100,2,'.......................................',0,0,'C');

    $pdf->Ln();
    $pdf->Cell(80,10,'Miejscowość i data',0,0,'C');
    $pdf->Cell(100,10,'Podpis i pieczęć lekarza weterynarii',0,0,'C');
}

$pdf->Output("prescription.pdf", "I");

?>