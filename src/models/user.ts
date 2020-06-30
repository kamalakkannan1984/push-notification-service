/**
 *
 */
import sql from 'mssql';
import { mssqlPoolConnection } from '../db/index';
import { utils } from '../utils/utils';
import { config } from '../config/app';
export const userModel: any = {};

/**
 * get_device_token_details
 * @param {String} userName - where codition to fetch data
 */
userModel.getDeviceTokenDetails = (product_code: string, device_type: number, device_info: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      mssqlPoolConnection.connect().then(() => {
        const request = new sql.Request(mssqlPoolConnection);
        request.input('product_code', sql.Text, product_code);
        request.input('device_type', sql.Int, device_type);
        request.input('device_info', sql.Text, device_info);
        request.execute('push_notification_get_device_token_details', (err: any, result: any) => {
          // ... error checks
          if (err) {
            console.log(err);
          }
          resolve(result.recordset);
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};

// module.exports = userModel;
