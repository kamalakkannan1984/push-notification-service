/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const message: any = {};

/* ##################################################################################### */
// sendMessage
message.sendMessage = {
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
};

// sendStanza
message.sendStanza = {
  body: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      to: { type: 'string' },
      stanza: { type: 'string' },
    },
    required: ['from', 'to', 'stanza'],
  },
};

//
/*data.user = req.body.user;
    data.host = req.body.host;
    data.resource = req.body.resource;
    data.stanza = req.body.stanza;*/
message.sendStanzaC2s = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'string' },
      host: { type: 'string' },
      resource: { type: 'string' },
      stanza: { type: 'string' },
    },
    required: ['user', 'host', 'resource', 'stanza'],
  },
};
/* ######################################################################################## */
export const messageSchema = message;
