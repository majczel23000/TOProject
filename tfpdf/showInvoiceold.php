<?php
if(isset($_GET['idFaktura'])){
	require ("../connect.php");
	$db = new mysqli($server,$user,$password,$dataBase);
	session_start();
	if(mysqli_connect_errno()){
		echo 'Nie udało się nazwiązać połączenia z bazą danych.';
		exit;
	}
	$idFaktura=$_GET['idFaktura'];
	$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
	//pobieramy główne dane o fakturze
	$zapytanie="SELECT * FROM generator_faktura WHERE idFaktura=".$idFaktura;
	$wynik=$db->query($zapytanie);
	$daneFaktury=$wynik->fetch_assoc();
	if($daneFaktury['wlasciciel']!=$_SESSION['nip']){
		header('Location:../listOfInvoices.php');
		exit;
	}
	$daneFaktury['nip_n'] = substr($daneFaktury['nip_n'] ,0,3)."-".substr($daneFaktury['nip_n'] ,3,3)."-".substr($daneFaktury['nip_n'] ,6,2)."-".substr($daneFaktury['nip_n'] ,8);
	$daneFaktury['nip_s'] = substr($daneFaktury['nip_s'] ,0,3)."-".substr($daneFaktury['nip_s'] ,3,3)."-".substr($daneFaktury['nip_s'] ,6,2)."-".substr($daneFaktury['nip_s'] ,8);
	
	//header("Content-type: application/pdf");
	//define('FPDF_FONTPATH','font/');  
	require('tfpdf.php');
	$pdf = new tFPDF();
	
	$pdf->SetTitle($daneFaktury['nrFaktury']);
	$pdf->AddPage(); 
	$width = $pdf->w;
	$height = $pdf->h;	
	
	$pdf->AddFont('DejaVu','','DejaVuSansMono.ttf',true);
	$pdf->AddFont('DejaVu2','','DejaVuSerif-Bold.ttf',true);
	$pdf->SetFont('DejaVu','',9);
	
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, "Miejscowość: ".$daneFaktury['miejsce']);
	$pdf->SetY($pdf->GetY()+4);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, "Data sprzedaży: ".$daneFaktury['data_s']);
	$pdf->SetY($pdf->GetY()+4);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, "Data wystawienia: ".$daneFaktury['data_w']);
	$pdf->SetY($pdf->GetY()+8);
	
	
	$pdf->SetFont('DejaVu2','',16);
	
	$number = "Faktura VAT nr: ".$daneFaktury['nrFaktury'];
	$numberWidth = $pdf->GetStringWidth($number);
	$pdf->SetX(($width-$numberWidth)/2);
	$pdf->Cell(80,0,$number);
	$pdf->SetY($pdf->GetY()+5);
	$typeWidth = $pdf->GetStringWidth("oryginał/kopia");
	$pdf->SetX(($width-$typeWidth)/2);
	$pdf->SetFont('DejaVu','',9);
	$pdf->Cell(80,0,"oryginał/kopia");
	
	//$pdf->AddFont('DejaVu','','DejaVuSerif.ttf',true);
	$pdf->SetFont('DejaVu2','',9);
	$pdf->SetY($pdf->GetY()+10);
	$pdf->Cell(80,0, "SPRZEDAWCA:");
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, "NABYWCA:");
	
	$pdf->SetFont('DejaVu','',9);
	$pdf->SetY($pdf->GetY()+4);
	$pdf->Cell(80,0, $daneFaktury['nazwa_s']);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, $daneFaktury['nazwa_n']);
	$pdf->SetY($pdf->GetY()+4);
	if($daneFaktury['nazwacd_s']!="" && $daneFaktury['nazwacd_s']!=null) $pdf->Cell(80,0, $daneFaktury['nazwacd_s']);
	$pdf->SetX($width-70);
	if($daneFaktury['nazwacd_s']!="" && $daneFaktury['nazwacd_s']!=null) $pdf->Cell(80,0, $daneFaktury['nazwacd_n']);
	$pdf->SetY($pdf->GetY()+4);
	$pdf->Cell(80,0, $daneFaktury['adres_s']);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, $daneFaktury['adres_n']);
	$pdf->SetY($pdf->GetY()+4);
	$pdf->Cell(80,0, $daneFaktury['poczta_s']);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, $daneFaktury['poczta_n']);
	$pdf->SetY($pdf->GetY()+4);
	
	$pdf->SetFont('DejaVu2','',9);
	$pdf->Cell(80,0, "NIP: ".$daneFaktury['nip_s']);
	$pdf->SetX($width-70);
	$pdf->Cell(80,0, "NIP: ".$daneFaktury['nip_n']);
	$pdf->SetY($pdf->GetY()+10);
	$pdf->Cell(10,10, "Lp.",1,0,'C');
	$pdf->Cell(60,10, "Nazwa",1,0,'C');
	$pdf->Cell(10,10, "Ilość",1,0,'C');
	$pdf->MultiCell(17,5, "Cena\njed. [zł]",1,'C',0);
	$pdf->SetY($pdf->GetY()-10);
	$pdf->SetX($pdf->GetX()+97);
	$pdf->MultiCell(25,5, "Cena\nnetto [zł]",1,'C',0);
	$pdf->SetY($pdf->GetY()-10);
	$pdf->SetX($pdf->GetX()+122);
	$pdf->MultiCell(13,5, "VAT\n[%]",1,'C',0);
	$pdf->SetY($pdf->GetY()-10);
	$pdf->SetX($pdf->GetX()+135);
	$pdf->MultiCell(21,5, "VAT\n[zł]",1,'C',0);
	$pdf->SetY($pdf->GetY()-10);
	$pdf->SetX($pdf->GetX()+156);
	$pdf->MultiCell(25,5, "Cena\nbrutto [zł]",1,'C');
	$zapytanie="SELECT * FROM generator_towary WHERE idFaktura=".$idFaktura;
	$wynik=$db->query($zapytanie);
	$i=1;
	
	$pdf->SetFont('DejaVu','',6);
	$ceny = Array(	'netto0' => 0,
					'nettoOO' => 0,
					'nettoZW' => 0,
					'netto5' => 0,
					'vat5'	 => 0,
					'netto8' => 0,
					'vat8' => 0,
					'netto23' => 0,
					'vat23' => 0
	);
	while ($produkt = $wynik->fetch_assoc()) {
		$brutto=$produkt['vat'] + $produkt['netto'];
		$pdf->Cell(10,10,$i,1,0,'C');
		$pdf->Cell(60,10,$produkt['nazwa'],1,0,'C');
		$pdf->Cell(10,10,$produkt['ilosc'],1,0,'C');
		$pdf->Cell(17,10,$produkt['cena'],1,0,'C');
		$pdf->Cell(25,10,$produkt['netto'],1,0,'C');
		$pdf->Cell(13,10,$produkt['vat_proc'],1,0,'C');
		$pdf->Cell(21,10,$produkt['vat'],1,0,'C');
		$pdf->Cell(25,10,number_format($brutto,2,"."," "),1,1,'C');
		$i++;
		switch($produkt['vat_proc']){
			case "0":{
				$ceny['netto0']+=$produkt['netto'];
				break;
			}
			case "O.O.":{
				$ceny['nettoOO']+=$produkt['netto'];
				break;
			}
			case "ZW":{
				$ceny['nettoZW']+=$produkt['netto'];
				break;
			}
			case "5":{
				$ceny['netto5']+=$produkt['netto'];
				$ceny['vat5']+=$produkt['vat'];
				break;
			}
			case "8":{
				$ceny['netto8']+=$produkt['netto'];
				$ceny['vat8']+=$produkt['vat'];
				break;
			}
			case "23":{
				$ceny['netto23']+=$produkt['netto'];
				$ceny['vat23']+=$produkt['vat'];
				break;
			}
		}
	}
	$pdf->SetFont('Arial','B',8);
	if($ceny['netto0']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['netto0'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"0",1,0,'C');
		$pdf->Cell(21,10,"-",1,0,'C');
		$pdf->Cell(25,10,number_format($ceny['netto0'],2,"."," "),1,1,'C');
	}
	if($ceny['netto5']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['netto5'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"5",1,0,'C');
		$pdf->Cell(21,10,number_format($ceny['vat5'],2,"."," "),1,0,'C');
		$pdf->Cell(25,10,number_format(($ceny['netto5']+$ceny['vat5']),2,"."," "),1,1,'C');
	}
	if($ceny['netto8']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['netto8'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"8",1,0,'C');
		$pdf->Cell(21,10,number_format($ceny['vat8'],2,"."," "),1,0,'C');
		$pdf->Cell(25,10,number_format(($ceny['netto8']+$ceny['vat8']),2,"."," "),1,1,'C');
	}
	if($ceny['netto23']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['netto23'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"23",1,0,'C');
		$pdf->Cell(21,10,number_format($ceny['vat23'],2,"."," "),1,0,'C');
		$pdf->Cell(25,10,number_format(($ceny['netto23']+$ceny['vat23']),2,"."," "),1,1,'C');
	}
	if($ceny['nettoOO']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['nettoOO'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"O.O.",1,0,'C');
		$pdf->Cell(21,10,"-",1,0,'C');
		$pdf->Cell(25,10,number_format($ceny['nettoOO'],2,"."," "),1,1,'C');
	}
	if($ceny['nettoZW']!=0){
		$pdf->Cell(97,10,"",0,0,'C');
		$pdf->Cell(25,10,number_format($ceny['nettoZW'],2,"."," "),1,0,'C');
		$pdf->Cell(13,10,"ZW",1,0,'C');
		$pdf->Cell(21,10,"-",1,0,'C');
		$pdf->Cell(25,10,number_format($ceny['nettoZW'],2,"."," "),1,1,'C');
	}
	$pdf->SetY($pdf->GetY()+3);
	$nettoRazem = $ceny['netto0']+$ceny['netto5']+$ceny['netto8']+$ceny['netto23']+$ceny['nettoOO']+$ceny['nettoZW'];
	$vatRazem = $ceny['vat5']+$ceny['vat8']+$ceny['vat23'];
	$bruttoRazem = $nettoRazem+$vatRazem;
	$pdf->Cell(80,10,"",0,0,'C');
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(17,10,"Suma:",1,0,'C');
	$pdf->Cell(25,10,number_format($nettoRazem,2,"."," "),1,0,'C');
	$pdf->Cell(13,10,"-",1,0,'C');
	$pdf->Cell(21,10,number_format($vatRazem,2,"."," "),1,0,'C');
	$pdf->Cell(25,10,number_format($bruttoRazem,2,"."," "),1,1,'C');
	$pdf->SetY($pdf->GetY()+13);
	$pdf->SetFont('DejaVu2','',10);
	if($ceny['nettoOO']!=0)	$pdf->Cell(200,5,"UWAGA! Faktura zawiera towary z Odwrotnym Obciążeniem.",0,1);
	$pdf->SetFont('DejaVu','',9);
	require ('../slownie.php');
	$pdf->Cell(200,5,"Słownie: ".kwotaNaslowa($bruttoRazem),0,1);
	$pdf->Cell(200,5,"Forma płatności: ".$daneFaktury['forma_pla'],0,1);
	if($daneFaktury['nr_konta']!="" && $daneFaktury['nr_konta']!=null) $pdf->Cell(200,5,"Numer konta: ".$daneFaktury['nr_konta'],0,1);
	$pdf->Cell(200,5,"Termin płatności: ".$daneFaktury['termin_pla']." dni",0,1);
	
	$pdf->SetY($pdf->h-45);
	$pdf->Cell(100, 10, "Faktura wygenerowana przy pomocy www.biuroatena.pl");
	
	
	$pdf->Output('fakturaNo'.$daneFaktury['nrFaktury'].'.pdf','I');
}
?>