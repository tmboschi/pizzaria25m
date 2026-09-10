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
})min(1);