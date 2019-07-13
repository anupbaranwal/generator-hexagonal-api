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
            default : 'hexagonal-application',
            message : 'Enter a name for the artifactId [hexagonal-application]: '
        },
        {
            type 	: 'input',
            name 	: 'appname',
            default : 'Hexagonal Application',
            message : 'Type the application Title [Hexagonal Application]: '
        }
    ]).then((answers) => {
        var artifactId    = answers.artifact;
        var groupId 	= answers.group;
        var appTitle        = answers.appname;
        var appName         = answers.appname.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).split(' ').join('');
        var packagePath   = answers.group.split('.').join('/');

        // root files
        this.destinationRoot(artifactId);
        closeSync(openSync('README.md', 'w'));
        closeSync(openSync('.gitignore', 'w'));
        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId,
                appname		: appName,
            }
        );
        // bootstrap module generation
        this.destinationRoot('./bootstrap');
        this.fs.copyTpl(
            this.templatePath('bootstrap/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId,
                appname		: appName,
            }
        );
        this.destinationRoot('./src/main');
        this.destinationRoot('./resources');
        this.fs.copyTpl(
            this.templatePath('bootstrap/application.yml'),
            this.destinationPath('application.yml')
        );
        this.destinationRoot('../java');
        this.destinationRoot(packagePath)
        this.fs.copyTpl(
            this.templatePath('bootstrap/MyHexagonalApplication.java'),
            this.destinationPath(appName+'.java'),
            {
                group		: groupId,
                appname		: appName,
            }
        );

        // domain code generation
        this.destinationRoot('../../../../../../../domain');
        this.fs.copyTpl(
            this.templatePath('domain/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId,
                appname		: appName,
            }
        );
        this.destinationRoot('./src/main');
        this.destinationRoot('./java');
        this.destinationRoot(packagePath+'/domain')
        this.fs.copyTpl(
            this.templatePath('domain/MusicReaderService.java'),
            this.destinationPath('MusicReaderService.java'),
            {
                group		: groupId,
            }
        );
        this.destinationRoot('./port');
        this.fs.copyTpl(
            this.templatePath('domain/MusicReader.java'),
            this.destinationPath('MusicReader.java'),
            {
                group		: groupId,
            }
        );
        this.fs.copyTpl(
            this.templatePath('domain/HardcodedAdapter.java'),
            this.destinationPath('HardcodedAdapter.java'),
            {
                group		: groupId,
            }
        );

        // acceptance test generation
        this.destinationRoot('../../../../../../../../../acceptance-test');
        this.fs.copyTpl(
            this.templatePath('acceptance/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId,
                appname		: appName,
            }
        );
        this.destinationRoot('./src/test');
        this.destinationRoot('./java');
        this.destinationRoot(packagePath)
        this.fs.copyTpl(
            this.templatePath('acceptance/AcceptanceTest.java'),
            this.destinationPath('AcceptanceTest.java'),
            {
                group		: groupId,
            }
        );

        // Hardcoded adapter code generation
        this.destinationRoot('../../../../../../../hardcoded-adapter');
        this.fs.copyTpl(
            this.templatePath('adapter/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId,
                appname		: appName,
            }
        );
        this.destinationRoot('./src/main');
        this.destinationRoot('./java');
        this.destinationRoot(packagePath+'/infra')
        this.fs.copyTpl(
            this.templatePath('adapter/HardcodedMusicAdapter.java'),
            this.destinationPath('HardcodedMusicAdapter.java'),
            {
                group		: groupId,
            }
        );
     });
  }
};