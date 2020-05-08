/**
 * @createdBy Kamal
 * @createdOn 05 May 2020
 */

import * as jwt from 'jsonwebtoken';
import { config } from '../config/app';

export const utils: any = {};
// form  post req data
utils.formReqData = (req: any, reply: any, done: any) => {
  done();
};

// process response Object
utils.formResData = (req: any, reply: any, done: any) => {
  done();
};

// process error object
utils.handleError = (req: any, reply: any, error: any, done: any) => {
  console.log('error', error);
  done();
};

/**
 * @param {Object} data - data to  form the response
 */
utils.formSuccessObject = (statusCode: any, message: any, data: any) => {
  const succssObj: any = {
    statusCode: statusCode ? statusCode : 200,
    message: message ? message : 'Success',
  };

  if (data) {
    succssObj['data'] = data;
  }

  return succssObj;
};

/**
 * @param {Object} err - err to  form the response
 */
utils.formErrorObject = (statusCode: any, message: any, err: any) => {
  const errorObj: any = {
    statusCode: statusCode ? statusCode : 500,
    message: message ? message : 'Failed',
    isError: true,
  };

  if (err) {
    errorObj['err'] = err; // error object contains actual error details
  }
  console.log('errorObj', errorObj);

  return errorObj;
};
//
utils.isObject = (val: any) => {
  if (val === null) {
    return false;
  }
  return val && val !== null && val !== 'undefined';
};

utils.dateDiffSec = (val: any) => {
  const date1: any = new Date(val);
  const date2: any = new Date();
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60));
};

utils.createSession = (data: any) => {
  /* data.login_user_name, data.login_password, data.login_device_id*/
  return generateToken(data);
};

utils.validateSession = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const decode = jwt.verify(token, config.jwt_secret);
      resolve(decode);
    } catch (err) {
      reject(err);
    }
  });
};

function generateToken(data: any) {
  const username = data.login_user_name;
  const password = data.login_password;
  const deviceId = data.login_device_id;
  const sipLoginId = data.sip_login_id;
  const roleId = data.role_id;
  const jwtPayload = {
    username,
    password,
    deviceId,
    sipLoginId,
    roleId
  };

  return jwt.sign(jwtPayload, config.jwt_secret);
}
//
