/**
 * @createdBy kamal
 * @createdOn 27th June 2020
 */

import { pushNotificationHandlers } from '../handlers/pushNotification.handler';
import { pushNotificationSchemas } from '../schema/pushNotification.schema';
import { healthHandlers } from '../handlers/health.handler';
const AUTH = 'validateSession';

/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  fastify.get(
    '/api/status',
    {
      //preValidation: [fastify.validateSession],
      schema: {
        description: 'Status api',
        tags: ['health'],
        // response: healthSchema.statusRes,
      },
    },
    healthHandlers.getStatus,
  );
  // push notification
  fastify.post(
    '/api/push_notification',
    {
      // preValidation: [fastify.validateSession],
      schema: {
        description: 'send push notification',
        tags: ['Notification'],
        body: pushNotificationSchemas.pushNotification.body,
        // response: userSchema.createTeamRes
      },
    },
    pushNotificationHandlers.pushNotification,
  );

  fastify.post(
    '/api/in_app_push_notification',
    {
      // preValidation: [fastify.validateSession],
      schema: {
        description: 'send in app push notification',
        tags: ['Notification'],
        body: pushNotificationSchemas.inAppPushNotification.body,
        // response: userSchema.createTeamRes
      },
    },
    pushNotificationHandlers.inAppPushNotification,
  );
  // push notification
  done();
};
