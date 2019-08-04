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
        },
        {
          type: 'confirm',
          name: 'jpa',
          message: 'Do you want to use database in your application?',
          initial: false
        }
    ]).then((answers) => {
        var artifactId    = answers.artifact;
        var groupId 	  = answers.group;
        var appTitle      = answers.appname;
        var appNameFragments =answers.appname.split(' ');
        var appNameSuffix = appNameFragments.indexOf('App') > 0 || appNameFragments.indexOf('app') > 0
                        || appNameFragments.indexOf('Application') > 0 || appNameFragments.indexOf('application') > 0
                        ? "": "Application";
        var appName       = answers.appname.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).split(' ').join('')+appNameSuffix;
        var packagePath   = answers.group.split('.').join('/');
        var jpaSupport = answers.jpa;

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
                appname		: appTitle,
                jpaSupport : jpaSupport
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
                jpaSupport : jpaSupport
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
                appname		: appName
            }
        );
        this.destinationRoot('./config')
        this.fs.copyTpl(
            this.templatePath('bootstrap/BootstrapConfig.java'),
            this.destinationPath('BootstrapConfig.java'),
            {
                group		: groupId,
                jpaSupport		: jpaSupport
            }
        );

        // contract domain code generation
        this.destinationRoot('../../../../../../../../contract-domain');
        this.fs.copyTpl(
            this.templatePath('contract/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId
            }
        );
        this.destinationRoot('./src/main');
        this.destinationRoot('./java');
        this.destinationRoot(packagePath+'/domain')
        this.destinationRoot('./port');
        this.fs.copyTpl(
            this.templatePath('contract/MusicReader.java'),
            this.destinationPath('MusicReader.java'),
            {
                group		: groupId,
            }
        );
        this.fs.copyTpl(
            this.templatePath('contract/MusicRepository.java'),
            this.destinationPath('MusicRepository.java'),
            {
                group		: groupId,
            }
        );
        this.destinationRoot('../model');
        this.fs.copyTpl(
            this.templatePath('contract/MusicDto.java'),
            this.destinationPath('MusicDto.java'),
            {
                group		: groupId,
            }
        );

        // domain code generation
        this.destinationRoot('../../../../../../../../../domain');
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
        this.destinationRoot(packagePath+'/domain');
        this.fs.copyTpl(
            this.templatePath('domain/MusicReaderService.java'),
            this.destinationPath('MusicReaderService.java'),
            {
                group		: groupId,
            }
        );

        // acceptance test generation
        this.destinationRoot('../../../../../../../../acceptance-test');
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
        this.destinationRoot(packagePath);
        this.fs.copyTpl(
            this.templatePath('acceptance/AcceptanceTest.java'),
            this.destinationPath('AcceptanceTest.java'),
            {
                group		: groupId,
            }
        );
        // Rest adapter code generation
        this.destinationRoot('../../../../../../../rest-adapter');
        this.fs.copyTpl(
            this.templatePath('rest/pom.xml'),
            this.destinationPath('pom.xml'),
            {
                artifact	: artifactId,
                group		: groupId
            }
        );
        this.destinationRoot('./src/main');
        this.destinationRoot('./java');
        this.destinationRoot(packagePath+'/rest')
        this.fs.copyTpl(
            this.templatePath('rest/MusicResource.java'),
            this.destinationPath('MusicResource.java'),
            {
                group		: groupId,
            }
        );
        this.destinationRoot('./config')
        this.fs.copyTpl(
            this.templatePath('rest/RestAdapterConfig.java'),
            this.destinationPath('RestAdapterConfig.java'),
            {
                group		: groupId,
            }
        );
        if(jpaSupport) {
            // JPA adapter code generation
            this.destinationRoot('../../../../../../../../../jpa-adapter');
            this.fs.copyTpl(
                this.templatePath('jpaadapter/pom.xml'),
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
                this.templatePath('jpaadapter/RealTimeMusicRepository.java'),
                this.destinationPath('RealTimeMusicRepository.java'),
                {
                    group		: groupId,
                }
            );
            this.destinationRoot('config');
            this.fs.copyTpl(
                this.templatePath('jpaadapter/JpaAdapterConfig.java'),
                this.destinationPath('JpaAdapterConfig.java'),
                {
                    group		: groupId,
                }
            );
            this.destinationRoot('../dao');
            this.fs.copyTpl(
                this.templatePath('jpaadapter/MusicDao.java'),
                this.destinationPath('MusicDao.java'),
                {
                    group		: groupId,
                }
            );
            this.destinationRoot('../entity');
            this.fs.copyTpl(
                this.templatePath('jpaadapter/Music.java'),
                this.destinationPath('Music.java'),
                {
                    group		: groupId,
                }
            );
            this.destinationRoot('../../../../../../resources');
            this.fs.copyTpl(
                this.templatePath('jpaadapter/application.yml'),
                this.destinationPath('application.yml')
            );
            this.fs.copyTpl(
                this.templatePath('jpaadapter/data.sql'),
                this.destinationPath('data.sql')
            );
        } else {
            // Hardcoded adapter code generation
            this.destinationRoot('../../../../../../../../../hardcoded-adapter');
            this.fs.copyTpl(
                this.templatePath('hardcodedadapter/pom.xml'),
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
                this.templatePath('hardcodedadapter/HardcodedMusicRepository.java'),
                this.destinationPath('HardcodedMusicRepository.java'),
                {
                    group		: groupId,
                }
            );
            this.destinationRoot('./config')
            this.fs.copyTpl(
                this.templatePath('hardcodedadapter/HardcodedAdapterConfig.java'),
                this.destinationPath('HardcodedAdapterConfig.java'),
                {
                    group		: groupId,
                }
            );
        }
     });
  }
};