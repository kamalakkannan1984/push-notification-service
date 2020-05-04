/**
 * @createdBy kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user.schema';
import { healthSchema } from '../schema/health.schema';
import { teamSchema } from '../schema/team.schema';
import { messageSchema } from '../schema/message.schema';
import { userHandlers } from '../handlers/user.handler';
import { healthHandlers } from '../handlers/health.handler';

/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  fastify.get(
    '/api/status',
    {
      schema: {
        description: 'Status api',
        tags: ['health'],
        response: healthSchema.statusRes,
      },
    },
    healthHandlers.getStatus,
  );

  fastify.get(
    '/api/registered_users',
    {
      schema: {
        description: 'Get registered users api',
        tags: ['user'],
        // body: userSchema.registeredUsersReq.body,
        response: userSchema.registeredUsersRes,
      },
    },
    userHandlers.getRegisteredUsers,
  );

  fastify.post(
    '/api/get_presence',
    {
      schema: {
        description: 'Get presence status api',
        tags: ['user'],
        body: userSchema.getPresenceReq.body,
        response: userSchema.getPresenceRes,
      },
    },
    userHandlers.getPresence,
  );

  fastify.get(
    '/api/connected_users',
    {
      schema: {
        description: 'Get connected users api',
        tags: ['user'],
        response: userSchema.connectedUsersRes,
      },
    },
    userHandlers.getConnectedUsers,
  );

  fastify.get(
    '/api/connected_users_number',
    {
      schema: {
        description: 'Get connected users number api',
        tags: ['user'],
        response: userSchema.connectedUsersNumberRes,
      },
    },
    userHandlers.getConnectedUsersNumber,
  );

  fastify.post(
    '/api/register',
    {
      schema: {
        description: 'Register api',
        tags: ['user'],
        body: userSchema.registerReq.body,
        response: userSchema.registerRes,
      },
    },
    userHandlers.register,
  );

  fastify.post(
    '/api/create_team',
    {
      schema: {
        description: 'Create team api',
        tags: ['team'],
        body: teamSchema.createTeamReq.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.createTeam,
  );

  fastify.post(
    '/api/create_room_with_opts',
    {
      schema: {
        description: 'Create team with options api',
        tags: ['team'],
        body: teamSchema.createTeamWithOptsReq.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.createTeamWithOpts,
  );

  fastify.post(
    '/api/unsubscribe_room',
    {
      schema: {
        description: 'Unsubscribe room or team api',
        tags: ['team'],
        body: teamSchema.unsubscribeRoomReq.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.unsubscribeRoom,
  );

  fastify.post(
    '/api/get_team_info',
    {
      schema: {
        description: 'Get team info api',
        tags: ['team'],
        body: teamSchema.getTeamInfo.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.getTeamInfo,
  );

  fastify.post(
    '/api/send_message',
    {
      schema: {
        description: 'Send message api',
        tags: ['message'],
        body: messageSchema.sendMessage.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.sendMessage,
  );

  fastify.post(
    '/api/send_stanza',
    {
      schema: {
        description: 'Send stanza api',
        tags: ['message'],
        body: messageSchema.sendStanza.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.sendStanza,
  );

  fastify.post('/api/get_room_options', userHandlers.getRoomOptions);
  fastify.post('/api/get_room_affiliations', userHandlers.getRoomAffiliations);

  fastify.post(
    '/api/destroy_room',
    {
      schema: {
        description: 'Delete team or destroy room api',
        tags: ['team'],
        body: teamSchema.destroyRoom.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.destroyRoom,
  );

  fastify.post(
    '/api/leave_team',
    {
      schema: {
        description: 'Leave team api',
        tags: ['team'],
        body: teamSchema.leaveTeam.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.leaveTeam,
  );

  fastify.post(
    '/api/change_password',
    {
      schema: {
        description: 'Change password api',
        tags: ['user'],
        body: userSchema.changePassword.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.changePassword,
  );
  done();
};
