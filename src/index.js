
import 'dotenv/config';


import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar as rotas
//Importar as rotas de autenticação
//import authRotes from './routes/authRoutes.js';
//import clientes from './routes/clienteRoutes.js';
//import produtos from './routes/produtoRoutes.js';
//import pedidos from './routes/pedidoRoutes.js';

// --- Configurações ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: "GET, POST, PUT, PATCH, DELETE",
    Credentials: true,
};

//---INICIALIZAÇÂO DO APP---
const app = express();
// MIDDLEWARE
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Servindo pasta "public" para arquivos(css, JS, Imagens)

app.use(express.static(path.join(__dirname, '..','public')));
// ROTAS
//Rota principal do html
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '..','pages', 'home.html'))
});

// Rotas da API prefixadas, isso evita conflitos e deixa claro quais rotas pertencem à API.
const apiPrefix = '/api';
//Rotas gerais da API(ex: /api/sandro)
//app.use(`${apiPrefix}/clientes`, clienteRoutes);

//app.use(`${apiPrefix}/login`, authRoutes);

//app.use(`${apiPrefix}/produtos`, produtoRoutes);

//app.use(`${apiPrefix}/pedidos`, pedidoRoutes);

//Tratamento de ERROS

//~UM middleware de erro centralizado

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!!');
});

// Inicialização do Servidor

const PORTA = process.env.PORT;
app.listen(PORTA, ()=>{
    console.log(`Servidor rodando na porta ${PORTA}`);
});