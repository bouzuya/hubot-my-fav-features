// Description
//   A Hubot script that returns my-fav features
//
// Configuration:
//   None
//
// Commands:
//   hubot my-fav-features - my-fav features
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/my[ -]?fav[ -]?features$/i, function(res) {
    var baseUrl;
    baseUrl = 'http://www.my-fav.jp';
    return request({
      method: 'GET',
      url: baseUrl + '/feature/'
    }).then(function(r) {
      var $, features, messages;
      $ = cheerio.load(r.body);
      features = [];
      $('#FeatureEnable li a').each(function() {
        var e, image, title, url;
        e = $(this);
        url = baseUrl + e.attr('href');
        image = baseUrl + e.find('img').attr('src');
        title = e.find('img').attr('alt');
        return features.push({
          url: url,
          image: image,
          title: title
        });
      });
      messages = features.filter(function(_, i) {
        return i < 5;
      }).map(function(i) {
        return "" + i.image + "\n" + i.title + "\n" + i.url;
      }).join('\n\n');
      return res.send(messages);
    });
  });
};
