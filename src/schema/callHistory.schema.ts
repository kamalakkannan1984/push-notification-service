/**
 * @createdBy Kamal
 * @createdOn 10th June 2020
 */

const callHistory: any = {};

/* ##################################################################################### */

/**
 * save call history
 */
/*
need to update db
inserted_at
updated_at
inserted_by
*/
callHistory.saveCallHistory = {
    body: {
        type: 'object',
        properties: {
            bound: { type: 'string' },
            medium: { type: 'string' },
            call_duration: { type: 'string' },
            from_caller: { type: 'string' },
            to_caller: { type: 'string' }
        },
        required: ['bound', 'medium', 'call_duration', 'from_caller', 'to_caller'],
    },
};

/**
 * update call history
 */
callHistory.updateCallHistory = {
    params: {
        type: 'object',
        properties: {
            uuid: { type: 'string' },
        },
        required: ['uuid'],
    },
    body: {
        type: 'object',
        properties: {
            bound: { type: 'string' },
            medium: { type: 'string' },
            call_duration: { type: 'string' },
            from_caller: { type: 'string' },
            to_caller: { type: 'string' }
        },
    },
};

/**
 * get call history
 */
callHistory.getCallHistory = {
    params: {
        type: 'object',
        properties: {
            ext: { type: 'string' },
        },
        required: ['ext'],
    },
};

/* ######################################################################################## */
export const callHistorySchema = callHistory;
