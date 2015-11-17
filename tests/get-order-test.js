/*global describe before it*/

'use strict';

var Replay = require('replay'); //eslint-disable-line no-unused-vars
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;

var Dfp = require('../index');
var DFP_CREDS = require('../fixtures/setup/application-creds');
var config = require('../fixtures/setup/config');
var credentials;

// Override with local configs if recording
if (process.env['REPLAY'] === 'record') { //eslint-disable-line no-process-env
  DFP_CREDS = require('../local/application-creds');
  config = require('../local/config');
}

credentials = {
  clientId: DFP_CREDS.installed.client_id,
  clientSecret: DFP_CREDS.installed.client_secret,
  redirectUrl: DFP_CREDS.installed.redirect_uris[0]
};

chai.use(chaiAsPromised);

describe('Dfp lib', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  it('can get order id', function() {
    return expect(dfp.getOrder('AMAZON_A_D_CONTENT_USA'))
      .to.eventually.equal('43116000');
  });

});
