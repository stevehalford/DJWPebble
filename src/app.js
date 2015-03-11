/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

// Show splash
var splashCard = new UI.Card({
    title: "Design Jobs Wales",
    body: "Downloading..."
});

splashCard.show();

var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
      
      var item = data[i];
       
      // Add to menu items array
      items.push({
          title : item.title,
          subtitle : item.city
      });
  }
 
  // Finally return whole array
  return items;
};

var URL = 'http://www.designjobswales.co.uk/jobs';

// Download data
ajax({url: URL, type: 'json'},
    function(data) {
        
        var items = parseFeed( data, 10 );
        
        var resultsMenu = new UI.Menu({
            sections: [{
                title: 'Design Jobs Wales',
                items: items
            }]
        });
            
        resultsMenu.on('select', function(e) {
            var item = data[e.itemIndex];
            
            var detailCard = new UI.Card({
                title : item.title,
                subtitle : item.city,
                body : item.description,
                scrollable : true,
                style : "small"
            });
            
            detailCard.show();
        });
        
        resultsMenu.show();
        splashCard.hide();

    },
    function(error) {
        console.log('Ajax failed: ' + error);
    }
);


