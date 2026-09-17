// src/controllers/clienteController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as clienteService from '../services/clienteService.js';
import Joi from 'joi';


//Usando 'export const' para criar e exportar 
// Criação de schemas que o validate irá usar para validar dados do usuário
export const clienteCreateSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    cidade: Joi.string().required(),
    cep: Joi.string().required(),
    telefone: Joi.string().required(),
    email: Joi.string().required().email(),
    senha: Joi.string().required().min(6),
    tipo: Joi.string().required().max(10),
});
export const clienteUpdateSchema = Joi.object({
   endereco: Joi.string(),
    bairro: Joi.string(),
    cidade: Joi.string(),
    cep: Joi.string().required(),
    telefone: Joi.string(),
    email: Joi.string().email(),
    senha: Joi.string().min(6), 
}).min(1);

export const listarClientes = async (req, res) => {
    try{
        //Capturamos os parâmentros de consulta da URL
        // ex: ?cpf=0123456789 / ?nome=ivan / ?email-ivan@senac.br
        const {cpf, nome, email } = req.query;
        //Passamos todos os filtros para o serviço
        const clientes = await clienteService.findAll(cpf, nome, email);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(clientes);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// 15/09/2026 Aula Adicionar, atualizar e deletar cliete
export const adicionarCliente = async (req, res) => {
    try {
        const novoCliente = await clienteService.create(req.body);
        res.status(201).json({message: 'Cliente adicionado com sucesso', data: novoCliente});
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        if (err.code === 'ER_DUP_Entry') {
            return res.status(409).json({error: 'CPF já cadastrado.'});
        }
        res.status(500).json({error: 'Erro ao adicinar cliente'});
    }
};
 
export const atualizarCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const updated = await clienteService.update(cpf, req.body);
        if (!updated) {
            return res.status(404).json({error: 'cliente não encontrado'});
        }
        res.status(200).json({message: 'Cliente atualizado com sucesso'});
    }catch (err) {
        console.error('Erro atualizar cliente:', err);
        res.status(500).json({error: 'Erro ao atualizar cliente'});
    }
};
 
export const deletarCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const deleted = await clienteService.remove(cpf);
        if (!deleted) {
            return res.status(404).json({error: 'cliente não encontrado'});
        }
        res.status(200).json({message: 'Cliente deletado com sucesso'});
    }catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({error: 'Erro ao deletar cliente'});
    }
};