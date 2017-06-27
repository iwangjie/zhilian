'user strict'
var superagent = require('superagent');
var cheerio = require('cheerio');
var config = require('./config');
var url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%8C%97%E4%BA%AC&isadv=0&ispts=1&isfilter=1&p=1&bj=160000&sj=045';
//获取职位类别以及编码

function start() {
	var job = [];
	var opt = [{
		Referer:url,
		'User-Agent':config.url.opt
	}];

	//爬取逻辑
	superagent.get(url)
		.set(opt)
		.end(function(err,sres) {
			//发生错误
			if (err) {
				console.log(err);
			}
			else{
				// console.log(sres.text);
				//解析工作类型
				var $ = cheerio.load(sres.text);
				//获取所有职位a标签
				var links  = $('#search_jobtype_tag a').toArray();
				//循环push到数组中
				for (var i = 2; i < links.length; i++) {
					var type = $(links[i]).attr('href').split('&');
					//取编码
					job.push({
						code:type[type.length - 1 ].split('=')[1],
						name:$(links[i]).text().split('(')[0],
						number:parseInt($(links[i]).children('font').text())
					});
				}
			}
			console.log(job);

		});
		
}
start();