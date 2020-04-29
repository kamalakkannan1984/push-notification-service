/**
 *
 */
import * as sql from "mssql";
import * as db from '../db/index';
export const userModel: any = {};

/**
 * @param {String} userName - where codition to fetch data
 */
userModel.getTeamInfo = (company_id: number, team_id: number, extension: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');;
      pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.input('company_id', sql.Int, company_id)
        request.input('team_id', sql.Int, team_id)
        request.input('extension', sql.Int, extension)
        //request.output('output_parameter', sql.Int)
        request.execute('ur_app_get_team_info', (err: any, result: any) => {
          // ... error checks
          if (err) console.log(err);
          console.log(result);
          resolve(result);
          console.log(result.recordsets.length) // count of recordsets returned by the procedure
          console.log(result.recordsets[0].length) // count of rows contained in first recordset
          console.log(result.recordset) // first recordset from result.recordsets
          console.log(result.returnValue) // procedure return value
          console.log(result.output) // key/value collection of output values
          console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
        })
      });
    } catch (err) {
      reject(err);
    }
  });
};


/**
 * get company contact
 */
userModel.getCompanyContact = (company_id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');;
      pool.connect().then(() => {
        const request = new sql.Request(pool);
        // sp name: ur_ma_workcontact_get
        //request.input('login_user_name', sql.Text, 'k.rajesh@vectone.com')
        //request.input('timestamp', sql.Int, 0)
        //sp name: ur_app_get_sip_login
        request.input('company_id', sql.Int, company_id)
        //request.output('output_parameter', sql.Int)

        request.execute('ur_app_get_sip_login', (err: any, result: any) => {
          // ... error checks
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result.recordsets[0]);
        })
      });
    } catch (err) {
      reject(err);
    }
  });
};

//module.exports = userModel;
