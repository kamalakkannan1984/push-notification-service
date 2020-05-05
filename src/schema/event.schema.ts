/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const event: any = {};

/* ##################################################################################### */
// create event
/* 
"summary": "redAlert",
    "duration": "test",
    "repeat_type": "test",
    "repeat_time": "",
    "repeat_when": "",
    "section": "",
    "msgid": "15747DEB-0397-4415-A752-A4ABFA72DD4B",
    "description": "",
    "complete_percentage": "",
    "uid": "32041586367630002",
    "category_color": "",
    "last_modified": "",
    "completed_when": "",
    "fmttype": "",
    "attendee": "",
    "dtstart": "",
    "dtend": "",
    "action": "",
    "trigger": "",
    "owner_id": "",
    "sip_id": "",
    "status": "",
    "sender": "",
    "receiver": "",
    "conv_id": "",
    "thread_id": "",
    "assignee_completed": "",
    "due_time": "",
    "group_id": "",
    "rrule": "",
    "location": "Vadugapatti, Tamil Nadu, India",
    "company_id": 1698
*/
event.createEvent = {
  body: {
    type: 'object',
    properties: {
      summary: { type: 'string' },
      duration: { type: "string" },
      repeat_type: { type: "string" },
      repeat_time: { type: "string" },
      repeat_when: { type: "string" },
      section: { type: "string" },
      msgid: { type: "string" },
      description: { type: "string" },
      complete_percentage: { type: "string" },
      uid: { type: "string" },
      category_color: { type: "string" },
      last_modified: { type: "string" },
      completed_when: { type: "string" },
      fmttype: { type: "string" },
      attendee: { type: "string" },
      dtstart: { type: "string" },
      dtend: { type: "string" },
      action: { type: "string" },
      trigger: { type: "string" },
      owner_id: { type: "string" },
      sip_id: { type: "string" },
      status: { type: "string" },
      sender: { type: "string" },
      receiver: { tring: "string" },
      conv_id: { type: "string" },
      thread_id: { type: "string" },
      assignee_completed: { type: "string" },
      due_time: { type: "string" },
      group_id: { type: "string" },
      rrule: { type: "string" },
      location: { type: "string" },
      company_id: { type: "number" }
    },
    required: ['summary'],
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
