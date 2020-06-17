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
      const res = await tasksCollection.update({ uid: uid }, { $set: data }, { multi: true });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete tasks
tasksModel.deleteTasks = (uid: string, tastsCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete tasks');
      const deleteItem = tastsCollection.deleteMany({ uid: uid });
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
      tastsCollection
        .find({
          $or: [
            {
              sip_id: data.sip_id,
            },
            {
              conv_id: data.sip_id,
            },
          ],
        })
        .project({ _id: 0 })
        .toArray()
        .then((tasks: any) => {
          resolve(tasks);
        });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

tasksModel.getTaskByUid = (uid: string, tastsCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get task');
      const res = tastsCollection.findOne({ uid: uid });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
