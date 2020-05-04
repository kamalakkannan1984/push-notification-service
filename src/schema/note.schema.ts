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
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// update note
note.updateNote = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// delete note
note.deleteNote = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

/* ######################################################################################## */
export const noteSchema = note;
