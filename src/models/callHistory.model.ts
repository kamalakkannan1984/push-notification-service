/**
 * @createdBy Kamal
 * @createdOn 10th June 2020
 */

export const callHistoryModel: any = {};

/**
 * save call history
 */
callHistoryModel.saveCallHistory = (data: any, callCollection: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await callCollection.insertOne(data);
            resolve(res);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

/**
 * update call history
 */
callHistoryModel.updateCallHistory = (uid: string, data: any, callCollection: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('update call history');
            const res = await callCollection.updateOne({ uid: uid }, { $set: data });
            resolve(res);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

/**
 * delete call history
 */
callHistoryModel.deleteCallHistory = (uid: string, callCollection: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('delete call history');
            const deleteItem = callCollection.deleteMany({ uid: uid });
            resolve(deleteItem);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

/**
 * get call history by caller id
 */
callHistoryModel.getCallHistory = (data: any, callCollection: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('get call history');
            callCollection
                .find({
                    $or: [{
                        "sender": data.sender
                    }, {
                        "receiver": data.sender
                    }]
                })
                .project({ _id: 0 })
                .toArray()
                .then((event: any) => {
                    resolve(event);
                })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

/**
 * get call history by UUID
 */
callHistoryModel.getCallhistoryByUid = (uid: string, callCollection: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('get call history');
            const res = callCollection.findOne({ uid: uid });
            resolve(res);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
