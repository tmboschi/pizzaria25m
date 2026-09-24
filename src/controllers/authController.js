//src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteService from '../services/clienteService.js';
export const login = async (req, res)=>{
    const {cpf, senha} =req.body;
    try{
        // verificar se o usuário existe no banco de dados
        const clientes = await clienteService.findAll(cpf);
        const cliente = clientes[0];
        if (!cliente){
            return res.status(401).json({message: 'Credenciais inválidas'});
        }
//2. Comparar a senha enviada com o hash salvo no banco
const senhaValida = await bcrypt.compare(senha, cliente.senha);
if (!senhaValida){
    return res.status(401).json({message: 'Credenciais inválidas'});
}
//3. Gerar token JWT
//O 'playload' são as infomações que queremos guardar no token
const playload = {cpf: cliente.cpf, email: cliente.email};
// O token é assinado como a nossa chave secreta no .env
const token = jwt.sign(playload, process.env.JWT_SECRET,{expiresIn:'1h'});//Token expira em 1 hora
//4. Enviar token para o cliente
res.json({message: "Login bem-sucedido!", token: token});
 }catch(error){
    console.error(error);
    res.status(500).json({message: "Erro interno no servidor"});
 }
};

