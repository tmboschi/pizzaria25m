// src/controllers/pedidoController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';


//Usando 'export const' para criar e exportar 
// Criação de schemas que o validate irá usar para validar dados do usuário
export const pedidoCreateSchema = Joi.object({
    idPedido: Joi.string().required(),
    formaPagto: Joi.string().required().max(10),
    valorTotal: Joi.number().required(),
    idEntregador: Joi.string().required(),
    cpf: Joi.string().required().length(11),
    statusPedido: Joi.string().required().max(20),
    formaEntrega: Joi.string().required().max(15),
  });
export const pedidoUpdateSchema = Joi.object({
    formaPagto: Joi.string(),
    valorTotal: Joi.number(),
    idEntregador: Joi.number(),
    statusPedido: Joi.string(),
    formaEntrega: Joi.string(),
   }).min(1);

export const listarPedido = async (req, res) => {
    try{
        //Capturamos os parâmentros de consulta da URL
        // ex: ?cpf=0123456789 / ?nome=ivan / ?email-ivan@senac.br
        const {idPedido, cpf, idEntregador } = req.query;
        //Passamos todos os filtros para o serviço
        const pedido = await pedidoService.findAll(idPedido, cpf, idEntregador);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(pedido);
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// 15/09/2026 Aula Adicionar, atualizar e deletar pedido
export const adicionarPedido = async (req, res) => {
    try {
        const novoPedido = await pedidoService.create(req.body);
        res.status(201).json({message: 'Pedido adicionado com sucesso', data: novoPedido});
    } catch (err) {
        console.error('Erro ao adicionar pedido:', err);
        if (err.code === 'ER_DUP_Entry') {
            return res.status(409).json({error: 'Pedido já cadastrado.'});
        }
        res.status(500).json({error: 'Erro ao adicinar pedido'});
    }
};
 
export const atualizarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const updated = await pedidoService.update(idPedido, req.body);
        if (!updated) {
            return res.status(404).json({error: 'Pedido não encontrado'});
        }
        res.status(200).json({message: 'Pedido atualizado com sucesso'});
    }catch (err) {
        console.error('Erro atualizar pedido:', err);
        res.status(500).json({error: 'Erro ao atualizar pedido'});
    }
};
 
export const deletarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const deleted = await pedidoService.remove(idPedido);
        if (!deleted) {
            return res.status(404).json({error: 'Pedido não encontrado'});
        }
        res.status(200).json({message: 'Pedido deletado com sucesso'});
    }catch (err) {
        console.error('Erro ao deletar pedido:', err);
        res.status(500).json({error: 'Erro ao deletar pedido'});
    }
};