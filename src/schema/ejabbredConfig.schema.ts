/**
 * @createdBy Kamal
 * @createdOn 15th June 2020
 */

const ejabbredConfig: any = {};

/* ##################################################################################### */

/**
 * add vhost
 */
ejabbredConfig.addVhost = {
    body: {
        type: 'object',
        properties: {
            vhost: { type: 'string' }
        },
        required: ['vhost'],
    },
};

/**
 * update vhost
 */
ejabbredConfig.updateVhost = {
    params: {
        type: 'object',
        properties: {
            vhost: { type: 'string' },
        },
        required: ['vhost'],
    },
    body: {
        type: 'object',
        properties: {
            vhost: { type: 'string' }
        },
        required: ['vhost'],
    },
};

/**
 * delete vhost
 */
ejabbredConfig.deleteVhost = {
    params: {
        type: 'object',
        properties: {
            vhost: { type: 'string' },
        },
        required: ['vhost'],
    },
};

/**
 * get vhost
 */
ejabbredConfig.getVhost = {
    params: {
        type: 'object',
        properties: {
            vhost: { type: 'string' },
        },
        required: ['vhost'],
    },
};

/**
 * get all vhost response
 */
ejabbredConfig.getVhostRes = {
    200: {
        type: 'object',
        properties: {
            status_code: { type: 'number' },
            result: { type: 'string' },
        },
    },
};

/* ######################################################################################## */
export const ejabbredConfigSchema = ejabbredConfig;
