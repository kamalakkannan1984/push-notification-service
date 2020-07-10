/**
 * @createdBy Kamal
 * @createdOn 18th June 2020
 */

const FCM = require('fcm-node');
import PushNotifications from 'node-pushnotifications';
import { config } from '../config/app';
import { userModel } from '../models/user';
import apn from 'apn';
import path from 'path';
import fs from 'fs';
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
    console.log(result);
    const serverKey = config.FCMkey; // put your server key here
    const fcm = new FCM(serverKey);
    let message = {};
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        token = result[i].MessageToken;
        message = {
          // this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: token,
          collapse_key: '',
          notification: {
            title: data.marketing_content.title,
            body: data.marketing_content.body,
          },
        };
        console.log(message);
        fcm.send(message, (err: any, response: any) => {
          if (err) {
            console.log(err);
            //res.send({ status_code: 200, error_code: -1, message: 'notification sent failed' });
          } else {
            console.log(response);
          }
        });
        //
        var options = {
          /*token: {
            key: fs.readFileSync(path.resolve('certfile/vectone_push_notification.p12')),
            keyId: '123456',
            teamId: 'developer-team-id',
          }, */

          cert: fs.readFileSync(path.resolve('certfile/vectone_push_notification.p12')),
          key: fs.readFileSync(path.resolve('certfile/vectone_push_notification.p12')),
          passphrase: '123456',
          production: false,
        };
        console.log(options);
        var apnProvider = new apn.Provider(options);
        console.log(apnProvider);
        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = 'ping.aiff';
        note.alert = '\uD83D\uDCE7 \u2709 You have a new message';
        note.payload = { messageFrom: 'John Appleseed' };
        //note.topic = '<your-app-bundle-id>';

        // tslint:disable-next-line: no-shadowed-variable
        apnProvider.send(note, token).then((result) => {
          // see documentation for an explanation of result
          console.log(result);
        });
        //
      }

      res.send({ status_code: 200, error_code: 0, message: 'notification sent successfully' });
    } else {
      res.send({ status_code: 200, error_code: -1, message: 'User not found' });
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
