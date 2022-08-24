var axios = require('axios')

//获取天气 http://wthrcdn.etouch.cn/weather_mini?city=上海市
//https://v0.yiketianqi.com/free/day

const getWeather = ((data) => {
    return new Promise((resolve, reject) => {
        axios.get('https://v0.yiketianqi.com/free/day', {
            params: { ...data.weather }
        }).then(res => {
            if(res.data && res.data.nums){
                resolve(res.data);
            }else{
                reject(`天气获取失败-${res.data}`);
            }
        }).catch(err => {
            reject(`天气获取失败-${err}`);
        })
    });
})

module.exports = {
    getWeather
}