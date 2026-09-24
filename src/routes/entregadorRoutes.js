import express from 'express';
import * as entregadorController from '../controllers/entregadorController.js';
import validate from '../middlewares/validate.js';

import {entregadorCreateSchema,entregadorUpdateSchema } from '../controllers/entregadorController.js';
 const router = express.Router();
router.post('/',validate(entregadorCreateSchema), entregadorController.adicionarEntregador);
router.get('/',entregadorController.listaEntregador);
router.put('/:idEntregador',validate(entregadorUpdateSchema),entregadorController.atualizarEntregador);
 router.delete('/idEntregador',entregadorController.deleteEntregador);
 export default router;

