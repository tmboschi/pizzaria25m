//src/services/pedidoService.js
import db from '..//db/db.js';
import bcrypt from 'bcrypt';

export const findAll= async (idPedido, cpf,statusPedido)=>{
//1. Define a consulta SQL base
let sql = 'Select * FROM pedido';
//2. Cria um array para a condição where
const conditions = [];
//3. Cria um array para os valores (para prevenir SQL Injection)
const values = [];
//4. Adicionar as condições dinamicamente
//Adicionamos o filtro de pedido
if (idPedido) {
    conditions.push('idPedido = ?');
    values.push(idPedido);
}
//Adicionamos o filtro de cpf
if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
}
//Adicionamos o filtro de status
if(statusPedido){
    conditions.push('status = ?');
    values.push(statusPedido);
}


//5. Se houver condições, anexa elas às consulta SQL
if (conditions.length>0) {
    sql+= ' WHERE ' + conditions.join(' AND ');
}
//6. Executa a consulta final
const [rows] = await db.query(sql,values);
return rows;
};

export const create = async (pedidoData)=>{
   
   
    const newPedido ={
        ...pedidoData,
        
    };
    await db.query('INSERT INTO pedido SET ?', newPedido);

   
    return newPedido;
};



export const remove = async(idPedido)=>{
    const[result] = await db.query('DELETE FROM pedido WHERE idPedido=?', [idPedido]);
    return result.affectedRows > 0;
};
// controle que vai gerenciar o 
export const listarPedido = async (req, res) =>{
    try{
        // Capturamos os parâmetros ede consulta da URL 
        //ex. ?cpf=01234567890 / ?nome=sandro/?email=sandro@senac.br
        const{idPedido, cpf, statusPedido} = req.query;
        //Passamos todos os filtros para o serviço
        const pedido = await pedidoService. findAll(idPedido,cpf,statusPedido);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(pedido);
    } catch (err){
        console.error('Erro ao buscar idPedido', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};