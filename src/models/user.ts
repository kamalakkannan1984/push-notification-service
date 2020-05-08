/**
 *
 */
import * as sql from 'mssql';
import * as db from '../db/index';
import { utils } from '../utils/utils';
import { config } from '../config/app';
export const userModel: any = {};

// login
userModel.login = (data: any) => {
  return new Promise(async (resolve, reject) => {
    /*try {
      if (data.username === config.basic_uname && data.password === config.basic_pw) {
        const token = utils.createSession(data.username, data.password);
        resolve({ status: 1, token: token });
      } else {
        resolve({ status: 0, token: '' });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }); */

    try {
      const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
      pool.connect().then(() => {
        const request = new sql.Request(pool);       
        request.input('login_user_name', sql.Text, data.login_user_name);
        request.input('login_password', sql.Text, data.login_password);
        request.input('login_source', sql.Text, data.login_source);
        request.input('login_device_id', sql.Text, data.login_device_id);
        request.input('login_ipaddress', sql.Text, data.login_ipaddress);
        request.execute('ur_ma_login_validation', (err: any, result: any) => {
          // ... error checks
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(result);
          resolve(result.recordsets[0]);
        });
      });
    } catch (err) {
      reject(err);
    }
  };

  /**
   * @param {String} userName - where codition to fetch data
   */
  userModel.getTeamInfo = (company_id: number, team_id: number, extension: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          request.input('company_id', sql.Int, company_id);
          request.input('team_id', sql.Int, team_id);
          request.input('extension', sql.Int, extension);
          //request.output('output_parameter', sql.Int)
          request.execute('ur_app_get_team_info', (err: any, result: any) => {
            // ... error checks
            if (err) console.log(err);
            console.log(result);
            resolve(result);
            console.log(result.recordsets.length); // count of recordsets returned by the procedure
            console.log(result.recordsets[0].length); // count of rows contained in first recordset
            console.log(result.recordset); // first recordset from result.recordsets
            console.log(result.returnValue); // procedure return value
            console.log(result.output); // key/value collection of output values
            console.log(result.rowsAffected); // array of numbers, each number represents the number of rows affected by executed statemens
          });
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
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          // sp name: ur_ma_workcontact_get
          //request.input('login_user_name', sql.Text, 'k.rajesh@vectone.com')
          //request.input('timestamp', sql.Int, 0)
          //sp name: ur_app_get_sip_login
          request.input('company_id', sql.Int, company_id);
          //request.output('sip_login_id', sql.Text)
          //request.output('caller_id', sql.Text)
          request.execute('ur_app_get_sip_login', (err: any, result: any) => {
            // ... error checks
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result.recordsets[0]);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  //saveCreateTeam
  userModel.saveCreateTeam = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          const dataArr = data;
          request.input('company_id', sql.Int, dataArr.company_id);
          request.input('team_id', sql.Int, 0);
          request.input('team_name', sql.Text, dataArr.team_name);
          request.input('team_type', sql.Int, dataArr.team_type);
          request.input('description', sql.Text, dataArr.description);
          request.input('created_by', sql.Int, dataArr.created_by);
          request.input('processtype', sql.Int, 1);
          request.input('except_guest', sql.Int, dataArr.except_guest);
          request.input('post_msg', sql.Int, dataArr.post_msg);
          request.input('mention', sql.Int, dataArr.mention);
          request.input('integration', sql.Int, dataArr.integration);
          request.input('pin_post', sql.Int, dataArr.pin_post);
          request.input('add_members', sql.Text, dataArr.add_members);
          request.input('team_guid', sql.Text, dataArr.team_guid);
          request.input('profile_image_url', sql.Text, dataArr.photo_info);
          request.input('team_id_prefix', sql.Text, dataArr.team_id_prefix);
          //request.input('archived', sql.Text, "")
          //request.input('Delete_image', sql.Text, 'false')
          //request.input('get_image', sql.Text, 'false')
          request.execute('ur_app_create_team_info', (err: any, result: any) => {
            // ... error checks
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result.recordset[0]);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  /*spname: ur_app_get_user_individual_details
  input : @sip_login_id int
  output : login_user_name varchar
        caller_id varchar
  */
  userModel.getUserById = (sip_login_id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          request.input('sip_login_id', sql.Int, sip_login_id);
          request.execute('ur_app_get_user_individual_details', (err: any, result: any) => {
            // ... error checks
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result.recordset);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  //leave team
  userModel.leaveTeam = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          request.input('company_id', sql.Int, data.company_id);
          request.input('extension', sql.Int, data.extension);
          request.input('team', sql.Text, data.team);
          request.execute('ur_app_leave_team', (err: any, result: any) => {
            // ... error checks
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result.recordset);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  //delete team
  userModel.deleteTeam = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');
        pool.connect().then(() => {
          const request = new sql.Request(pool);
          request.input('company_id', sql.Int, data.company_id);
          request.input('team', sql.Text, data.team);
          request.execute('ur_app_delete_team', (err: any, result: any) => {
            // ... error checks
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result.recordset);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };
//module.exports = userModel;
