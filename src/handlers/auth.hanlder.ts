/**
 * @createdBy Kamal
 * @createdOn 12th Feb 2020
 */
import { config } from '../config/app';
import * as jwt from 'jsonwebtoken';
export const authHandler: any = {};

// validate Basic auth for public apis
authHandler.validate = (username: string, password: string, req: any, reply: any, done: any) => {
  username === config.basic_uname && password === config.basic_pw
    ? done()
    : done(new Error('Authorization token is required'));
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - reply object
 * @param {Object} done - done object can be called once verification is done
 */
authHandler.validateSession = (req: any, reply: any, done: any) => {
  try {
    let decoded: any = {};
    if (!req.headers || !req.headers.authorization) {
      return done({ status_code: 401, message: 'Authorization required' });
    } else {
      decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET ? process.env.JWT_SECRET : config.jwt_secret,
      );
      if (!decoded.username && !decoded.password && !decoded.deviceId) {
        return done({ status_code: 401, message: 'Invalid authorization' });
      } else {
        req['authorization'] = {
          username: decoded.username,
          password: decoded.password,
          deviceId: decoded.deviceId,
          sipLoginId: decoded.sipLoginId,
          roleId: decoded.roleId
        };
        done();
      }
    }
  } catch (err) {
    return done({ status_code: 401, message: 'Invalid authorization' });
  }
};
