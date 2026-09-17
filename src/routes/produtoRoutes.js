import express from 'express';
 
import * as produtoController from '../controllers/produtoController.js';
 
import validate from '../middlewares/validate.js';
 
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';
// 1. Importa o middleware de login. Descomentar para carregar
//import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();
// A rota de criação do produto (registro) continua pública
router.post('/', validate(produtoCreateSchema),produtoController.adicionarProduto); // Rota final:post/api/produto
// 2. Aplica a protecão do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);// // descomentar para funcionar
 
//O caminhos base '/api/produto' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', produtoController.listarProduto);//Rota final: GET /api/produto
 
router.put('/:idProduto', validate(produtoUpdateSchema),produtoController.atualizarProduto);//Rota final: PUT / api/produto/:idProduto
 
router.delete('/idProduto', produtoController.deletarProduto); //Rota final: DELETE / api/produto/:idProduto
export default router;