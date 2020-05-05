/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import MessageService from '../services/message.service';

const messageHandler: any = {};

// sendMessage
messageHandler.sendMessage = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.type = req.body.type;
    data.from = req.body.from;
    data.to = req.body.to;
    data.subject = req.body.subject;
    data.body = req.body.body;
    const messageSerevice = new MessageService();
    const sendMessageResult = await messageSerevice.sendMessage(data);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Message sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Message sent failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

// sendStanza
messageHandler.sendStanza = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.from = req.body.from;
    data.to = req.body.to;
    data.stanza = req.body.stanza;
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(data);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Message sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Message sent failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const messageHandlers: any = messageHandler;
