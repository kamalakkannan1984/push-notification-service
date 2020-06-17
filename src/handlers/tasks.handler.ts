/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { tasksModel } from '../models/tasks.model';
import MessageService from '../services/message.service';
import { userModel } from '../models/user';
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
    data.uid = req.body.uid;
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
    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    const getTasks = await tasksModel.getTaskByUid(data.uid, tasksCollection);
    if (getTasks === null) {
      const messageService = new MessageService();
      const body = JSON.stringify(data);
      const msgdata: any = {};
      let sendMessageResult;
      if (chatType === 'groupchat') {
        //save group members
        const team = data.group_id.match(/\d+/g);
        const getTeamResult = await userModel.getTeamInfo(data.company_id, team[0], data.sip_id);
        const teamMember = getTeamResult[0].team_members;
        const teamMembers = teamMember.split(',');
        for (let i = 0; i < teamMembers.length; i++) {
          data.sip_id = teamMembers[i].trim();
          data.roleType = 'member';
          delete data._id;
          await tasksModel.createTasks(data, tasksCollection);
        }
        //save group members

        //attendee functionality
        const attendeeMembers = data.attendee.split(',');
        console.log(attendeeMembers);
        let attendeeMember;
        let attendeeSipId;
        for (let i = 0; i < attendeeMembers.length; i++) {
          attendeeMember = attendeeMembers[i].trim();
          console.log(attendeeMember);
          attendeeSipId = attendeeMember.split('@');
          data.sip_id = attendeeSipId[0];
          data.roleType = 'attendee';
          delete data._id;
          await tasksModel.createTasks(data, tasksCollection);
          msgdata.type = 'chat';
          msgdata.from = data.owner_id;
          msgdata.to = attendeeMember;
          msgdata.subject = 'TASKS';
          msgdata.body = body;
          sendMessageResult = await messageService.sendMessage(msgdata);
        }
        //attendee functionality
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><message-type value="TASKS" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        console.log(stanzaData);
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        data.roleType = 'member';
        await tasksModel.createTasks(data, tasksCollection);
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'TASKS';
        msgdata.body = body;
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      console.log(sendMessageResult);
      if (sendMessageResult === 0) {
        res.send({ status_code: 200, message: 'Task sent successfully' });
      } else {
        res.send({ status_code: 200, message: 'Task sent failed' });
      }
    } else {
      res.send({ status_code: 200, message: `Task uid: [${data.uid}] Already exist!` });
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
    data.uid = uid;
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
    //data.sip_id = req.body.sip_id;
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
    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    const getTasks = await tasksModel.getTaskByUid(uid, tasksCollection);
    if (getTasks !== null) {
      await tasksModel.updateTasks(uid, data, tasksCollection);
      const messageService = new MessageService();
      data.replace_id = getTasks.msgid;
      const body = JSON.stringify(data);
      let sendMessageResult;
      const msgdata: any = {};
      if (chatType === 'groupchat') {
        // attendee functionality
        const attendeeMembers = data.attendee.split(',');
        let attendeeMember;
        for (let i = 0; i < attendeeMembers.length; i++) {
          attendeeMember = attendeeMembers[i].trim();
          msgdata.type = 'chat';
          msgdata.from = data.owner_id;
          msgdata.to = attendeeMember;
          msgdata.subject = 'TASKS';
          msgdata.body = body;
          sendMessageResult = await messageService.sendMessage(msgdata);
        }
        //attendee functionality
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>${body}</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><replace id="${getTasks.msgid}" xmlns="urn:xmpp:message-correct:0"/><message-type value="TASKS" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        console.log(stanzaData);
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'TASKS';
        msgdata.body = body;
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      console.log(sendMessageResult);
      if (sendMessageResult === 0) {
        res.send({ status_code: 200, message: 'Task sent successfully' });
      } else {
        res.send({ status_code: 200, message: 'Task sent failed' });
      }
    } else {
      res.send({ status_code: 200, message: `Task uid: [${uid}] not found` });
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
    //
    const uid = req.body.uid;
    data.owner_id = req.body.owner_id;
    data.sip_id = req.body.sip_id;
    data.group_id = req.body.group_id;
    data.receiver = req.body.receiver;
    data.thread_id = req.body.thread_id;
    data.msgid = req.body.msgid;
    const chatType = data.group_id ? 'groupchat' : 'chat';
    const tasksCollection = await this.mongo.MONGO1.db.collection('Task');
    const getTasks = await tasksModel.getTaskByUid(uid, tasksCollection);
    if (getTasks !== null) {
      const msgdata: any = {};
      let sendMessageResult;
      const messageService = new MessageService();
      if (chatType === 'groupchat') {
        const stanzaData: any = {};
        stanzaData.from = data.owner_id;
        stanzaData.to = data.receiver;
        stanzaData.stanza = `<message type='${chatType}' id='${data.msgid}' from='${data.owner_id}' to='${data.receiver}'><body>The Message has been deleted</body><markable xmlns="urn:xmpp:chat-markers:0"/><origin-id id='${data.msgid}' xmlns="urn:xmpp:sid:0"/><replace id="${getTasks.msgid}" xmlns="urn:xmpp:message-correct:0"/><deleted id="${getTasks.msgid}" xmlns="urn:xmpp:message-correct:0"/><message-type value="TASKS" xmlns="urn:xmpp:message-correct:0"/><thread parent="">${data.thread_id}</thread><active xmlns="http://jabber.org/protocol/chatstates"/></message>`;
        sendMessageResult = await messageService.sendStanza(stanzaData);
      } else {
        const body = JSON.stringify({
          isDeleted: true,
          msg: 'The Message has been deleted',
          uid: uid,
          deletedId: getTasks.msgid,
        });
        msgdata.type = chatType;
        msgdata.from = data.owner_id;
        msgdata.to = data.receiver;
        msgdata.subject = 'TASKS';
        msgdata.body = body;
        sendMessageResult = await messageService.sendMessage(msgdata);
      }
      const deleteRes = await tasksModel.deleteTasks(uid, tasksCollection);
      if (deleteRes.deletedCount > 0) {
        res.send({ status_code: 200, message: 'Task deleted successfully' });
      } else {
        res.send({ status_code: 200, message: 'Task delete failed' });
      }
    } else {
      res.send({ status_code: 200, message: `Task uid: [${uid}] not found` });
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
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const tasksHandlers: any = tasksHandler;
