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
      user: { type: 'string' },
      host: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['user', 'host', 'password'],
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
/* ############################################################################################################## */

export const userSchema: any = user;
