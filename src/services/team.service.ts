/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

import axios from 'axios';
import { config } from '../config/app';
const Client = require('@appunto/ejabberd-api-client');
// https://im01.unifiedring.co.uk :5281

class Team {
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
   * createRoom
   */
  public async createRoom(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post('https://im01.unifiedring.co.uk:5443/api/create_room', data)
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
   * createTeamWithOpts
   */
  public createTeamWithOpts(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataArr: any = {};
        dataArr.name = data.name;
        dataArr.service = data.service;
        dataArr.host = data.host;
        dataArr.options = data.options;
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/create_room_with_opts`, dataArr)
          .then((response) => {
            // console.log(response);
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
   * getRoomOptions
   */
  public getRoomOptions(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.getRoomOptions(name, service)
        return await this.client
          .getRoomOptions(data.name, data.service)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            reject(err.response.data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * setRoomAffiliation
   */
  public setRoomAffiliation(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataArr: any = {};
        dataArr.name = data.name;
        dataArr.service = data.service;
        dataArr.jid = data.jid;
        dataArr.affiliation = data.affiliation;
        console.log(dataArr);
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/set_room_affiliation`, dataArr)
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
   * getRoomAffiliations
   */
  public getRoomAffiliations(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.getRoomAffiliations(name, service)
        return await this.client
          .getRoomAffiliations(data.name, data.service)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            resolve(err.response.data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * subscribeRoom
   */
  public subscribeRoom(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.subscribeRoom(user, nick, room, nodes)
        return await this.client
          .subscribeRoom(data.user, data.nick, data.room, data.nodes)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            reject(err.response.data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * unsubscribeRoom
   */
  public unsubscribeRoom(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.unsubscribeRoom(user, room)
        return await this.client
          .unsubscribeRoom(data.user, data.room)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            reject(err.response.data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  /**
   * destroyRoom
   */
  public destroyRoom(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // client.destroyRoom(name, service)
        return await this.client
          .destroyRoom(data.name, data.service)
          .then((result: any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err: any) => {
            console.log(err.response.data);
            resolve(err.response.data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * changeRoomOption
   */
  public changeRoomOption(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/change_room_option`, data)
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
   * getUserRooms
   */
  public getUserRooms(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        return await axios
          .post(`https://${this.host}:${this.port}/${this.prefix}/get_user_rooms`, data)
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

export default Team;
