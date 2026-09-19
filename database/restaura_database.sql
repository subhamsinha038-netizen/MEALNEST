-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: restauradata
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,1,'Chicken Burger',120.00,'http://localhost:5000/images/chicken-burger.jpg'),(2,1,'Veg Burger',90.00,'http://localhost:5000/images/veg-burger.jpg'),(3,1,'French Fries',80.00,'http://localhost:5000/images/french-fries.jpg'),(4,1,'Chocolate Cake',120.00,'http://localhost:5000/images/chocolate-cake.jpg'),(5,2,'Margherita Pizza',200.00,'http://localhost:5000/images/margherita-pizza.jpg'),(6,2,'Pepperoni Pizza',250.00,'http://localhost:5000/images/pepperoni-pizza.jpg'),(7,2,'Cheese Burst Pizza',300.00,'http://localhost:5000/images/cheese-burst-pizza.jpg'),(8,2,'White Sauce Pasta',140.00,'http://localhost:5000/images/white-sauce-pasta.jpg'),(9,3,'Fried Chicken',180.00,'http://localhost:5000/images/fried-chicken.jpg'),(10,3,'Chicken Wings',160.00,'http://localhost:5000/images/chicken-wings.jpg'),(11,3,'Garlic Bread',70.00,'http://localhost:5000/images/garlic-bread.jpg'),(12,3,'Veg Sandwich',90.00,'http://localhost:5000/images/veg-sandwich.jpg'),(13,4,'Chicken Popcorn',140.00,'http://localhost:5000/images/chicken-popcorn.jpg'),(14,4,'Biryani',220.00,'http://localhost:5000/images/biryani.jpg'),(15,4,'Tacos',89.00,'http://localhost:5000/images/tacos.jpg'),(16,4,'Burritos',105.00,'http://localhost:5000/images/burritos.jpg'),(17,5,'Butter Chicken',260.00,'http://localhost:5000/images/butter-chicken.jpg'),(18,5,'Paneer Butter Masala',210.00,'http://localhost:5000/images/paneer-butter-masala.jpg'),(19,5,'Fish and Chips',100.00,'http://localhost:5000/images/fish-and-chips.jpg'),(20,5,'Brezel',200.00,'http://localhost:5000/images/brezel.jpg');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `menu_item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `food_name` varchar(50) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `images` varchar(250) DEFAULT NULL,
  `status` enum('placed','preparing','on_the_way','delivered') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=441 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (433,66,'Butter Chicken',278.00,'http://localhost:5000/images/butter-chicken.jpg','placed','2026-06-05 15:21:09'),(434,87,'Chicken Burger',138.00,'http://localhost:5000/images/chicken-burger.jpg','placed','2026-06-05 18:18:05'),(435,87,'Chicken Burger',138.00,'http://localhost:5000/images/chicken-burger.jpg','placed','2026-06-05 19:35:06'),(436,90,'Margherita Pizza',218.00,'http://localhost:5000/images/margherita-pizza.jpg','placed','2026-09-08 16:06:35'),(437,90,'Margherita Pizza',218.00,'http://localhost:5000/images/margherita-pizza.jpg','placed','2026-09-08 16:10:07'),(438,90,'Margherita Pizza',218.00,'http://localhost:5000/images/margherita-pizza.jpg','placed','2026-09-08 16:10:10'),(439,90,'Pepperoni Pizza',268.00,'http://localhost:5000/images/pepperoni-pizza.jpg','placed','2026-09-08 16:10:23'),(440,90,'Margherita Pizza',218.00,'http://localhost:5000/images/margherita-pizza.jpg','placed','2026-09-08 16:11:49');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT '0',
  `images` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Pizza Hut','Durgapur City Center',4.2,'http://localhost:5000/images/Pizza_Hut_Logo.jpg'),(2,'Dominos','Benachity Market',4,'http://localhost:5000/images/dominos.jpg'),(3,'KFC','Junction Mall',4.3,'http://localhost:5000/images/kfc.jpg'),(4,'Burger King','City Mall',4.1,'http://localhost:5000/images/burger king.jpg'),(5,'McDonalds','Muchipara',4.5,'http://localhost:5000/images/mcdonalds.jpg');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (87,'MS Dhoni','msdhoni|@gmail.com','$2b$10$ay/J..eVXZoIa66mJTFxdeumc5TMjmsBSViTJ59pSO75Yub5lTx/y','1 Saptarishi,Navi Mumbai'),(88,'Subham Sinha','subhamsinha038@gmail.com','$2b$10$G9TYI646bAGs4TxiTM5Ncu0ZAH3U9RlIxfhlZ2W5wcw7o6LLGhL4.','24 Lisbon, Portugal'),(89,'Subham Sinha','subhamsinha033@gmail.com','$2b$10$GJPSKww9cSAAcnfOir/3Bes0ueW92SaVlJQWTjrLQaYuYmUuomWfS','1 Saptarishi,Navi Mumbai'),(90,'subham','sss@gmail.com','$2b$10$WO5OBfMYucpBvrT/fKGa2OgqRmNY..zMQa622P70XsQnVJUwVk9V.','24 Lisbon, Portugal');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-19 12:54:08
