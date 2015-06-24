-- phpMyAdmin SQL Dump
-- version 4.3.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 24. Jun 2015 um 11:54
-- Server-Version: 5.5.43-0ubuntu0.14.04.1
-- PHP-Version: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `pizza`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
`id` int(10) NOT NULL COMMENT 'ID des Artikels',
  `article_type_id` int(10) NOT NULL COMMENT 'ID des Typs',
  `name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT 'Name des Artikels',
  `description` varchar(256) COLLATE utf8_bin NOT NULL COMMENT 'Beschreibung des Artikels',
  `image` varchar(256) COLLATE utf8_bin NOT NULL COMMENT 'Bild',
  `price` float NOT NULL COMMENT 'Preis des Artikels'
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `articles`
--

INSERT INTO `articles` (`id`, `article_type_id`, `name`, `description`, `image`, `price`) VALUES
(1, 1, 'Salami', 'Mit frischer Salami und reichlich Käse', 'salami', 5.99),
(2, 1, 'Thunfisch', 'Mit viel Thunfisch und Zwiebel', 'thunfisch', 5.99),
(3, 1, 'Schinken', 'Mit Schinken, Käse und fruchtiger Tomatensauce', 'schinken', 5.99),
(4, 1, 'Mozzarella', 'Mit frischem Mozarella und Basilikum', 'mozzarella', 5.99),
(5, 1, 'Spezial', 'Mit scharfer Chilli-Salami, Peperoni und frischen Champingnons', 'spezial', 6.99),
(6, 1, 'Scampi', 'Mit Scampis, fruchtigen Tomaten und Knoblauch', 'scampi', 7.99),
(7, 1, 'Hawai', 'Der Klassiker mit Schinken und Ananas', 'hawai', 5.99),
(8, 1, 'Mediterran', 'Mediterran mit knackigem Ruccola, firschen Tomaten und zartem Serrano-Schinken', 'mediterran', 5.99),
(9, 2, 'Beilagensalat', 'kleiner Salat mit Joghurt-Limetten-Dressing', 'beilagensalat', 1.99),
(10, 2, 'Green Garden', 'Gemischter Salat mit Rucola, Frühlingszwiebeln, Cherrytomaten, Paprika, grünen Oliven und Sonnenblumenkernen.', 'greengarden', 5.49),
(11, 2, 'Salat Nizza', 'gemischter Salat mit Rucola, Paprika, roten Zwiebeln, Cherrytomaten, grünen Manzanilla-Oliven und Thunfisch.', 'nizza', 6.49),
(12, 2, 'Caesars Chicken', 'Römersalat mit Cherrytomaten, Hähnchenbrustfilet und gehobeltem Grana Padano', 'ceasars', 7.49),
(13, 3, 'Coca-Cola', 'Softdrink Coca-Cola in einer 0.5l PET-Flasche', 'cola', 1.69),
(14, 3, 'Fanta', 'Softdrink Fanta in einer 0.5l PET-Flasche', 'fanta', 1.69),
(15, 3, 'Sprite', 'Softdrink Sprite in einer 0.5l PET-Flasche', 'sprite', 1.69);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `article_types`
--

CREATE TABLE IF NOT EXISTS `article_types` (
`id` int(10) NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `article_types`
--

INSERT INTO `article_types` (`id`, `name`) VALUES
(1, 'pizza'),
(2, 'salad'),
(3, 'drinks'),
(4, 'pasta'),
(5, 'snacks');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ingredients`
--

CREATE TABLE IF NOT EXISTS `ingredients` (
`id` int(10) NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `price`) VALUES
(1, 'Classic', 0),
(2, 'Medium', 1.59),
(3, 'Large', 3.59),
(4, 'Knoblauch', 0),
(5, 'Basilikum', 0),
(6, 'Extra Käse', 0.99),
(7, 'Ananas', 0.99),
(8, 'Artischocken', 0.99),
(9, 'Broccoli', 0.99),
(10, 'Cherytomaten', 0.99),
(11, 'Ei (Gekocht)', 0.99),
(12, 'Hirtenkäse', 1.59),
(13, 'Mozarella', 1.59),
(14, 'Oliven', 0.99),
(15, 'Rinderhack', 1.59),
(16, 'Spinat', 0.99),
(17, 'Thunfisch', 0.99),
(18, 'Tomate', 0.99);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
`id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_price` float NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `time`, `order_price`, `completed`) VALUES
(1, 12, '2015-06-24 18:51:31', 28.93, 1),
(2, 13, '2015-06-24 18:51:32', 15.75, 1),
(3, 14, '2015-06-24 18:51:33', 16.35, 1),
(4, 15, '2015-06-24 18:51:11', 22.85, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_items`
--

CREATE TABLE IF NOT EXISTS `order_items` (
`id` int(10) NOT NULL,
  `article_id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `order_items`
--

INSERT INTO `order_items` (`id`, `article_id`, `order_id`) VALUES
(1, 1, 1),
(2, 11, 1),
(3, 14, 1),
(4, 6, 1),
(5, 8, 2),
(6, 10, 2),
(7, 15, 2),
(8, 15, 3),
(9, 14, 3),
(10, 7, 3),
(11, 4, 3),
(12, 10, 4),
(13, 11, 4),
(14, 12, 4),
(15, 13, 4),
(16, 14, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_item_ingredients`
--

CREATE TABLE IF NOT EXISTS `order_item_ingredients` (
`id` int(64) NOT NULL,
  `ingredient_id` int(10) NOT NULL,
  `order_item_id` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `order_item_ingredients`
--

INSERT INTO `order_item_ingredients` (`id`, `ingredient_id`, `order_item_id`) VALUES
(1, 3, 1),
(2, 13, 1),
(3, 2, 4),
(4, 1, 5),
(5, 15, 5),
(6, 18, 5),
(7, 1, 10),
(8, 1, 11),
(9, 14, 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` bigint(20) NOT NULL COMMENT 'identifier',
  `username` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'username / login',
  `password` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'password',
  `first_name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'first name',
  `last_name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'last name',
  `email` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'email',
  `street_name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'street name',
  `street_number` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'street number',
  `zip` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'zip code',
  `location` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'loaction ',
  `phone` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'phone number',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `street_name`, `street_number`, `zip`, `location`, `phone`, `is_admin`) VALUES
(1, 'admin', 'password', 'Christian', 'Blank', 'christian-blank@live.de', 'Frühlingstraße', '11a', '76275', 'Ettlingen', '+49 (0) 1570 409584', 1),
(12, 'prudlf', 'rudolfpeter', 'Peter', 'Rudolf', 'peter.rudolf@web.de', 'Torfstraße', '3', '76137', 'Karlsruhe', '+49 (0) 721 898593', 0),
(13, 'pmueller', 'pmueller12', 'Peter', 'Müller', 'peter.mueller@hotmail.com', 'Südendstraße', '52', '76135', 'Karlsruhe', '+49 (0) 721 3940593', 0),
(14, 'tpeterson', 'tpeterson123', 'Thomas', 'Peterson', 't.peterson@gmail.com', 'Kehreckweg', '14', '76275', 'Ettlingen', '+49 (0) 7243 83945', 0),
(15, 'schmuro', 'schmuro76', 'Rolf', 'Schmu', 'schmu.rolf@msn.de', 'MoltkestraÃŸe', '23', '76136', 'Karlsruhe', '+49 (0) 721 980474', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `articles`
--
ALTER TABLE `articles`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `article_types`
--
ALTER TABLE `article_types`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD UNIQUE KEY `id_2` (`id`);

--
-- Indizes für die Tabelle `ingredients`
--
ALTER TABLE `ingredients`
 ADD UNIQUE KEY `ingredients_key` (`id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `order_items`
--
ALTER TABLE `order_items`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `order_item_ingredients`
--
ALTER TABLE `order_item_ingredients`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `articles`
--
ALTER TABLE `articles`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID des Artikels',AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `article_types`
--
ALTER TABLE `article_types`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `ingredients`
--
ALTER TABLE `ingredients`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `order_item_ingredients`
--
ALTER TABLE `order_item_ingredients`
MODIFY `id` int(64) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identifier',AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
