/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const team: any = {};

/* ##################################################################################### */
// Creat Team
team.createTeamReq = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_name: { type: 'string' },
      team_type: { type: 'number' },
      description: { type: 'string' },
      created_by: { type: 'number' },
      resource_id: { type: 'string' },
      except_guest: { type: 'number' },
      post_msg: { type: 'number' },
      mention: { type: 'number' },
      integration: { type: 'number' },
      pin_post: { type: 'number' },
      add_members: { type: 'string' },
      team_guid: { type: 'string' },
      photo_info: { type: 'string' },
    },
    required: ['company_id', 'team_name', 'description', 'add_members', 'created_by'],
  },
};

// Update team
team.updateTeamReq = {
  params: {
    type: 'object',
    properties: {
      team_id: { type: 'string' },
    },
    required: ['team_id'],
  },
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_name: { type: 'string' },
      team_type: { type: 'number' },
      description: { type: 'string' },
      resource_id: { type: 'string' },
      created_by: { type: 'number' },
      except_guest: { type: 'number' },
      post_msg: { type: 'number' },
      mention: { type: 'number' },
      integration: { type: 'number' },
      pin_post: { type: 'number' },
      add_members: { type: 'string' },
      team_guid: { type: 'string' },
      photo_info: { type: 'string' },
    },
    required: ['company_id', 'team_name', 'description', 'add_members', 'created_by'],
  },
};

team.createTeamRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      team_id: { type: 'string' },
    },
  },
};

// Create team with options
team.createTeamWithOptsReq = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
      host: { type: 'string' },
      options: {
        type: 'array',
        properties: {
          name: { type: 'string' },
          value: { type: 'boolean' },
        },
      },
    },
    required: ['name', 'service', 'host', 'options'],
  },
};

// unsubscribeRoomReq

team.unsubscribeRoomReq = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'string' },
      room: { type: 'string' },
    },
    required: ['user', 'room'],
  },
};

// getTeamInfo

team.getTeamInfo = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_id: { type: 'string' },
      sipid: { type: 'string' },
    },
    required: ['company_id', 'team_id', 'sipid'],
  },
};

// destroyRoom
team.destroyRoom = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['name', 'service', 'company_id'],
  },
};

/*TeamLeave */
team.leaveTeam = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
      resource_id: { type: 'string' },
      jid: { type: 'string' },
      company_id: { type: 'number' },
      extension: { type: 'number' },
    },
    required: ['name', 'service', 'jid', 'company_id', 'extension'],
  },
};

team.roleChange = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
      jid: { type: 'string' },
      role: { type: 'string' },
    },
    required: ['name', 'service', 'jid', 'role'],
  },
};

team.getUserRooms = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  },
};

// add member
team.addMember = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      name: { type: 'string' },
      resource_id: { type: 'string' },
      service: { type: 'string' },
      fromJid: { type: 'string' },
      toJid: { type: 'string' },
    },
  },
};

// remove member
team.removeMember = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      name: { type: 'string' },
      service: { type: 'string' },
      fromJid: { type: 'string' },
      resource_id: { type: 'string' },
      toJid: { type: 'string' },
    },
  },
};

export const teamSchema = team;
