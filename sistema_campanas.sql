CREATE DATABASE sistema_campanas;

USE sistema_campanas;

CREATE TABLE campanas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    palabras_clave VARCHAR(255) NOT NULL,
    categoria VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'Pendiente',
    intervalo INT
);

CREATE TABLE usuarios (
    idUsuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellidoP VARCHAR(20) NOT NULL,
    apellidoM VARCHAR(20) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    psswd VARCHAR(30) NOT NULL
);

INSERT INTO campanas (nombre, descripcion, palabras_clave, categoria, intervalo) VALUES ('Campaña 1', 'Descripción de la campaña 1', 'palabra1, palabra2, palabra3', 'Categoria 1', 1);