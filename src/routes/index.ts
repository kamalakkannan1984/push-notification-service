/**
 * @createdBy kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user';
/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  const apihandler = require('../handlers/user');
  const opts = {
    schema: {
      body: userSchema.registeredUsersReq.body,
      response: userSchema.registeredUsersRes,
    },
  };

  const optsGetPresence = {
    schema: {
      body: userSchema.getPresenceReq.body,
      response: userSchema.getPresenceRes,
    },
  };

  const optConnectedUsersNumber = {
    schema: {
      response: userSchema.connectedUsersNumberRes,
    },
  };

  const optConnectedUsers = {
    schema: {
      response: userSchema.connectedUsersRes,
    },
  };

  const optStatus = {
    schema: {
      response: userSchema.statusRes,
    },
  };

  const optRegister = {
    schema: {
      body: userSchema.registerReq.body,
      response: userSchema.registerRes
    }
  }

  fastify.get('/api/status', optStatus, apihandler.getStatus);
  fastify.post('/api/registered_users', opts, apihandler.getRegisteredUsers);
  fastify.post('/api/get_presence', optsGetPresence, apihandler.getPresence);
  fastify.get('/api/connected_users', optConnectedUsers, apihandler.getConnectedUsers);
  fastify.get('/api/connected_users_number', optConnectedUsersNumber, apihandler.getConnectedUsersNumber);
  fastify.post('/api/register', optRegister, apihandler.register);
  done();
};
