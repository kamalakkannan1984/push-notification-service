/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

export const eventModel: any = {};

// create event
eventModel.createEvent = (data: any, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await eventCollection.insertOne(data);
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// update event
eventModel.updateEvent = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete event
eventModel.deleteEvent = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
