
//var sql = require("mssql");
import * as sql from "mssql";
var sqlConfig = {
    user: 'smepbx',
    password: 'smeswitch',
    server: '10.22.2.86',
    database: 'unifiedring'
};
export const connectToSqlServer = async () => {
    try {
        return new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        //return pool;
        /*return pool.connect().then(() => {
            console.log("connected to the APP");
        });*/

    } catch (err) {
        console.error(err)
    }
};

/*export const connectToSqlServer = async () => {
    try {
        console.log("DATABASE CONNECTION");
        // make sure that any items are correctly URL encoded in the connection string
        const pool = await new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring')
        const request = new sql.Request(pool);
        /*
        {
        company_id:1698,
        team_id:201,
        extension:'528'
        }
        */

/*request.input('company_id', sql.Int, 1698)
request.input('team_id', sql.Int, 201)
request.input('extension', sql.Int, '528')
//request.output('output_parameter', sql.Int)
request.execute('ur_app_get_team_info', (err: any, result: any) => {
    // ... error checks
    if (err) console.log(err);
    console.log(result);
    console.log(result.recordsets.length) // count of recordsets returned by the procedure
    console.log(result.recordsets[0].length) // count of rows contained in first recordset
    console.log(result.recordset) // first recordset from result.recordsets
    console.log(result.returnValue) // procedure return value
    console.log(result.output) // key/value collection of output values
    console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens

    // ...
})
} catch (err) {
console.log(err);
}
} */


