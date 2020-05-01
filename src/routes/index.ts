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

  const optCreateTeam = {
    schema: {
      body: userSchema.createTeamReq.body,
      //response: userSchema.createTeamRes
    }
  }

  const optCreateTeamWithOpts = {
    schema: {
      body: userSchema.createTeamWithOptsReq.body,
      //response: userSchema.createTeamRes
    }
  }

  const optUnsubscribeRoom = {
    schema: {
      body: userSchema.unsubscribeRoomReq.body,
      //response: userSchema.createTeamRes
    }
  }

  const optGetTeamInfo = {
    schema: {
      body: userSchema.getTeamInfo.body,
      //response: userSchema.createTeamRes
    }
  }

  const optSendMessage = {
    schema: {
      body: userSchema.sendMessage.body,
      //response: userSchema.createTeamRes
    }
  }

  const optSendStanza = {
    schema: {
      body: userSchema.sendStanza.body,
      //response: userSchema.createTeamRes
    }
  }

  const optDestroyRoom = {
    schema: {
      body: userSchema.destroyRoom.body,
      //response: userSchema.createTeamRes
    }
  }

  const optLeaveTeam = {
    schema: {
      body: userSchema.leaveTeam.body,
      //response: userSchema.createTeamRes
    }
  }

  const optChangePassword = {
    schema: {
      body: userSchema.changePassword.body,
      //response: userSchema.createTeamRes
    }
  }
  fastify.get('/api/status', optStatus, apihandler.getStatus);
  fastify.post('/api/registered_users', opts, apihandler.getRegisteredUsers);
  fastify.post('/api/get_presence', optsGetPresence, apihandler.getPresence);
  fastify.get('/api/connected_users', optConnectedUsers, apihandler.getConnectedUsers);
  fastify.get('/api/connected_users_number', optConnectedUsersNumber, apihandler.getConnectedUsersNumber);
  fastify.post('/api/register', optRegister, apihandler.register);
  fastify.post('/api/create_team', optCreateTeam, apihandler.createTeam);
  fastify.post('/api/create_room_with_opts', optCreateTeamWithOpts, apihandler.createTeamWithOpts);
  fastify.post('/api/unsubscribe_room', optUnsubscribeRoom, apihandler.unsubscribeRoom);
  //.net api
  fastify.post('/api/get_team_info', optGetTeamInfo, apihandler.getTeamInfo);
  fastify.post('/api/send_message', optSendMessage, apihandler.sendMessage);
  fastify.post('/api/send_stanza', optSendStanza, apihandler.sendStanza);
  fastify.post('/api/get_room_options', apihandler.getRoomOptions);
  fastify.post('/api/get_room_affiliations', apihandler.getRoomAffiliations);
  fastify.post('/api/destroy_room', optDestroyRoom, apihandler.destroyRoom);
  fastify.post('/api/leave_team', optLeaveTeam, apihandler.leaveTeam);
  fastify.post('/api/change_password', optChangePassword, apihandler.changePassword);
  done();
};
