/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { noteModel } from '../models/note.model';
import MessageService from '../services/message.service';
const noteHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - create note function
 */
noteHandler.createNote = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await noteModel.createNote();
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
 * @description - update note function
 */
noteHandler.updateNote = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await noteModel.updateNote();
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
 * @description - delete note function
 */
noteHandler.deleteNote = async function (req: any, res: any, done: any) {
  try {
    await noteModel.deleteNote();
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const noteHandlers: any = noteHandler;
