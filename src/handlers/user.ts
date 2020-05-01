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
    const user = req.body.userid;
    const host = 'im01.unifiedring.co.uk';
    const password = req.body.password;
    const company_id = req.body.company_id;
    let data = {};
    const registerResult = await ejabberdService.register(user, host, password);
    if (registerResult.status == 'error') {
      res.send({ status_code: 200, message: registerResult.message });
    } else {
      const recordsets = await userModel.getCompanyContact(company_id);
      //console.log(recordsets);
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
    let data: any = {};
    data.company_id = req.body.company_id;
    data.team_name = req.body.team_name;
    data.team_type = req.body.team_type;
    data.description = req.body.description;
    data.created_by = req.body.created_by;
    data.processtype = 1;
    data.except_guest = req.body.except_guest;
    data.post_msg = req.body.post_msg;
    data.mention = req.body.mention;
    data.integration = req.body.integration;
    data.pin_post = req.body.pin_post;
    data.add_members = req.body.add_members;
    data.team_guid = req.body.team_guid;
    data.photo_info = req.body.photo_info;
    const recordsets = await userModel.saveCreateTeam(data);
    console.log(recordsets);
    if (recordsets.errcode === 0) {
      let teamData: any = {};
      teamData.name = 'con' + recordsets.team_id;
      teamData.service = "conference.im01.unifiedring.co.uk";
      teamData.host = "im01.unifiedring.co.uk";
      teamData.options = [
        {
          "name": "members_only",
          "value": "true"
        },
        {
          "name": "title",
          "value": data.team_name
        },
        {
          "name": "description",
          "value": data.description
        },
        {
          "name": "allow_change_subj",
          "value": "false"
        },
        {
          "name": "public",
          "value": "false"
        },
        {
          "name": "persistent",
          "value": "true"
        },
        {
          "name": "anonymous",
          "value": "false"
        }
      ];
      const createTeamResult = await ejabberdService.createTeamWithOpts(teamData);
      if (createTeamResult == 0) {
        let members = data.add_members;
        let memberArr = members.split(",");
        let userIdArr = [];
        for (let i = 0; i < memberArr.length; i++) {
          teamData.jid = memberArr[i] + "@im01.unifiedring.co.uk";
          teamData.affiliation = "member";
          await ejabberdService.setRoomAffiliation(teamData);
          userIdArr.push(teamData.jid);
        }
        teamData.jid = data.created_by + "@im01.unifiedring.co.uk";
        userIdArr.push(teamData.jid);
        teamData.affiliation = "owner";
        await ejabberdService.setRoomAffiliation(teamData);
        teamData.password = "";
        teamData.reason = data.team_name;
        teamData.users = userIdArr.join(':');
        await ejabberdService.sendDirectInvitation(teamData);
        res.send({ status_code: 200, team_id: teamData.name, message: recordsets.errmsg });
      } else {
        res.send({ status_code: 200, message: "Team create failed" });
      }
    } else {
      //failed case
      res.send({ status_code: 404, message: recordsets.errmsg });
    }
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
    let data: any = {};
    data.name = req.body.name;
    data.service = req.body.service;
    data.host = req.body.host;
    data.options = req.body.options;

    const sendMessageResult = await ejabberdService.createTeamWithOpts(data);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: "Team created successfully" });
    } else {
      res.send({ status_code: 200, message: "Team create failed" });
    }
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//unsubscribeRoom
userHandler.unsubscribeRoom = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.user = req.body.user;
    data.room = req.body.room;
    const unsubscribeRoomResult = await ejabberdService.unsubscribeRoom(data);
    console.log(unsubscribeRoomResult);
    if (unsubscribeRoomResult === 0) {
      res.send({ status_code: 200, message: "User unsubscribed successfully" });
    } else {
      res.send({ status_code: 200, message: "Unsubscribe failed" });
    }

  } catch (err) {
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
    data.body = req.body.body;
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
/*
"from": "admin@localhost",
      "to": "user1@localhost",
      "stanza": "<message><ext attr='value'/></message>"
*/
//sendStanza
userHandler.sendStanza = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.from = req.body.from;
    data.to = req.body.to;
    data.stanza = req.body.stanza;
    const sendMessageResult = await ejabberdService.sendStanza(data);
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

//destroyRoom
userHandler.destroyRoom = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.name = req.body.name;
    data.service = req.body.service;
    const destroyRoomResult = await ejabberdService.destroyRoom(data);
    console.log(destroyRoomResult);
    if (destroyRoomResult === 0) {
      res.send({ status_code: 200, message: "Room deleted successfully" });
    } else {
      res.send({ status_code: 200, message: "Room delete failed" });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
}

//subscribeRoom
userHandler.subscribeRoom = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.user = req.body.user;
    data.nick = req.body.nick;
    data.room = req.body.room;
    data.nodes = req.body.nodes;
    const subscribeRoomResult = await ejabberdService.subscribeRoom(data);
    console.log(subscribeRoomResult);
    res.send({ status_code: 200, result: subscribeRoomResult });

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getRoomAffiliations
userHandler.getRoomAffiliations = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.name = req.body.name;
    data.service = req.body.service;
    const getRoomAffiliationsResult = await ejabberdService.getRoomAffiliations(data);
    console.log(getRoomAffiliationsResult);
    res.send({ status_code: 200, result: getRoomAffiliationsResult });

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//setRoomAffiliation || leaveTeam
userHandler.leaveTeam = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.name = req.body.name;
    data.service = req.body.service;
    data.jid = req.body.jid;
    data.affiliation = "none";
    const setRoomAffiliationsResult = await ejabberdService.setRoomAffiliation(data);
    console.log(setRoomAffiliationsResult);
    if (setRoomAffiliationsResult === 0) {
      res.send({ status_code: 200, message: "success" });
    } else {
      res.send({ status_code: 200, message: "failed" });
    }

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//getRoomOptions
userHandler.getRoomOptions = async function (req: any, res: any, done: any) {
  try {
    let data: any = {};
    data.name = req.body.name;
    data.service = req.body.service;
    const getRoomOptionsResult = await ejabberdService.getRoomOptions(data);
    console.log(getRoomOptionsResult);
    res.send({ status_code: 200, result: getRoomOptionsResult });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};

//changePassword
userHandler.changePassword = async function (req: any, res: any, done: any) {
  try {

    let data: any = {};
    data.user = req.body.userid;
    data.host = 'im01.unifiedring.co.uk';
    data.newpass = req.body.sipNewPassword;
    const changePasswordResult = await ejabberdService.changePassword(data);
    console.log(changePasswordResult);
    if (changePasswordResult === 0) {
      res.send({ status_code: 200, message: "Password changed successfully" });
    } else {
      res.send({ status_code: 200, message: "Password change failed" });
    }

  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};
module.exports = userHandler;
