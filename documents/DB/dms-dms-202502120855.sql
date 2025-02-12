-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dms
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_cabinet`
--

DROP TABLE IF EXISTS `tbl_cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cabinet` (
  `cabinetId` int NOT NULL AUTO_INCREMENT,
  `cabinetName` varchar(255) DEFAULT NULL,
  `cabinetDescription` varchar(255) DEFAULT NULL,
  `licenseId` int DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  PRIMARY KEY (`cabinetId`),
  KEY `tbl_cabinet_tbl_license_FK` (`licenseId`),
  KEY `tbl_cabinet_tbl_status_FK` (`statusId`),
  CONSTRAINT `tbl_cabinet_tbl_license_FK` FOREIGN KEY (`licenseId`) REFERENCES `tbl_license` (`licenseId`),
  CONSTRAINT `tbl_cabinet_tbl_status_FK` FOREIGN KEY (`statusId`) REFERENCES `tbl_status` (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cabinet`
--

LOCK TABLES `tbl_cabinet` WRITE;
/*!40000 ALTER TABLE `tbl_cabinet` DISABLE KEYS */;
INSERT INTO `tbl_cabinet` VALUES (2,'IT Padama','Sebagai adiministrator, hak aksesnya full',NULL,NULL);
/*!40000 ALTER TABLE `tbl_cabinet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_classification`
--

DROP TABLE IF EXISTS `tbl_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_classification` (
  `classificationId` int NOT NULL AUTO_INCREMENT,
  `classificationName` varchar(255) DEFAULT NULL,
  `classificationDescription` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classificationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_classification`
--

LOCK TABLES `tbl_classification` WRITE;
/*!40000 ALTER TABLE `tbl_classification` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_documents`
--

DROP TABLE IF EXISTS `tbl_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_documents` (
  `documentId` int NOT NULL AUTO_INCREMENT,
  `classificationId` int DEFAULT NULL,
  `cabinetId` int DEFAULT NULL,
  `documentTitle` varchar(255) DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`documentId`),
  KEY `tbl_documents_tbl_cabinet_FK` (`cabinetId`),
  KEY `tbl_documents_tbl_status_FK` (`statusId`),
  KEY `tbl_documents_tbl_classification_FK` (`classificationId`),
  CONSTRAINT `tbl_documents_tbl_cabinet_FK` FOREIGN KEY (`cabinetId`) REFERENCES `tbl_cabinet` (`cabinetId`),
  CONSTRAINT `tbl_documents_tbl_classification_FK` FOREIGN KEY (`classificationId`) REFERENCES `tbl_classification` (`classificationId`),
  CONSTRAINT `tbl_documents_tbl_status_FK` FOREIGN KEY (`statusId`) REFERENCES `tbl_status` (`statusId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documents`
--

LOCK TABLES `tbl_documents` WRITE;
/*!40000 ALTER TABLE `tbl_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_grup_user`
--

DROP TABLE IF EXISTS `tbl_grup_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_grup_user` (
  `grupId` int NOT NULL AUTO_INCREMENT,
  `grupName` varchar(255) DEFAULT NULL,
  `grupDescription` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`grupId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_grup_user`
--

LOCK TABLES `tbl_grup_user` WRITE;
/*!40000 ALTER TABLE `tbl_grup_user` DISABLE KEYS */;
INSERT INTO `tbl_grup_user` VALUES (1,'SysManager','Manage dokumen, hak akses dokumen, search dokumen, log, cetak laporan','2025-02-11 01:54:54',NULL),(2,'Sysadmin','System Management, User Management, reporting, Audit Log','2025-02-11 03:53:03',NULL);
/*!40000 ALTER TABLE `tbl_grup_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_license`
--

DROP TABLE IF EXISTS `tbl_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_license` (
  `licenseId` int NOT NULL AUTO_INCREMENT,
  `licenseCode` varchar(255) DEFAULT NULL,
  `licenseName` varchar(255) DEFAULT NULL,
  `licenseExpired` timestamp NULL DEFAULT NULL,
  `licenseDescription` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`licenseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_license`
--

LOCK TABLES `tbl_license` WRITE;
/*!40000 ALTER TABLE `tbl_license` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_permession`
--

DROP TABLE IF EXISTS `tbl_permession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_permession` (
  `permessionId` int NOT NULL AUTO_INCREMENT,
  `permessionType` varchar(100) DEFAULT NULL,
  `permessionDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_permession`
--

LOCK TABLES `tbl_permession` WRITE;
/*!40000 ALTER TABLE `tbl_permession` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_permession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_permession_doc`
--

DROP TABLE IF EXISTS `tbl_permession_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_permession_doc` (
  `permessionDocId` int NOT NULL AUTO_INCREMENT,
  `classificationId` int DEFAULT NULL,
  `grupId` int DEFAULT NULL,
  `permessionId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`permessionDocId`),
  KEY `tbl_permession_doc_tbl_classification_FK` (`classificationId`),
  KEY `tbl_permession_doc_tbl_grup_user_FK` (`grupId`),
  KEY `tbl_permession_doc_tbl_permession_FK` (`permessionId`),
  CONSTRAINT `tbl_permession_doc_tbl_classification_FK` FOREIGN KEY (`classificationId`) REFERENCES `tbl_classification` (`classificationId`),
  CONSTRAINT `tbl_permession_doc_tbl_grup_user_FK` FOREIGN KEY (`grupId`) REFERENCES `tbl_grup_user` (`grupId`),
  CONSTRAINT `tbl_permession_doc_tbl_permession_FK` FOREIGN KEY (`permessionId`) REFERENCES `tbl_permession` (`permessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_permession_doc`
--

LOCK TABLES `tbl_permession_doc` WRITE;
/*!40000 ALTER TABLE `tbl_permession_doc` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_permession_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_setting_folder`
--

DROP TABLE IF EXISTS `tbl_setting_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_setting_folder` (
  `settingFolderId` int NOT NULL AUTO_INCREMENT,
  `locationDoc` varchar(100) DEFAULT NULL,
  `tempLocation` varchar(255) DEFAULT NULL,
  `backupLocation` varchar(255) DEFAULT NULL,
  `autoscanLocation` varchar(255) DEFAULT NULL,
  `maxFile` int DEFAULT NULL,
  PRIMARY KEY (`settingFolderId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_setting_folder`
--

LOCK TABLES `tbl_setting_folder` WRITE;
/*!40000 ALTER TABLE `tbl_setting_folder` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_setting_folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_smtp`
--

DROP TABLE IF EXISTS `tbl_smtp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_smtp` (
  `smtpId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `authentification` varchar(100) DEFAULT NULL,
  `port` varchar(100) DEFAULT NULL,
  `server` varchar(100) DEFAULT NULL,
  `ssl` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`smtpId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_smtp`
--

LOCK TABLES `tbl_smtp` WRITE;
/*!40000 ALTER TABLE `tbl_smtp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_smtp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_status`
--

DROP TABLE IF EXISTS `tbl_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_status` (
  `statusId` int NOT NULL AUTO_INCREMENT,
  `statusName` varchar(255) DEFAULT NULL,
  `statusDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_status`
--

LOCK TABLES `tbl_status` WRITE;
/*!40000 ALTER TABLE `tbl_status` DISABLE KEYS */;
INSERT INTO `tbl_status` VALUES (1,'ACTIVE',NULL),(2,'NON ACTIVE',NULL);
/*!40000 ALTER TABLE `tbl_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `grupId` int DEFAULT NULL,
  `statusId` int DEFAULT '1',
  `cabinetId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `tbl_users_tbl_grup_user_FK` (`grupId`),
  KEY `tbl_users_tbl_status_FK` (`statusId`),
  KEY `tbl_users_tbl_cabinet_FK` (`cabinetId`),
  CONSTRAINT `tbl_users_tbl_cabinet_FK` FOREIGN KEY (`cabinetId`) REFERENCES `tbl_cabinet` (`cabinetId`),
  CONSTRAINT `tbl_users_tbl_grup_user_FK` FOREIGN KEY (`grupId`) REFERENCES `tbl_grup_user` (`grupId`),
  CONSTRAINT `tbl_users_tbl_status_FK` FOREIGN KEY (`statusId`) REFERENCES `tbl_status` (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'sysmanager','$argon2id$v=19$m=65536,t=4,p=2$pnbz7t2MRq7sDzjXfSzfaQ$zSwD53kabNkZeriywD7/39G0c1X7CP/XB2A3TP4pf48','sysadmin@gmail.com','System Manager','2025-02-11 02:02:04',1,1,NULL);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_versions`
--

DROP TABLE IF EXISTS `tbl_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_versions` (
  `versionId` int NOT NULL AUTO_INCREMENT,
  `versionNumber` int NOT NULL,
  `documentId` int DEFAULT NULL,
  `versionPath` varchar(255) DEFAULT NULL,
  `versionSize` int DEFAULT NULL,
  `pageCount` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isLatest` tinyint(1) DEFAULT '1',
  `statusId` int DEFAULT NULL,
  PRIMARY KEY (`versionId`),
  KEY `tbl_versions_tbl_status_FK` (`statusId`),
  KEY `tbl_versions_tbl_documents_FK` (`documentId`),
  CONSTRAINT `tbl_versions_tbl_documents_FK` FOREIGN KEY (`documentId`) REFERENCES `tbl_documents` (`documentId`),
  CONSTRAINT `tbl_versions_tbl_status_FK` FOREIGN KEY (`statusId`) REFERENCES `tbl_status` (`statusId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_versions`
--

LOCK TABLES `tbl_versions` WRITE;
/*!40000 ALTER TABLE `tbl_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dms'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-12  8:55:30
