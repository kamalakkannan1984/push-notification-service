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
      dtStart: { type: 'string' },
      sender: { type: 'string' },
      msgId: { type: 'string' },
      receiver: { type: 'string' },
      groupId: { type: 'string' },
      owner_id: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['company_id', 'owner_id', 'receiver'],
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
      uid: { type: 'string' },
      dtStart: { type: 'string' },
      sender: { type: 'string' },
      msgId: { type: 'string' },
      receiver: { type: 'string' },
      groupId: { type: 'string' },
      owner_id: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['company_id', 'owner_id', 'receiver'],
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
      msgId: { type: 'string' }
    },
    required: ['uid'],
  },
};

// getNote
note.getNote = {
  params: {
    type: 'object',
    properties: {
      sender: { type: 'string' },
    },
    required: ['sender'],
  },
};
/* ######################################################################################## */
export const noteSchema = note;
