/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const health: any = {};

/* ##################################################################################### */
// status
health.statusRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
    },
  },
};

/* ######################################################################################## */
export const healthSchema = health;
