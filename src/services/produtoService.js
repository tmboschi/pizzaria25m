//src/services/pedidoService.js
import db from '..//db/db.js';
import bcrypt from 'bcrypt';

export const findAll= async (idProduto, nomeProduto,tipo)=>{
//1. Define a consulta SQL base
let sql = 'Select * FROM produto';
//2. Cria um array para a condição where
const conditions = [];
//3. Cria um array para os valores (para prevenir SQL Injection)
const values = [];
//4. Adicionar as condições dinamicamente
//Adicionamos o filtro de produto
if (idProduto) {
    conditions.push('idProduto = ?');
    values.push(idProduto);
}
//Adicionamos o filtro de nomeProduto
if(nomeProduto){
    conditions.push('LOWER(nomeProduto) LIKE ?');
    values.push(`%${nomeProduto.toLowerCase()}%`);
}
//Adicionamos o filtro de tipo
if (tipo) {
    conditions.push('tipo = ?');
    values.push(tipo);
}
//5. Se houver condições, anexa elas às consulta SQL
if (conditions.length>0) {
    sql+= ' WHERE ' + conditions.join(' AND ');
}
//6. Executa a consulta final
const [rows] = await db.query(sql,values);
return rows;
};

export const create = async (produtoData)=>{
   
   
    const newProduto ={
        ...produtoData,
        
    };
    await db.query('INSERT INTO produto SET ?', newProduto);

   
    return newProduto;
};



export const remove = async(idProduto)=>{
    const[result] = await db.query('DELETE FROM produto WHERE idProduto=?', [idProduto]);
    return result.affectedRows > 0;
};
// controle que vai gerenciar o 
export const listarProduto = async (req, res) =>{
    try{
        // Capturamos os parâmetros ede consulta da URL 
        //ex. ?cpf=01234567890 / ?nome=sandro/?email=sandro@senac.br
        const{idProduto, nomeProduto, tipo} = req.query;
        //Passamos todos os filtros para o serviço
        const produto = await produtoService. findAll(idProduto,nomeProduto,tipo);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(produto);
    } catch (err){
        console.error('Erro ao buscar idProduto', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};