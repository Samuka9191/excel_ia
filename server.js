
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Preços dos produtos
const precos = {
    'Pen drive 32GB': 45,
    'Monitor OLED 33"': 1790,
    'Smartphone Android': 3200,
    'SmartTV TV 50" 4K': 2950,
    'TV 48" 4K': 2840,
    'TV 60" 4K': 3470,
    'Smartphone iOS': 8300
};

// Fretes por região
const fretes = {
    'Região Centro-Oeste': 15,
    'Região Nordeste': 20,
    'Região Norte': 25,
    'Região Sul': 15,
    'Região Sudeste': 10
};

// Conexão com o banco de dados
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    dateStrings: true
});

// Testar conexão
db.getConnection()
    .then(connection => {
        console.log('MySQL conectado com sucesso!');
        connection.release();
    })
    .catch(error => {
        console.log('Erro na conexão MySQL:', error.message);
    });

// Listar pedidos
app.get('/api/pedidos', async (req, res) => {
    try {
        const [pedidos] = await db.query(
            'SELECT * FROM pedidos ORDER BY codigo'
        );

        res.json(pedidos);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar pedidos.'
        });
    }
});

// Cadastrar pedido
app.post('/api/pedidos', async (req, res) => {
    try {
        const {
            regiao,
            estado,
            produto,
            data,
            quantidade
        } = req.body;

        const qtd = Number(quantidade);

        if (
            !fretes[regiao] ||
            !precos[produto] ||
            !estado ||
            !/^[A-Z]{2}$/.test(estado) ||
            !/^\d{4}-\d{2}-\d{2}$/.test(data || '') ||
            !Number.isInteger(qtd) ||
            qtd < 1
        ) {
            return res.status(400).json({
                erro: 'Preencha os campos corretamente.'
            });
        }

        const preco = precos[produto];
        const frete = fretes[regiao];
        const total = qtd * (preco + frete);

        const [resultado] = await db.execute(
            `INSERT INTO pedidos
            (regiao, estado, produto, data, quantidade, preco, frete, total)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                regiao,
                estado,
                produto,
                data,
                qtd,
                preco,
                frete,
                total
            ]
        );

        res.status(201).json({
            mensagem: 'Pedido cadastrado!',
            codigo: resultado.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar pedido.'
        });
    }
});

// Remover pedido
app.delete('/api/pedidos/:codigo', async (req, res) => {
    try {
        const codigo = Number(req.params.codigo);

        if (!Number.isInteger(codigo)) {
            return res.status(400).json({
                erro: 'Código inválido.'
            });
        }

        const [resultado] = await db.execute(
            'DELETE FROM pedidos WHERE codigo = ?',
            [codigo]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Pedido não encontrado.'
            });
        }

        res.json({
            mensagem: 'Pedido removido com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao remover pedido.'
        });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('================================');
    console.log('PAINEL DE VENDAS INICIADO!');
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log('================================');
});
