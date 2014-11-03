# Description
#   A Hubot script that returns my-fav features
#
# Configuration:
#   None
#
# Commands:
#   hubot my-fav-features - my-fav features
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'

  robot.respond /my[ -]?fav[ -]?features$/i, (res) ->
    baseUrl = 'http://www.my-fav.jp'
    request
      method: 'GET'
      url: baseUrl + '/feature/'
    .then (r) ->
      $ = cheerio.load r.body
      features = []
      $('#FeatureEnable li a').each ->
        e = $ @
        url = baseUrl + e.attr('href')
        image = baseUrl + e.find('img').attr('src')
        title = e.find('img').attr('alt')
        features.push { url, image, title }
      messages = features
        .filter (_, i) ->
          i < 5
        .map (i) ->
          """
          #{i.image}
          #{i.title}
          #{i.url}
          """
        .join '\n\n'
      res.send messages
