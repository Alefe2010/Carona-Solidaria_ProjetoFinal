import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "caronaSolidaria",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

pool.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

export default pool;
