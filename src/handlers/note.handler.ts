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
    data.DESCRIPTION = req.body.description;
    data.SUMMARY = req.body.summary;
    data.UID = req.body.uId;
    data.DTSTART = req.body.dtStart;
    data.SENDER = req.body.sender;
    data.MSGID = req.body.msgId;
    data.RECEIVER = req.body.receiver;
    data.GROUPID = req.body.groupId;
    data.OWNERID = req.body.ownerId;
    const chatType = data.GROUPID ? 'groupchat' : 'chat';
    const stanzaData: any = {};
    stanzaData.from = data.OWNERID;
    stanzaData.to = data.RECEIVER;
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    await noteModel.createNote(data, noteCollection);
    data.THREAD_ID = '';
    stanzaData.stanza = `<message type='${chatType}' id='${data.MSGID}' from='${data.OWNERID}' to='${data.RECEIVER}'><body>${data.DESCRIPTION}</body><markable xmlns='urn:xmpp:chat-markers:0'/><origin-id id='${data.MSGID}' xmlns='urn:xmpp:sid:0'/><message-type value='TEXT' xmlns='urn:xmpp:message-correct:0'/><thread parent=''>${data.THREAD_ID}</thread><active xmlns='http://jabber.org/protocol/chatstates'/></message>`;
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
    data.DESCRIPTION = req.body.description;
    data.SUMMARY = req.body.summary;
    data.DTSTART = req.body.dtStart;
    data.SENDER = req.body.sender;
    data.MSGID = req.body.msgId;
    data.RECEIVER = req.body.receiver;
    data.GROUPID = req.body.groupId;
    data.OWNERID = req.body.ownerId;
    const chatType = data.GROUPID ? 'groupchat' : 'chat';
    const stanzaData: any = {};
    stanzaData.from = data.OWNERID;
    stanzaData.to = data.RECEIVER;
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
    await noteModel.updateNote(uid, data, noteCollection);
    data.THREAD_ID = '';
    stanzaData.stanza = `<message type='${chatType}' id='${data.MSGID}' from='${data.OWNERID}' to='${data.RECEIVER}'><body>${data.DESCRIPTION}</body><markable xmlns='urn:xmpp:chat-markers:0'/><origin-id id='${data.MSGID}' xmlns='urn:xmpp:sid:0'/><message-type value='TEXT' xmlns='urn:xmpp:message-correct:0'/><thread parent=''>${data.THREAD_ID}</thread><active xmlns='http://jabber.org/protocol/chatstates'/></message>`;
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
    const noteCollection = await this.mongo.MONGO1.db.collection('Note');
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

export const noteHandlers: any = noteHandler;
