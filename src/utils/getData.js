var axios = require('axios');
var moment = require('moment');
const config = require('../config/config');
var calendarFormatter = require('./dateChange');
//获取天气 http://wthrcdn.etouch.cn/weather_mini?city=上海市
//https://v0.yiketianqi.com/free/day

//https://devapi.qweather.com/v7/weather/now

let key = config.data.key;

const getWeather = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/tianqi/index', {
            params: {
                key,
                city: config.data.city,
            }
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0]);
            } else {
                reject(`天气获取失败-${res.data}`);
            }
        }).catch(err => {
            reject(`天气获取失败-${err}`);
        })
    });
}

//早安心语 http://api.tianapi.com/zaoan/index
const getZaoan = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/zaoan/index', {
            params: { key, }
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0].content);
            } else {

                saylove().then(res=>{
                    if(res){
                        resolve(res);
                    }else{
                        reject(`精美句子获取失败-${res.data}`);
                    }
                }).catch(err=>{
                    reject(`精美句子获取失败-${res.data}`);
                });
            }
        }).catch(err => {
            reject(`早安心语获取失败-${err}`);
        })
    });
}

const saylove = ()=>{
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/dujitang/index', {
            params: { key, }
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0].content);
            } else {
                reject(`土味情话获取失败-${res.data}`);
            }
        }).catch(err => {
            reject(`土味情话获取失败-${err}`);
        })
    });
}

//星座运势 http://api.tianapi.com/star/index
const getStar = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/star/index', {
            params: {
                key,
                astro: config.data.astro
            }
        }).then(res => {
            if (res.data.code == 200) {
                let str = res.data.newslist[8].content;
                resolve(str);
            } else {
                reject(`星座运势获取失败-${res.data}`);
            }
        }).catch(err => {
            reject(`星座运势获取失败-${err}`);
        })
    });
}

const countDown = (time) => {
    let date, _date;

    const getDate = (time) => {
        let date = time ? new Date(time) : new Date();
        let t = date.getTime();
        let n = date.getFullYear();
        let y = date.getMonth() + 1;
        let r = date.getDate();
        return [n, y, r, t]
    };

    date = getDate() //获取现在的时间

    _date = getDate(time) //获取定义的时间

    _date[0] = date[0];

    let gongli = calendarFormatter.lunar2solar(Number(_date.slice(0, 3)[0]), Number(_date.slice(0, 3)[1]), Number(_date.slice(0, 3)[2])); //农历转公历

    _date = getDate(`${gongli.cYear}-${gongli.cMonth}-${gongli.cDay}`);

    //判断
    if (date[1] > _date[1]) {

        _date[0] = date[0] + 1;

        _date = getDate(_date.slice(0, 3).join('-'));

    } else if (date[1] == _date[1] && date[2] > _date[2]) {

        _date[0] = date[0] + 1;

        _date = getDate(_date.slice(0, 3).join('-'));

    }

    let times = (_date[3] - date[3]) / 1000;

    let str = '';

    let t = parseInt(times / (24 * 60 * 60)) //天数
    let h = parseInt(times / (60 * 60) % 24); //小时

    str += t ? t + '天' : '';

    str += h + '小时';

    if (t == 0 && h < 24) {
        str = '好激动呀！还有' + h + '小时就是您的生日了';
    } else if (t == 0 && h <= 0) {
        str = '今天你最大，生日快乐！';
    };

    return str;
};

function showTime(time) {
    //获取目的日期
    var endTime = Number(new Date(time));
    //获取当前时间
    var nowTime = Date.now();
    //获取时间差
    var timediff = Math.round((nowTime - endTime) / 1000);
    //获取还剩多少天
    var day = parseInt(timediff / 3600 / 24);
    //输出还剩多少时间

    let n, t,str = '';

    n = parseInt(day / 365);

    if (n) {
        t = day - (n * 365);
    } else {
        t = day;
    }

    str += n ? n + '年 ' : '';

    str += t + '天';

    return str;
};

module.exports = {
    getWeather,
    getZaoan,
    getStar,
    countDown,
    showTime,
}