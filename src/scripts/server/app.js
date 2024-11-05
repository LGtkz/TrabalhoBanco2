const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;


const pool = new Pool({
    host: 'localhost',
    database: 'Supernatural',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let currentUser = null;

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userPool = new Pool({
        user: username,
        password: password,
        host: 'localhost',
        database: 'Supernatural',
        port: 5432,
    });

    try {
        await userPool.connect();
        res.status(200).send('Login successful');
        console.log("Login bem-sucedido");
        currentUser = { username, password };
    } catch (err) {
        res.status(401).send('Invalid username or password');
        console.error("Erro de login:", err);
    }
});

app.post('/insereAnjo', async (req, res) => {
    if (!currentUser || !currentUser.password || typeof currentUser.password !== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    const userPool = new Pool({
        user: currentUser.username,
        password: currentUser.password,
        host: 'localhost',
        database: 'Supernatural',
        port: 5432,
    });

    try {
        const { id, nome, forca, graca, asas, grau, casa } = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Anjo (id, nome, forca, graca, grau, asas, casa) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [id, nome, forca, graca, grau, asas, casa]
        );

        console.log("Criatura cadastrada com sucesso");
        res.status(201).send('Anjo cadastrado com sucesso');
    } catch (error) {
        console.error("Erro ao cadastrar anjo:", error);
        res.status(500).send('Erro ao cadastrar criatura');
    } 
});

app.post('/insereLugar', async (req, res) => {
    if (!currentUser || !currentUser.password || typeof currentUser.password !== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }

    console.log("Usuário autenticado:", currentUser);

    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { nome, descricao } = req.body;
1
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Lugar (nome, descricao) VALUES ($1, $2);',
            [nome, descricao]
        );

        console.log("Lugar cadastrado com sucesso");
        res.status(201).send('Lugar cadastrado com sucesso');
    } catch (error) {
        console.error("Erro ao cadastrar lugar:", error);
        res.status(500).send('Erro ao cadastrar lugar');
    } finally {
        await userPool.end();
    }
});

app.post('/insereCacador', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id, nome, historia, morto} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Cacador (id, nome, historia, morto) VALUES ($1, $2, $3, $4, $5);',
            [id, nome, historia, morto]
        );
        console.log("Caçador cadastrado com sucesso");
        res.status(201).send('Caçador cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar caçador:", error);
        res.status(500).send('Erro ao cadastrar caçador');
    }
});

app.post('/insereFeitico', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { nome, descricao, ingrediente} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Feitico (nome, descricao, ingrediente) VALUES ($1, $2, $3);',
            [nome, descricao, ingrediente]
        );
        console.log("Feitiço cadastrado com sucesso");
        res.status(201).send('Feitiço cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar feitiço:", error);
        res.status(500).send('Erro ao cadastrar feitiço');
    }
});

app.post('/insereMusica', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id, nome, artista} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Musica (id, nome, artista) VALUES ($1, $2, $3);',
            [id, nome, artista]
        );
        console.log("Feitiço cadastrado com sucesso");
        res.status(201).send('Feitiço cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar feitiço:", error);
        res.status(500).send('Erro ao cadastrar feitiço');
    }
});

app.post('/insereArma', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id, nome, descricao} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Arma (id, nome, descricao) VALUES ($1, $2, $3);',
            [id, nome, descricao]
        );
        console.log("Feitiço cadastrado com sucesso");
        res.status(201).send('Feitiço cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar feitiço:", error);
        res.status(500).send('Erro ao cadastrar feitiço');
    }
});

app.post('/inserePoder', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id, nome, forca, descricao} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Poder (id, nome, forca, descricao) VALUES ($1, $2, $3, $4);',
            [id, nome, forca, descricao]
        );
        console.log("Poder cadastrado com sucesso");
        res.status(201).send('Poder cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar Poder:", error);
        res.status(500).send('Erro ao cadastrar feitiço');
    }
});

app.get('/consultaAnjo', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }

    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Anjo WHERE id = $1', 
        [id]
    );
        console.log(results.rows);

        if (results.rows.length === 0) {
            return res.status(404).send('Anjo não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar anjo:', error);
        res.status(500).send('Erro ao buscar anjo');
    }
});


app.post('/insereDemonio', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { nome, forca, possessao, num_pacto, hierarquia, casa} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Demonio (nome, forca, possessao, pactos, hierarquia, casa) VALUES ($1, $2, $3, $4, $5, $6);',
            [nome, forca, possessao, num_pacto, hierarquia, casa]
        );
        console.log("Poder cadastrado com sucesso");
        res.status(201).send('Poder cadastrada com sucesso');
        } catch (error) {
        console.error("Erro ao cadastrar Poder:", error);
        res.status(500).send('Erro ao cadastrar feitiço');
    }
});


app.post('/insereMonstro', async (req, res) =>{
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try{
        const { id, nome, forca, tipo, transformacao, casa} = req.body;
        console.log("Dados recebidos:", req.body);
        console.log(currentUser.username, currentUser.password);
        const result = await userPool.query(
            'INSERT INTO Monstro (id, nome, forca, tipo, transformacao, casa) VALUES ($1, $2, $3, $4, $5, $6);',
            [id, nome, forca, tipo, transformacao, casa]
        );
        console.log("Monstro cadastrado com sucesso");
        res.status(201).send('Monstro cadastrado com sucesso');
    }catch(error){
        console.error("Erro ao cadastrar monstro:", error);
        res.status(500).send('Erro ao cadastrar monstro');
    }
})

app.post('/registro', async (req, res) => {
    const senha = '150912';
    const userPool = new Pool({
        user: 'teste',
        host: 'localhost',
        database: 'Supernatural',
        password: senha, 
        port: 5432,
    });

    try {
        await userPool.connect();
        const { username, password } = req.body;

        try {
            const result = await userPool.query(
                `CREATE ROLE "${username}" WITH LOGIN PASSWORD '${password}'`
            );
            
            res.status(201).send('Cadastro finalizado com sucesso');
        } catch (error) {
            console.error("Erro ao cadastrar usuario:", error);
            if (error.message.includes("already exists")) {
                res.status(400).send('Usuário já existe');
            } else {
                res.status(500).send('Erro ao criar usuario');
            }
        }
    } catch (error) {
        console.error("Erro ao conectar com o banco: ", error);
        res.status(500).send('Erro ao conectar com o banco');
    } finally {
        await userPool.end();
    }
});

app.get('/consultaArma', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }

    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Arma WHERE id = $1', 
        [id]
    );
        console.log(results.rows);

        if (results.rows.length === 0) {
            return res.status(404).send('Arma não encontrada.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar Arma:', error);
        res.status(500).send('Erro ao buscar Arma');
    }
});


app.get('/consultaCacador', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }

    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });

    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Cacador WHERE id = $1', 
        [id]
    );
        console.log(results.rows);

        if (results.rows.length === 0) {
            return res.status(404).send('Caçador não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar caçador:', error);
        res.status(500).send('Erro ao buscar caçador');
    }
});


app.get('/consultaDemonio', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Demonio WHERE id = $1', 
        [id]
    );
        console.log(results.rows);

        if (results.rows.length === 0) {
            return res.status(404).send('Demonio não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar demonio:', error);
        res.status(500).send('Erro ao buscar demonio');
    }
});

app.get('/consultaFeitico', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { nome } = req.body;
        const results = await userPool.query('SELECT * FROM Feitico WHERE nome = $1', 
        [nome]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Feitiço não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar feitiço:', error);
        res.status(500).send('Erro ao buscar feitiço');
    }
});


app.get('/consultaLugar', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { nome } = req.body;
        const results = await userPool.query('SELECT * FROM Lugar WHERE nome = $1', 
        [nome]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Lugar não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar lugar:', error);
        res.status(500).send('Erro ao buscar lugar');
    }
});


app.get('/consultaMonstro', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Monstro WHERE id = $1', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Lugar não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar lugar:', error);
        res.status(500).send('Erro ao buscar lugar');
    }
});

app.get('/consultaMusica', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Musica WHERE id = $1', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Musica não encontrada.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar musica:', error);
        res.status(500).send('Erro ao buscar musica');
    }
});


app.get('/consultaPoder', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('SELECT * FROM Poder WHERE id = $1', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Poder não encontrado.');
        }

        res.status(200).json(results.rows[0]); // Retorna o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar musica:', error);
        res.status(500).send('Erro ao buscar musica');
    }
});

app.delete('/deletaAnjo', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM ANJO WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Poder não encontrado.');
        }
        res.status(200).json({ message:"Anjo deletado com sucesso", anjo: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar musica:', error);
        res.status(500).send('Erro ao buscar musica');
    }
});


app.delete('/deletaArma', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Arma WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Arma não encontrada.');
        }
        res.status(200).json({ message:"Arma deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar arma:', error);
        res.status(500).send('Erro ao buscar arma');
    }
});

app.delete('/deletaCacador', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Arma WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Arma não encontrada.');
        }
        res.status(200).json({ message:"Arma deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar arma:', error);
        res.status(500).send('Erro ao buscar arma');
    }
});

app.delete('/deletaCacador', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Cacador WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Caçador não encontrado.');
        }
        res.status(200).json({ message:"Caçador deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar caçador:', error);
        res.status(500).send('Erro ao buscar caçador');
    }
});

app.delete('/deletaDemonio', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Demonio WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Demonio não encontrado.');
        }
        res.status(200).json({ message:"Demonio deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar demonio:', error);
        res.status(500).send('Erro ao buscar demonio');
    }
});

app.delete('/deletaFeitico', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { nome } = req.body;
        const results = await userPool.query('DELETE FROM Feitico WHERE nome = $1 RETURNING *', 
        [nome]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Feitiço não encontrado.');
        }
        res.status(200).json({ message:"Feitiço deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar Feitiço:', error);
        res.status(500).send('Erro ao buscar Feitiço');
    }
});

app.delete('/deletaLugar', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { nome } = req.body;
        const results = await userPool.query('DELETE FROM Lugar WHERE nome = $1 RETURNING *', 
        [nome]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Lugar não encontrado.');
        }
        res.status(200).json({ message:"Lugar deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar lugar:', error);
        res.status(500).send('Erro ao buscar lugar');
    }
});

app.delete('/deletaMonstro', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Monstro WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Monstro não encontrado.');
        }
        res.status(200).json({ message:"Monstro deletado com sucesso", Arma: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar monstro:', error);
        res.status(500).send('Erro ao buscar monstro');
    }
});

app.delete('/deletaMusica', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Musica WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Musica não encontrado.');
        }
        res.status(200).json({ message:"Musica deletado com sucesso", Musica: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar Musica:', error);
        res.status(500).send('Erro ao buscar Musica');
    }
});

app.delete('/deletaPoder', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const { id } = req.body;
        const results = await userPool.query('DELETE FROM Poder WHERE id = $1 RETURNING *', 
        [id]
    );
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Poder não encontrado.');
        }
        res.status(200).json({ message:"Poder deletado com sucesso", Musica: results.rows[0]}); 
    } catch (error) {
        console.error('Erro ao buscar Poder:', error);
        res.status(500).send('Erro ao buscar Poder');
    }
});

app.get('/geraRelatorio', async (req, res) => {
    if (!currentUser ||!currentUser.password || typeof currentUser.password!== 'string') {
        console.error("Usuário não autenticado ou senha inválida.");
        return res.status(401).send('Usuário não autenticado.');
    }
    console.log("Usuário autenticado:", currentUser);
    const userPool = new Pool({
        user: currentUser.username,
        host: 'localhost',
        database: 'Supernatural',
        password: currentUser.password,
        port: 5432,
    });
    try {
        const results = await userPool.query('SELECT * FROM Relatorio;');
        console.log(results.rows);
        if (results.rows.length === 0) {
            return res.status(404).send('Lugar não encontrado.');
        }

        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar lugar:', error);
        res.status(500).send('Erro ao buscar lugar');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});