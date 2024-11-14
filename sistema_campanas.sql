CREATE DATABASE sistema_campanas;

USE sistema_campanas;

CREATE TABLE campanas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    palabras_clave VARCHAR(255) NOT NULL,
    categoria VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'Pendiente',
    intervalo INT
);
