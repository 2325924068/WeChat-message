var axios = require('axios')
const randomRGB = require('../utils/getColor');

//获取微信token
const getToken = (data) => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                grant_type: 'client_credential',
                appid:data.params.appid,
                secret:data.params.secret,
            }
        }).then(res => {
            if (res.data && res.data.errcode) {
                reject(data)
                return
            }
            resolve(res.data.access_token);
        }).catch(err => {
            reject(err);
        })

    })
}

// 发送给微信
const sendMessage = (data) => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${data.access_token}`;

    const wxTemp = {
        touser: data.params.touser,
        template_id: data.params.template_id,
        topcolor: randomRGB(),
        data: {
            ...data.templateData.data,
        },
    };

    return axios.post(url, { ...wxTemp })
};

module.exports = {
    getToken,
    sendMessage,
};