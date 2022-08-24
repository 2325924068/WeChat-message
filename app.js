const config = require('./src/config/config');
const { getWeather,getZaoan,getStar } = require('./src/utils/getData');
const { getToken, sendMessage } = require('./src/utils/getToken');


async function start() {
  try {

    let weatherData = await getWeather();
    let zaoan = await getZaoan();
    let starData = await getStar();
    config.access_token = await getToken(config);

    console.log(starData);

    config.templateData.data.lizhi.value = zaoan; // 励志句子
    config.templateData.data.star.value = starData; // 星座运势
    config.templateData.data.date.value = weatherData.date + ' ' + weatherData.week; // 日期
    config.templateData.data.area.value = weatherData.area;//地区
    config.templateData.data.pop.value = weatherData.pop + '%'; // 降雨概率
    config.templateData.data.week.value = weatherData.week;// 天气
    config.templateData.data.lowest.value = weatherData.lowest; // 最低气温
    config.templateData.data.highest.value = weatherData.highest;// 最高气温
    config.templateData.data.tips.value = weatherData.tips;// 小贴士
    config.templateData.data.weather.value = weatherData.weather;// 天气

  } catch (error) {
    console.log(error)
    process.exit(0)
  }



  sendMessage(config)
    .then((res) => {
      if (res.data && res.data.errcode) {
        console.error('发送失败', res.data)
        return
      }
      console.log('发送成功-请在微信上查看对应消息')
    })
    .catch((err) => console.error('发送失败', err))
}

start()
