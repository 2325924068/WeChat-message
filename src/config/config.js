const randomRGB = require('../utils/getColor');

const config = {

  params: {
    appid: 'wx373c8f0fe9783279',
    secret: '21a9d6cdb23826c715e209928ee555fd',
    touser: 'oXoUL6y1tr3BT9GDX8e71kuWRz-w',
    template_id: 'YMh-iQO0bV4w5BzUgsYFERIvLF-9JEy0-_dOn-JjU5I',
  },

  weather: {
    appid: '35662718',
    appsecret: '80LRrVME',
    cityid: '101180301',
  },

  templateData: {
    data: {
      lizhi: { value: "", color: randomRGB() }, // 励志句子
      star: { value: "", color: randomRGB() }, // 星座运势
      date: { value: "", color: randomRGB() }, // 日期
      area: { value: "", color: randomRGB() }, // 地区
      pop: { value: "", color: randomRGB() }, // 降雨概率
      week: { value: "", color: randomRGB() }, // 天气
      lowest: { value: "", color: randomRGB() }, // 最低气温
      highest: { value: "", color: randomRGB() }, // 最高气温
      tips: { value: "", color: randomRGB() }, // 小贴士
      weather: { value: "", color: randomRGB() }, // 天气
    },
  }
}


/* 上述代码是需要自定义的配置项 */
function verifyEmpty() {
  let flag = '';
  let data = config.params;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (!data[key]) {
        flag = key
        break
      }
    }
  }
  return flag
}

// 校验为空
if (verifyEmpty()) {
  console.error(
    '警告：请完善 “/src/config/config.js中的配置项: ' +
    verifyEmpty() +
    '”的内容,再执行代码！'
  )
  process.exit(0)
}

module.exports = config;
