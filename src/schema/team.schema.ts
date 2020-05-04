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
/*
  {
        'name': 'room1',
        'service': 'muc.example.com',
        'host': 'localhost',
        'options': [
          {
            'name': 'members_only',
            'value': 'true'
          }
        ]
      }*/
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
/*
  {
      'company_id': 1698,
      'team_id': 31,
      'extension': 528
  }
  */
team.getTeamInfo = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_id: { type: 'number' },
      extension: { type: 'string' },
    },
    required: ['company_id', 'team_id', 'extension'],
  },
};

// destroyRoom
/*'name': 'room1',
      'service': 'muc.example.com'*/
team.destroyRoom = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
    },
    required: ['name', 'service'],
  },
};
/*TeamLeave */
/* 'name': 'room1',
            'service': 'muc.example.com',
            'jid': 'user2@example.com',
            'affiliation': 'member'*/
team.leaveTeam = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' },
      jid: { type: 'string' },
    },
    required: ['name', 'service', 'jid'],
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

team.userSessionInfo = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  },
};

export const teamSchema = team;
