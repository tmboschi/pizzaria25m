import express from 'express';
 
import * as pedidoController from '../controllers/pedidoController.js';
 
import validate from '../middlewares/validate.js';
 
import { pedidoCreateSchema, pedidoUpdateSchema } from '../controllers/pedidoController.js';
// 1. Importa o middleware de login. Descomentar para carregar
//import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();
// A rota de criação do pedido (registro) continua pública
router.post('/', validate(pedidoCreateSchema),pedidoController.adicionarPedido); // Rota final:post/api/pedido
// 2. Aplica a protecão do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);// // descomentar para funcionar
 
//O caminhos base '/api/pedido' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', pedidoController.listarPedido);//Rota final: GET /api/clientes
 
router.put('/:idPedido', validate(pedidoUpdateSchema),pedidoController.atualizarPedido);//Rota final: PUT / api/pedido/:idPedido
 
router.delete('/idPedido', pedidoController.deletarPedido); //Rota final: DELETE / api/pedido/:idPedido
export default router;