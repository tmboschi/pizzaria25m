import db from '../db/db.js';
import bcrypt from 'bcrypt';
//import { create } from "./produtoService";

export const findAll = async (idEntregador, nomeEntregador, telefone) =>{
  let sql ='Select * FROM entregador';
  const conditions = [];

  const values = []

  if(idEntregador){
    conditions.push('idEntregador = ?');
    values.push(idEntregador);
  }
  if(nomeEntregador){
    conditions.push('nomeEntregador = ?');
    values.push(nomeEntregador);
  }
  if(telefone){
    conditions.push('telefone = ?')
    values.push(telefone);
  }

  if(conditions.length>0){
    sql += ' WHERE ' + conditions.join(' AND ');
  };
    const[rows] = await db.query(sql,values);
    return rows; 
};
export const create = async (entregadorData)=>{
    const newEntregador={
        ...entregadorData,
    };
    await db.query('INSERT INTO entregador SET ?', newEntregador);
    return newEntregador;
};
export const remove = async(idEntregador)=>{
    const[result] = await db.query('DELETE FROM entregador WHERE idEntregador= ?',[idEntregador]);
    return result.affectedRows >0;
};
export const listaEntregador = async(req,res)=>{
    try{
     const {idEntregador,nomeEntregador,telefone} = req.query;
     const entregador = await entregadorService.findAll(idEntregador,nomeEntregador,telefone);
     res.join(entregador);
    } catch(err){
       console.error('Erro ao buscar idEntregador', err);
       res.status(500).json({error: 'Erro interno do Servidor'});
    };
};