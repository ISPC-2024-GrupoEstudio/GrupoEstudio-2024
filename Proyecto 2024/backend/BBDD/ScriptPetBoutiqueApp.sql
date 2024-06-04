CREATE DATABASE  IF NOT EXISTS `pet_boutique` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pet_boutique`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: pet_boutique
-- ------------------------------------------------------
-- Server version	8.3.0

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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$BmaOyS8u0DmYzloEcHhA76$Vu+vEccgqjgD8QDiNcLynXQTEBemOxDoVzl+mtFaB/c=','2024-05-27 19:13:16.126368',1,'admin','','','ea.samsam@gmail.com',1,1,'2024-05-14 00:53:14.233295');
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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `nombre_usuario` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`nombre_usuario`,`id_producto`),
  KEY `fk_prodxcar_idProducto_idx` (`id_producto`),
  CONSTRAINT `carrito_producto_FK` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `carrito_usuario_FK` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_producto`
--

DROP TABLE IF EXISTS `categoria_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_producto` (
  `id_categoria_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_categoria_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_producto`
--

LOCK TABLES `categoria_producto` WRITE;
/*!40000 ALTER TABLE `categoria_producto` DISABLE KEYS */;
INSERT INTO `categoria_producto` VALUES (1,'Accesorios',NULL),(2,'Cuchas',NULL),(3,'Juguetes',NULL),(4,'Ropa',NULL);
/*!40000 ALTER TABLE `categoria_producto` ENABLE KEYS */;
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
INSERT INTO `django_session` VALUES ('4rmchzwvkk6jm8sax6fhds6bz36kau24','.eJxVjDsOwjAQBe_iGln-4B8lfc5grb1rHEC2FCcV4u4QKQW0b2bei0XY1hq3QUuckV2YZKffLUF-UNsB3qHdOs-9rcuc-K7wgw4-daTn9XD_DiqM-q2NDzIkp61XGYyyxqezU4TFOqERPTiLpgRFXgrIMocihba5CFKSyBj2_gDGwzeB:1sBfmW:sVVGLXMP0y47CK7cTKX8lk1vqbX5xdRaBQuUWkqDokU','2024-06-10 19:13:16.127972'),('gpoco1wslmm20tjtik1jb7pjf8qusn81','.eJxVjDsOwjAQBe_iGln-4B8lfc5grb1rHEC2FCcV4u4QKQW0b2bei0XY1hq3QUuckV2YZKffLUF-UNsB3qHdOs-9rcuc-K7wgw4-daTn9XD_DiqM-q2NDzIkp61XGYyyxqezU4TFOqERPTiLpgRFXgrIMocihba5CFKSyBj2_gDGwzeB:1s6ghN:5iN-87VmLnj9rHozF-5Tf_LCA2LJRoYOr_LpI0AHMkU','2024-05-28 01:11:21.309976');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_pedido` (
  `id_estado_pedido` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_estado_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_de_pago`
--

DROP TABLE IF EXISTS `forma_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_de_pago` (
  `id_forma_de_pago` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_forma_de_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_de_pago`
--

LOCK TABLES `forma_de_pago` WRITE;
/*!40000 ALTER TABLE `forma_de_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `id_estado_pedido` int DEFAULT NULL,
  `nombre_usuario` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_tipo_de_envio` int DEFAULT NULL,
  `domicilio_envio` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_forma_de_pago` int DEFAULT NULL,
  `numero_pedido` int NOT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `pedido_unique` (`numero_pedido`),
  KEY `estado_idx` (`id_estado_pedido`),
  KEY `usuario_idx` (`nombre_usuario`),
  KEY `fk_pedido_tipoEnvio_idx` (`id_tipo_de_envio`),
  KEY `fk_pedido_formaDePago_idx` (`id_forma_de_pago`),
  CONSTRAINT `fk_pedido_estado` FOREIGN KEY (`id_estado_pedido`) REFERENCES `estado_pedido` (`id_estado_pedido`),
  CONSTRAINT `fk_pedido_formaDePago` FOREIGN KEY (`id_forma_de_pago`) REFERENCES `forma_de_pago` (`id_forma_de_pago`),
  CONSTRAINT `fk_pedido_tipoEnvio` FOREIGN KEY (`id_tipo_de_envio`) REFERENCES `tipo_envio` (`id_tipo_envio`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `precio` float DEFAULT NULL,
  `stock_actual` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `stock_minimo` int DEFAULT NULL,
  `id_categoria_producto` int DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`id_producto`),
  KEY `proveedor_idx` (`id_proveedor`),
  KEY `fk_productos_categoria_idx` (`id_categoria_producto`),
  CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`id_categoria_producto`) REFERENCES `categoria_producto` (`id_categoria_producto`),
  CONSTRAINT `fk_productos_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Modificado','Collar entretejido con term reforzadas',5000,10,1,5,1,'https://i.ibb.co/WcVM7Nj/Collar-Gato.png'),(2,'Cucha Perro','Cucha para perro madera',45000,5,2,2,2,'https://i.ibb.co/VWr3jPj/Cucha-Exterior.png'),(3,'Buzo Adidog','Buzo algodon con friza elastizado',8000,28,1,8,4,'https://i.ibb.co/QmvL3pK/Buzo-Miami.png'),(6,'Capa ','Para la lluvia con capucha',8000,12,2,2,4,'https://i.ibb.co/hDsc0Hz/Buzo-Puffer.png'),(7,'Huesito','Hueso de fantasía ',1200,10,1,5,3,'https://i.ibb.co/bJn9zFr/Huesos.png'),(8,'Ponchito','Poncho de lana con detalles en morley',15600,4,1,1,2,'https://i.ibb.co/xg9KJD1/Sweter-Gato.png'),(9,'Cucha calabaza','Cucha estilo calabaza para gatos, color naranja, con relleno de guata y una abertura principal.',3500,4,1,1,2,'https://i.ibb.co/5vVSGxk/Calabaza.png'),(10,'Cucha Madera','Cucha de madera para perros ideal para exteriores, con techo corredizo, comedero y bebedero de agua. Detalles en negro en sus bordes',3500,4,1,1,2,'https://i.ibb.co/Yj42b5p/Cucha-Exterior.png'),(11,'Cucha Cat','Cama para gatos con forma de gato, cubierta con peluche e interiór de felpa. Incluye un pompón colgante como juguete.',3500,4,1,1,2,'https://i.ibb.co/TKPQhjq/Forma-Gato.png'),(12,'Cucha Sillon','Cama estilo sillon para perros con relleno de guata, abierto, coor gris con detalles blancos en sus bordes.',3000,3,2,1,2,'https://i.ibb.co/FWr40Sw/Sillon.png'),(13,'Cama colgante','Cama colgante para gatos con cubierta azul oscuro con textura, abertura para su entrada e interior acolchado',3800,5,2,1,2,'https://i.ibb.co/s6TQ6SM/Gato-Colgante.png'),(14,'Cama donna','Cama tipo Donna con relleno de guata y cubierta de felpa para perros en varios colores',4100,10,2,1,2,'https://i.ibb.co/tLkMRj2/Donnas.png'),(15,'Collar para Gato','Collar para gato con broche de seguridad y cascabel en varios colores.',3000,20,1,1,2,'https://i.ibb.co/g3Fgqww/Collar-Gato.png'),(16,'Collar para Gato','Collar para gato con broche de seguridad y cascabel en varios colores.',3000,20,1,1,1,'https://i.ibb.co/g3Fgqww/Collar-Gato.png'),(17,'Bolso transportador','Bolso trasportador para mascotas con interior de felpa, red para una mejor oxigenación y manijas de agarre seguro.',60000,10,1,1,1,'https://i.ibb.co/61VqkHH/Transportador.png'),(18,'Collar para perro','Collares para perros con broche de seguridad y con estampados diversos.',10000,20,1,1,1,'https://i.ibb.co/jvZxXgg/Collar-Perro.png'),(19,'Rascador para gato','Rascador para gato de 4 pisos con bolsa colgante, cucha con salidas, y juguete en su piso superior. Todos los pisos estan cubiertos de felpa con detalles en gris.',100000,2,2,1,1,'https://i.ibb.co/5jYk6K5/Rascador.png'),(20,'Correa extensible','Correa extensible para mascotas con gancho para enganchar en el collar y un largo total de 1 metro con botón regulable.',20000,3,2,1,1,'https://i.ibb.co/Rp00xwC/Correa.png'),(21,'Comedero + Dispenser','Base blanca con comedero transparente en forma de gato y dispensador de agua.',25000,4,2,1,1,'https://i.ibb.co/hMxnRKW/Vertedero.png'),(22,'Caña con pluma','Juguete de tipo caña con una pluma en su extremo para jugar con gatos.',3000,13,2,1,3,'https://i.ibb.co/m987M63/Jueguete-Gato.png'),(23,'Hueso para perro','Huesos de cuero comestible para perros',1500,14,2,1,3,'https://i.ibb.co/mG1rYpS/Huesos.png'),(24,'Peluche Felpa','Peluche de felpa tipo patita para gatos. Varios colores.',2500,14,2,1,3,'https://i.ibb.co/wSTP5j6/Peluche-Gato.png'),(25,'Sogas trenzadas','Sogas trenzadas para jugar con perros. Varios colores.',2500,15,1,1,3,'https://i.ibb.co/CMy9xZ8/Sogas.png'),(26,'Raton de Juguete','Ratón de juguete con control remoto para divertirte con tu gato.',4500,7,1,1,3,'https://i.ibb.co/fYNH3sv/Raton.png'),(27,'Lanzador de pelota','Lanzador automático de pelotas para perros. Incluuye 6 pelotas de regalo.',5500,7,1,1,3,'https://i.ibb.co/QDR8RzX/Arrojador-Automatico.png'),(28,'Chaleco Puffer','Chaleco estilo puffer para perro mediano, color verde militar con interior de corderito.',13000,3,1,1,4,'https://i.ibb.co/sVDqPDc/Buzo-Puffer.png'),(29,'Buzo Orejas','Bolso trasportador para mascotas con interior de felpa, red para una mejor oxigenación y manijas de agarre seguro.',16000,4,1,1,4,'https://i.ibb.co/7RsWs21/Buzo-Orejas-Gato.png'),(30,'Buzo Miami','Buzo para perro mediano. Color verde oscuro con letras \"Miami\" color dorado y detalles en color blanco y rojo. Mangas largas.',17000,2,1,1,4,'https://i.ibb.co/WzWx73x/Buzo-Miami.png'),(31,'Gorro Pingüino','Gorro para gato color celeste en forma de pingüino con detalles en color blanco y amarillo.',8000,8,2,1,4,'https://i.ibb.co/mFRQjc8/Gorro-Pinguino.png'),(32,'Buzo Peluche','Buzo de peluche para perro chico. Varios colores. Con capucha con detalles de orejas. Detalles en blanco. Interior de corderito.',9000,11,2,1,4,'https://i.ibb.co/4SSnNWM/Buzo-Felpa.png'),(33,'Sweater Lana','Sweater tejido de lana para gato. Color celeste con cuello y mangas cortas.',8700,22,2,1,4,'https://i.ibb.co/74cyQ2L/Sweter-Gato.png');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_x_pedido`
--

DROP TABLE IF EXISTS `producto_x_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_x_pedido` (
  `id_producto` int NOT NULL,
  `id_pedido` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id_producto`,`id_pedido`),
  KEY `pedido_idx` (`id_pedido`),
  CONSTRAINT `producto_x_pedido_pedido_FK` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `producto_x_pedido_producto_FK` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_x_pedido`
--

LOCK TABLES `producto_x_pedido` WRITE;
/*!40000 ALTER TABLE `producto_x_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_x_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_x_venta`
--

DROP TABLE IF EXISTS `producto_x_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_x_venta` (
  `id_venta` int NOT NULL,
  `precio_unitario` float DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_venta`,`id_producto`),
  KEY `fk_productos_idx` (`id_producto`),
  KEY `fk_ventas_idx` (`id_venta`),
  CONSTRAINT `productosxventa_producto_FK` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `productosxventa_venta_FK` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_x_venta`
--

LOCK TABLES `producto_x_venta` WRITE;
/*!40000 ALTER TABLE `producto_x_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_x_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Sorita','Av. Siempre Viva','3512555896','sorita@gmail.com'),(2,'MamaDog','Salta 55','3514788885','mama.dog@gmail.com');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_del_rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'DNI');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_envio`
--

DROP TABLE IF EXISTS `tipo_envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_envio` (
  `id_tipo_envio` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_envio`
--

LOCK TABLES `tipo_envio` WRITE;
/*!40000 ALTER TABLE `tipo_envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `nombre_usuario` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `id_tipo_documento` int DEFAULT NULL,
  `numero_documento` int DEFAULT NULL,
  `numero_cliente` int DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nombre_usuario`),
  KEY `rol_idx` (`id_rol`),
  KEY `estado_idx` (`estado`),
  KEY `tipoDoc_idx` (`id_tipo_documento`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  CONSTRAINT `fk_usuarios_tipoDoc` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id_tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) DEFAULT NULL,
  `nombre_usuario` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `numero_factura` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `usuario_idx` (`nombre_usuario`),
  KEY `fk_ventas_nroPedido_idx` (`id_pedido`),
  CONSTRAINT `fk_ventas_usuario` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`),
  CONSTRAINT `venta_pedido_FK` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 20:43:54
