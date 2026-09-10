//src/services/clienteService.js
import db from '..//db/db.js';
import bcrypt from 'bcrypt';

export const findAll= async (cpf, nome,email)=>{
//1. Define a consulta SQL base
let sql = 'Select * FROM usuario';
//2. Cria um array para a condição where
const conditions = [];
//3. Cria um array para os valores (para prevenir SQL Injection)
const values = [];
//4. Adicionar as condições dinamicamente
//Adicionamos o filtro de CPF
if(cpf){
    conditions.push('cpf = ?');
    values.push(cpf);
}
//Adicionamos o filtro de nome
if (nome) {
    conditions.push('LOWER(nome) LIKE ?');
    values.push(`%${nome.toLowerCase()}%`);
}
//Adicionamos o filtro de email
if (email) {
    conditions.push('email = ?');
    values.push(email);
}
//5. Se houver condições, anexa elas às consulta SQL
if (conditions.length>0) {
    sql+= 'WHERE' + conditions.join('AND');
}
//6. Executa a consulta final
const [rows] = await db.query(sql,values);
return rows;
};

export const create = async (clienteData)=>{
    const saltRounds = 10;
    const hashePassword = await bcrypt.hash(clienteData.senha, saltRounds);
    const newCliente ={
        ...clienteData,
        senha: hashePassword,
    };
    await db.query('INSERT INTO usuario SET ?', newCliente);

    delete newCliente.senha;
    return newCliente;
};

export const update = async (cpf, clienteData)=>{
    if (clienteData.senha) {
      const saltRounds = 10;
      clienteData.senha = await bcrypt.hash(clienteData.senha, saltRounds);
    }
    const[result] = await db.query('UPDATE usuario SET? WHERE cpf = ?', [clienteData, cpf]);
    return result.affectedRows >0;
};

export const remove = async(cpf)=>{
    const[result] = await db.query('DELETE FROM usuario WHERE cpf=?', [cpf]);
    return result.affectedRows > 0;
};
// controle que vai gerenciar o 
export const listarClientes = async (req, res) =>{
    try{
        // Capturamos os parâmetros ede consulta da URL 
        //ex. ?cpf=01234567890 / ?nome=sandro/?email=sandro@senac.br
        const{cpf, nome, email} = req.query;
        //Passamos todos os filtros para o serviço
        const clientes = await clienteService. findAll(cpf,nome,email);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(clientes);
    } catch (err){
        console.error('Erroao buscar cliente', err);
        res.status(500).json({error: 'Erro internodo servidor'});
    }
};
