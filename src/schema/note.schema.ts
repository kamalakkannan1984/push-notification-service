/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const note: any = {};

/* ##################################################################################### */
// create note

note.createNote = {
  body: {
    type: 'object',
    properties: {
      description: { type: 'string' },
      summary: { type: 'string' },
      uid: { type: 'string' },
      dtstart: { type: 'string' },
      sender: { type: 'string' },
      msgid: { type: 'string' },
      receiver: { type: 'string' },
      group_id: { type: 'string' },
      owner_id: { type: 'string' },
      company_id: { type: 'number' },
      thread_id: { type: 'string' },
      event_id: { type: 'string' },
      sip_id: { type: 'string' },
    },
    required: ['company_id', 'owner_id', 'receiver', 'group_id', 'uid'],
  },
};

// update note
note.updateNote = {
  params: {
    type: 'object',
    properties: {
      uid: { type: 'string' },
    },
    required: ['uid'],
  },
  body: {
    type: 'object',
    properties: {
      description: { type: 'string' },
      summary: { type: 'string' },
      dtStart: { type: 'string' },
      sender: { type: 'string' },
      msgid: { type: 'string' },
      receiver: { type: 'string' },
      group_id: { type: 'string' },
      owner_id: { type: 'string' },
      company_id: { type: 'number' },
      thread_id: { type: 'string' },
    },
    required: ['company_id', 'owner_id', 'receiver', 'group_id'],
  },
};

// delete note
note.deleteNote = {
  body: {
    type: 'object',
    properties: {
      uid: { type: 'string' },
      owner_id: { type: 'string' },
      sender: { type: 'string' },
      group_id: { type: 'string' },
      receiver: { type: 'string' },
      msgid: { type: 'string' },
      thread_id: { type: 'string' },
    },
    required: ['uid', 'group_id', 'owner_id', 'msgid', 'receiver'],
  },
};

// getNote
note.getNote = {
  params: {
    type: 'object',
    properties: {
      sip_id: { type: 'string' },
    },
    required: ['sip_id'],
  },
};
/* ######################################################################################## */
export const noteSchema = note;
