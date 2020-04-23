'use strict';

/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user';
import { userModel } from '../models/user';
const Client = require('@appunto/ejabberd-api-client');


const userHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - user signup function
 */
userHandler.comman = async function (req: any, res: any, done: any) {
  try {
    let body = req.body;
    console.log(body); //https://im01.unifiedring.co.uk :5281
    const client = new Client('chat.unifiedring.co.uk', 5443);
    console.log(client);
    client.status().then((result: any) => console.log(result)
    ).catch((err: any) => {
      console.log(err);
    });
    res.send({ msg: { status_code: 200, message: body } });
  } catch (err) {
    res.send({ msg: { status_code: 500, message: 'internal server error' } });
  }
};

module.exports = userHandler;
