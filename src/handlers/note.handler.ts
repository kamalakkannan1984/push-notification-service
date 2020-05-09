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
    const data: any = {};
    data.description = req.body.description;
    data.summary = req.body.summary;
    data.uid = req.body.uid;
    data.dtStart = req.body.dtStart;
    data.sender = req.body.sender;
    data.msgId = req.body.msgId;
    data.receiver = req.body.receiver;
    data.groupId = req.body.groupId;
    data.owner_id = req.body.owner_id;
    data.company_id = req.body.company_id;
    const chatType = data.GROUPID ? 'groupchat' : 'chat';
    const stanzaData: any = {};
    stanzaData.from = data.owner_id;
    stanzaData.to = data.receiver;
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    await noteModel.createNote(data, noteCollection);
    const body = JSON.stringify(data);
    stanzaData.stanza = `<message type='${chatType}' id='${data.msgId}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgId}' xmlns="urn:xmpp:sid:0"/><message-type value="NOTE" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.msgId}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(stanzaData);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Note sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Note sent failed' });
    }
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
    //
    const uid = req.params.uid;
    const data: any = {};
    data.description = req.body.description;
    data.summary = req.body.summary;
    data.uid = req.body.uid;
    data.dtStart = req.body.dtStart;
    data.sender = req.body.sender;
    data.msgId = req.body.msgId;
    data.receiver = req.body.receiver;
    data.groupId = req.body.groupId;
    data.owner_id = req.body.owner_id;
    data.company_id = req.body.company_id;
    const chatType = data.GROUPID ? 'groupchat' : 'chat';
    const stanzaData: any = {};
    stanzaData.from = data.OWNERID;
    stanzaData.to = data.RECEIVER;
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    const result = await noteModel.getNote(data, noteCollection);
    await noteModel.updateNote(uid, data, noteCollection);
    const body = JSON.stringify(data);
    stanzaData.stanza = `<message type='${chatType}' id='${data.msgId}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgId}' xmlns="urn:xmpp:sid:0"/><replace id="${result.msgId}" xmlns="urn:xmpp:message-correct:0"/><message-type value="NOTE" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.msgId}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(stanzaData);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Note sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Note sent failed' });
    }
    //
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
    const data: any = {};
    data.UID = req.params.uid;
    //
    data.uid = req.body.uid;
    data.owner_id = req.body.owner_id;
    data.sender = req.body.sender;
    data.group_id = req.body.group_id;
    data.receiver = req.body.receiver;
    data.msgId = req.body.msgId;
    const stanzaData: any = {};
    stanzaData.from = data.owner_id;
    stanzaData.to = data.receiver;
    const chatType = data.group_id ? 'groupchat' : 'chat';
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    const result = await noteModel.getNote(data, noteCollection);
    stanzaData.stanza = `<message type='${chatType}' id='${data.msgId}' from='${data.owner_id}' to='${data.receiver}'><bodyThe Message has been deleted</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgId}' xmlns="urn:xmpp:sid:0"/><replace id="${result.msgId}" xmlns="urn:xmpp:message-correct:0"/><deleted id="${result.msgId}" xmlns="urn:xmpp:message-correct:0"/><message-type value="NOTE" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;

    const deleteRes = await noteModel.deleteNote(data, noteCollection);
    if (deleteRes.deletedCount > 0) {
      res.send({ status_code: 200, message: 'Note deleted successfully' });
    } else {
      res.send({ status_code: 200, message: 'Note delete failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

//getNote
noteHandler.getNote = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.sender = req.params.sender;
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    const result = await noteModel.getNote(data, noteCollection);
    res.send({ status_code: 200, result: result });
    /*if (deleteRes.deletedCount > 0) {
      res.send({ status_code: 200, message: 'Note deleted successfully' });
    } else {
      res.send({ status_code: 200, message: 'Note delete failed' });
    }*/
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};
export const noteHandlers: any = noteHandler;
