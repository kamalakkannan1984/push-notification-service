/**
 * @createdBy Kamal
 * @createdOn 10th June 2020
 */

import { callHistoryModel } from '../models/callHistory.model';

const callHistoryHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - save  call history function
 */
callHistoryHandler.saveCallHistory = async function (req: any, res: any, done: any) {
    try {
        const data: any = {};
        let sendMessageResult = 0;
        if (sendMessageResult === 0) {
            res.send({ status_code: 200, message: 'saved successfully' });
        } else {
            res.send({ status_code: 200, message: 'failed' });
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
 * @description - update call history function
 */
callHistoryHandler.updateCallHistory = async function (req: any, res: any, done: any) {
    try {
        const data: any = {};
        let sendMessageResult = 0;
        if (sendMessageResult === 0) {
            res.send({ status_code: 200, message: 'update successfully' });
        } else {
            res.send({ status_code: 200, message: 'failed' });
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
 * @description - update call history function
 */
callHistoryHandler.updateCallHistory = async function (req: any, res: any, done: any) {
    try {
        const data: any = {};
        let sendMessageResult = 0;
        if (sendMessageResult === 0) {
            res.send({ status_code: 200, message: 'update successfully' });
        } else {
            res.send({ status_code: 200, message: 'failed' });
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
 * @description - get call history function
 */
callHistoryHandler.getCallHistory = async function (req: any, res: any, done: any) {
    try {
        const data: any = {};
        let sendMessageResult = 0;
        if (sendMessageResult === 0) {
            res.send({ status_code: 200, message: 'get call history successfully' });
        } else {
            res.send({ status_code: 200, message: 'failed' });
        }

    } catch (err) {
        console.log(err);
        res.send({ status_code: 500, message: 'internal server error' });
    }
};

export const callHistoryHandlers: any = callHistoryHandler;