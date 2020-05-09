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
eventModel.updateEvent = (uid: string, data: any, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('update Event');
      const res = await eventCollection.updateOne({ UID: uid }, { $set: data });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete event
eventModel.deleteEvent = (data: any, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete event');
      const deleteItem = eventCollection.deleteMany(data);
      resolve(deleteItem);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// getTasks
eventModel.getEvent = (data: any, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get event');
      const res = await eventCollection.findOne({ sip_id: data.sip_id }, { _id: 0 });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
