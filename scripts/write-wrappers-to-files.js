var Dfp = require('../../node-google-dfp-wrapper/index.js');
var Bluebird = require('bluebird');
var jsonfile = require('jsonfile');

// These are created by you in the configuration step
var config = require('../local/config')

// These are output by DFP as part of the DFP project authorization step.
var credentials = require('../local/application-creds');

// This is obtained as part of the obtain refresh token step
var refreshToken = config.refreshToken;

var dfp = new Dfp(credentials, config, refreshToken);


var _wrappers = [];
var _labels = [];

function _logger(thing){
   console.log(thing);
  //  console.log(_wrappers);
}

function storeWrappers(wrappers){
  _wrappers = wrappers;
  return wrappers;
}

function storeLabels(labels){
  _labels = labels;
  return labels;
}

function getLabelNames(wrapper){
    return new  Bluebird.resolve(dfp.getLabel({'id' : wrapper.id}))
}



function writeOutWrappersToFiles(labels){
  labels.forEach(
    function(label, index, labels){
      var file = '../' + label[0].name.replace(/ /g, '') +'.json';
      //console.log(file);
       var obj = _wrappers.filter(function(wrapper){return wrapper.labelId == label[0].id});
       console.log(obj);

       jsonfile.writeFile(file, obj, function (err) {
         console.error(err)
       });
    }
  );
}


/*
    1. get all wrappers - promise
    2. get all names  - Promise
    3. combine wrappers and labels via
    4. write out wrappes to files
*/
//

Bluebird.resolve(dfp.getCreativeWrappers({"status" : "ACTIVE"}))
.then(storeWrappers)
.map(getLabelNames)
.then(storeLabels)
.then(writeOutWrappersToFiles);
//.then(_logger);
