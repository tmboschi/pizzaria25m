import * as entregadorService from '../services/entregadorService.js';
import Joi from 'joi';

export const entregadorCreateSchema = Joi.object({
   idEntregador: Joi.string().required(),
   nomeEntregador: Joi.string().required(),
   telefone: Joi.string(),
});

export const entregadorUpdateSchema = Joi.object({
   nomeEntregador: Joi.string().required,
   telefone: Joi.string(),
   
}).min(1);

export const listaEntregador = async(req, res )=>{
    try{
      const{idEntregador,nomeEntregador,telefone}  = req.query;
      const entregador = await entregador.findAll(idEntregador,nomeEntregador,telefone);
      res.json(entregador);
    }catch(err){
      console.error('Erro ao buscar entregador', err),
      res.status(500).json({error: 'Erro interno do servidor'})
    }
};
export const adicionarEntregador = async(req, res)=>{
    try{
       const novoEntregador = await entregadorService.create(req.body);
       res.status(201).json({mensage:'Entregador adicionado com sucesso', data:novoEntregador});
    }catch(err){
      console.error('Erro ao adicionar entregador',err);
       if (err.code === 'ER_DUP_Entry') {
            return res.status(409).json({error: 'Entregador já cadastrado.'});
        }
      res.status(500).json({error: 'Erro ao adicionar entregador'});
    }
};
export const atualizarEntregador = async(req, res)=>{
   try{
    const {idEntregador} = req.paramts;
    const update = await entregadorService.update(idEntregador, req.body);
    if(!update){
       return  res.status(409).json({error: 'Entregador nâo encontrado' })
    }
    res.status(200).json({mensage: 'Entregador atualizado com sucesso'})
   } catch(err){
    console.err('Erro ao atualizar entregador',err);
    res.status(500).json({error: 'Erro ao atualizar entregador'});
   }
};
export const deleteEntregador =  async(req, res) =>{
    try{
     const{idEntregador} = res.params;
     const deleted = await entregadorService.remove(idEntregador);
     if(!deleted){
        return res.status(400).json({error: ' Entregador não encontrado'});
     }
     res.status(200).json({mensage: 'Entregador deletado com sucesso'});    
    }catch(err){
        console.err('Erro ao deletar entregador',err);
        res.status(500).json({error: 'Erro ao deletar entregador'});
    }
};