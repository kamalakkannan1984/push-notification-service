'use strict';

/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user';
import { userModel } from '../models/user';
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
    client.status().then((result: any) => {
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
    client.registeredUsers(host).then((result: any) => {
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
    client.getPresence(user, server).then((result: any) => {
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
    client.connectedUsers().then((result: any) => {
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
    client.connectedUsersNumber().then((result: any) => {
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
    const host = req.body.host;
    const password = req.body.password;
    client.register(user, host, password).then((result: any) => {
      res.send({ status_code: 200, result: result });
    }).catch((err: any) => {
      console.log(err.response.data);
      res.send({ status_code: 500, message: 'internal server error' });
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }

};
module.exports = userHandler;
