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
      const res = await eventCollection.update({ uid: uid }, { $set: data }, { multi: true });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete event
eventModel.deleteEvent = (uid: string, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete event');
      const deleteItem = eventCollection.deleteMany({ uid: uid });
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
      eventCollection
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
        .then((event: any) => {
          resolve(event);
        });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

eventModel.getEventByUid = (uid: string, eventCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get event');
      const res = eventCollection.findOne({ uid: uid });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
