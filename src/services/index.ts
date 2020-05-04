const Client = require('@appunto/ejabberd-api-client');
//https://im01.unifiedring.co.uk :5281
const client = new Client('im01.unifiedring.co.uk', 5443);
import axios from 'axios';

export const ejabberdService: any = {};

//register
ejabberdService.register = async function (user: any, host: any, password: any) {
  try {
    return await client
      .register(user, host, password)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//send message
ejabberdService.sendMessage = async function (data: any) {
  try {
    //client.sendMessage(type, from, to, subject, body)
    return await client
      .sendMessage(data.type, data.from, data.to, data.subject, data.body)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//add_rosteritem
ejabberdService.add_rosteritem = async function (data: any) {
  try {
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/add_rosteritem', data)
      .then((response) => {
        //console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

//sendStanza
ejabberdService.sendStanza = async function (data: any) {
  try {
    //client.sendStanza(from, to, stanza)
    return await client
      .sendStanza(data.from, data.to, data.stanza)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//create room OR create team
ejabberdService.createRoom = async function (data: any) {
  try {
    //client.createRoom(name, service, host)
    /*return await client.createRoom(data.name, data.service, data.host).then((result: any) => {
            console.log(result);
            return result;
        }).catch((err: any) => {
            console.log(err.response.data);
            return err.response.data;
        }); */
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/create_room', data)
      .then((response) => {
        //console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

//createTeamWithOpts
ejabberdService.createTeamWithOpts = async function (data: any) {
  try {
    //client.createRoomWithOpts(name, service, host, options)
    /*return await client.createRoomWithOpts(data.name, data.service, data.host, data.options).then((result: any) => {
            console.log(result);
            return result;

        }).catch((err: any) => {
            console.log(err.response.data);
            return err.response.data;

        }); */
    const dataArr: any = {};
    dataArr.name = data.name;
    dataArr.service = data.service;
    dataArr.host = data.host;
    dataArr.options = data.options;
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/create_room_with_opts', dataArr)
      .then((response) => {
        //console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

//get_room_options
ejabberdService.getRoomOptions = async function (data: any) {
  try {
    //client.getRoomOptions(name, service)
    return await client
      .getRoomOptions(data.name, data.service)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

// set_room_affiliation
ejabberdService.setRoomAffiliation = async function (data: any) {
  try {
    let dataArr: any = {};
    dataArr.name = data.name;
    dataArr.service = data.service;
    dataArr.jid = data.jid;
    dataArr.affiliation = data.affiliation;
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/set_room_affiliation', dataArr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

//get_room_affiliations
ejabberdService.getRoomAffiliations = async function (data: any) {
  try {
    //client.getRoomAffiliations(name, service)
    return await client
      .getRoomAffiliations(data.name, data.service)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//subscribe_room
ejabberdService.subscribeRoom = async function (data: any) {
  try {
    //client.subscribeRoom(user, nick, room, nodes)
    return await client
      .subscribeRoom(data.user, data.nick, data.room, data.nodes)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//unsubscribe_room
ejabberdService.unsubscribeRoom = async function (data: any) {
  try {
    //client.unsubscribeRoom(user, room)
    return await client
      .unsubscribeRoom(data.user, data.room)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

//destroy_room
ejabberdService.destroyRoom = async function (data: any) {
  try {
    //client.destroyRoom(name, service)
    return await client
      .destroyRoom(data.name, data.service)
      .then((result: any) => {
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err.response.data);
        return err.response.data;
      });
  } catch (err) {
    console.log(err);
  }
};
//send_direct_invitation
ejabberdService.sendDirectInvitation = async function (data: any) {
  try {
    //client.sendDirectInvitation(name, service, password, reason, users)
    /*console.log(data);
        return await client.sendDirectInvitation(data.name, data.service, data.password, data.reason, data.users).then((result: any) => {
            console.log(result);
            return result;
        }).catch((err: any) => {
            console.log(err);
            return err.response;

        });*/

    let dataArr: any = {};
    dataArr.name = data.name;
    dataArr.service = data.service;
    dataArr.password = data.password;
    dataArr.reason = data.reason;
    dataArr.users = data.users;
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/send_direct_invitation', dataArr)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

//change_room_option
ejabberdService.changeRoomOption = async function (data: any) {
  try {
    //client.changeRoomOption(name, service, option, value)
    /*return await client.changeRoomOption(data.name, data.service, data.option, data.value).then((result: any) => {
            console.log(result);
            return result;
        }).catch((err: any) => {
            console.log(err);
            return err.response;

        }); */
    return await axios
      .post('https://im01.unifiedring.co.uk:5443/api/change_room_option', data)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
