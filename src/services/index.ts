

const Client = require('@appunto/ejabberd-api-client');
//https://im01.unifiedring.co.uk :5281
const client = new Client('im01.unifiedring.co.uk', 5443);
import axios from 'axios';

export const ejabberdService: any = {};

//register
ejabberdService.register = async function (user: any, host: any, password: any) {
    try {
        return await client.register(user, host, password).then((result: any) => {
            return result;
        }).catch((err: any) => {
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
        return await client.sendMessage(data.type, data.from, data.to, data.subject, data.body).then((result: any) => {
            return result;
        }).catch((err: any) => {
            console.log(err.response.data);
            return err.response.data;
        });
    } catch (err) {
        console.log(err);
    }
}

//add_rosteritem
ejabberdService.add_rosteritem = async function (data: any) {
    try {
        /*"localuser": "user1",
        "localhost": "myserver.com",
        "user": "user2",
        "host": "myserver.com",
        "nick": "User 2",
        "group": "Friends",
        "subs": "both" */
        /*
         id: 8238,
      mobileno: '',
      ext: 690,
      caller_id: 'PPC Team',
      login_user_name: '690@vectone.com',
      sip_login_id: '2703',
      tmestmp: '1580820972',
      user_status: '',
      email_id: 's.prasanna@vectone.com',
      status_msg: '',
      company_id: 1698,
      direct_no: null,
      ImageURL: null,
      first_name: 'PPC',
      last_name: 'Team',
      company_name: 'Unifiedring',
      is_muted: 0,
      is_blocked: 0,
      is_favourite: 0,
      department: 'PPC ',
      role_name: 'Registered'
        */
        const localuser = data.localuser;
        const localserver = data.localhost;
        const user = data.user;
        const server = data.host;
        const nick = data.nick;
        const group = data.group;
        const subs = data.subs;
        return await axios.post('https://im01.unifiedring.co.uk:5443/api/add_rosteritem', data)
            .then((response) => {
                //console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });

        /*console.log(client);
        await client.addRosteritem(localuser, localhost, user, host, nick, group, subs).then((result: any) => {
            return result;
        }).catch((err: any) => {
            console.log(err.response.data);
        });*/
    } catch (err) {
        console.log(err);
    }
}

