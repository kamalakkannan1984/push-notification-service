/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { tasksModel } from '../models/tasks.model';
import MessageService from '../services/message.service';
const tasksHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - create tasks function
 */
tasksHandler.createTasks = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await tasksModel.createTasks();
    const messageService = new MessageService();
    await messageService.sendStanza(stanzaData);
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - update tasks function
 */
tasksHandler.updateTasks = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await tasksModel.updateTasks();
    const messageService = new MessageService();
    await messageService.sendStanza(stanzaData);
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - delete tasks function
 */
tasksHandler.deleteTasks = async function (req: any, res: any, done: any) {
  try {
    await tasksModel.deleteTasks();
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const tasksHandlers: any = tasksHandler;
