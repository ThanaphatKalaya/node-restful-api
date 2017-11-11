-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.20-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for bearschema
CREATE DATABASE IF NOT EXISTS `bearschema` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bearschema`;

-- Dumping structure for table bearschema.bears
CREATE TABLE IF NOT EXISTS `bears` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- Dumping data for table bearschema.bears: ~3 rows (approximately)
/*!40000 ALTER TABLE `bears` DISABLE KEYS */;
REPLACE INTO `bears` (`id`, `name`) VALUES
	(1, 'test0'),
	(2, 'test1'),
	(3, 'test2 edited');
/*!40000 ALTER TABLE `bears` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
