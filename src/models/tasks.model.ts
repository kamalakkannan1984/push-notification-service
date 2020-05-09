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
tasksModel.updateTasks = (uid: string, data: any, tasksCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('update tasks');
      const res = await tasksCollection.updateOne({ UID: uid }, { $set: data });
      resolve(res);
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

// getTasks
tasksModel.getTasks = (data: any, tastsCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get tasks');
      const res = await tastsCollection.findOne({ sip_id: data.sip_id }, { _id: 0 });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
