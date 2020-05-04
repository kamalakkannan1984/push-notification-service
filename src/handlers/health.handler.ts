/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { userSchema } from '../schema/user.schema';
import { config } from '../config/app';
import { userModel } from '../models/user';
import { ejabberdService } from '../services/index';
import UserService from '../services/user.service';
import HealthService from '../services/health.service';

const healthHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - get status function
 */
healthHandler.getStatus = async function (req: any, res: any, done: any) {
  try {
    const healthSerevice = new HealthService();
    const status = await healthSerevice.status();
    res.send({ status_code: 200, message: status });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const healthHandlers: any = healthHandler;
