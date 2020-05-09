/**
 * @createdBy Kamal
 * @createdOn 26th April 2020
 */

import axios from 'axios';
import { config } from '../config/app';
const Client = require('@appunto/ejabberd-api-client');
// https://im01.unifiedring.co.uk :5281

class User {
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
   * Register
   */
  public register(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .register(data.user, data.host, data.password)
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            reject(err.response);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * addRosteritem
   */
  public async addRosteritem(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/add_rosteritem`, data)
          .then((response) => {
            // console.log(response);
            resolve(response);
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
   * registeredUsers
   */
  public async registeredUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .registeredUsers(this.host)
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * getPresence
   */
  public async getPresence(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .getPresence(data.user, data.server)
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * connectedUsers
   */
  public connectedUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .connectedUsers()
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * connectedUsersNumber
   */
  public connectedUsersNumber() {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .connectedUsersNumber()
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * changePassword
   */
  public changePassword(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .changePassword(data.user, data.host, data.newpass)
          .then((result: any) => {
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err);
            reject(err.response);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * userSessionInfo
   */
  public userSessionInfo(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/user_sessions_info`, data)
          .then((response) => {
            console.log(response);
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

export default User;
