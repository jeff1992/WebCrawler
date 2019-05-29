var axios = require('axios');
var cheerio = require('cheerio');


axios.request({
  url: 'https://news.sina.com.cn/china/'
}).then(res => {
  // 通过 load 方法把 HTML 代码转换成一个 jQuery 对象
  var $ = cheerio.load(res.data);
  $('a').each((i, e) => {
    var title = $(e).text();
    var href = $(e).attr('href');
    if(href && href.match(/https:\/\/news.sina.com.cn\//)) {  //筛选出指向新闻的链接
      console.log(`title:${title}  href:${href}`);
      //接下来进行存储...
    }
  })
}).catch(res => {
  console.log(res);
})
