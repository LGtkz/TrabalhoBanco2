-- Sequences

CREATE SEQUENCE sequencia_normal
    START 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 1000;

-- Tabelas

CREATE TABLE IF NOT EXISTS Cacador (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    historia TEXT,
    morto BOOLEAN DEFAULT FALSE NOT NULL,
    foto BYTEA
);

CREATE TABLE IF NOT EXISTS Musica(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
    nome VARCHAR(50) NOT NULL,
    artista VARCHAR(50) NOT NULL,
	estilo VARCHAR(50) CHECK (estilo IN ('Rock', 'Metal'))
);

CREATE TABLE IF NOT EXISTS Lugar(
	nome VARCHAR(100) PRIMARY KEY,
	descricao TEXT
);

CREATE TABLE IF NOT EXISTS Feitico(
	nome VARCHAR(100) PRIMARY KEY,
	descricao TEXT NOT NULL,
	ingrediente TEXT 
);

CREATE TABLE IF NOT EXISTS Arma(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	nome VARCHAR(50) NOT NULL,
	descricao TEXT
);

CREATE TABLE IF NOT EXISTS Poder(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	nome VARCHAR(50) NOT NULL,
	forca INT CHECK (forca >= 0) NOT NULL,
	descricao TEXT
);

CREATE TABLE IF NOT EXISTS Demonio(
    id INT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	forca INT NOT NULL,
	possessao BOOLEAN DEFAULT FALSE NOT NULL,
	pactos INT NOT NULL,
	hierarquia INT NOT NULL,
	casa VARCHAR(100) NOT NULL,
	CONSTRAINT fk_casa FOREIGN KEY (casa) REFERENCES Lugar(nome)
);

CREATE TABLE IF NOT EXISTS Anjo(
    id INT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	forca INT NOT NULL,
	graca FLOAT NOT NULL,
	asas INT NOT NULL,
	grau INT NOT NULL,
	casa VARCHAR(100) NOT NULL,
	CONSTRAINT fk_casa FOREIGN KEY (casa) REFERENCES Lugar(nome)
);

CREATE TABLE IF NOT EXISTS Monstro(
    id INT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	forca INT NOT NULL,
	tipo VARCHAR(50),
	transformacao VARCHAR(50),
	casa VARCHAR(100) NOT NULL,
	CONSTRAINT fk_casa FOREIGN KEY (casa) REFERENCES Lugar(nome)
);

-------------------------------------------------- Relacionamentos --------------------------------------------------


-- Caçador e Musica
CREATE TABLE IF NOT EXISTS Escuta(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_cacador INT NOT NULL,
	id_musica INT NOT NULL,
	CONSTRAINT fk_cacador FOREIGN KEY (id_cacador) REFERENCES Cacador(id),
	CONSTRAINT fk_musica FOREIGN KEY (id_musica) REFERENCES Musica(id)
);

-- Caçador e Lugar
CREATE TABLE IF NOT EXISTS VisitaCacador(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_cacador INT NOT NULL,
	nome_lugar VARCHAR(100) NOT NULL,
	CONSTRAINT fk_cacador FOREIGN KEY (id_cacador) REFERENCES Cacador(id),
	CONSTRAINT fk_lugar FOREIGN KEY (nome_lugar) REFERENCES Lugar(nome)
);

-- Caçador e Arma
CREATE TABLE IF NOT EXISTS UsaArma(
    id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
    id_cacador INT NOT NULL,
	id_arma INT NOT NULL,
	CONSTRAINT fk_cacador FOREIGN KEY (id_cacador) REFERENCES Cacador(id),
	CONSTRAINT fk_arma FOREIGN KEY (id_arma) REFERENCES Arma(id)
);

-- Caçador e Feitiço
CREATE TABLE IF NOT EXISTS UsaFeitico(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_cacador INT NOT NULL,
	id_feitico VARCHAR(100) NOT NULL,
	CONSTRAINT fk_cacador FOREIGN KEY (id_cacador) REFERENCES Cacador(id),
	CONSTRAINT fk_feitico FOREIGN KEY (id_feitico) REFERENCES Feitico(nome)
);

-- Feitico e Demonio
CREATE TABLE IF NOT EXISTS Demonio_Feitico(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_demonio INT NOT NULL,
	id_feitico VARCHAR(100) NOT NULL,
	CONSTRAINT fk_demonio FOREIGN KEY (id_demonio) REFERENCES Demonio(id),
	CONSTRAINT fk_feitico FOREIGN KEY (id_feitico) REFERENCES Feitico(nome)
);

-- Feitico e Anjo
CREATE TABLE IF NOT EXISTS Anjo_Feitico(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_anjo INT NOT NULL,
	id_feitico VARCHAR(100) NOT NULL,
	CONSTRAINT fk_anjo FOREIGN KEY (id_anjo) REFERENCES Anjo(id),
	CONSTRAINT fk_feitico FOREIGN KEY (id_feitico) REFERENCES Feitico(nome)
);

-- Feitico e Monstro
CREATE TABLE IF NOT EXISTS Monstro_Feitico(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_monstro INT NOT NULL,
	id_feitico VARCHAR(100) NOT NULL,
	CONSTRAINT fk_monstro FOREIGN KEY (id_monstro) REFERENCES Monstro(id),
	CONSTRAINT fk_feitico FOREIGN KEY (id_feitico) REFERENCES Feitico(nome)
);

-- Anjo e Poder
CREATE TABLE IF NOT EXISTS Anjo_Poder(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_anjo INT NOT NULL,
	id_poder INT NOT NULL,
	CONSTRAINT fk_anjo FOREIGN KEY (id_anjo) REFERENCES Anjo(id),
	CONSTRAINT fk_poder FOREIGN KEY (id_poder) REFERENCES Poder(id)
);

-- Demonio e Poder
CREATE TABLE IF NOT EXISTS Demonio_Poder(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_demonio INT NOT NULL,
	id_poder INT NOT NULL,
	CONSTRAINT fk_demonio FOREIGN KEY (id_demonio) REFERENCES Demonio(id),
	CONSTRAINT fk_poder FOREIGN KEY (id_poder) REFERENCES Poder(id)
);

-- Monstro e Poder
CREATE TABLE IF NOT EXISTS Monstro_Poder(
	id INT PRIMARY KEY DEFAULT nextval('sequencia_normal'),
	id_monstro INT NOT NULL,
	id_poder INT NOT NULL,
	CONSTRAINT fk_monstro FOREIGN KEY (id_monstro) REFERENCES Monstro(id),
	CONSTRAINT fk_poder FOREIGN KEY (id_poder) REFERENCES Poder(id)
);


------------------------------------------ Especificações do trabalho ------------------------------------------

-- Indices
CREATE UNIQUE INDEX indice_arma_unica ON Arma(nome);
CREATE INDEX indice_nome_cacador ON Cacador(nome);

-- Views
CREATE VIEW musica_dos_cacadores AS
SELECT c.id AS id_cacador,
		c.nome AS nome_cacador,
       	m.nome AS nome_musica,
       	m.artista AS artista,
       	m.estilo AS estilo_musical
FROM Cacador c
JOIN Escuta e ON c.id = e.id_cacador
JOIN Musica m ON e.id_musica = m.id;

CREATE VIEW poderes_dos_monstros AS
SELECT m.id AS id_monstro,
       	m.nome AS nome_monstro,
       	m.tipo AS tipo_monstro,
		p.id AS id_poder,
	   	p.nome AS nome_poder,
	   	p.forca AS forca_poder,
		p.descricao AS descricao_poder
FROM Monstro m
JOIN Monstro_Poder mp ON m.id = mp.id_monstro
JOIN Poder p ON p.id = mp.id_poder;

CREATE OR REPLACE VIEW Relatorio AS
SELECT 
    (SELECT COUNT(*) FROM Cacador) AS quantidade_cacadores,
    (SELECT COUNT(*) FROM Musica) AS quantidade_musicas,
    (SELECT COUNT(*) FROM Feitico) AS quantidade_feiticos,
    (SELECT COUNT(*) FROM Poder) AS quantidade_poderes,
    (SELECT COUNT(*) FROM Arma) AS quantidade_armas,
    (SELECT COUNT(*) FROM Lugar) AS quantidade_lugares,
    (SELECT COUNT(*) FROM Anjo) AS quantidade_anjos,
    (SELECT COUNT(*) FROM Demonio) AS quantidade_demonios,
    (SELECT COUNT(*) FROM Monstro) AS quantidade_monstros;
-- Procedures

CREATE OR REPLACE FUNCTION diminuir_poder(id_bestiario INT, tipo_bestiario VARCHAR)
RETURNS VOID AS $$
BEGIN
    IF tipo_bestiario = 'Demonio' THEN
        UPDATE Demonio
        SET forca = forca - 1
        WHERE id = id_bestiario;
        
    ELSIF tipo_bestiario = 'Anjo' THEN
        UPDATE Anjo
        SET forca = forca - 1
        WHERE id = id_bestiario;
        
    ELSIF tipo_bestiario = 'Monstro' THEN
        UPDATE Monstro
        SET forca = forca - 1
        WHERE id = id_bestiario;
        
    ELSE
        RAISE EXCEPTION 'Tipo de bestiario inválido: %', tipo_bestiario;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fazerFuneral()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.morto = TRUE THEN
        RAISE NOTICE 'O caçador % está morto. Será feita uma fogueira para fazer o funeral digno do(a) caçador(a) %.', NEW.nome;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION limitarForcaMaxima()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.forca > 100 THEN
        NEW.forca := 100;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers

CREATE TRIGGER limitar_forca_demonio
BEFORE INSERT OR UPDATE ON Demonio
FOR EACH ROW
EXECUTE FUNCTION limitarForcaMaxima();

CREATE TRIGGER limitar_forca_anjo
BEFORE INSERT OR UPDATE ON Anjo
FOR EACH ROW
EXECUTE FUNCTION limitarForcaMaxima();

CREATE TRIGGER limitar_forca_monstro
BEFORE INSERT OR UPDATE ON Monstro
FOR EACH ROW
EXECUTE FUNCTION limitarForcaMaxima();

CREATE TRIGGER funeral_cacador
AFTER INSERT OR UPDATE ON Cacador
FOR EACH ROW
EXECUTE FUNCTION fazerFuneral

-- Permissoes

CREATE ROLE ADMINISTRADOR;
CREATE ROLE BASICO;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ADMINISTRADOR;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ADMINISTRADOR;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO ADMINISTRADOR;
GRANT ALL PRIVILEGES ON DATABASE "Supernatural" TO ADMINISTRADOR;

GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO BASICO;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO BASICO;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO ADMINISTRADOR;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO ADMINISTRADOR;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO ADMINISTRADOR;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO BASICO;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO BASICO;

GRANT ADMINISTRADOR TO teste;

SELECT *
FROM Cacador;