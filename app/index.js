'use strict';

const { closeSync, openSync } = require('fs');
const touch = filename => closeSync(openSync(filename, 'w'));
const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }
  start() {
    this.prompt([
        {
            type    : 'input',
            name    : 'group',
            default : 'com.demo.hexagonal',
            message : 'Please type the groupId [com.demo.hexagonal]: ',
            validate: function(group) {
                var validGroupId= typeof group == 'string' && group.indexOf('.') > 0;
                if (!validGroupId) {
                    console.log('\n Invalid groupId, It must contains at least one point "."');
                }
                return validGroupId;
            }
        },
        {
            type    : 'input',
            name    : 'artifact',
            default : 'my-hexagonal-application',
            message : 'Enter a name for the artifactId [my-hexagonal-application]: '
        },
        {
            type 	: 'input',
            name 	: 'appname',
            default : 'My Hexagonal Application',
            message : 'Type the application Title [My Hexagonal Application]: '
        }
    ]).then((answers) => {
        var artifactName    = answers.artifact;
        var packageRoot 	= answers.group;
        var appTitle        = answers.appname;
        var appName         = answers.appname.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).split(' ').join('') + 'Application';

        // root files
        this.destinationRoot(artifactName);
        closeSync(openSync('README.md', 'w'));
        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact			: artifactName,
                group				: packageRoot,
                apptitle			: appTitle,
            }
        );
    });
  }
};