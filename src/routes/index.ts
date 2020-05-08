/**
 * @createdBy kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user.schema';
import { healthSchema } from '../schema/health.schema';
import { teamSchema } from '../schema/team.schema';
import { messageSchema } from '../schema/message.schema';

import { eventSchema } from '../schema/event.schema';
import { tasksSchema } from '../schema/tasks.schema';
import { noteSchema } from '../schema/note.schema';

import { userHandlers } from '../handlers/user.handler';
import { healthHandlers } from '../handlers/health.handler';
import { teamHandlers } from '../handlers/team.handler';
import { messageHandlers } from '../handlers/message.handler';

import { eventHandlers } from '../handlers/event.handler';
import { tasksHandlers } from '../handlers/tasks.handler';
import { noteHandlers } from '../handlers/note.handler';

const AUTH = 'validateSession';

/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  fastify.post(
    '/api/login',
    {
      schema: {
        description: 'Login api',
        tags: ['user'],
        body: userSchema.loginReq.body,
        response: userSchema.loginRes,
      },
    },
    userHandlers.login,
  );

  fastify.get(
    '/api/status',
    {
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
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
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Create team api',
        tags: ['team'],
        body: teamSchema.createTeamReq.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.createTeam,
  );

  fastify.post(
    '/api/create_room_with_opts',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Create team with options api',
        tags: ['team'],
        body: teamSchema.createTeamWithOptsReq.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.createTeamWithOpts,
  );

  fastify.post(
    '/api/unsubscribe_room',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Unsubscribe room or team api',
        tags: ['team'],
        body: teamSchema.unsubscribeRoomReq.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.unsubscribeRoom,
  );

  fastify.post(
    '/api/get_team_info',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Get team info api',
        tags: ['team'],
        body: teamSchema.getTeamInfo.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.getTeamInfo,
  );

  fastify.post(
    '/api/send_message',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Send message api',
        tags: ['message'],
        body: messageSchema.sendMessage.body,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.sendMessage,
  );

  fastify.post(
    '/api/send_stanza',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Send stanza api',
        tags: ['message'],
        body: messageSchema.sendStanza.body,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.sendStanza,
  );

  fastify.post('/api/get_room_options', teamHandlers.getRoomOptions);
  fastify.post('/api/get_room_affiliations', teamHandlers.getRoomAffiliations);

  fastify.post(
    '/api/delete_team',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete team or destroy room api',
        tags: ['team'],
        body: teamSchema.destroyRoom.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.destroyRoom,
  );

  fastify.post(
    '/api/leave_team',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Leave team api',
        tags: ['team'],
        body: teamSchema.leaveTeam.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.leaveTeam,
  );

  fastify.post(
    '/api/role_change',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Team role change api',
        tags: ['team'],
        body: teamSchema.roleChange.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.roleChange,
  );

  fastify.post(
    '/api/get_user_rooms',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Get user rooms details api',
        tags: ['team'],
        body: teamSchema.getUserRooms.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.getUserRooms,
  );

  fastify.post(
    '/api/change_password',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Change password api',
        tags: ['user'],
        body: userSchema.changePassword.body,
        // response: userSchema.createTeamRes
      },
    },
    userHandlers.changePassword,
  );

  fastify.post(
    '/api/user_sessions_info',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Get user session or presence information api',
        tags: ['user'],
        body: teamSchema.userSessionInfo.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.userSessionInfo,
  );

  fastify.post(
    '/api/event',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Create event api',
        tags: ['event'],
        body: eventSchema.createEvent.body,
        // response: userSchema.createTeamRes
      },
    },
    eventHandlers.createEvent,
  );

  fastify.put(
    '/api/event/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Update event api',
        tags: ['event'],
        params: eventSchema.updateEvent.params,
        body: eventSchema.updateEvent.body,
        // response: userSchema.createTeamRes
      },
    },
    eventHandlers.updateEvent,
  );

  fastify.delete(
    '/api/event/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete event api',
        tags: ['event'],
        params: eventSchema.deleteEvent.params,
        // response: userSchema.createTeamRes
      },
    },
    eventHandlers.deleteEvent,
  );

  fastify.post(
    '/api/tasks',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Create tasks api',
        tags: ['tasks'],
        body: tasksSchema.createTasks.body,
        // response: userSchema.createTeamRes
      },
    },
    tasksHandlers.createTasks,
  );

  fastify.put(
    '/api/tasks/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Update tasks api',
        tags: ['tasks'],
        params: tasksSchema.updateTasks.params,
        body: tasksSchema.updateTasks.body,
        // response: userSchema.createTeamRes
      },
    },
    tasksHandlers.updateTasks,
  );

  fastify.delete(
    '/api/tasks/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete tasks api',
        tags: ['tasks'],
        params: tasksSchema.deleteTasks.params,
        // response: userSchema.createTeamRes
      },
    },
    tasksHandlers.deleteTasks,
  );

  fastify.post(
    '/api/note',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Create note api',
        tags: ['note'],
        body: noteSchema.createNote.body,
        // response: userSchema.createTeamRes
      },
    },
    noteHandlers.createNote,
  );

  fastify.put(
    '/api/note/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Update note api',
        tags: ['note'],
        params: noteSchema.updateNote.params,
        body: noteSchema.updateNote.body,
        // response: userSchema.createTeamRes
      },
    },
    noteHandlers.updateNote,
  );

  fastify.delete(
    '/api/note/:uid',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete note api',
        tags: ['note'],
        params: noteSchema.deleteNote.params,
        // response: userSchema.createTeamRes
      },
    },
    noteHandlers.deleteNote,
  );
  //old message delete
  /*- "delete_old_messages"
      - "delete_old_mam_messages"
      - "delete_expired_messages"
      - "clear_cache" */
  fastify.post(
    '/api/delete_old_messages',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete offline messages older than DAYS',
        tags: ['message'],
        //params: noteSchema.deleteNote.params,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.deleteOldMessage,
  );

  fastify.post(
    '/api/delete_old_mam_messages',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete MAM messages older than DAYS',
        tags: ['message'],
        //params: noteSchema.deleteNote.params,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.deleteOldMamMessage,
  );

  fastify.get(
    '/api/delete_expired_messages',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Delete expired offline messages from database',
        tags: ['message'],
        //params: noteSchema.deleteNote.params,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.deleteExpiredMessage,
  );

  fastify.get(
    '/api/clear_cache',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Clear database cache on all nodes',
        tags: ['message'],
        //params: noteSchema.deleteNote.params,
        // response: userSchema.createTeamRes
      },
    },
    messageHandlers.clearCache,
  );

  //add member
  fastify.post(
    '/api/add_member',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'Add member Api',
        tags: ['team'],
        body: teamSchema.addMember.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.addMember,
  );

  // remove member
  fastify.post(
    '/api/remove_member',
    {
      preValidation: [fastify.validateSession],
      schema: {
        description: 'remove member Api',
        tags: ['team'],
        body: teamHandlers.removeMember.body,
        // response: userSchema.createTeamRes
      },
    },
    teamHandlers.removeMember,
  );
  done();
};
