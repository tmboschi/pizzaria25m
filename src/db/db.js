import { Connection } from 'mysql2';
import mysql from 'mysql2/promise';
// criação do pool de conexões
const db = mysql. createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// FUNÇÃO DE TEST DE CONEXÃO AUTO-EXECUTÁVEL
(async()=>{
    try {
      const connection = await db.getConnection();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
      connection.release(); // libera a conexão e volta para o pool
    } catch (error) {
      console.error('Erro ao conectar o Banco de Dados:', err)  
    }
})();
// Usando 'export default' para exportar a instância do pool de conexões
export default db;