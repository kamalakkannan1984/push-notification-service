/**
 *
 */

export const userModel: any = {};

/**
 * @param {String} userName - where codition to fetch data
 */
userModel.findUserByUsername = (userName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

//module.exports = userModel;
