'user strict'
var superagent = require('superagent');
// var superagent2 = require('superagent');
var cheerio = require('cheerio');
var config = require('./config');
var jobList = require('./data/job');
var async = require('async')
var nodejieba = require("nodejieba");


//首先  获取所有职位类别链接
function getLink(cb) {
	var jobinfos = [];	
	// console.log(jobList);
	for (var i = 0; i < jobList.length; i++) {
		var page = Math.ceil(jobList[i].number/60);
		//职位信息
		var jobinfo = [];
		var links = [];
		for (var y = 1; y <= page; y++) {
			var url = config.url.job_url+jobList[i].code+'&jl=%E5%8C%97%E4%BA%AC&sm=0&p='+y+'&kt=2&isfilter=1&fl=653&isadv=0';
			links.push(url);	
		}
		// console.log(links);
		//记录职位名称以及职位地址
		jobinfos.push({
			jobName:jobList[i].name,
			jobLinks:links
		});
	}
	cb(null,jobinfos);
}

//爬取详细页面(网页源码)
//业务逻辑，根据大类进行分别爬取，分别保存，然后分词进行统计
function getDetailLink(jobinfos,cb) {
	// console.log('123');
	console.log(jobinfos[0].jobLinks);
	for (var i = 0; i < jobinfos.length; i++) {

		async.eachLimit(jobinfos[i].jobLinks,5,function(item, callback) {
  			superagent.get(item).end(function (err, sres) {
  				if (err) {
					console.log('fuck！获取页面失败！');
				}
				else{
					console.log('load.. 获取页面中');
					// console.log(sres.text);
					getAllLink(sres.text);
					// callback();
			}

  			});

		});
		// getGpz(jobinfos[i]);

	}

}

//获取所有招聘链接
function getAllLink(html) {
	var $ = cheerio.load(html);
	var hrefs = [];
	console.log('页面职位数：'+$('.newlist_list_content .zwmc a').length);
	// console.log(html);
	$('.newlist_list_content .zwmc a').each(function(idx,element) {
		var $element = $(element);
		var href = $element.attr('href');

		getGpz(href);


	});
}

//解析高频词汇
function getGpz(zwurl) {
	// console.log('-----'+zwurl);
	superagent.get(zwurl+'l').end(function(err,sres) {
		var $ = cheerio.load(sres.text);
		var itemp;
		// console.log($('getGpz:'+'.tab-inner-cont').length);
		$('.tab-inner-cont p').each(function(idx,element) {
			if (idx>1) {
				itemp += $(element).text();
			}
		});
		var topN = 4;
		// console.log(nodejieba.extract(itemp, topN));
		console.log(nodejieba.tag(itemp));
		// console.log(itemp);
		// console.log(sres.text);
	});

}



//等待函数
function sleep(seconds) {
    var startTime = new Date().getTime();       // get the current time
    while (new Date().getTime() < startTime + seconds*1000);    // hog cpu
};

function start() {
	async.waterfall([
        getLink,
        getDetailLink
    ], function (err, result) {
        if(err) {
            console.log('error: ' + err);
        } else {
            console.log(jobLink.length)
            console.log('任务完成！！！');
        }
    });
}

start();