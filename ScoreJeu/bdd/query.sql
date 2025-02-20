SELECT nomJoueur, points, s.coderang, libelleniveau, TO_CHAR(temps, 'HH12:MM:SS') as temps FROM score s
JOIN niveau n on n.idniveau = s.idniveau
JOIN rang r on r.coderang = s.coderang
WHERE s.idniveau LIKE '%OUT2%'
Order by points DESC, temps ASC;

--SQL DATABASE

-- Création de la base de données
CREATE DATABASE jeuJavaScores;
USE jeuJavaScores;

-- Table niveau
CREATE TABLE niveau (
    idniveau VARCHAR(10) NOT NULL PRIMARY KEY,
    libelleniveau VARCHAR(50)
);

-- Table rang
CREATE TABLE rang (
    coderang CHAR(1) NOT NULL PRIMARY KEY,
    libellerang VARCHAR(50)
);

-- Table score
CREATE TABLE score (
    idscore INT AUTO_INCREMENT PRIMARY KEY,
    nomjoueur VARCHAR(4),
    temps TIME,
    idniveau VARCHAR(10) NOT NULL,
    coderang CHAR(1) NOT NULL,
    points BIGINT,
    FOREIGN KEY (idniveau) REFERENCES niveau(idniveau),
    FOREIGN KEY (coderang) REFERENCES rang(coderang)
);

-- Insertion des données

INSERT INTO niveau (idniveau, libelleniveau) VALUES
('OUT1', 'Outskirts 1'),
('OUT2', 'Outskirts 2'),
('FOR1', 'Forest 1'),
('FOR2', 'Forest 2'),
('NML1', 'No man\'s Land 1'),
('NML2', 'No man\'s Land 2'),
('GVI1', 'Ghost village 1'),
('GVI2', 'Ghost village 2'),
('WAS1', 'WasteLand 1'),
('WAS2', 'WasteLand 2');

INSERT INTO rang (coderang, libellerang) VALUES
('S', 'Rang S'),
('A', 'Rang A'),
('B', 'Rang B'),
('C', 'Rang C'),
('F', 'Rang F');

INSERT INTO score (nomjoueur, temps, idniveau, coderang, points) VALUES
('GREG', '18:00:00', 'OUT1', 'A', 210),
('FRED', '00:20:00', 'OUT2', 'B', 100),
('DEV', '00:09:00', 'WAS2', 'F', 100),
('ALEX', '12:15:30', 'OUT1', 'A', 100),
('JORD', '09:45:20', 'OUT1', 'C', 100),
('TAYL', '11:30:00', 'OUT1', 'B', 100),
('MORG', '08:50:45', 'OUT1', 'F', 100),
('CASY', '10:10:10', 'OUT1', 'A', 100);
