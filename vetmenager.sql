-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Sty 2019, 12:38
-- Wersja serwera: 10.1.31-MariaDB
-- Wersja PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `vetmenager`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `admission_hours`
--

CREATE TABLE `admission_hours` (
  `ADM_H_ID` int(11) NOT NULL,
  `MONDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `TUESDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `WEDNESDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `THURSDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `FRIDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `SATURDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `SUNDAY` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `admission_hours`
--

INSERT INTO `admission_hours` (`ADM_H_ID`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`) VALUES
(1, '07:00-10:00', '07:00-10:00', '07:00-10:00', '07:00-10:00', '07:00-10:00', NULL, NULL),
(2, '10:00-16:00', '10:00-16:00', '10:00-16:00', '10:00-16:00', '10:00-16:00', NULL, NULL),
(3, NULL, NULL, '09:30-12:30', '09:30-12:30', NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, '12:00-14:20', NULL, NULL),
(6, '05:00-07:00', '07:00-08:00', '08:00-09:00', '12:00-13:30', '23:00-23:59', NULL, NULL),
(7, '10:00-16:00', NULL, NULL, NULL, NULL, '12:30-15:00', '16:30-20:00'),
(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `animal_race`
--

CREATE TABLE `animal_race` (
  `ANI_RAC_ID` int(11) NOT NULL,
  `RACE` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `RACE_DESC` varchar(500) COLLATE utf8_polish_ci NOT NULL,
  `ANI_SPE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `animal_race`
--

INSERT INTO `animal_race` (`ANI_RAC_ID`, `RACE`, `RACE_DESC`, `ANI_SPE_ID`) VALUES
(1, 'Bulldog angielski', 'Rasa psa zaliczana do grupy molosów, wyhodowana w XVIII wieku w Anglii, użytkowana jako pies do towarzystwa i odstraszający.', 1),
(2, 'Beagle', 'Rasa psa, należąca do grupy psów gończych, posokowców i psów ras pokrewnych, typu wyżłowatego. Zaklasyfikowana do sekcji psów gończych, w podsekcji psy gończe małe. Podlega próbom pracy.', 1),
(3, 'Kakadu', 'Gatunek średniej wielkości ptaka z rodziny kakaduowatych. Występuje w południowo-wschodniej Australii. Niezagrożony wyginięciem. ', 3),
(4, 'Pers', 'Stara rasa kota, zaliczana do grupy długowłosych. W Europie pojawiła się w XVII wieku. ', 2),
(5, 'Norweski', 'Naturalna rasa kota przystosowana do życia w chłodnym klimacie. ', 2),
(6, 'Chihuahua', 'Silna, krępa budowa w formacie zbliżonym do kwadratu. Charakterystyczną cechą rasy jest duża, zaokrąglona głowa wyglądem przypominająca jabłko. Duże, sterczące uszy, szerokie u nasady i zwężające się ku zaokrąglonym końcom. Okrągłe, szeroko rozstawione oczy o ciemnym kolorze. Krótka kufa. Zgryz nożycowy lub cęgowy. Ogon noszony sztywno do góry, zawija się delikatnie na grzbiet.', 1),
(7, 'Pincher miniaturowy', 'Pies rasy miniaturowej, proporcjonalnie zbudowany. Zarys sylwetki powinien zamykać się w kwadracie. Uszy wysoko osadzone, stojące lub załamane w kształcie litery V. Ogon osadzony wysoko, często przycięty. Szata krótka, raczej twarda, gładko przylegająca bez podszerstka.', 1),
(8, 'West highland white terrier', 'West highland white terrier jest niewielkim, bardzo solidnie zbudowanym psem. Ma krótki, zwarty grzbiet, muskularną, grubszą u nasady szyję, głęboką klatkę piersiową, mocne lędźwie i długi, prosty, solidny, wesoło noszony ogon, który nigdy nie powinien być zawinięty. Kończyny krótkie i muskularne, łapy okrągłe z czarną poduszką. ', 1),
(9, 'Jamnik', 'Obwód klatki piersiowej powyżej 35 cm, górna granica ciężaru ciała ok. 9,0 kg. Umaszczenie w tej rasie jest dopuszczalne w każdym kolorze, jednak wadą jest maść czysto czarna lub biała bez podpalania. Najczęściej występują jamniki rudobrązowe lub czarne podpalane. Jamniki szorstkowłose mają także umaszczenie dzicze.', 1),
(10, 'Buldog francuski', 'Pies o małej, krępej i muskularnej sylwetce. Ma szeroką, kwadratową głowę o dużych, stojących uszach. Według wzorca tej rasy ogon jest \"naturalnie krótki, idealnie-wystarczająco długi, by zasłonić odbyt, nisko osadzony, raczej prosty, gruby u nasady i zwężający się stopniowo ku końcowi. Dopuszczalny jest ogon skręcony, zawinięty, załamany lub dłuższy, lecz nie sięgający poniżej stawu skokowego. Ogon, nawet w ruchu, nie przekracza linii poziomej grzbietu\"', 1),
(11, 'Cavalier king charles spaniel', 'Czaszka prawie płaska między uszami. Oczy: duże, ciemne, okrągłe lecz nie wyłupiaste, szeroko rozstawione. Uszy: długie, wysoko osadzone, mocno opiórowane. Pysk: szczęka i żuchwa mocne z doskonałym zgryzem nożycowym. Umiarkowanie rozwinięta klatka piersiowa, dobrze kątowane łopatki, kończyny proste z umiarkowanym kośćcem.Tułów: krótki, zwarty, dobrze ożebrowany. Grzbiet prosty.', 1),
(12, 'Jack Russell terrier ', 'Jack Russell terrier jest psem niewielkich rozmiarów o zwinnej sylwetce średniej wielkości. Ogon jest osadzony wysoko, lędźwie są lekko łukowate. Żuchwa i szczęki tego teriera są mocne, zgryz nożycowy, trufla nosowa czarna, płytki stop, oczy w kształcie migdałów, a uszy – płatków róż i ściśle przylegające do głowy[6]. Skóra jest elastyczna i gruba; ciało nie jest ani delikatne, ani zbyt muskularne.', 1),
(13, 'Chart polski', 'Smukły pies o wąskim pysku. Chart polski jest wyraźnie mocniejszy i nie tak finezyjny w kształtach jak inne charty. Jest najwyższą z polskich ras.\r\n\r\nChart polski to pies silny, wytrzymały, o dobrze zbalansowanym ciele i proporcjach (wpisany jest w prostokąt oparty na dłuższym boku) pozwalających nie tylko na szybki galop, ale i na pokonywanie dużych odległości wyciągniętym kłusem. Jest psem o okrywie włosowej dobrze chroniącej go przed zimnem, wilgocią i wiatrem.', 1),
(16, 'Labrador retriever', 'Mocnej budowy, zwarty, bardzo aktywny; szeroka czaszka, klatka piersiowa dobrze rozwinięta, żebra dobrze wysklepione, lędźwie i kończyny tylne mocne i szerokie.', 1),
(17, 'Gończy polski', 'Pies średniego wzrostu, o lekkiej, zwartej i sprężystej budowie, o sylwetce prostokątnej. Włos krótki, na głowie i uszach jedwabisty, na tułowiu twardy, sztywny i przylegający.', 1),
(18, 'Owczarek niemiecki', 'Sylwetka prawidłowo zbudowanego owczarka niemieckiego jest prostokątna, mocna i harmonijna. Pies ma prosty grzbiet z wysokim, wyraźnym kłębem oraz pojemną klatkę piersiową z dobrze wykształconym przedpiersiem. Zad długi i mocny, lekko opadający. Szyja pozbawiona podgardla.', 1),
(19, 'Husky syberyjski', 'Husky syberyjski to pies silny umiarkowanie, zwarty, o sportowej sylwetce formatu skróconego prostokąta. Głowa: średniej wielkości, proporcjonalna do tułowia. Oczy są brązowe lub jasnoniebieskie, przy czym często jedno może mieć inny kolor niż drugie. Tułów: silny zwarty, linia grzbietu prosta, kłąb wyraźny, lędźwie dobrze umięśnione, zad prosty, klatka piersiowa głęboka.', 1),
(20, 'Devon rex', 'Jest kotem o drobnej i szczupłej budowie, w typie orientalnym. Często nazywa się go \"kotem-pudlem\" lub \"kosmitą\" ze względu na wielkie i głęboko osadzone uszy, pokryte delikatnym futerkiem. Głowa jest krótka w kształcie klina z odstającymi policzkami, krótka mordka z mocnym podbródkiem, nos krótki z wyraźnie zaznaczonym stopem, czoło przechodzące w płaską czaszkę. Oczy wielkie i szeroko rozstawione, w formie migdałków. Inaczej jak u pozostałych ras kotów, wąsy i brwi są poskręcane, króciutkie lu', 2),
(21, 'Ragdoll', 'Ragdolla można zaliczyć do dużych kotów o grubych kościach. Jego głowa jest średniej wielkości, w kształcie trójkąta. Oczy niebieskie, owalne i szerokie, natomiast uszy skierowane ku przodowi. Ogon jest gęsty i puszysty.', 2),
(22, 'Maine Coon', 'Maine coon to kot pół-długowłosy średniego typu orientalnego. Średnia masa dorosłego samca to 4,8 do 11 kilogramów, a samicy 3,5 do 8 kilogramów. Okrywa włosowa składa się z dwóch warstw – podszerstka i włosów okrywowych. Ze względu na swoją budowę jest wodoodporna. Futro jest bardzo obfite na brzuchu i pośladkach, a na szyi układa się w charakterystyczną kryzę. U kotów tych dopuszczalne są wszystkie rodzaje umaszczenia, jednak najbardziej rozpowszechnione jest brązowe umaszczenie typu tabby.', 2),
(23, 'Neva Masquarade', 'Posiadają półdługie, gęste futro, z wydatnym kołnierzem i kosmykami włosów przy uszach oraz umięśnione, masywne ciało i puszysty bujny ogon. ', 2),
(24, 'Rosyjski niebieski', 'Jest kotem średniej wielkości o smukłej sylwetce. Kot rosyjski ma stosunkowo długie nogi, zakończone małymi owalnymi łapkami. Pojawiające się cechy kotów orientalnych – mogące się pojawiać ze względu na wcześniejszą konieczność krzyżowania z m.in. kotami syjamskimi – są uznawane według standardu za wadę. Oczy w kształcie migdałów, na ogół zielonego koloru, odstępstwo od tego (kolor żółtawy – typowy u młodych kociąt tej rasy) stanowi wadę u kotów dorosłych. Uszy są duże i postawione.', 2),
(25, 'Szkocki zwisłouchy', 'Cechą charakterystyczną rasy są małe uszy, szeroko osadzone, zaokrąglone. Głowa zwisłouchów jest idealnie okrągła. Rozróżnia się różne rodzaje załamań - pojedyncze, pofałdowane (np. załamane ku przodowi, a następnie ku tyłowi), lub niesymetryczne (koty z załamanym jednym uchem są dyskwalifikowane). Za tę przedziwną cechę odpowiedzialny jest dominujący gen powszechnie występujący u innych zwierząt domowych (świń, psów, owiec, itd.). U kotów to zjawisko wyjątkowo rzadkie. Zabawne, zwisające uszy n', 2),
(26, 'Nimfa', 'U nimf odmiany nominalnej (typowej dla dzikich nimf) występuje wyraźny dymorfizm płciowy. Samiec jest ciemnoszary, szary lub jasnoszary z jaśniejszą piersią i brzuchem. Głowa żółta, z szarym czubkiem z żółtym końcem. Pomarańczowe plamy policzkowe. Biały brzeg skrzydła. Nogi, dziób i sterówki szare. Samice mają szare pióra na głowie i żółty, prążkowany ogon. Młode do pierwszego pierzenia (ok. 6 miesięcy) wyglądają jak samice', 3),
(27, 'Agapornis', 'Długość ciała 13–18cm; masa ciała 25–66 g. Mają krępą budowę ciała, krótki ogon, krótkie skrzydła, stosunkowo dużą głowę i haczykowato zagięty dziób. W ubarwieniu gatunków żyjących w warunkach naturalnych dominuje kolor zielony. U niektórych występuje biała obwódka wokół oczu. W hodowli uzyskano odmiany o niespotykanym w naturze ubarwieniu', 3),
(28, 'Papużka falista', 'Występuje sezonowy dymorfizm płciowy; woskówka jest ogółem niebieska, u samic w okresie lęgowym zmienia barwę na brązową. Ciemię w tylnej części jest żółte, w tyle czoła i na pokrywach usznych występują drobne, czarne prążki. Pióra w górnej części grzbietu mają czarne środki, a żółte krawędzie, co nadaje im łuskowaty wygląd. Obszar od dolnej części grzbietu po pokrywy nadogonowe jaskrawozielone. Pokrywy skrzydłowe mniejsze i średnie ubarwione jak pióra w górnej części grzbietu. Pokrywy skrzydłow', 3),
(29, 'Ara', 'Charakteryzują się bardzo długim ogonem, kolorowym upierzeniem oraz dużym, hakowato zakończonym dziobem. Gdy są podekscytowane, ich policzki mogą się rumienić. Dymorfizm płciowy praktycznie nie występuje. Odżywiają się owocami i orzechami (kruszą skorupę, a następnie wydobywają zawartość językiem). Łatwo się oswajają. Niektóre mogą uczyć się naśladować ludzką mowę', 3),
(30, 'Polski koń szlachetny półkrwi', 'Do ogólnych cech pokroju należą: głowa o profilu prostym, mocna budowa ciała i mocne kończyny, ścięty zad, wysokość w kłębie między 160 a 170 cm, występowanie wszystkich maści podstawowych.', 4),
(31, 'Konik polski', 'Jest to prymitywny koń małego wzrostu (do 132 cm lub 134-136 cm). Ma silną i krępą budowę ciała. U osobników tej rasy proporcjonalne głowy o szerokim czole i prostym profilu są lekkie, usadowione na krótkiej, szerokiej i prostej nisko osadzonej muskularnej szyi. Na głowie są nieduże, grube uszy i żywe oczy. Kłąb jest mało wyraźny, łopatki krótkie, z kolei tułów dość długi, a grzbiet czasami łęgowaty. Konie mają głęboką klatkę piersiową, oraz pojemny, często obwisły brzuch i ścięty zad. \r\nKoniki ', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `animal_species`
--

CREATE TABLE `animal_species` (
  `ANI_SPE_ID` int(11) NOT NULL,
  `SPECIES` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `SPECIES_DESC` varchar(500) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `animal_species`
--

INSERT INTO `animal_species` (`ANI_SPE_ID`, `SPECIES`, `SPECIES_DESC`) VALUES
(1, 'Pies', 'udomowiona forma wilka szarego, ssaka drapieżnego z rodziny psowatych (Canidae), uznawana przez niektórych za podgatunek wilka, a przez innych za odrębny gatunek[potrzebny przypis], opisywany pod synonimicznymi nazwami Canis lupus familiaris lub Canis familiaris. Od czasu jego udomowienia powstało wiele ras, znacznie różniących się morfologią i cechami użytkowymi. Rasy pierwotne powstawały głównie w wyniku presji środowiskowej. Rasy współczesne uzyskano w wyniku doboru sztucznego.'),
(2, 'Kot', 'udomowiony gatunek ssaka z rzędu drapieżnych z rodziny kotowatych. Koty zostały udomowione około 9500 lat temu i są obecnie najpopularniejszymi zwierzętami domowymi na świecie. Gatunek prawdopodobnie pochodzi od kota nubijskiego, przy czym w Europie krzyżował się ze żbikiem. Jest uznawany za gatunek inwazyjny.'),
(3, 'Papuga', 'rząd ptaków z podgromady Neornithes. Najliczniejsze w Ameryce Południowej i Australii.'),
(4, 'Koń', 'Gatunek ssaka nieparzystokopytnego z rodziny koniowatych. Koń po raz pierwszy został udomowiony prawdopodobnie na terenie północnego Kazachstanu w okresie kultury Botai tj. około 3,5 tys. lat p.n.e., natomiast ludność europejska dokonała tego ok. 1,5 tys. lat p.n.e. Obecnie przedstawiciele 18 z 21 współczesnych ras hodowlanych pochodzą od dwóch linii – arabskiej i turkmeńskiej'),
(5, 'Bydło', 'Udomowiony podgatunek tura europejskiego, zwierzęcia z rodziny wołowatych, rzędu parzystokopytnych. Dzikim przodkiem formy udomowionej był tur Bos primigenius.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `customer`
--

CREATE TABLE `customer` (
  `CUS_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `LAST_NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_polish_ci DEFAULT NULL,
  `EMAIL` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `PHONE_NUMBER` varchar(10) COLLATE utf8_polish_ci NOT NULL,
  `ADDRESS` varchar(100) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `customer`
--

INSERT INTO `customer` (`CUS_ID`, `FIRST_NAME`, `LAST_NAME`, `PASSWORD`, `EMAIL`, `PHONE_NUMBER`, `ADDRESS`) VALUES
(1, 'Michał', 'Raźny', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'michal@wp.pl', '888017299', 'Dziekanowice 13, ul. Wolności 1'),
(2, 'Waldemar', 'Kowalski', 'cokolwiek', 'wal.kow@onet.pl', '723564125', 'Miechów 45'),
(3, 'Kamil', 'Potoczny', '$2y$10$C.4U0MQ9iYJ.rauynQNV7euDeB8C5aJ3Q4B2ilqHWBxnBzAvTQm/C', 'kamil@potoczny.pl', '652147528', 'Zembrzyce 234'),
(4, 'Seweryn', 'Muras', '$2y$10$bPI74TjvIvl5iiMvZG9nP.um9HoDc69wa6pVoAjXQtE2iPzJ2avHm', 'seweryn@kuras.pl', '547852147', 'Sucha Beskidzka 284'),
(5, 'Janusz', 'Nowak', '$2y$10$xuPbM.uWknlTqQvEO7tU6.c8I8YstolbglTbVM6HozdXGxnF1qNry', 'janusz@sukcesu.pl', '721458748', 'Świebodzice Śląskie 43');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `customer_animal`
--

CREATE TABLE `customer_animal` (
  `CUS_ANI_ID` int(11) NOT NULL,
  `NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `WEIGHT` float NOT NULL,
  `HEIGHT` int(11) NOT NULL,
  `GENDER` enum('MALE','FEMALE') COLLATE utf8_polish_ci NOT NULL,
  `BIRTH_DATE` date NOT NULL,
  `ANI_RAC_ID` int(11) NOT NULL,
  `CUS_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `customer_animal`
--

INSERT INTO `customer_animal` (`CUS_ANI_ID`, `NAME`, `WEIGHT`, `HEIGHT`, `GENDER`, `BIRTH_DATE`, `ANI_RAC_ID`, `CUS_ID`) VALUES
(1, 'Kajtuś', 4, 30, 'MALE', '2018-09-11', 1, 1),
(2, 'Tofik', 3, 45, 'MALE', '2018-11-04', 3, 1),
(3, 'Kaziu', 2, 67, 'MALE', '2018-10-11', 3, 1),
(4, 'Tomcio', 3, 56, 'MALE', '2017-10-04', 3, 1),
(5, 'Jadzia', 4, 67, 'FEMALE', '2018-11-06', 2, 2),
(6, 'Karolina', 3.5, 39, 'FEMALE', '2018-11-15', 5, 5),
(7, 'Janusz', 46, 34, 'MALE', '2018-12-03', 3, 1),
(8, 'Januszek', 8, 45, 'MALE', '2018-12-19', 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `diagnose`
--

CREATE TABLE `diagnose` (
  `DIAG_ID` int(6) NOT NULL,
  `QUESTION0` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION1` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION2` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION3` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION4` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION5` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION6` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION7` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `QUESTION8` varchar(4) COLLATE utf8_polish_ci NOT NULL,
  `DISEASE` varchar(50) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `diagnose`
--

INSERT INTO `diagnose` (`DIAG_ID`, `QUESTION0`, `QUESTION1`, `QUESTION2`, `QUESTION3`, `QUESTION4`, `QUESTION5`, `QUESTION6`, `QUESTION7`, `QUESTION8`, `DISEASE`) VALUES
(1, '0', '0', '0', '50', '100', '75', '50', '50', '0', 'Zatrucie pokarmowe'),
(2, '0', '100', '0', '75', '50', '75', '25', '100', '25', 'Bruceloza'),
(3, '50', '75', '0', '50', '100', '0', '100', '25', '75', 'Zarobaczenie'),
(4, '75', '0', '0', '0', '75', '50', '50', '0', '0', 'Grypa'),
(5, '0', '25', '75', '75', '25', '50', '0', '25', '0', 'Zarobaczenie'),
(6, '75', '50', '50', '0', '50', '0', '100', '100', '50', 'Parwowiroza'),
(7, '75', '100', '0', '75', '75', '0', '50', '75', '100', 'Parwowiroza'),
(8, '25', '75', '50', '75', '75', '25', '100', '25', '75', 'Borelioza'),
(9, '0', '0', '0', '75', '100', '75', '25', '50', '100', 'Parwowiroza'),
(10, '75', '100', '100', '75', '50', '0', '75', '25', '100', 'Zapalenie tchawicy'),
(11, '25', '25', '100', '0', '0', '0', '25', '100', '25', 'Grypa'),
(12, '75', '50', '0', '75', '50', '25', '75', '75', '75', 'Zatrucie pokarmowe'),
(13, '100', '100', '100', '50', '25', '25', '50', '100', '25', 'Bruceloza'),
(14, '75', '50', '100', '25', '75', '100', '50', '0', '25', 'Zarobaczenie'),
(15, '0', '0', '75', '100', '50', '100', '100', '25', '25', 'Zapalenie pęcherza'),
(16, '100', '25', '0', '100', '0', '25', '75', '100', '25', 'Borelioza'),
(17, '50', '50', '0', '50', '50', '75', '100', '50', '75', 'Zarobaczenie'),
(18, '0', '50', '100', '25', '25', '0', '0', '100', '50', 'Zarobaczenie'),
(19, '25', '100', '0', '25', '75', '100', '100', '50', '0', 'Grypa'),
(20, '0', '100', '100', '0', '75', '0', '75', '25', '75', 'Zatrucie pokarmowe'),
(21, '100', '100', '75', '75', '75', '100', '75', '75', '25', 'Bruceloza'),
(22, '75', '75', '0', '25', '50', '0', '75', '100', '75', 'Zapalenie pęcherza'),
(23, '100', '100', '0', '50', '75', '50', '100', '0', '50', 'Parwowiroza'),
(24, '50', '100', '100', '0', '100', '75', '25', '0', '50', 'Zapalenie pęcherza'),
(25, '0', '25', '100', '100', '50', '0', '25', '50', '75', 'Parwowiroza'),
(26, '25', '50', '25', '0', '100', '100', '100', '100', '0', 'Grypa'),
(27, '0', '0', '50', '25', '100', '0', '0', '50', '0', 'Zarobaczenie'),
(28, '75', '0', '100', '75', '25', '25', '0', '25', '75', 'Grypa'),
(29, '0', '0', '0', '0', '50', '25', '50', '100', '50', 'Zapalenie pęcherza'),
(30, '75', '100', '25', '100', '100', '0', '75', '25', '75', 'Zarobaczenie'),
(31, '25', '50', '75', '100', '0', '75', '25', '75', '50', 'Zapalenie tchawicy'),
(32, '100', '0', '50', '0', '75', '75', '75', '75', '50', 'Zarobaczenie'),
(33, '50', '50', '50', '100', '25', '75', '75', '75', '50', 'Zatrucie pokarmowe'),
(34, '100', '100', '75', '100', '0', '50', '100', '100', '25', 'Bruceloza'),
(35, '50', '50', '25', '75', '100', '75', '75', '100', '75', 'Bruceloza'),
(36, '75', '100', '100', '50', '0', '100', '100', '25', '100', 'Zapalenie tchawicy'),
(37, '75', '50', '75', '50', '0', '0', '0', '100', '0', 'Grypa'),
(38, '75', '50', '75', '50', '25', '100', '0', '25', '50', 'Zarobaczenie'),
(39, '100', '50', '100', '0', '25', '0', '75', '0', '0', 'Zatrucie pokarmowe'),
(40, '0', '50', '0', '0', '50', '50', '100', '75', '25', 'Bruceloza'),
(41, '0', '0', '50', '0', '0', '0', '75', '75', '100', 'Zarobaczenie'),
(42, '100', '0', '100', '25', '0', '50', '50', '100', '100', 'Zapalenie pęcherza'),
(43, '100', '50', '100', '25', '75', '75', '0', '0', '50', 'Zapalenie pęcherza'),
(44, '25', '0', '50', '50', '50', '50', '25', '75', '75', 'Grypa'),
(45, '100', '100', '50', '50', '75', '100', '100', '75', '50', 'Zatrucie pokarmowe'),
(46, '0', '75', '0', '0', '100', '0', '0', '50', '75', 'Zatrucie pokarmowe'),
(47, '75', '50', '25', '100', '100', '0', '0', '50', '25', 'Zapalenie tchawicy'),
(48, '75', '75', '100', '100', '50', '0', '0', '25', '50', 'Zapalenie pęcherza'),
(49, '25', '25', '100', '25', '25', '100', '0', '0', '50', 'Zarobaczenie'),
(50, '25', '25', '75', '25', '50', '0', '25', '75', '0', 'Grypa');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `disease`
--

CREATE TABLE `disease` (
  `DIS_ID` int(11) NOT NULL,
  `NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `SYMPTOMS` varchar(500) COLLATE utf8_polish_ci NOT NULL,
  `TREATMENT` varchar(500) COLLATE utf8_polish_ci NOT NULL,
  `STATUS` enum('ACTIVE','INACTIVE') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `disease`
--

INSERT INTO `disease` (`DIS_ID`, `NAME`, `SYMPTOMS`, `TREATMENT`, `STATUS`) VALUES
(1, 'Grypa', 'gorączka, katar, kaszel, ból głowy, ból gardła, ból mięśni', 'Stosowanie leków homeopatycznych, picie dużej ilości wody, stosowanie leków wykrztuśnych na wilgotny kaszel.', 'ACTIVE'),
(2, 'Wszawica', 'uczucie swędzenia skóry głowy,\r\ndrapanie, będące odruchem obronnych na skutek uporczywego swędzenia.\r\nzaczerwienienie skóry głowy i karku na skutek drapania,', 'Użycie specjalistycznych środków.', 'ACTIVE'),
(3, 'Zatrucie pokarmowe', 'ból brzucha, wymioty, biegunka', 'Spożywanie węgla leczniczego. Użycie antybiotyku, gdy objawy nie ustępują.', 'ACTIVE'),
(4, 'Stłuczenie', 'ból, opuchlizna, krwotok', 'Odciążenie stłuczonego miejsca.', 'ACTIVE'),
(5, 'Bruceloza', 'nieregularna, tzw. falistą gorączkę, zlewne poty, bóle głowy, objawy grypopodobne, jak bóle stawów i mięśni, osłabienie.', 'Wdrożenie antybiotykoterapii.', 'ACTIVE'),
(6, 'Koci katar', 'Ropiejące oczy, zatkany nos, wydzielina z oczu i nosa', 'Antybiotyki, witamina C', 'ACTIVE'),
(7, 'Parwowiroza', 'Wymioty, biegunka, wysoka gorączka', 'Antybiotyki, Leki przeciwzapalne', 'ACTIVE'),
(8, 'Zarobaczenie', 'Występowanie jaj pasożytów w kale', 'Środki przeciwpasożytnicze', 'ACTIVE'),
(9, 'Borelioza', 'Spadek liczby czerwonych krwinek w organizmie, niewydolność wielonarządowa', 'Dializy, podawanie kroplówek', 'ACTIVE'),
(10, 'Pasożyty zewnętrzne', 'Świąd, zapalenie skóry, wypadanie włosów', 'Podanie środka przeciwpasożytniczego typu advocate', 'ACTIVE'),
(11, 'Zapalenie tchawicy', 'Kaszel, odruch połykania, gorączka', 'Antybiotyki', 'ACTIVE'),
(12, 'Zapalenie pęcherza', 'Posikiwanie, niemożność oddania moczu, nietypowe postawy podczas oddawania moczu', 'Antybiotyki', 'ACTIVE');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `doctor`
--

CREATE TABLE `doctor` (
  `DOC_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `LAST_NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `ADDRESS` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `PHONE_NUMBER` varchar(10) COLLATE utf8_polish_ci NOT NULL,
  `ACADEMIC_TITLE` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `EMAIL` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `ADM_TYPE` enum('HEAD','NORMAL') COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `doctor`
--

INSERT INTO `doctor` (`DOC_ID`, `FIRST_NAME`, `LAST_NAME`, `PASSWORD`, `ADDRESS`, `PHONE_NUMBER`, `ACADEMIC_TITLE`, `EMAIL`, `ADM_TYPE`) VALUES
(1, 'Daniel', 'Kowalik', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', '544 Bieńkówka 34-212', '732547124', 'Doktor habilitowany', 'daniel@wp.pl', 'HEAD'),
(2, 'Kamil', 'Markowskiled', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'Kraków, ul. Kościuszki 1', '123987465', 'profesor', 'kamil@markowski.pl', 'NORMAL'),
(3, 'Andrzej', 'Malinowski', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'Malinowo 13', '987654321', 'Doktor habilotowany', 'andrzej@malinowski.pl', 'NORMAL'),
(4, 'Wojtek', 'Wojciechowski', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'Kościuszki', '956513585', 'Prof.', 'wojtek@wojciechowski.pl', 'NORMAL'),
(5, 'Bartosz', 'Kowadło', '$2y$10$kv1DqmbsW1MDs4y2/hcUYeeEtNntnK5JIOBO2T0nSHWHdYV2DOsFa', 'Warszawa 23', '721458562', 'Doktor hablilitowany', 'bartosz@kowadlo.pl', 'NORMAL'),
(6, 'Malwinka', 'Kochana', '$2y$10$EeSF4WC0DttHL5UHgzLgg.DpI2TifgmyjepNdf/ddVlHEBA9SMlJu', 'Dream-land 123/10', '721546231', 'Doktor habilitowany', 'malwinka@gmail.com', 'NORMAL'),
(7, 'Mateusz', 'Wójcik', '$2y$10$Lj5X43mNPpRcxYvhHdmB6e60I6gvDbj1CiqDgniYHZ9Arb5IsorAS', 'Warszawa potockich 16', '721564872', 'Brak', 'mateo@witecki.pl', 'NORMAL'),
(9, 'Andrzej', 'Szarmach', '$2y$10$KORCVZ..DutqLITTmGmBhONc7twRjp2FvTeP/IeUqgtaNOSiSla1W', 'Szarmachowice 20/10', '721546789', 'Profesor', 'andrzej@szarmach.pl', 'NORMAL');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login_history`
--

CREATE TABLE `login_history` (
  `LH_ID` int(6) NOT NULL,
  `DOC_ID` int(6) DEFAULT NULL,
  `CUS_ID` int(6) DEFAULT NULL,
  `IP_ADDRESS` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `DATE` datetime NOT NULL,
  `RESULT` enum('ACCESS','DENIED') COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `login_history`
--

INSERT INTO `login_history` (`LH_ID`, `DOC_ID`, `CUS_ID`, `IP_ADDRESS`, `DATE`, `RESULT`) VALUES
(1, NULL, NULL, '::1', '2018-11-14 19:39:19', 'DENIED'),
(2, 1, NULL, '::1', '2018-11-14 19:39:28', 'DENIED'),
(3, 1, NULL, '::1', '2018-11-14 19:39:33', 'ACCESS'),
(4, NULL, 1, '::1', '2018-11-14 19:39:56', 'DENIED'),
(5, NULL, 1, '::1', '2018-11-14 19:40:04', 'ACCESS'),
(6, NULL, 1, '::1', '2018-11-15 18:02:10', 'ACCESS'),
(7, NULL, 2, '::1', '2018-11-15 22:46:49', 'DENIED'),
(8, NULL, 3, '::1', '2018-11-15 22:52:39', 'ACCESS'),
(9, NULL, 3, '::1', '2018-11-15 22:58:25', 'ACCESS'),
(10, NULL, 4, '::1', '2018-11-18 11:31:17', 'ACCESS'),
(11, NULL, 1, '::1', '2018-11-18 17:48:45', 'ACCESS'),
(12, NULL, 1, '::1', '2018-11-18 17:56:12', 'ACCESS'),
(13, NULL, 1, '::1', '2018-11-22 22:42:49', 'ACCESS'),
(14, 1, NULL, '::1', '2018-11-22 22:43:41', 'ACCESS'),
(15, NULL, 1, '::1', '2018-11-22 22:57:51', 'ACCESS'),
(16, 1, NULL, '::1', '2018-11-22 22:58:00', 'ACCESS'),
(17, NULL, 1, '::1', '2018-11-22 22:58:56', 'ACCESS'),
(18, NULL, 1, '::1', '2018-11-22 23:33:56', 'ACCESS'),
(19, NULL, 1, '::1', '2018-11-22 23:51:08', 'ACCESS'),
(20, NULL, 1, '::1', '2018-11-22 23:55:43', 'ACCESS'),
(21, NULL, 1, '::1', '2018-11-23 01:12:46', 'ACCESS'),
(22, NULL, 1, '::1', '2018-11-23 01:16:29', 'ACCESS'),
(23, NULL, 1, '::1', '2018-11-23 01:17:17', 'ACCESS'),
(24, NULL, 1, '::1', '2018-11-23 01:26:50', 'ACCESS'),
(25, 1, NULL, '::1', '2018-11-23 01:28:05', 'ACCESS'),
(26, 1, NULL, '::1', '2018-11-23 15:54:38', 'ACCESS'),
(27, NULL, 1, '::1', '2018-11-23 15:54:56', 'ACCESS'),
(28, 1, NULL, '::1', '2018-11-24 11:05:55', 'ACCESS'),
(29, NULL, 1, '::1', '2018-11-24 11:07:41', 'ACCESS'),
(30, 1, NULL, '::1', '2018-11-24 11:35:15', 'ACCESS'),
(31, NULL, 1, '::1', '2018-11-24 11:35:44', 'ACCESS'),
(32, 1, NULL, '::1', '2018-11-24 11:38:46', 'ACCESS'),
(33, NULL, 1, '::1', '2018-11-24 14:31:02', 'ACCESS'),
(34, 1, NULL, '::1', '2018-11-24 15:37:08', 'ACCESS'),
(35, NULL, 1, '::1', '2018-11-24 15:38:00', 'ACCESS'),
(36, 1, NULL, '::1', '2018-11-24 15:42:04', 'ACCESS'),
(37, NULL, 1, '::1', '2018-11-24 15:42:19', 'ACCESS'),
(38, NULL, 1, '::1', '2018-11-24 17:39:11', 'ACCESS'),
(39, NULL, 1, '::1', '2018-11-25 12:00:54', 'ACCESS'),
(40, 1, NULL, '::1', '2018-11-25 14:26:47', 'ACCESS'),
(41, NULL, 1, '::1', '2018-11-25 16:40:31', 'ACCESS'),
(42, 1, NULL, '::1', '2018-11-25 17:03:22', 'DENIED'),
(43, 1, NULL, '::1', '2018-11-25 17:03:25', 'ACCESS'),
(44, NULL, 1, '::1', '2018-11-25 17:04:39', 'ACCESS'),
(45, NULL, 1, '::1', '2018-11-26 23:20:41', 'ACCESS'),
(46, 1, NULL, '::1', '2018-11-26 23:23:56', 'ACCESS'),
(47, 1, NULL, '::1', '2018-11-27 09:54:05', 'ACCESS'),
(48, 1, NULL, '::1', '2018-11-28 11:10:21', 'ACCESS'),
(49, NULL, 1, '::1', '2018-11-29 17:07:52', 'ACCESS'),
(50, 1, NULL, '::1', '2018-11-29 17:13:27', 'ACCESS'),
(51, NULL, 1, '::1', '2018-11-29 17:14:27', 'ACCESS'),
(52, NULL, 1, '::1', '2018-11-30 18:23:30', 'ACCESS'),
(53, 1, NULL, '::1', '2018-11-30 20:10:13', 'ACCESS'),
(54, NULL, 1, '::1', '2018-11-30 20:11:16', 'ACCESS'),
(55, NULL, 1, '::1', '2018-12-03 09:04:36', 'ACCESS'),
(56, NULL, 5, '::1', '2018-12-03 09:54:39', 'ACCESS'),
(57, 1, NULL, '::1', '2018-12-04 11:38:35', 'ACCESS'),
(58, NULL, 1, '::1', '2018-12-04 11:57:20', 'ACCESS'),
(59, 1, NULL, '::1', '2018-12-04 11:59:55', 'ACCESS'),
(60, 2, NULL, '::1', '2018-12-04 12:09:37', 'ACCESS'),
(61, NULL, 1, '::1', '2018-12-04 12:10:29', 'ACCESS'),
(62, 3, NULL, '::1', '2018-12-05 09:29:00', 'ACCESS'),
(63, 4, NULL, '::1', '2018-12-05 09:29:15', 'ACCESS'),
(64, 2, NULL, '::1', '2018-12-05 09:30:01', 'ACCESS'),
(65, 4, NULL, '::1', '2018-12-05 09:30:07', 'ACCESS'),
(66, 1, NULL, '::1', '2018-12-05 09:30:13', 'ACCESS'),
(67, NULL, 1, '::1', '2018-12-05 09:31:42', 'ACCESS'),
(68, 1, NULL, '::1', '2018-12-05 09:32:46', 'ACCESS'),
(69, 5, NULL, '::1', '2018-12-05 13:29:25', 'ACCESS'),
(70, 1, NULL, '::1', '2018-12-05 13:44:17', 'ACCESS'),
(71, 1, NULL, '::1', '2018-12-05 13:58:38', 'ACCESS'),
(72, NULL, 1, '::1', '2018-12-05 14:02:23', 'ACCESS'),
(73, 1, NULL, '::1', '2018-12-05 14:02:31', 'ACCESS'),
(74, 1, NULL, '::1', '2018-12-05 20:12:04', 'ACCESS'),
(75, 1, NULL, '::1', '2018-12-05 23:21:20', 'ACCESS'),
(76, 1, NULL, '::1', '2018-12-05 23:52:32', 'ACCESS'),
(77, 6, NULL, '::1', '2018-12-05 23:55:59', 'ACCESS'),
(78, 6, NULL, '::1', '2018-12-05 23:56:18', 'ACCESS'),
(79, 6, NULL, '::1', '2018-12-05 23:56:32', 'DENIED'),
(80, 6, NULL, '::1', '2018-12-05 23:56:38', 'ACCESS'),
(81, NULL, 1, '::1', '2018-12-05 23:58:39', 'ACCESS'),
(82, 1, NULL, '::1', '2018-12-06 09:17:35', 'ACCESS'),
(83, 1, NULL, '::1', '2018-12-06 17:19:08', 'ACCESS'),
(84, 1, NULL, '::1', '2018-12-06 20:35:39', 'ACCESS'),
(85, 1, NULL, '::1', '2018-12-09 19:22:49', 'ACCESS'),
(86, 1, NULL, '::1', '2018-12-10 20:02:29', 'ACCESS'),
(87, 1, NULL, '::1', '2018-12-10 23:33:01', 'ACCESS'),
(88, 2, NULL, '::1', '2018-12-11 09:11:58', 'ACCESS'),
(89, 1, NULL, '::1', '2018-12-11 09:12:17', 'ACCESS'),
(90, 1, NULL, '::1', '2018-12-12 18:38:46', 'ACCESS'),
(91, 1, NULL, '::1', '2018-12-12 23:49:04', 'ACCESS'),
(92, 1, NULL, '::1', '2018-12-18 09:50:18', 'ACCESS'),
(93, NULL, 1, '::1', '2018-12-18 10:50:05', 'ACCESS'),
(94, 1, NULL, '::1', '2018-12-18 11:08:59', 'ACCESS'),
(95, 1, NULL, '::1', '2019-01-02 15:56:07', 'ACCESS'),
(96, 1, NULL, '::1', '2019-01-03 10:43:36', 'ACCESS'),
(97, 1, NULL, '::1', '2019-01-03 20:30:37', 'ACCESS'),
(98, NULL, 1, '::1', '2019-01-03 21:49:39', 'ACCESS'),
(99, 1, NULL, '::1', '2019-01-05 17:18:36', 'ACCESS'),
(100, 1, NULL, '::1', '2019-01-12 21:15:58', 'ACCESS');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `medicine`
--

CREATE TABLE `medicine` (
  `MED_ID` int(11) NOT NULL,
  `NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `DOSAGE` float NOT NULL,
  `DESCRIPTION` varchar(500) COLLATE utf8_polish_ci NOT NULL,
  `STATUS` enum('ACTIVE','INACTIVE') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `medicine`
--

INSERT INTO `medicine` (`MED_ID`, `NAME`, `DOSAGE`, `DESCRIPTION`, `STATUS`) VALUES
(1, 'APAP', 0.2, 'Zawiera paracetamol.', 'ACTIVE'),
(2, 'Ibuprom MAX', 0.89, 'Zawiera ibuprofen, ale nie wiem co jeszcze.', 'ACTIVE'),
(3, 'MAGNE B6', 1.23, 'Uzupełnia magnes.', 'ACTIVE'),
(4, 'CONTROLOC', 2.1, 'Działa jakoś dojelitowo.', 'ACTIVE'),
(5, 'Ulgix', 80.1, 'Na wzdęcia. ', 'ACTIVE'),
(6, 'Betamox', 0.1, 'Produkt stosuje się do leczenia zakażeń wywołanych przez wrażliwe drobnoustroje u bydła, owiec, świń, psów i kotów gdzie wymagana jest pojedyncza iniekcja o przedłużonym działaniu.\nWskazania obejmują infekcje przewodu pokarmowego, dróg oddechowych, skóry i tkanek miękkich, dróg moczowych, powikłania bakteryjne chorób wirusowych, infekcje pooperacyjne (podawać przed zabiegiem) u bydła, świń, owiec, psów i kotów, zespole M.M.A. u loch, mastitis u krów.', 'ACTIVE'),
(7, 'Synergal', 0.1, 'wskazany jest do leczenia: zakażenia skóry i tkanek miękkich (włączając w to powierzchowne i głębokie ropne zapalenie skóry, zapalenie gruczołów okołoodbytowych, zapalenie dziąseł, zapalenie gruczołu mlekowego, zakażenia w obrębie układu rozrodczego) wywołane przez wrażliwe Staphylococcus spp., Streptococcus spp., Escherichia coli, Pasteurella multocida, Proteus spp., Actinomyces bovis, Clostridium spp., Bacterioides spp., Proteus spp, zakażenia układu moczowego wywołane przez wrażliwe Escherich', 'ACTIVE'),
(8, 'Penicylina', 0.1, 'Bardzo silny antybiotyk używany w silnym stanach zapalnych pojedynczych narządów lub całego organizmu', 'ACTIVE'),
(9, 'Metronidazol', 2, 'Należy do chemioterapeutyków lek z grupy pochodnych nitroimidazolu. Wykazuje działanie pierwotniakobójcze oraz bakteriobójcze wobec drobnoustrojów beztlenowych.', 'ACTIVE'),
(10, 'Ketamina', 0.2, 'Szybko działający środek znieczulający ogólnie.', 'ACTIVE'),
(11, 'Melovem', 0.1, 'Do stosowania w ostrych stanach zapalnych układu oddechowego u bydła, w połączeniu z\nodpowiednim leczeniem antybiotykowym, w celu zmniejszenia objawów klinicznych.\nDo stosowania w przypadku biegunki w połączeniu z odpowiednią doustną terapią nawadniającą w\ncelu zmniejszenia objawów klinicznych u cieląt w wieku powyżej jednego tygodnia życia i u młodego\nbydła przed okresem laktacji.\nW celu uśmierzenia bólu pooperacyjnego po zabiegu usunięcia poroża u cieląt. ', 'ACTIVE'),
(12, 'Rabies', 0.2, 'Szczepionka na wściekliznę.', 'ACTIVE'),
(13, 'Loxicom', 0.2, 'Zmniejszenie stanu zapalnego i bólu w ostrych i przewlekłych schorzeniach układu kostno-mięśniowego', 'ACTIVE'),
(14, 'Nospa', 0.3, 'Stosowany w stanach skurczowych mięśni gładkich przewodu pokarmowego.', 'ACTIVE'),
(15, 'Exitel', 1, '\nLeczenie mieszanych infekcji układu pokarmowego wywołanych przez następujące robaki obłe i płaskie: Nicienie: Toxocara cati, Toxascaris leonina,Tasiemce: Dipylidium caninum, Taenia taeniaeformis, Echinococcus multilocularis.', 'ACTIVE'),
(16, 'Advocate', 0.5, 'Do stosowania u psów dotkniętych, lub zagrożonych mieszanymi infestacjami pasożytów.', 'ACTIVE'),
(17, 'Cefalexim 18%', 0.2, 'Produkt stosuje się w do leczenia zakażeń wywołanych przez drobnoustroje wrażliwe na działanie cefaleksyny. Cefalexim 18% jest antybiotykiem z grupy cefalosporyn wykazującym bakteriobójcze działanie w stosunku do szerokiego spektrum bakterii Gram-dodatnich i Gram-ujemnych.', 'ACTIVE'),
(18, 'Marbodex', 0.5, '\nLeczenie zapalenia ucha zewnętrznego, pochodzenia bakteryjnego oraz grzybiczego, wywoływanego przez bakterie wrażliwe na marbofloksacynę i grzyby, szczególnie Malassezia pachydermatis, wrażliwe na klotrymazol.', 'ACTIVE'),
(19, 'Spotinor', 2, 'Do leczenia i zapobiegania inwazji wszy i much u bydła, kleszczy, wszy, wpleszczy i zakażeń larwami muchy plujki u owiec oraz wszy i kleszczy u jagniąt.', 'ACTIVE'),
(20, 'Combivit', 1, 'Stosować w leczeniu martwicy kory mózgowej u bydła i owiec, w leczeniu koni w przypadkach zatrucia paprocią orlą oraz do leczenia przypadków niedoboru witamin grupy B i witaminy C.', 'ACTIVE'),
(21, 'Paratex', 0.3, 'Paratex Palatable jest produktem przeznaczonym do zwalczania inwazji pasożytów wewnętrznych u psów: dojrzałych i niedojrzałych form glist (Toxocara canis, Toxascaris leonina), dojrzałych tęgoryjców (Ancylostoma caninum, Uncinaria stenocephala) oraz dojrzałych i niedojrzałych form tasiemców (Dipylidium caninum, Taenia spp., Echinoccoccus spp.)', 'ACTIVE'),
(22, 'Revertor', 0.5, 'Chlorowodorek atipamezolu jest wybiórczym α-2 antagonistą, zalecanym jako środek znoszący działanie uspokajające medetomidyny i deksmedetomidyny u psów i kotów.', 'ACTIVE'),
(23, 'Scanodyl', 0.1, 'Zapobieganie i zwalczanie bólu oraz reakcji zapalnych po zabiegach ortopedycznych i zabiegach chirurgicznych na tkankach miękkich (także zabiegach okulistycznych).', 'ACTIVE'),
(24, 'Strepto', 0.25, '\nInfekcje wywołane przez drobnoustroje wrażliwe na streptomycynę, w tym infekcje dróg oddechowych oraz przewodu pokarmowego.', 'ACTIVE');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prescription`
--

CREATE TABLE `prescription` (
  `PRE_ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `VIS_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `prescription`
--

INSERT INTO `prescription` (`PRE_ID`, `DATE`, `VIS_ID`) VALUES
(1, '2019-01-03', 16),
(2, '2019-01-08', 16);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prescription_medicine`
--

CREATE TABLE `prescription_medicine` (
  `PRE_MED_ID` int(11) NOT NULL,
  `PRE_ID` int(11) NOT NULL,
  `MED_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `prescription_medicine`
--

INSERT INTO `prescription_medicine` (`PRE_MED_ID`, `PRE_ID`, `MED_ID`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 1, 11),
(4, 1, 20),
(5, 1, 14);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `service`
--

CREATE TABLE `service` (
  `SER_ID` int(11) NOT NULL,
  `NAME` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `PRICE` float NOT NULL,
  `DESCRIPTION` varchar(500) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `service`
--

INSERT INTO `service` (`SER_ID`, `NAME`, `PRICE`, `DESCRIPTION`) VALUES
(1, 'Szczepienie na wściekliznę', 30, 'Wścieklizna jest to ostra choroba wirusowa, przebiegająca z objawami zapalenia mózgu i rdzenia, prowadząca nieuchronnie do śmierci. Choroba przenoszona jest na człowieka wraz ze śliną chorego na wściekliznę zwierzęcia. Kontakt z chorym zwierzęciem grozi zawsze poważnymi konsekwencjami.\r\nSzczepienie na nią jest obowiązkowe i należy je powtarzać każdego roku. '),
(2, 'Szczepienie na choroby zakaźne', 80, 'Choroby zakaźne, przed którymi możemy uchronić psa, wykonując szczepienia to: parwowiroza, leptospiroza, koronawiroza, kaszel kenelowy, wirusowe zapalenie wątroby, borelioza, babeszjoza. Większość z nich wykonuje się dwu- lub trzykrotnie. Warto jednak pamiętać, że żadna szczepionka nie daje nam 100% zabezpieczenia przed chorobą.'),
(3, 'Obcinanie pazurów', 5, 'Rozpoznanie tego, kiedy jest odpowiedni moment na przycięcie pazurów, jest dość proste. Wystarczy wytężyć słuch, gdy pies idzie po podłodze. Jeśli słyszycie stukanie to znak, że czas skrócić pazury. Nie powinny one nigdy dotykać podłogi i nie powinny być słyszalne, gdy pies chodzi.'),
(4, 'Czyszczenie uszu', 10, 'Uszy zwierzęcia czyścimy wacikiem nasączonym specjalnym płynem do czyszczenia uszu dla psów.'),
(5, 'Sanacja jamy ustnej', 100, 'Sanacja jamy ustnej to doprowadzenie do wyleczenia wszystkich chorych zębów. Usunięcie z jamy ustnej potencjalnych ognisk zakażenia, czyli wyleczenie zębów z próchnicy, usunięcie wszystkich zębów, których wyleczyć się już nie da. Jest to po prostu generalny remont'),
(6, 'Zdjęcie rentgenowskie', 50, 'Nowoczesna lampa Rtg wysyła skupioną wiązkę bezpośrednio na prześwietlane miejsce bez tzw. „siania promieniowaniem dookoła” Wykonywanemu zdjęciu towarzyszy jedynie delikatne „kliknięcie” co eliminuje stres zwierzęcia związany z szumem i trzaskiem w aparatach starszej generacji stosowanych w innych lecznicach.'),
(7, 'Badanie USG', 80, 'USG jest najcześciej wykorzystywaną przez nas metodą obrazowania. Daje obraz w czasie rzeczywistym, który w razie potrzeby możemy zatrzymać i wydrukować. Pozwala ponadto przeprowadzić biopsję tkanki bez potrzeby przeprowadzania zabiegu chirurgicznego. Pozwala zobaczyć wnętrze jamy brzusznej, czasem klatki piersiowej, gałki ocznej oraz struktur znajdujących się za nią. Wykorzystujemy to badanie też u pacjentów chirurgicznych: mięśnie, ścięgna, guzki, cysty – wszystko to, jest w zasięgu głowicy US'),
(8, 'Badania lampą Wooda', 40, 'Lampa Wooda, wykorzystująca zjawiska fluorescencji, stosowana jest w dermatologii jako prosta i szybka metoda do wstępnej diagnostyki mykologicznej'),
(9, 'EKG', 40, 'Aparat EKG Weterynaryjny - przeznaczony do gabinetów weterynaryjnych, mierzących podstawowe parametry życiowe u zwierząt.  '),
(10, 'Badanie krwi - profil podstawowy', 50, 'obejmuje zestaw podstawowych oznaczeń: badanie fizykochemiczne i morfologiczne moczu oraz badanie morfologiczne, z rozmazem białokrwinkowym i biochemiczne krwi.'),
(11, 'Badanie krwi - profil rozszerzony', 90, 'Obejmuje: Profil nerkowy (mocznik, kreatynina, sód, potas, białko całkowite i albuminy), Profil wątrobowy (aminotransferaza alaninowa, aminotransferaza asparaginianowa, fosfataza zasadowa, gamma-glutamylotransferaza, bilirubina, białko całkowite, albuminy, dehydrogenaza mleczanowa, cholesterol, amoniak i kwasy żółciowe), Profil kostny (wapń, fosfor, fosfataza zasadowa, białko całkowite i albuminy), Profil sercowy (aminotransferaza alaninowa, aminotransferaza asparaginianowa, kinaza kreatynowa, d'),
(12, 'Mastektomia', 300, 'Usunięcie listwy mlecznej'),
(13, 'Kastracja', 100, 'Rutynowy zabieg chirurgiczny wykonywany u zwierząt w celu poprawy ich zdrowia (kastracja zapobiega ropomaciczu i nowotworom narządów rodnych) oraz ograniczenia nadpopulacji i bezdomności zwierząt.'),
(14, 'Sterylizacja', 100, 'Rutynowy zabieg chirurgiczny wykonywany u zwierząt w celu poprawy ich zdrowia (kastracja zapobiega ropomaciczu i nowotworom narządów rodnych) oraz ograniczenia nadpopulacji i bezdomności zwierząt. Kastracja samic zwana jest potocznie sterylizacją.'),
(15, 'Zabiegi ortpedyczne', 500, 'Osteosynteza, pektinektomia, rekonstrukcje więzadeł'),
(16, 'Usunięcie zmian skórnych', 140, 'Wycięcie zmienionych zakaźnie bądź nowotworowo zmian skórnych');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `visit`
--

CREATE TABLE `visit` (
  `VIS_ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `PRICE` double NOT NULL DEFAULT '0',
  `DESCRIPTION` varchar(500) COLLATE utf8_polish_ci NOT NULL DEFAULT 'Brak',
  `DOC_ID` int(11) NOT NULL,
  `CUS_ANI_ID` int(11) NOT NULL,
  `STATUS` enum('PLANNED','FINISHED') COLLATE utf8_polish_ci DEFAULT 'PLANNED',
  `HOUR` varchar(40) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `visit`
--

INSERT INTO `visit` (`VIS_ID`, `DATE`, `PRICE`, `DESCRIPTION`, `DOC_ID`, `CUS_ANI_ID`, `STATUS`, `HOUR`) VALUES
(16, '2018-12-05', 0, '', 1, 2, 'PLANNED', '11:00'),
(21, '2018-12-05', 0, '', 1, 2, 'PLANNED', '11:30'),
(22, '2018-12-04', 0, '', 1, 2, 'PLANNED', '12:00'),
(23, '2018-12-06', 0, '', 1, 3, 'PLANNED', '15:00'),
(24, '2018-12-19', 0, '', 6, 2, 'PLANNED', '08:00'),
(25, '2018-12-19', 0, '', 6, 2, 'PLANNED', '08:30'),
(26, '2019-01-11', 0, 'Brak', 1, 5, 'PLANNED', '08:00'),
(27, '2019-01-11', 0, 'Brak', 1, 6, 'PLANNED', '08:30');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `visit_disease`
--

CREATE TABLE `visit_disease` (
  `VIS_DIS_ID` int(11) NOT NULL,
  `VIS_ID` int(11) NOT NULL,
  `DIS_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `visit_disease`
--

INSERT INTO `visit_disease` (`VIS_DIS_ID`, `VIS_ID`, `DIS_ID`) VALUES
(1, 21, 5),
(2, 21, 10),
(3, 16, 9),
(4, 21, 7);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `visit_service`
--

CREATE TABLE `visit_service` (
  `VIS_SER_ID` int(11) NOT NULL,
  `VIS_ID` int(11) NOT NULL,
  `SER_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `visit_service`
--

INSERT INTO `visit_service` (`VIS_SER_ID`, `VIS_ID`, `SER_ID`) VALUES
(1, 21, 10),
(2, 21, 1),
(3, 23, 7),
(4, 24, 6),
(5, 24, 12);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `admission_hours`
--
ALTER TABLE `admission_hours`
  ADD PRIMARY KEY (`ADM_H_ID`);

--
-- Indeksy dla tabeli `animal_race`
--
ALTER TABLE `animal_race`
  ADD PRIMARY KEY (`ANI_RAC_ID`),
  ADD KEY `ANI_SPE_ID` (`ANI_SPE_ID`);

--
-- Indeksy dla tabeli `animal_species`
--
ALTER TABLE `animal_species`
  ADD PRIMARY KEY (`ANI_SPE_ID`);

--
-- Indeksy dla tabeli `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CUS_ID`);

--
-- Indeksy dla tabeli `customer_animal`
--
ALTER TABLE `customer_animal`
  ADD PRIMARY KEY (`CUS_ANI_ID`),
  ADD KEY `ANI_RAC_ID` (`ANI_RAC_ID`),
  ADD KEY `CUS_ID` (`CUS_ID`);

--
-- Indeksy dla tabeli `diagnose`
--
ALTER TABLE `diagnose`
  ADD PRIMARY KEY (`DIAG_ID`);

--
-- Indeksy dla tabeli `disease`
--
ALTER TABLE `disease`
  ADD PRIMARY KEY (`DIS_ID`);

--
-- Indeksy dla tabeli `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`DOC_ID`);

--
-- Indeksy dla tabeli `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`LH_ID`),
  ADD KEY `DOC_LOGIN_01` (`DOC_ID`),
  ADD KEY `CUS_LOGIN_01` (`CUS_ID`);

--
-- Indeksy dla tabeli `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`MED_ID`);

--
-- Indeksy dla tabeli `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`PRE_ID`),
  ADD KEY `VIS_ID` (`VIS_ID`);

--
-- Indeksy dla tabeli `prescription_medicine`
--
ALTER TABLE `prescription_medicine`
  ADD PRIMARY KEY (`PRE_MED_ID`),
  ADD KEY `PRE_ID` (`PRE_ID`),
  ADD KEY `MED_ID` (`MED_ID`);

--
-- Indeksy dla tabeli `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`SER_ID`);

--
-- Indeksy dla tabeli `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`VIS_ID`),
  ADD KEY `DOC_ID` (`DOC_ID`),
  ADD KEY `CUS_ANI_ID` (`CUS_ANI_ID`);

--
-- Indeksy dla tabeli `visit_disease`
--
ALTER TABLE `visit_disease`
  ADD PRIMARY KEY (`VIS_DIS_ID`),
  ADD KEY `VIS_ID` (`VIS_ID`),
  ADD KEY `DIS_ID` (`DIS_ID`);

--
-- Indeksy dla tabeli `visit_service`
--
ALTER TABLE `visit_service`
  ADD PRIMARY KEY (`VIS_SER_ID`),
  ADD KEY `VIS_ID` (`VIS_ID`),
  ADD KEY `SER_ID` (`SER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `animal_race`
--
ALTER TABLE `animal_race`
  MODIFY `ANI_RAC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT dla tabeli `animal_species`
--
ALTER TABLE `animal_species`
  MODIFY `ANI_SPE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `customer`
--
ALTER TABLE `customer`
  MODIFY `CUS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `customer_animal`
--
ALTER TABLE `customer_animal`
  MODIFY `CUS_ANI_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `diagnose`
--
ALTER TABLE `diagnose`
  MODIFY `DIAG_ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT dla tabeli `disease`
--
ALTER TABLE `disease`
  MODIFY `DIS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `doctor`
--
ALTER TABLE `doctor`
  MODIFY `DOC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `login_history`
--
ALTER TABLE `login_history`
  MODIFY `LH_ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT dla tabeli `medicine`
--
ALTER TABLE `medicine`
  MODIFY `MED_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT dla tabeli `prescription`
--
ALTER TABLE `prescription`
  MODIFY `PRE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `prescription_medicine`
--
ALTER TABLE `prescription_medicine`
  MODIFY `PRE_MED_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `service`
--
ALTER TABLE `service`
  MODIFY `SER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `visit`
--
ALTER TABLE `visit`
  MODIFY `VIS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT dla tabeli `visit_disease`
--
ALTER TABLE `visit_disease`
  MODIFY `VIS_DIS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `visit_service`
--
ALTER TABLE `visit_service`
  MODIFY `VIS_SER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `admission_hours`
--
ALTER TABLE `admission_hours`
  ADD CONSTRAINT `admission_hours_fk_1` FOREIGN KEY (`ADM_H_ID`) REFERENCES `doctor` (`DOC_ID`) ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `animal_race`
--
ALTER TABLE `animal_race`
  ADD CONSTRAINT `animal_race_ibfk_1` FOREIGN KEY (`ANI_SPE_ID`) REFERENCES `animal_species` (`ANI_SPE_ID`);

--
-- Ograniczenia dla tabeli `customer_animal`
--
ALTER TABLE `customer_animal`
  ADD CONSTRAINT `customer_animal_ibfk_1` FOREIGN KEY (`ANI_RAC_ID`) REFERENCES `animal_race` (`ANI_RAC_ID`),
  ADD CONSTRAINT `customer_animal_ibfk_2` FOREIGN KEY (`CUS_ID`) REFERENCES `customer` (`CUS_ID`);

--
-- Ograniczenia dla tabeli `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `CUS_LOGIN_01` FOREIGN KEY (`CUS_ID`) REFERENCES `customer` (`CUS_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `DOC_LOGIN_01` FOREIGN KEY (`DOC_ID`) REFERENCES `doctor` (`DOC_ID`) ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`VIS_ID`) REFERENCES `visit` (`VIS_ID`);

--
-- Ograniczenia dla tabeli `prescription_medicine`
--
ALTER TABLE `prescription_medicine`
  ADD CONSTRAINT `prescription_medicine_ibfk_1` FOREIGN KEY (`PRE_ID`) REFERENCES `prescription` (`PRE_ID`),
  ADD CONSTRAINT `prescription_medicine_ibfk_2` FOREIGN KEY (`MED_ID`) REFERENCES `medicine` (`MED_ID`);

--
-- Ograniczenia dla tabeli `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`DOC_ID`) REFERENCES `doctor` (`DOC_ID`),
  ADD CONSTRAINT `visit_ibfk_2` FOREIGN KEY (`CUS_ANI_ID`) REFERENCES `customer_animal` (`CUS_ANI_ID`);

--
-- Ograniczenia dla tabeli `visit_disease`
--
ALTER TABLE `visit_disease`
  ADD CONSTRAINT `visit_disease_ibfk_1` FOREIGN KEY (`VIS_ID`) REFERENCES `visit` (`VIS_ID`),
  ADD CONSTRAINT `visit_disease_ibfk_2` FOREIGN KEY (`DIS_ID`) REFERENCES `disease` (`DIS_ID`);

--
-- Ograniczenia dla tabeli `visit_service`
--
ALTER TABLE `visit_service`
  ADD CONSTRAINT `visit_service_ibfk_1` FOREIGN KEY (`VIS_ID`) REFERENCES `visit` (`VIS_ID`),
  ADD CONSTRAINT `visit_service_ibfk_2` FOREIGN KEY (`SER_ID`) REFERENCES `service` (`SER_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
