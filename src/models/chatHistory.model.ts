/**
 * @createdBy Kamal
 * @createdOn 19th June 2020
 */
import { mysqlConnection, mysqlPoolConnection } from '../db/index';
export const chatHistoryModel: any = {};

/**
 * get chat history by username
 */
chatHistoryModel.getLastMessages = (user: string, limit: number, offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get chat history');
      const sql = `SELECT * FROM archive where username="${user}" order by created_at desc LIMIT ${limit} offset ${offset}`;
      mysqlPoolConnection.query(sql, function (error: any, results: any, fields: any) {
        if (error) {
          throw error;
        }
        resolve(results);
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
