import sql from 'mssql';
import mysql from 'mysql';

const sqlConfig = {
  user: 'smepbx',
  password: 'smeswitch',
  server: '10.22.2.86',
  database: 'unifiedring',
};

export const mysqlConnection = mysql.createConnection({
  host: '82.113.74.51',
  user: 'ejabberd',
  password: 'Vicarage@2019',
  database: 'ejabberd',
});

mysqlConnection.connect();

//
export const mysqlPoolConnection = mysql.createPool({
  connectionLimit: 10,
  host: '82.113.74.51',
  user: 'ejabberd',
  password: 'Vicarage@2019',
  database: 'ejabberd',
});
//

export const mssqlPoolConnection = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
