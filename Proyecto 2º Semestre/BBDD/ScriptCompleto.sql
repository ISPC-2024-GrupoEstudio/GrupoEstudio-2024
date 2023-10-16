CREATE DATABASE  IF NOT EXISTS `pet boutique` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pet boutique`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: pet boutique
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `categoriaproductos`
--

DROP TABLE IF EXISTS `categoriaproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaproductos` (
  `IdCategoriaProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`IdCategoriaProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaproductos`
--

LOCK TABLES `categoriaproductos` WRITE;
/*!40000 ALTER TABLE `categoriaproductos` DISABLE KEYS */;
INSERT INTO `categoriaproductos` VALUES (1,'Accesorios',NULL),(2,'Cuchas',NULL),(3,'Juguetes',NULL),(4,'Ropa',NULL);
/*!40000 ALTER TABLE `categoriaproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadopedido`
--

DROP TABLE IF EXISTS `estadopedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadopedido` (
  `idEstado` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadopedido`
--

LOCK TABLES `estadopedido` WRITE;
/*!40000 ALTER TABLE `estadopedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `estadopedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `nroPedido` int NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `usuario` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`nroPedido`),
  KEY `estado_idx` (`estado`),
  KEY `usuario_idx` (`usuario`),
  CONSTRAINT `fk_pedido_estado` FOREIGN KEY (`estado`) REFERENCES `estadopedido` (`idEstado`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`nombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `precio` varchar(45) DEFAULT NULL,
  `stock_actual` int DEFAULT NULL,
  `proveedor` int DEFAULT NULL,
  `stock_min` varchar(45) DEFAULT NULL,
  `categoria` int DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `proveedor_idx` (`proveedor`),
  KEY `fk_productos_categoria_idx` (`categoria`),
  CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoriaproductos` (`IdCategoriaProducto`),
  CONSTRAINT `fk_productos_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`idProveedores`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Modificado','Collar entretejido con term reforzadas','5000',10,1,'5',1),(2,'Cucha Perro','Cucha para perro madera','45000',5,2,'2',2),(3,'Buzo Adidog','Buzo algodon con friza elastizado','8000',28,1,'8',4);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosxpedido`
--

DROP TABLE IF EXISTS `productosxpedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosxpedido` (
  `idProducto` int NOT NULL,
  `nroPedido` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idProducto`,`nroPedido`),
  KEY `pedido_idx` (`nroPedido`),
  CONSTRAINT `fk_productosxpedido_pedido` FOREIGN KEY (`nroPedido`) REFERENCES `pedidos` (`nroPedido`),
  CONSTRAINT `fk_productosxpedido_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosxpedido`
--

LOCK TABLES `productosxpedido` WRITE;
/*!40000 ALTER TABLE `productosxpedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `productosxpedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosxventa`
--

DROP TABLE IF EXISTS `productosxventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosxventa` (
  `nroFactura` int NOT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `cantidad` varchar(45) DEFAULT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`nroFactura`,`idProducto`),
  KEY `fk_productos_idx` (`idProducto`),
  KEY `fk_ventas_idx` (`nroFactura`),
  CONSTRAINT `fk_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `fk_ventas` FOREIGN KEY (`nroFactura`) REFERENCES `ventas` (`nroFactura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosxventa`
--

LOCK TABLES `productosxventa` WRITE;
/*!40000 ALTER TABLE `productosxventa` DISABLE KEYS */;
/*!40000 ALTER TABLE `productosxventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idProveedores` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProveedores`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Sorita','Av. Siempre Viva','3512555896','sorita@gmail.com'),(2,'MamaDog','Salta 55','3514788885','mama.dog@gmail.com');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre_del_rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodoc`
--

DROP TABLE IF EXISTS `tipodoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodoc` (
  `idTipoDoc` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipoDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodoc`
--

LOCK TABLES `tipodoc` WRITE;
/*!40000 ALTER TABLE `tipodoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipodoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `nombreUsuario` varchar(12) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `tipoDoc` int DEFAULT NULL,
  `nroDoc` int DEFAULT NULL,
  `nroCliente` int DEFAULT NULL,
  `rol` int DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nombreUsuario`),
  KEY `rol_idx` (`rol`),
  KEY `estado_idx` (`estado`),
  KEY `tipoDoc_idx` (`tipoDoc`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`),
  CONSTRAINT `fk_usuarios_tipoDoc` FOREIGN KEY (`tipoDoc`) REFERENCES `tipodoc` (`idTipoDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `nroFactura` int NOT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `usuario` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`nroFactura`),
  KEY `usuario_idx` (`usuario`),
  CONSTRAINT `fk_ventas_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`nombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-16 19:24:01
