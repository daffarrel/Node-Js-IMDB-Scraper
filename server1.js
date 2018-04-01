var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  url = 'https://www.linkedin.com/in/subhadeep-bhattacharyya-13168428/edit/topcard/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      console.log(html);

      var sectionHead, sectionMiddle, sectionEnd;
      var json = { sectionHead : "", sectionMiddle : "", sectionEnd : ""};

      $('.modal-content-wrapper').filter(function(){
        var data = $(this);
        sectionHead = data.children().first().text().trim();
  		sectionMiddle = data.children().eq(2).text().trim();
  		sectionEnd = data.children().eq(3).text().trim();
        json.sectionHead = sectionHead;
        json.sectionMiddle = sectionMiddle;
        json.sectionEnd = sectionEnd;
      })

    }

    fs.writeFile('output1.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
