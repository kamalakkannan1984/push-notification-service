/**
 * @createdBy Kamal
 * @createdOn 19th June 2020
 */
import { mysqlConnection } from '../db/index';
export const chatHistoryModel: any = {};

/**
 * get call history by caller id
 */
chatHistoryModel.getLastMessages = (user: string, limit: number, offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get chat history');
      const sql = `SELECT * FROM archive where username="${user}" order by created_at desc LIMIT ${limit} offset ${offset}`;
      mysqlConnection.query(sql, function (error: any, results: any, fields: any) {
        if (error) {
          throw error;
        }
        resolve(results);
      });

      mysqlConnection.end();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
