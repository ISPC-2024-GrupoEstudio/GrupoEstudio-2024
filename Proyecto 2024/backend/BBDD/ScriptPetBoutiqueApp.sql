CREATE DATABASE  IF NOT EXISTS `pet_boutique` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pet_boutique`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: pet_boutique
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add categoriaproductos',7,'add_categoriaproductos'),(26,'Can change categoriaproductos',7,'change_categoriaproductos'),(27,'Can delete categoriaproductos',7,'delete_categoriaproductos'),(28,'Can view categoriaproductos',7,'view_categoriaproductos'),(29,'Can add estadopedido',8,'add_estadopedido'),(30,'Can change estadopedido',8,'change_estadopedido'),(31,'Can delete estadopedido',8,'delete_estadopedido'),(32,'Can view estadopedido',8,'view_estadopedido'),(33,'Can add formadepago',9,'add_formadepago'),(34,'Can change formadepago',9,'change_formadepago'),(35,'Can delete formadepago',9,'delete_formadepago'),(36,'Can view formadepago',9,'view_formadepago'),(37,'Can add pedidos',10,'add_pedidos'),(38,'Can change pedidos',10,'change_pedidos'),(39,'Can delete pedidos',10,'delete_pedidos'),(40,'Can view pedidos',10,'view_pedidos'),(41,'Can add proveedores',11,'add_proveedores'),(42,'Can change proveedores',11,'change_proveedores'),(43,'Can delete proveedores',11,'delete_proveedores'),(44,'Can view proveedores',11,'view_proveedores'),(45,'Can add roles',12,'add_roles'),(46,'Can change roles',12,'change_roles'),(47,'Can delete roles',12,'delete_roles'),(48,'Can view roles',12,'view_roles'),(49,'Can add tipodoc',13,'add_tipodoc'),(50,'Can change tipodoc',13,'change_tipodoc'),(51,'Can delete tipodoc',13,'delete_tipodoc'),(52,'Can view tipodoc',13,'view_tipodoc'),(53,'Can add tipoenvio',14,'add_tipoenvio'),(54,'Can change tipoenvio',14,'change_tipoenvio'),(55,'Can delete tipoenvio',14,'delete_tipoenvio'),(56,'Can view tipoenvio',14,'view_tipoenvio'),(57,'Can add productosxcarrito',15,'add_productosxcarrito'),(58,'Can change productosxcarrito',15,'change_productosxcarrito'),(59,'Can delete productosxcarrito',15,'delete_productosxcarrito'),(60,'Can view productosxcarrito',15,'view_productosxcarrito'),(61,'Can add usuarios',16,'add_usuarios'),(62,'Can change usuarios',16,'change_usuarios'),(63,'Can delete usuarios',16,'delete_usuarios'),(64,'Can view usuarios',16,'view_usuarios'),(65,'Can add productos',17,'add_productos'),(66,'Can change productos',17,'change_productos'),(67,'Can delete productos',17,'delete_productos'),(68,'Can view productos',17,'view_productos'),(69,'Can add productosxpedido',18,'add_productosxpedido'),(70,'Can change productosxpedido',18,'change_productosxpedido'),(71,'Can delete productosxpedido',18,'delete_productosxpedido'),(72,'Can view productosxpedido',18,'view_productosxpedido'),(73,'Can add productosxventa',19,'add_productosxventa'),(74,'Can change productosxventa',19,'change_productosxventa'),(75,'Can delete productosxventa',19,'delete_productosxventa'),(76,'Can view productosxventa',19,'view_productosxventa'),(77,'Can add ventas',20,'add_ventas'),(78,'Can change ventas',20,'change_ventas'),(79,'Can delete ventas',20,'delete_ventas'),(80,'Can view ventas',20,'view_ventas');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$BmaOyS8u0DmYzloEcHhA76$Vu+vEccgqjgD8QDiNcLynXQTEBemOxDoVzl+mtFaB/c=','2024-05-14 01:11:21.305984',1,'admin','','','ea.samsam@gmail.com',1,1,'2024-05-14 00:53:14.233295');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-05-14 01:17:03.365380','1','Tipodoc object (1)',1,'[{\"added\": {}}]',13,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'PetBoutiqueApp','categoriaproductos'),(8,'PetBoutiqueApp','estadopedido'),(9,'PetBoutiqueApp','formadepago'),(10,'PetBoutiqueApp','pedidos'),(17,'PetBoutiqueApp','productos'),(15,'PetBoutiqueApp','productosxcarrito'),(18,'PetBoutiqueApp','productosxpedido'),(19,'PetBoutiqueApp','productosxventa'),(11,'PetBoutiqueApp','proveedores'),(12,'PetBoutiqueApp','roles'),(13,'PetBoutiqueApp','tipodoc'),(14,'PetBoutiqueApp','tipoenvio'),(16,'PetBoutiqueApp','usuarios'),(20,'PetBoutiqueApp','ventas'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-14 00:21:41.599596'),(2,'auth','0001_initial','2024-05-14 00:21:42.255499'),(3,'admin','0001_initial','2024-05-14 00:21:42.606375'),(4,'admin','0002_logentry_remove_auto_add','2024-05-14 00:21:42.624687'),(5,'admin','0003_logentry_add_action_flag_choices','2024-05-14 00:21:42.640807'),(6,'contenttypes','0002_remove_content_type_name','2024-05-14 00:21:42.780685'),(7,'auth','0002_alter_permission_name_max_length','2024-05-14 00:21:42.857712'),(8,'auth','0003_alter_user_email_max_length','2024-05-14 00:21:42.941679'),(9,'auth','0004_alter_user_username_opts','2024-05-14 00:21:42.951615'),(10,'auth','0005_alter_user_last_login_null','2024-05-14 00:21:43.021774'),(11,'auth','0006_require_contenttypes_0002','2024-05-14 00:21:43.026571'),(12,'auth','0007_alter_validators_add_error_messages','2024-05-14 00:21:43.053583'),(13,'auth','0008_alter_user_username_max_length','2024-05-14 00:21:43.131121'),(14,'auth','0009_alter_user_last_name_max_length','2024-05-14 00:21:43.197869'),(15,'auth','0010_alter_group_name_max_length','2024-05-14 00:21:43.288842'),(16,'auth','0011_update_proxy_permissions','2024-05-14 00:21:43.298815'),(17,'auth','0012_alter_user_first_name_max_length','2024-05-14 00:21:43.371063'),(18,'sessions','0001_initial','2024-05-14 00:21:43.422532'),(19,'PetBoutiqueApp','0001_initial','2024-05-14 01:14:09.363215');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('gpoco1wslmm20tjtik1jb7pjf8qusn81','.eJxVjDsOwjAQBe_iGln-4B8lfc5grb1rHEC2FCcV4u4QKQW0b2bei0XY1hq3QUuckV2YZKffLUF-UNsB3qHdOs-9rcuc-K7wgw4-daTn9XD_DiqM-q2NDzIkp61XGYyyxqezU4TFOqERPTiLpgRFXgrIMocihba5CFKSyBj2_gDGwzeB:1s6ghN:5iN-87VmLnj9rHozF-5Tf_LCA2LJRoYOr_LpI0AHMkU','2024-05-28 01:11:21.309976');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
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
-- Table structure for table `formadepago`
--

DROP TABLE IF EXISTS `formadepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formadepago` (
  `idFormaDePago` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idFormaDePago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formadepago`
--

LOCK TABLES `formadepago` WRITE;
/*!40000 ALTER TABLE `formadepago` DISABLE KEYS */;
/*!40000 ALTER TABLE `formadepago` ENABLE KEYS */;
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
  `tipoDeEnvio` int DEFAULT NULL,
  `domicilioEnvio` varchar(50) DEFAULT NULL,
  `formaDePago` int DEFAULT NULL,
  PRIMARY KEY (`nroPedido`),
  KEY `estado_idx` (`estado`),
  KEY `usuario_idx` (`usuario`),
  KEY `fk_pedido_tipoEnvio_idx` (`tipoDeEnvio`),
  KEY `fk_pedido_formaDePago_idx` (`formaDePago`),
  CONSTRAINT `fk_pedido_estado` FOREIGN KEY (`estado`) REFERENCES `estadopedido` (`idEstado`),
  CONSTRAINT `fk_pedido_formaDePago` FOREIGN KEY (`formaDePago`) REFERENCES `formadepago` (`idFormaDePago`),
  CONSTRAINT `fk_pedido_tipoEnvio` FOREIGN KEY (`tipoDeEnvio`) REFERENCES `tipoenvio` (`idTipoEnvio`),
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Modificado','Collar entretejido con term reforzadas','5000',10,1,'5',1),(2,'Cucha Perro','Cucha para perro madera','45000',5,2,'2',2),(3,'Buzo Adidog','Buzo algodon con friza elastizado','8000',28,1,'8',4),(6,'Capa ','Para la lluvia con capucha','8000',12,2,'2',4),(7,'Huesito','Hueso de fantasía ','1200',10,1,'5',3);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosxcarrito`
--

DROP TABLE IF EXISTS `productosxcarrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosxcarrito` (
  `nombreDeUsuario` varchar(45) NOT NULL,
  `idProducto` int NOT NULL,
  `cant` int DEFAULT NULL,
  PRIMARY KEY (`nombreDeUsuario`,`idProducto`),
  KEY `fk_prodxcar_idProducto_idx` (`idProducto`),
  CONSTRAINT `fk_prodxcar_idProducto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `fk_prodxcar_nombreUsuario` FOREIGN KEY (`nombreDeUsuario`) REFERENCES `usuarios` (`nombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosxcarrito`
--

LOCK TABLES `productosxcarrito` WRITE;
/*!40000 ALTER TABLE `productosxcarrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `productosxcarrito` ENABLE KEYS */;
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
  `precio` float DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodoc`
--

LOCK TABLES `tipodoc` WRITE;
/*!40000 ALTER TABLE `tipodoc` DISABLE KEYS */;
INSERT INTO `tipodoc` VALUES (1,'DNI');
/*!40000 ALTER TABLE `tipodoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoenvio`
--

DROP TABLE IF EXISTS `tipoenvio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoenvio` (
  `idTipoEnvio` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipoEnvio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoenvio`
--

LOCK TABLES `tipoenvio` WRITE;
/*!40000 ALTER TABLE `tipoenvio` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoenvio` ENABLE KEYS */;
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
  `nroPedido` int DEFAULT NULL,
  `precioFinal` float DEFAULT NULL,
  PRIMARY KEY (`nroFactura`),
  KEY `usuario_idx` (`usuario`),
  KEY `fk_ventas_nroPedido_idx` (`nroPedido`),
  CONSTRAINT `fk_ventas_nroPedido` FOREIGN KEY (`nroPedido`) REFERENCES `pedidos` (`nroPedido`),
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

--
-- Dumping routines for database 'pet_boutique'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13 22:22:17
