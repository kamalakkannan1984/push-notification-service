import sql from 'mssql';

export const mssqlPoolConnection = new sql.ConnectionPool('mssql://nohuman:nohumansql@10.22.2.86/apnsprovidervectone');
