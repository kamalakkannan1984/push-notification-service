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
    const data: any = {};
    data.summary = req.body.summary;
    data.duration = req.body.duration;
    /*data.REPEATTYPE = req.body.repeat_type;
    data.REPEATTIME = req.body.repeat_time;
    data.REPEATWHEN = req.body.repeat_when; */
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
    const stanzaData: any = {};
    stanzaData.from = data.ownerid;
    stanzaData.to = data.receiver;
    const chatType = data.group_id ? 'groupchat' : 'chat';

    const body = JSON.stringify(data);
    stanzaData.stanza = `<message type='${chatType}' id='${data.thread_id}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.thread_id}' xmlns="urn:xmpp:sid:0"/><message-type value="EVENT" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;

    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    await tasksModel.createTasks(data, tasksCollection);
    console.log(stanzaData);
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(stanzaData);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Tasks sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Tasks sent failed' });
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
 * @description - update tasks function
 */
tasksHandler.updateTasks = async function (req: any, res: any, done: any) {
  try {
    //
    const uid = req.params.uid;
    const data: any = {};
    data.summary = req.body.summary;
    data.duration = req.body.duration;
    /*data.REPEATTYPE = req.body.repeat_type;
    data.REPEATTIME = req.body.repeat_time;
    data.REPEATWHEN = req.body.repeat_when; */
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
    const stanzaData: any = {};
    stanzaData.from = data.ownerid;
    stanzaData.to = data.receiver;
    const chatType = data.group_id ? 'groupchat' : 'chat';

    // stanzaData.stanza = `<message type='${chatType}' id='${data.MSGID}' from='${data.OWNERID}' to='${data.RECEIVER}'><body>${data.DESCRIPTION}</body><markable xmlns='urn:xmpp:chat-markers:0'/><origin-id id='${data.MSGID}' xmlns='urn:xmpp:sid:0'/><message-type value='TEXT' xmlns='urn:xmpp:message-correct:0'/><thread parent=''>${data.THREAD_ID}</thread><active xmlns='http://jabber.org/protocol/chatstates'/></message>`;
    const body = JSON.stringify(data);
    stanzaData.stanza = `<message type='${chatType}' id='${data.thread_id}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.thread_id}' xmlns="urn:xmpp:sid:0"/><message-type value="EVENT" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;

    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    await tasksModel.updateTasks(uid, data, tasksCollection);
    console.log(stanzaData);
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(stanzaData);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Tasks sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Tasks sent failed' });
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
 * @description - delete tasks function
 */
tasksHandler.deleteTasks = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.uid = req.params.uid;
    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    const deleteRes = await tasksModel.deleteTasks(data, tasksCollection);
    if (deleteRes.deletedCount > 0) {
      res.send({ status_code: 200, message: 'Task deleted successfully' });
    } else {
      res.send({ status_code: 200, message: 'Task delete failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// getTasks
tasksHandler.getTasks = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.sip_id = req.params.sip_id;
    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    const getTasks = await tasksModel.getTasks(data, tasksCollection);
    console.log(getTasks);
    res.send({ status_code: 200, result: getTasks });
    /*if (deleteRes.deletedCount > 0) {
      res.send({ status_code: 200, message: 'Task deleted successfully' });
    } else {
      res.send({ status_code: 200, message: 'Task delete failed' });
    }*/
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const tasksHandlers: any = tasksHandler;
