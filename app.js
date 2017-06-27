'user strict'
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var url = require('url');


//爬取智联招聘
var zhilian = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%8C%97%E4%BA%AC&kw=java&p=1&isadv=0';
var zpUrls = [];

function start() {
	
}

//获取所有相关职业列表和页数
var jobListUrl = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%8C%97%E4%BA%AC&isadv=0&ispts=1&isfilter=1&p=1&bj=160000&sj=045';
var jobList = [];

function getLink(argument) {
	// body...
}
superagent.get(jobListUrl).end(function(err,sres) {
	
});












// getzpUrls(zhilian);
// 	//获取招聘信息地址
// 	function getzpUrls(url) {
// 		//已爬取URL
// 		console.log('已经爬取链接数量：'+zpUrls.length);
// 		superagent.get(zhilian).end(function(err,sres) {
// 			//解析页面
// 			var $ = cheerio.load(sres.text);
// 			//解析招聘信息列表
// 			$('.newlist_list_content .zwmc a').each(function(idx,element) {
// 				//解析招聘信息链接
// 				var $element = $(element);
// 				zpUrls.push($element.attr('href'));
// 			});
// 			//是否存在下一页
// 			var next = $('.pagesDown-pos a').attr('href');
// 			if (next) {
// 				console.log('下一页地址：'+next);
// 				//继续爬取下一页
// 				getzpUrls(next);
// 			}
// 		});
// 	}
