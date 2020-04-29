'use strict';

/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user';
import { userModel } from '../models/user';
import { ejabberdService } from '../services/index';
const Client = require('@appunto/ejabberd-api-client');
//https://im01.unifiedring.co.uk :5281
const client = new Client('im01.unifiedring.co.uk', 5443);


const userHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - user signup function
 */
userHandler.getStatus = async function (req: any, res: any, done: any) {
  try {
    await client.status().then((result: any) => {
      res.send({ status_code: 200, message: result });
    }).catch((err: any) => {
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

userHandler.getRegisteredUsers = async function (req: any, res: any, done: any) {
  try {
    const host = req.body.host;
    await client.registeredUsers(host).then((result: any) => {
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getPresence
userHandler.getPresence = async function (req: any, res: any, done: any) {
  try {
    const user = req.body.user;
    const server = req.body.server;
    await client.getPresence(user, server).then((result: any) => {
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getConnectedUsers
userHandler.getConnectedUsers = async function (req: any, res: any, done: any) {
  try {
    await client.connectedUsers().then((result: any) => {
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getConnectedUsersNumber
userHandler.getConnectedUsersNumber = async function (req: any, res: any, done: any) {
  try {
    await client.connectedUsersNumber().then((result: any) => {
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//register
userHandler.register = async function (req: any, res: any, done: any) {
  try {
    const user = req.body.user;
    const host = 'im01.unifiedring.co.uk';
    const password = req.body.password;
    const company_id = req.body.company_id;
    let data = {};
    const registerResult = await ejabberdService.register(user, host, password);
    if (registerResult.status == 'error') {
      res.send({ status_code: 200, message: registerResult.message });
    } else {
      const recordsets = await userModel.getCompanyContact(company_id);
      for (let i = 0; i < recordsets.length; i++) {
        if (recordsets[i].sip_login_id > 0) {
          data = {
            localuser: user,
            localserver: host,
            user: recordsets[i].sip_login_id,
            server: host,
            nick: recordsets[i].caller_id,
            group: 'Work',
            subs: 'both'
          }
          await ejabberdService.add_rosteritem(data);
        }
      }
      res.send({ status_code: 200, message: registerResult });
    }



    /*
     id: 8238,
  mobileno: '',
  ext: 690,
  caller_id: 'PPC Team',
  login_user_name: '690@vectone.com',
  sip_login_id: '2703',
  tmestmp: '1580820972',
  user_status: '',
  email_id: 's.prasanna@vectone.com',
  status_msg: '',
  company_id: 1698,
  direct_no: null,
  ImageURL: null,
  first_name: 'PPC',
  last_name: 'Team',
  company_name: 'Unifiedring',
  is_muted: 0,
  is_blocked: 0,
  is_favourite: 0,
  department: 'PPC ',
  role_name: 'Registered'
    */

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};
//createTeam
/*
      "name": "room1",
      "service": "muc.example.com",
      "host": "example.com"
 
*/
userHandler.createTeam = async function (req: any, res: any, done: any) {
  try {
    const name = req.body.name;
    const service = req.body.service;
    const host = req.body.host;
    console.log(req.body);
    console.log(client);
    //client.createRoom(name, service, host)
    await client.createRoom(name, service, host).then((result: any) => {
      console.log("YES");
      console.log(result);
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log("NO");
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//createTeamWithOpts
userHandler.createTeamWithOpts = async function (req: any, res: any, done: any) {
  try {
    const name = req.body.name;
    const service = req.body.service;
    const host = req.body.host;
    const options = req.body.options;
    console.log(req.body);
    console.log(client);
    //client.createRoomWithOpts(name, service, host, options)
    await client.createRoomWithOpts(name, service, host, options).then((result: any) => {
      console.log("YES");
      console.log(result);
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log("NO");
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//unsubscribeRoom
userHandler.unsubscribeRoom = async function (req: any, res: any, done: any) {
  try {
    const user = req.body.user;
    const room = req.body.room;
    console.log(req.body);
    //client.unsubscribeRoom(user, room)
    await client.unsubscribeRoom(user, room).then((result: any) => {
      console.log("YES");
      console.log(result);
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log("NO");
      console.log(err);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getTeamInfo
/*
{
    "company_id": 1698,
    "team_id": 31,
    "extension": 528
}
*/
userHandler.getTeamInfo = async function (req: any, res: any, done: any) {
  try {
    const company_id = req.body.company_id;
    const team_id = req.body.team_id;
    const extension = req.body.extension;
    console.log(req.body);
    const result = await userModel.getTeamInfo(company_id, team_id, extension);
    console.log(result);
    res.send({ status_code: 200, result: result });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//sendMessage
userHandler.sendMessage = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.type = req.body.type;
    data.from = req.body.from;
    data.to = req.body.to;
    data.subject = req.body.subject;
    data.body = req.body.body
    const sendMessageResult = await ejabberdService.sendMessage(data);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: "Message sent successfully" });
    } else {
      res.send({ status_code: 200, message: "Message sent failed" });
    }

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
}
module.exports = userHandler;
