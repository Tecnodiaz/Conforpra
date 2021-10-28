create table Tipo_Cliente(
    ID_Tipo_CLI INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_cliente VARCHAR(500)
)

create table Cliente(
    ID_CLI INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(400),
    Apellidos VARCHAR(400),
    Identidad VARCHAR(50),
    Telefono VARCHAR(20),
    Direccion VARCHAR(400),
    Email VARCHAR(200),
    ID_Tipo_CLI INT,
    FOREIGN KEY (ID_Tipo_CLI) REFERENCES Tipo_Cliente(ID_Tipo_CLI)
)

create table Usuario (
    ID_Usu INT AUTO_INCREMENT PRIMARY KEY,
    Nom_Usuario VARCHAR(300),
    Contraseña VARCHAR(500),
    Nombre VARCHAR(400),
    Nivel INT
)

create table NFC(
    ID_NFC INT AUTO_INCREMENT PRIMARY KEY,
    NFC VARCHAR(400),
    Estatus VARCHAR(300)
)

create table Tipo_Producto(
    ID_Tipo_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(400)
)

create table Producto(
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Producto VARCHAR(400),
    Descripcion VARCHAR(400),
    Precio INT,
    ID_Tipo_Producto INT,
    FOREIGN KEY (ID_Tipo_Producto) REFERENCES Tipo_Producto(ID_Tipo_Producto)
)

create table Tipo_Factura(
    ID_Tipo_Factura INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(50)
)

create table Detalles_Factura(
    ID_Detalles_Factura INT AUTO_INCREMENT PRIMARY KEY,
    Precio INT,
    Total INT,
    ID_Producto INT,
    ID_Factura INT,
    Cantidad INT,
    FOREIGN KEY(ID_Factura) REFERENCES Factura(ID_Factura),
    FOREIGN KEY(ID_Producto) REFERENCES Producto(ID_Producto)
)

drop table Factura

create table Factura(
    ID_Factura INT AUTO_INCREMENT PRIMARY KEY,
    ID_NFC INT,
    ID_CLI INT,
    ID_usu INT,
    ID_Tipo_Factura INT,
    SubTotal INT,
    Impuesto INT,
    Precio INT,
    Total INT,
    Fecha DATE,
    FOREIGN KEY(ID_CLI) REFERENCES Cliente(ID_Cli),
    FOREIGN KEY(ID_Usu) REFERENCES Usuario(ID_Usu),
    FOREIGN KEY(ID_Tipo_Factura) REFERENCES Tipo_Factura(ID_Tipo_Factura),
    FOREIGN KEY(ID_NFC) REFERENCES NFC(ID_NFC)
)

CREATE TRIGGER insert_check AFTER INSERT ON Factura
        FOR EACH ROW
        BEGIN
    IF NEW.ID_NFC IS NOT NULL THEN
UPDATE `NFC` SET `Estatus` = 'Usado' WHERE `NFC`.`ID_NFC` = NEW.ID_NFC;

    END IF;
END

DROP TRIGGER insert_check
ALTER TABLE `Usuario` ADD `ID_Usu_Borrado` INT NOT NULL DEFAULT '0' AFTER `Nivel`;
ALTER TABLE `NFC` ADD `Borrado` INT(11) NOT NULL AFTER `Estatus`;
ALTER TABLE `Producto` ADD `Borrado` INT NOT NULL DEFAULT '0' AFTER `ID_Tipo_Producto`;