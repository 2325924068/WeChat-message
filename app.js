const config = require('./src/config/config');
const { getWeather } = require('./src/utils/getData');
const { getToken, sendMessage } = require('./src/utils/getToken');


async function start() {
  try {

    let weatherData = await getWeather(config);
    config.access_token = await getToken(config);

    config.templateData.data.lizhi.value = config.weather.city; // 励志句子
    config.templateData.data.star.value = config.weather.city; // 星座运势
    config.templateData.data.date.value = weatherData.date + ' ' + weatherData.week; // 日期
    config.templateData.data.area.value = weatherData.city;//地区
    config.templateData.data.pop.value = weatherData.humidity; // 降雨概率
    config.templateData.data.week.value = config.weather.wea;// 天气
    config.templateData.data.lowest.value = weatherData.tem_night + ' ℃'; // 最低气温
    config.templateData.data.highest.value = weatherData.tem_day  + ' ℃';// 最高气温
    config.templateData.data.tips.value = weatherData.ganmao;// 小贴士
    config.templateData.data.weather.value = weatherData.wea;// 天气

  } catch (error) {
    console.log(error)
    process.exit(0)
  }

  console.log(config);

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
