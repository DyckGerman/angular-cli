/* jshint node: true */
'use strict';

const config = require('../models/config');
const path = require('path');

module.exports = {
  name: 'ng2',

  config: function () {
    this.project.ngConfigObj = this.project.ngConfigObj || config.CliConfig.fromProject();
    this.project.ngConfig = this.project.ngConfig || this.project.ngConfigObj.config;
  },

  blueprintsPath: function () {
    return path.join(__dirname, '../blueprints');
  },

  includedCommands: function () {
    return {
      'build': require('../commands/build').default,
      'serve': require('../commands/serve').default,
      'new': require('../commands/new').default,
      'new-module': require('../commands/new-module').default,
      'new-component': require('../commands/new-component').default,
      'generate': require('../commands/generate').default,
      'generate-lib-module': require('../commands/generate-lib-module').default,
      'generate-lib-component': require('../commands/generate-lib-component').default,
      'destroy': require('../commands/destroy').default,
      'init': require('../commands/init').default,
      'test': require('../commands/test').default,
      'e2e': require('../commands/e2e').default,
      'help': require('../commands/help').default,
      'lint': require('../commands/lint').default,
      'version': require('../commands/version').default,
      'completion': require('../commands/completion').default,
      'doc': require('../commands/doc').default,
      'github-pages-deploy': require('../commands/github-pages-deploy').default,

      // Easter eggs.
      'make-this-awesome': require('../commands/easter-egg').default,

      // Configuration.
      'set': require('../commands/set').default,
      'get': require('../commands/get').default
    };
  }
};
