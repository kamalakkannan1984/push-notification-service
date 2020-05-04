/**
 * @createdBy Kamal
 * @createdOn 5th May 2020
 */

import axios from 'axios';
import { config } from '../config/app';
const Client = require('@appunto/ejabberd-api-client');
// https://im01.unifiedring.co.uk :5281

class Health {
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
   * Status
   */
  public async status() {
    return new Promise(async (resolve, reject) => {
      try {
        return await this.client
          .status()
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
}

export default Health;
