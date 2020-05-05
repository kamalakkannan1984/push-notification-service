/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

export const tasksModel: any = {};

// create tasks
tasksModel.createTasks = (data: any, tasksCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await tasksCollection.insertOne(data);
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// update tasks
tasksModel.updateTasks = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete tasks
tasksModel.deleteTasks = (data: any, tastsCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete tasks');
      const deleteItem = tastsCollection.deleteMany(data);
      resolve(deleteItem);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
