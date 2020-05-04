/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { config } from '../config/app';
import { userModel } from '../models/user';
import UserService from '../services/user.service';

const userHandler: any = {};

userHandler.getRegisteredUsers = async function (req: any, res: any, done: any) {
  try {
    const userService = new UserService();
    const registerUser = await userService.registeredUsers();
    res.send({ status_code: 200, result: registerUser });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// getPresence
userHandler.getPresence = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.user = req.body.user;
    data.server = config.ejabberdHost;
    const userService = new UserService();
    const result = await userService.getPresence(data);
    res.send({ status_code: 200, result: result });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

//  getConnectedUsers
userHandler.getConnectedUsers = async function (req: any, res: any, done: any) {
  try {
    const userService = new UserService();
    const result = await userService.connectedUsers();
    res.send({ status_code: 200, result: result });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// getConnectedUsersNumber
userHandler.getConnectedUsersNumber = async function (req: any, res: any, done: any) {
  try {
    const userService = new UserService();
    const result = await userService.connectedUsersNumber();
    res.send({ status_code: 200, result: result });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// register
userHandler.register = async function (req: any, res: any, done: any) {
  try {
    const regData: any = {};
    let data = {};
    let registerResult: any = {};
    regData.user = req.body.userid;
    regData.host = config.ejabberdHost;
    regData.password = req.body.password;
    regData.company_id = req.body.company_id;
    const userService = new UserService();
    registerResult = await userService.register(regData);
    if (registerResult.status === 'error') {
      res.send({ status_code: 200, message: registerResult.message });
    } else {
      const recordsets = await userModel.getCompanyContact(regData.company_id);
      // console.log(recordsets);
      for (let i = 0; i < recordsets.length; i++) {
        if (recordsets[i].sip_login_id > 0) {
          data = {
            localuser: regData.user,
            localserver: regData.host,
            user: recordsets[i].sip_login_id,
            server: regData.host,
            nick: recordsets[i].caller_id,
            group: 'Work',
            subs: 'both',
          };
          await userService.addRosteritem(data);
        }
      }
      res.send({ status_code: 200, message: registerResult });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// changePassword
userHandler.changePassword = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.user = req.body.userid;
    data.host = config.ejabberdHost;
    data.newpass = req.body.sipNewPassword;
    const userService = new UserService();
    const changePasswordResult = await userService.changePassword(data);
    console.log(changePasswordResult);
    if (changePasswordResult === 0) {
      res.send({ status_code: 200, message: 'Password changed successfully' });
    } else {
      res.send({ status_code: 200, message: 'Password change failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const userHandlers: any = userHandler;
