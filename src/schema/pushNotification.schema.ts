/**
 * @createdBy Kamal
 * @createdOn 18th June 2020
 */

const pushNotification: any = {};

/* ##################################################################################### */

/**
 * pushNotificationAndriod
 */

pushNotification.pushNotificationAndriod = {
  body: {
    type: 'object',
    properties: {
      registration_token: { type: 'string' },
      notification: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        },
      },
      /*data: {
        my_key: 'my value',
        my_another_key: 'my another value',
      },*/
    },
    required: ['registration_token', 'notification'],
  },
};

/**
 * pushNotificationIos
 */
pushNotification.pushNotificationIos = {
  body: {
    type: 'object',
    properties: {
      registrationIds: { type: 'string' },
      alert: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        },
      },
    },
    required: ['registrationIds', 'alert'],
  },
};

/* ######################################################################################## */
export const pushNotificationSchema = pushNotification;
