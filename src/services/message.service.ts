/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

import axios from 'axios';
import { config } from '../config/app';
const Client = require('@appunto/ejabberd-api-client');
// https://im01.unifiedring.co.uk :5281

class Message {
  public host: string;
  public port: string;
  public prefix: string;
  public client: any;
  constructor() {
    this.host = config.ejabberdHost;
    this.port = config.ejabberdPort;
    this.prefix = config.ejabberdApiPrefix;
    this.client = new Client(this.host, this.port);
  }

  /**
   * Send message
   */
  public async sendMessage(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.sendMessage(type, from, to, subject, body)
        return await this.client
          .sendMessage(data.type, data.from, data.to, data.subject, data.body)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response);
            reject(err.response.data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * sendStanza
   */
  public sendStanza(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.sendStanza(from, to, stanza)
        return await this.client
          .sendStanza(data.from, data.to, data.stanza)
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err.response.data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * sendDirectInvitation
   */
  public sendDirectInvitation(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataArr: any = {};
        dataArr.name = data.name;
        dataArr.service = data.service;
        dataArr.password = data.password;
        dataArr.reason = data.reason;
        dataArr.users = data.users;
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/send_direct_invitation`, dataArr)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * deleteOldMessage
   */
  public deleteOldMessage(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/delete_old_messages`, data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * deleteOldMamMessage
   */
  public deleteOldMamMessage(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/delete_old_mam_messages`, data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * deleteExpiredMessage
   */
  public deleteExpiredMessage() {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/delete_expired_messages`, {})
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * clearCache
   */
  public clearCache() {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/clear_cache`, {})
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

export default Message;
