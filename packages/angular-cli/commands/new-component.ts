import * as chalk from 'chalk';
import InitCommand from './generate-lib-component';

const Command = require('../ember-cli/lib/models/command');
const Project = require('../ember-cli/lib/models/project');
const SilentError = require('silent-error');
const validProjectName = require('../ember-cli/lib/utilities/valid-project-name');


const NewModuleCommand = Command.extend({
  name: 'new-component',
  description: `Creates a new directory and runs ${chalk.green('ng generate-lib-component')} in it.`,
  works: 'everywhere',

  availableOptions: [
    { name: 'dry-run', type: Boolean, default: false, aliases: ['d'] },
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
    { name: 'link-cli', type: Boolean, default: false, aliases: ['lc'] },
    { name: 'skip-npm', type: Boolean, default: true, aliases: ['sn'] },
    { name: 'skip-bower', type: Boolean, default: true, aliases: ['sb'] },
    { name: 'skip-git', type: Boolean, default: true, aliases: ['sg'] },
    { name: 'directory', type: String, aliases: ['dir'] },
    { name: 'source-dir', type: String, default: '', aliases: ['sd'] },
    { name: 'style', type: String, default: 'css' },
    { name: 'prefix', type: String, default: 'app', aliases: ['p'] },
    { name: 'mobile', type: Boolean, default: false },
    { name: 'routing', type: Boolean, default: false },
    { name: 'inline-style', type: Boolean, default: false, aliases: ['is'] },
    { name: 'inline-template', type: Boolean, default: false, aliases: ['it'] }
  ],

  run: function (commandOptions: any, rawArgs: string[]) {
    const packageName = rawArgs.shift();

    if (!packageName) {
      return Promise.reject(new SilentError(
        `The "ng ${this.name}" command requires a name argument to be specified. ` +
        `For more details, use "ng help".`));
    }

    commandOptions.name = packageName;
    if (commandOptions.dryRun) {
      commandOptions.skipGit = true;
    }

    if (!commandOptions.directory) {
      commandOptions.directory = packageName;
    }

    const createAndStepIntoDirectory =
      new this.tasks.CreateAndStepIntoDirectory({ ui: this.ui, analytics: this.analytics });

    const generateLibComponentCommand = new InitCommand({
      ui: this.ui,
      analytics: this.analytics,
      tasks: this.tasks,
      project: Project.nullProject(this.ui, this.cli)
    });

    return createAndStepIntoDirectory
      .run({
        directoryName: commandOptions.directory,
        dryRun: commandOptions.dryRun
      })
      .then(generateLibComponentCommand.run.bind(generateLibComponentCommand, commandOptions, rawArgs));
  }
});


NewModuleCommand.overrideCore = true;
export default NewModuleCommand;
