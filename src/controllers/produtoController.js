// src/controllers/produtoController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';


//Usando 'export const' para criar e exportar 
// Criação de schemas que o validate irá usar para validar dados do usuário
export const produtoCreateSchema = Joi.object({
    idProduto: Joi.string().required(),
    nomeProduto: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(20),
    valor: Joi.number().required(),
    imagem: Joi.string(),
    });
export const produtoUpdateSchema = Joi.object({
    nomeProduto: Joi.string(),
    descricao: Joi.string(),
    tipo: Joi.string(),
    valor: Joi.number().required(),
    imagem: Joi.string(),
   }).min(1);

export const listarProduto = async (req, res) => {
    try{
        //Capturamos os parâmentros de consulta da URL
        // ex: ?cpf=0123456789 / ?nome=ivan / ?email-ivan@senac.br
        const {idProduto, nomeProduto, tipo } = req.query;
        //Passamos todos os filtros para o serviço
        const produto = await produtoService.findAll(idProduto,nomeProduto , tipo);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(produto);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// 15/09/2026 Aula Adicionar, atualizar e deletar pedido
export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({message: 'Produto adicionado com sucesso', data: novoProduto});
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        if (err.code === 'ER_DUP_Entry') {
            return res.status(409).json({error: 'Produto já cadastrado.'});
        }
        res.status(500).json({error: 'Erro ao adicinar produto'});
    }
};
 
export const atualizarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const updated = await produtoService.update(idProduto, req.body);
        if (!updated) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }
        res.status(200).json({message: 'Produto atualizado com sucesso'});
    }catch (err) {
        console.error('Erro atualizar produto:', err);
        res.status(500).json({error: 'Erro ao atualizar produto'});
    }
};
 
export const deletarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const deleted = await produtoService.remove(idProduto);
        if (!deleted) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }
        res.status(200).json({message: 'Produto deletado com sucesso'});
    }catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({error: 'Erro ao deletar produto'});
    }
};