var Dfp = require('../../node-google-dfp-wrapper/index.js');
var o2x = require('object-to-xml');
var Bluebird = require('bluebird');
// These are created by you in the configuration step
var config = require('../local/config')

// These are output by DFP as part of the DFP project authorization step.
var credentials = require('../local/application-creds');

// This is obtained as part of the obtain refresh token step
var refreshToken = config.refreshToken;

var dfp = new Dfp(credentials, config, refreshToken);

var prepareQ = function(){
  return {name : "test-%"};
};

function getCreativeTemplates(query) {
  return dfp.getCreativeTemplates(query);
}

function includeCreativeTemplates(items) {
  // filter line item however you need to
  console.log(items);
  return items;
}


function getCreativeWrappers(query) {
  return dfp.getCreativeWrappers(query);
}

function includeCreativeWrappers(items) {
  // filter line item however you need to
  console.log(typeof items.id);
  return items;
}



function _updateWrapper(items){

  var x =  {
    creativeWrappers : {
      id: '543169',
      labelId: '543169',
      header: { htmlSnippet: '<div class="123" data-cb-ad-id="%%PATTERN:pos%%">' },
      footer: { htmlSnippet: '</div>' },
      ordering: 'NO_PREFERENCE',
      status: 'ACTIVE'
  }
};
var wrapper = o2x(x);
console.log(wrapper);
 return dfp.updateCreativeWrappers(x);
 }

Bluebird.resolve(prepareQ())
.then(getCreativeWrappers)
.map(includeCreativeWrappers)
.then(_updateWrapper);
