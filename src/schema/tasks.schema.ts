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
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// update tasks
tasks.updateTasks = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

// delete tasks
tasks.deleteTasks = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
};

/* ######################################################################################## */
export const tasksSchema = tasks;
