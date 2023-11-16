const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',       // 数据库主机名
  user: 'root',   // 数据库用户名
  password: '123456', // 数据库密码
  database: 'ar' // 数据库名称
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
   return;
  }
  console.log('Connected to database');
});

function  queryData(callback){ 
  connection.query('SELECT * FROM Relations', (err, rows) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      callback(err, null);
      return;
    }
  
    callback(null, rows);
  });
}

module.exports = {
  connection,
  queryData
}