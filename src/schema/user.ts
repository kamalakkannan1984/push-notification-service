/**
 * @createdBy Kamal
 * @createdOn 24th Apirl 2020
 */

let user: any = {};

/* ##################################################################################### */

//registered_users
user.registeredUsersReq = {
  body: {
    type: 'object',
    properties: {
      host: { type: 'string' }
    },
    required: ['host'],
  },
};

user.registeredUsersRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: { type: 'array', items: { type: "string" } }
    }
  },
};

//get_presence
user.getPresenceReq = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'string' },
      server: { type: "string" }
    },
    required: ['user', 'server'],
  },
};
/*
"result": {
        "jid": "3036@im01.unifiedring.co.uk/UnifiedRing.JEu9",
        "show": "available",
        "status": ""
    }
*/
user.getPresenceRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: {
        type: 'object',
        properties: {
          jid: { type: "string" },
          show: { type: "string" },
          status: { type: "string" }
        }
      }
    }
  },
};

//connected_users_number
user.connectedUsersNumberRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: {
        type: 'object',
        properties: {
          num_sessions: { type: "number" }
        }
      }
    }
  },
};

//connected_users
user.connectedUsersRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: { type: 'array', items: { type: "string" } }
    }
  },
};

//status
user.statusRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: 'string' }
    }
  },
};

//register
/*
"user": "bob",
"host": "example.com",
"password": "SomEPass44"
*/
user.registerReq = {
  body: {
    type: 'object',
    properties: {
      userid: { type: 'string' },
      password: { type: 'string' },
      company_id: { type: "number" }
    },
    required: ['userid', 'password', 'company_id'],
  },
};

user.registerRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: { type: "string" }
    }
  },
};

//Creat Team

user.createTeamReq = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_id: { type: 'number' },
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
    required: ['company_id', 'team_id', 'team_name', 'description', 'add_members', 'team_guid'],
  },
};

user.createTeamRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: "number" },
      message: { type: "string" },
      result: { type: "string" }
    }
  },
};
// Create team with options
/*
{
      "name": "room1",
      "service": "muc.example.com",
      "host": "localhost",
      "options": [
        {
          "name": "members_only",
          "value": "true"
        }
      ]
    }*/
user.createTeamWithOptsReq = {
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
          value: { type: 'boolean' }
        }
      }
    },
    required: ['name', 'service', 'host', 'options'],
  },
}

//unsubscribeRoomReq

user.unsubscribeRoomReq = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'string' },
      room: { type: 'string' }
    },
    required: ['user', 'room'],
  },
}

//getTeamInfo
/*
{
    "company_id": 1698,
    "team_id": 31,
    "extension": 528
}
*/
user.getTeamInfo = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'number' },
      team_id: { type: 'number' },
      extension: { type: 'string' }
    },
    required: ['company_id', 'team_id', 'extension'],
  },
}

//sendMessage
user.sendMessage = {
  body: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['normal', 'chat', 'headline', 'groupchat'] },
      from: { type: 'string' },
      to: { type: 'string' },
      subject: { type: 'string' },
      body: { type: 'string' },
    },
    required: ['type', 'from', 'to', 'subject', 'body'],
  },
}

//sendStanza
user.sendStanza = {
  body: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      to: { type: 'string' },
      stanza: { type: 'string' }
    },
    required: ['from', 'to', 'stanza'],
  },
}
//destroyRoom
/*"name": "room1",
      "service": "muc.example.com"*/
user.destroyRoom = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      service: { type: 'string' }
    },
    required: ['name', 'service'],
  },
}
/* ############################################################################################################## */

export const userSchema: any = user;
