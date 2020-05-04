/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const event: any = {};

/* ##################################################################################### */
// create event
event.createEvent = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// update event
event.updateEvent = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// delete event
event.deleteEvent = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

/* ######################################################################################## */
export const eventSchema = event;
