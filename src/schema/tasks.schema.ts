/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

const tasks: any = {};

/* ##################################################################################### */
// create tasks
tasks.createTasks = {
  body: {
    type: 'object',
    properties: {
      summary: { type: 'string' },
      duration: { type: 'string' },
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
      receiver: { tring: 'string' },
      conv_id: { type: 'string' },
      thread_id: { type: 'string' },
      assignee_completed: { type: 'string' },
      due_time: { type: 'string' },
      group_id: { type: 'string' },
      rrule: { type: 'string' },
      location: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['owner_id', 'sip_id', 'company_id'],
  },
};

// update tasks
tasks.updateTasks = {
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
      receiver: { tring: 'string' },
      conv_id: { type: 'string' },
      thread_id: { type: 'string' },
      assignee_completed: { type: 'string' },
      due_time: { type: 'string' },
      group_id: { type: 'string' },
      rrule: { type: 'string' },
      location: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['owner_id', 'sip_id', 'company_id'],
  },
};

// delete tasks
tasks.deleteTasks = {
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
    required: ['uid', 'owner_id', 'sip_id', 'receiver', 'thread_id', 'msgid'],
  },
};

//getTasks
tasks.getTasks = {
  params: {
    type: 'object',
    properties: {
      sip_id: { type: 'string' },
    },
    required: ['sip_id'],
  },
};

/* ######################################################################################## */
export const tasksSchema = tasks;
