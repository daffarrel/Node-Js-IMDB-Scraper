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

      var fname, lname, Headline;
      var json = { First_Name : "", Last_Name : "", Headline : ""};

      $('.pe-s-multi-field').filter(function(){
        var data = $(this);
        
	fname = data.children().first().text();
	
	lname = data.children().last().children().text();

	})
	var abcd = $('.ember-text-field pe-form-field__text-input ember-view','#topcard-headline').text();
	$('#topcard-headline').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                Headline = data.val();

        json.First_Name = fname;
	json.Last_Name = lname;
        json.Headline = abcd;
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
