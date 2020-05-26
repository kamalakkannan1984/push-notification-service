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
    const data: any = {};
    data.summary = req.body.summary;
    data.duration = req.body.duration;
    data.repeat_type = req.body.repeat_type;
    data.repeat_time = req.body.repeat_time;
    data.repeat_when = req.body.repeat_when;
    data.section = req.body.section;
    data.msgid = req.body.msgid;
    data.description = req.body.description;
    data.complete_percentage = req.body.complete_percentage;
    data.uid = req.body.uid;
    data.category_color = req.body.category_color;
    data.last_modified = req.body.last_modified;
    data.completed_when = req.body.completed_when;
    data.fmttype = req.body.fmttype;
    data.attendee = req.body.attendee;
    data.dtstart = req.body.dtstart;
    data.dtend = req.body.dtend;
    data.action = req.body.action;
    data.trigger = req.body.trigger;
    data.owner_id = req.body.owner_id;
    data.sip_id = req.body.sip_id;
    data.status = req.body.status;
    data.sender = req.body.sender;
    data.receiver = req.body.receiver;
    data.conv_id = req.body.conv_id;
    data.thread_id = req.body.thread_id;
    data.assignee_completed = req.body.assignee_completed;
    data.due_time = req.body.due_time;
    data.group_id = req.body.group_id;
    data.rrule = req.body.rrule;
    data.location = req.body.location;
    data.company_id = req.body.company_id;
    const chatType = data.group_id ? 'groupchat' : 'chat';
    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    const result = await eventModel.getEventByUid(data.uid, eventCollection);
    if (result === null) {
      await eventModel.createEvent(data, eventCollection);
      const messageService = new MessageService();
      let sendMessageResult;
      const msgdata: any = {};
      const body = JSON.stringify(data);
      if (chatType === 'groupchat') {
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><message-type value="EVENT" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'EVENT';
        msgdata.body = body;
        console.log(msgdata);
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      console.log(sendMessageResult);
      if (sendMessageResult === 0) {
        res.send({ status_code: 200, message: 'Event sent successfully' });
      } else {
        res.send({ status_code: 200, message: 'Event sent failed' });
      }
    } else {
      res.send({ status_code: 200, message: `Event uid: [${data.uid}] Already exists !` });
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
 * @description - update event function
 */
eventHandler.updateEvent = async function (req: any, res: any, done: any) {
  try {
    //
    const uid = req.params.uid;
    const data: any = {};
    data.uid = uid;
    data.summary = req.body.summary;
    data.duration = req.body.duration;
    data.repeat_type = req.body.repeat_type;
    data.repeat_time = req.body.repeat_time;
    data.repeat_when = req.body.repeat_when;
    data.section = req.body.section;
    data.msgid = req.body.msgid;
    data.description = req.body.description;
    data.complete_percentage = req.body.complete_percentage;
    data.category_color = req.body.category_color;
    data.last_modified = req.body.last_modified;
    data.completed_when = req.body.completed_when;
    data.fmttype = req.body.fmttype;
    data.attendee = req.body.attendee;
    data.dtstart = req.body.dtstart;
    data.dtend = req.body.dtend;
    data.action = req.body.action;
    data.trigger = req.body.trigger;
    data.owner_id = req.body.owner_id;
    data.sip_id = req.body.sip_id;
    data.status = req.body.status;
    data.sender = req.body.sender;
    data.receiver = req.body.receiver;
    data.conv_id = req.body.conv_id;
    data.thread_id = req.body.thread_id;
    data.assignee_completed = req.body.assignee_completed;
    data.due_time = req.body.due_time;
    data.group_id = req.body.group_id;
    data.rrule = req.body.rrule;
    data.location = req.body.location;
    data.company_id = req.body.company_id;

    const chatType = data.group_id ? 'groupchat' : 'chat';

    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    const result = await eventModel.getEventByUid(uid, eventCollection);
    if (result !== null) {
      await eventModel.updateEvent(uid, data, eventCollection);
      data.replace_id = result.msgid;
      const body = JSON.stringify(data);
      const messageService = new MessageService();
      let sendMessageResult;
      const msgdata: any = {};
      if (chatType === 'groupchat') {
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><replace id="${result.msgid}" xmlns="urn:xmpp:message-correct:0"/><message-type value="EVENT" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'EVENT';
        msgdata.body = body;
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      console.log(sendMessageResult);
      if (sendMessageResult === 0) {
        res.send({ status_code: 200, message: 'Event sent successfully' });
      } else {
        res.send({ status_code: 200, message: 'Event sent failed' });
      }
    } else {
      res.send({ status_code: 200, message: `uid [${uid}] not found!` });
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
 * @description - delete event function DeleteEventbyUID
 */
eventHandler.deleteEvent = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    const uid = req.body.uid;
    data.owner_id = req.body.owner_id;
    data.sip_id = req.body.sip_id;
    data.group_id = req.body.group_id;
    data.receiver = req.body.receiver;
    data.thread_id = req.body.thread_id;
    data.msgid = req.body.msgid;
    const chatType = data.group_id ? 'groupchat' : 'chat';
    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    const result = await eventModel.getEventByUid(uid, eventCollection);
    if (result !== null) {
      const deleteRes = await eventModel.deleteEvent(uid, eventCollection);
      const messageService = new MessageService();
      let sendMessageResult;
      const msgdata: any = {};
      if (chatType === 'groupchat') {
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>The Message has been deleted</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><replace id="${result.msgid}" xmlns="urn:xmpp:message-correct:0"/><deleted id="${result.msgid}" xmlns="urn:xmpp:message-correct:0"/><message-type value="EVENT" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        const body = JSON.stringify({
          isDeleted: true,
          msg: 'The Message has been deleted',
          uid: uid,
          deletedId: result.msgid
        });
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'EVENT';
        msgdata.body = body;
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      if (deleteRes.deletedCount > 0) {
        res.send({ status_code: 200, message: 'Event deleted successfully' });
      } else {
        res.send({ status_code: 200, message: 'Event delete failed' });
      }
    } else {
      res.send({ status_code: 200, message: `uid [${uid}] not found!` });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

eventHandler.getEvent = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.sender = req.params.sender;
    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    const result = await eventModel.getEvent(data, eventCollection);
    res.send({ status_code: 200, result: result });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const eventHandlers: any = eventHandler;
