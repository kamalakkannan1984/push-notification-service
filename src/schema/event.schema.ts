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
      summary: { type: 'string' },
      duration: { type: 'string' },
      repeat_type: { type: 'string' },
      repeat_time: { type: 'string' },
      repeat_when: { type: 'string' },
      section: { type: 'string' },
      msgid: { type: 'string' },
      description: { type: 'string' },
      complete_percentage: { type: 'string' },
      uid: { type: 'string' },
      category_color: { type: 'string' },
      last_modified: { type: 'string' },
      completed_when: { type: 'string' },
      fmttype: { type: 'string' },
      attendee: { type: 'string' },
      dtstart: { type: 'string' },
      dtend: { type: 'string' },
      action: { type: 'string' },
      trigger: { type: 'string' },
      owner_id: { type: 'string' },
      sip_id: { type: 'string' },
      status: { type: 'string' },
      sender: { type: 'string' },
      receiver: { type: 'string' },
      conv_id: { type: 'string' },
      thread_id: { type: 'string' },
      assignee_completed: { type: 'string' },
      due_time: { type: 'string' },
      group_id: { type: 'string' },
      rrule: { type: 'string' },
      location: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['company_id', 'group_id', 'receiver', 'owner_id', 'msgid'],
  },
};

// update event
event.updateEvent = {
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
      summary: { type: 'string' },
      duration: { type: 'string' },
      repeat_type: { type: 'string' },
      repeat_time: { type: 'string' },
      repeat_when: { type: 'string' },
      section: { type: 'string' },
      msgid: { type: 'string' },
      description: { type: 'string' },
      complete_percentage: { type: 'string' },
      category_color: { type: 'string' },
      last_modified: { type: 'string' },
      completed_when: { type: 'string' },
      fmttype: { type: 'string' },
      attendee: { type: 'string' },
      dtstart: { type: 'string' },
      dtend: { type: 'string' },
      action: { type: 'string' },
      trigger: { type: 'string' },
      owner_id: { type: 'string' },
      sip_id: { type: 'string' },
      status: { type: 'string' },
      sender: { type: 'string' },
      receiver: { type: 'string' },
      conv_id: { type: 'string' },
      thread_id: { type: 'string' },
      assignee_completed: { type: 'string' },
      due_time: { type: 'string' },
      group_id: { type: 'string' },
      rrule: { type: 'string' },
      location: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['company_id', 'group_id', 'receiver', 'owner_id', 'msgid'],
  },
};

// delete event
/* data.uid = req.body.uid;
    data.owner_id = req.body.owner_id;
    data.sip_id = req.body.sip_id;
    data.group_id = req.body.group_id;
    data.receiver = req.body.receiver;
    data.thread_id = req.body.thread_id;
    data.msgid = req.body.msgid;*/
event.deleteEvent = {
  body: {
    type: 'object',
    properties: {
      uid: { type: 'string' },
      owner_id: { type: 'string' },
      sip_id: { type: 'string' },
      group_id: { type: 'string' },
      receiver: { type: 'string' },
      thread_id: { type: 'string' },
      msgid: { type: 'string' }
    },
    required: ['uid', 'owner_id', 'receiver', 'group_id', 'msgid'],
  },
};

event.getEvent = {
  params: {
    type: 'object',
    properties: {
      sip_id: { type: 'string' },
    },
    required: ['sip_id'],
  },
};

/* ######################################################################################## */
export const eventSchema = event;
