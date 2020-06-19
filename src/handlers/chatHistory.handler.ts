/**
 * @createdBy Kamal
 * @createdOn 19th June 2020
 */

import { chatHistoryModel } from '../models/chatHistory.model';
import { uuid } from 'uuidv4';

const chatHistoryHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - save  call history function
 */
chatHistoryHandler.getLastMessages = async function (req: any, res: any, done: any) {
  try {
    const user = req.authorization.sipLoginId;
    const limit = req.body.limit;
    const offset = req.body.offset;
    console.log(user);
    if (user !== undefined) {
      const result = await chatHistoryModel.getLastMessages(user, limit, offset);
      if (result) {
        res.send({ status_code: 200, result: result });
      } else {
        res.send({ status_code: 200, message: 'Not found!' });
      }
    } else {
      res.send({ status_code: 200, message: 'User not found!' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const chatHistoryHandlers: any = chatHistoryHandler;
