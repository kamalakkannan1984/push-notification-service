/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { eventModel } from '../models/event.model';
import MessageService from '../services/message.service';
const eventHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - create event function
 */
eventHandler.createEvent = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await eventModel.createEvent();
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
 * @description - update event function
 */
eventHandler.updateEvent = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await eventModel.updateEvent();
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
 * @description - delete event function
 */
eventHandler.deleteEvent = async function (req: any, res: any, done: any) {
  try {
    await eventModel.deleteEvent();
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const eventHandlers: any = eventHandler;
