var axios = require('axios');
var cheerio = require('cheerio');

axios.request({
  url: 'https://news.sina.com.cn/china/'
}).then(res => {
  //爬列表
  var $ = cheerio.load(res.data);
  var urls = [];
  $('a').each((i, e) => {
    var href = $(e).attr('href');
    if(href && href.match(/https:\/\/news.sina.com.cn\//)) {
      urls.push(href);
    }
  });
  return urls.splice(0, 10);  //演示，象征性地爬一下就好了
}).then(urls => {
  //爬详情
  urls.forEach(url => {
    axios.request(url).then(res => {
      var $ = cheerio.load(res.data);
      var title = $('h1.main-title').text();
      var date = $('div.date-source span.date').text();
      var from = $('div.date-source a.source').text()
      console.log(title, date, from);
    })
  })
})
