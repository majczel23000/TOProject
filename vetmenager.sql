-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 14 Lis 2018, 21:07
-- Wersja serwera: 10.1.36-MariaDB
-- Wersja PHP: 7.2.10

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
(1, 'Michał', 'Michał', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'michal@wp.pl', '1234', 'Wrocław 23-12');

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
(1, 'Daniel', 'Daniel', '$2y$10$ez1gE2tihXm6jPAEN5iAG.3Js8Yz2y52BzsJjTHvVthTrThzcY.sG', 'Bień 34-212', '123', 'technik informatyk', 'daniel@wp.pl', 'HEAD');

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
(5, NULL, 1, '::1', '2018-11-14 19:40:04', 'ACCESS');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CUS_ID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `customer`
--
ALTER TABLE `customer`
  MODIFY `CUS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `doctor`
--
ALTER TABLE `doctor`
  MODIFY `DOC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `login_history`
--
ALTER TABLE `login_history`
  MODIFY `LH_ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `CUS_LOGIN_01` FOREIGN KEY (`CUS_ID`) REFERENCES `customer` (`CUS_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `DOC_LOGIN_01` FOREIGN KEY (`DOC_ID`) REFERENCES `doctor` (`DOC_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
