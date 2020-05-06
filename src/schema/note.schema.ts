/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const note: any = {};

/* ##################################################################################### */
// create note
/* {
    "_id" : ObjectId("5e4e6bbe4816c26b4869cf21"),
    "DESCRIPTION" : "RESTVIEW",
    "SUMMARY" : "HOLLYWOOD",
    "UID" : "16541582197562431",
    "DTSTART" : "1582197562.432753",
    "SENDER" : "1654@6367.unifiedring.co.uk",
    "MSGID" : "16541582197562431",
    "RECEIVER" : "2451@6367.unifiedring.co.uk",
    "GROUPID" : "",
    "OWNERID" : "1654@6367.unifiedring.co.uk"
}*/
note.createNote = {
  body: {
    type: 'object',
    properties: {
      description: { type: 'string' },
      summary: { type: 'string' },
      uId: { type: 'string' },
      dtStart: { type: 'string' },
      sender: { type: 'string' },
      msgId: { type: 'string' },
      receiver: { type: 'string' },
      groupId: { type: 'string' },
      ownerId: { type: 'string' },
    },
    required: ['description', 'uId'],
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
      msgId: { type: 'string' },
      receiver: { type: 'string' },
      groupId: { type: 'string' },
      ownerId: { type: 'string' },
    },
    required: ['description'],
  },
};

// delete note
note.deleteNote = {
  params: {
    type: 'object',
    properties: {
      uid: { type: 'string' },
    },
    required: ['uid'],
  },
};

/* ######################################################################################## */
export const noteSchema = note;
