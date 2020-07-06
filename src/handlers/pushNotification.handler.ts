/**
 * @createdBy Kamal
 * @createdOn 18th June 2020
 */

const FCM = require('fcm-node');
import PushNotifications from 'node-pushnotifications';
import { config } from '../config/app';
import { userModel } from '../models/user';
const pushNotificationHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - pushNotification
 */
pushNotificationHandler.pushNotification = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    const registration_token: any = [];
    let token = '';
    data.campaign_name = req.body.campaign_name;
    data.application = req.body.application;
    data.device_type = req.body.device_type;
    data.target_audience = req.body.target_audience;
    data.marketing_content = req.body.marketing_content;
    const result = await userModel.getDeviceTokenDetails(data.application, data.device_type, data.target_audience);
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        token = result[i].MessageToken;
      }
      const serverKey = config.FCMkey; // put your server key here
      const fcm = new FCM(serverKey);
      const message = {
        // this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: token,
        collapse_key: '',

        notification: {
          title: data.marketing_content.title,
          body: data.marketing_content.body,
        },

        /*data: {
          // you can send only notification or only data(or include both)
          my_key: 'my value',
          my_another_key: 'my another value',
        }, */
      };
      console.log(message);
      fcm.send(message, (err: any, response: any) => {
        if (err) {
          console.log(err);
          res.send({ status_code: 200, error_code: -1, message: 'notification sent failed' });
        } else {
          console.log(response);
          res.send({ status_code: 200, error_code: 0, message: 'notification sent successfully' });
        }
      });
    } else {
      res.send({ status_code: 200, message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - inAppPushNotification
 */
pushNotificationHandler.inAppPushNotification = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    const registration_token: any = [];
    let token = '';
    data.campaign_name = req.body.campaign_name;
    data.application = req.body.application;
    data.device_type = req.body.device_type;
    data.target_audience = req.body.target_audience;
    data.marketing_content = req.body.marketing_content;
    const result = await userModel.getDeviceTokenDetails(data.application, data.device_type, data.target_audience);

    for (let i = 0; i < result.length; i++) {
      token = result[i].MessageToken;
    }
    const serverKey = config.FCMkey; // put your server key here
    const fcm = new FCM(serverKey);
    const message = {
      // this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: token,
      collapse_key: '',

      notification: data.marketing_content,

      /*data: {
        // you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value',
      }, */
    };
    await fcm.send(message, function (err: any, response: any) {
      if (err) {
        console.log(err);
        res.send({ status_code: 200, message: 'notification sent failed' });
      } else {
        console.log(response);
        res.send({ status_code: 200, message: 'notification sent successfully' });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const pushNotificationHandlers: any = pushNotificationHandler;
