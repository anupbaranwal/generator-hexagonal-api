'use strict';

const { closeSync, openSync } = require('fs');
const Generator = require('yeoman-generator');
const path = require('path');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }
  prompting() {
    return this.prompt([
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
        this.answers = answers;
    });
  }

  writing() {
    var artifactId    = this.answers.artifact;
    var groupId 	  = this.answers.group;
    var appTitle      = this.answers.appname;
    var appNameFragments = this.answers.appname.split(' ');
    var appNameSuffix = appNameFragments.indexOf('App') > 0 || appNameFragments.indexOf('app') > 0
                    || appNameFragments.indexOf('Application') > 0 || appNameFragments.indexOf('application') > 0
                    ? "": "Application";
    var appName       = this.answers.appname.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).split(' ').join('')+appNameSuffix;
    var packagePath   = this.answers.group.split('.').join('/');
    var jpaSupport = this.answers.jpa;

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
    this._generateBootstrap(artifactId, groupId, appName, jpaSupport, packagePath);

    // contract domain code generation
    this._generateContractDomain(artifactId, groupId, packagePath);

    // domain code generation
    this._generateDomain(artifactId, groupId, appName, packagePath);

    // acceptance test generation
    this._generateAcceptanceTest(artifactId, groupId, appName, packagePath);

    // Rest adapter code generation
    this._generateRestAdapter(artifactId, groupId, packagePath);

    if(jpaSupport) {
      // JPA adapter code generation
      this._generateJPAAdapter(artifactId, groupId, appName, packagePath);
    } else {
      // Hardcoded adapter code generation
      this._generateHardcodedAdapter(artifactId, groupId, appName, packagePath);
    }
    // This is required to release the folder lock so that during test the temporary
    // folder generated can be deleted without any error
    this.destinationRoot('../../');
  };

  _generateHardcodedAdapter(artifactId, groupId, appName, packagePath) {
    var _harcodedAdapter = 'hardcoded-adapter';
    this.fs.copyTpl(
      this.templatePath('hardcodedadapter/pom.xml'),
      this.destinationPath(path.join(_harcodedAdapter, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId,
        appname		: appName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('hardcodedadapter/HardcodedMusicRepository.java'),
      this.destinationPath(path.join(_harcodedAdapter, `src/main/java/${packagePath}/infra`, 'HardcodedMusicRepository.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('hardcodedadapter/HardcodedAdapterConfig.java'),
      this.destinationPath(path.join(_harcodedAdapter, `src/main/java/${packagePath}/infra/config`, 'HardcodedAdapterConfig.java')),
      {
        group		: groupId,
      }
    );
  }

  _generateJPAAdapter(artifactId, groupId, appName, packagePath) {
    var _jpaAdapter = 'jpa-adapter';
    this.fs.copyTpl(
      this.templatePath('jpaadapter/pom.xml'),
      this.destinationPath(path.join(_jpaAdapter, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId,
        appname		: appName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/RealTimeMusicRepository.java'),
      this.destinationPath(path.join(_jpaAdapter, `src/main/java/${packagePath}/infra`,'RealTimeMusicRepository.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/JpaAdapterConfig.java'),
      this.destinationPath(path.join(_jpaAdapter, `src/main/java/${packagePath}/infra/config`, 'JpaAdapterConfig.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/MusicDao.java'),
      this.destinationPath(path.join(_jpaAdapter, `src/main/java/${packagePath}/infra/dao`, 'MusicDao.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/Music.java'),
      this.destinationPath(path.join(_jpaAdapter, `src/main/java/${packagePath}/infra/entity`, 'Music.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/application.yml'),
      this.destinationPath(path.join(_jpaAdapter, 'src/main/resources', 'application.yml')),
    );
    this.fs.copyTpl(
      this.templatePath('jpaadapter/data.sql'),
      this.destinationPath(path.join(_jpaAdapter, 'src/main/resources', 'data.sql'))
    );
  }

  _generateRestAdapter(artifactId, groupId, packagePath) {
    var _restAdapter = 'rest-adapter';
    this.fs.copyTpl(
      this.templatePath('rest/pom.xml'),
      this.destinationPath(path.join(_restAdapter, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId
      }
    );
    this.fs.copyTpl(
      this.templatePath('rest/MusicResource.java'),
      this.destinationPath(path.join(_restAdapter, `src/main/java/${packagePath}/rest`, 'MusicResource.java')),
      {
        group		: groupId,
      }
    );
  }

  _generateDomain(artifactId, groupId, appName, packagePath) {
    var _domain = 'domain';
      this.fs.copyTpl(
      this.templatePath('domain/pom.xml'),
      this.destinationPath(path.join(_domain, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId,
        appname		: appName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('domain/MusicReaderService.java'),
      this.destinationPath(path.join(_domain,`src/main/java/${packagePath}/domain`, 'MusicReaderService.java')),
      {
        group		: groupId,
      }
    );
  }

  _generateContractDomain(artifactId, groupId, packagePath) {
    var _contractDomain = 'contract-domain';
    this.fs.copyTpl(
      this.templatePath('contract/pom.xml'),
      this.destinationPath(path.join(_contractDomain, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId
      }
    );
    this.fs.copyTpl(
      this.templatePath('contract/MusicReader.java'),
      this.destinationPath(path.join(_contractDomain,`src/main/java/${packagePath}/domain/port`, 'MusicReader.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('contract/MusicRepository.java'),
      this.destinationPath(path.join(_contractDomain,`src/main/java/${packagePath}/domain/port`, 'MusicRepository.java')),
      {
        group		: groupId,
      }
    );
    this.fs.copyTpl(
      this.templatePath('contract/MusicDto.java'),
      this.destinationPath(path.join(_contractDomain,`src/main/java/${packagePath}/domain/model`, 'MusicDto.java')),
      {
        group		: groupId,
      }
    );
  }

  _generateAcceptanceTest(artifactId, groupId, appName, packagePath) {
    var _acceptanceTestPath = "acceptance-test";
    this.fs.copyTpl(
      this.templatePath('acceptance/pom.xml'),
      this.destinationPath(path.join(_acceptanceTestPath, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId,
        appname		: appName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('acceptance/AcceptanceTest.java'),
      this.destinationPath(path.join(_acceptanceTestPath, `src/test/java/${packagePath}`, 'AcceptanceTest.java')),
      {
        group		: groupId,
      }
    );
  }

  _generateBootstrap(artifactId, groupId, appName, jpaSupport, packagePath) {
    var _bootstrapPath = "bootstrap";
    this.fs.copyTpl(
      this.templatePath('bootstrap/pom.xml'),
      this.destinationPath(path.join(_bootstrapPath, 'pom.xml')),
      {
        artifact	: artifactId,
        group		: groupId,
        appname		: appName,
        jpaSupport : jpaSupport
      }
    );
    this.fs.copyTpl(
      this.templatePath('bootstrap/application.yml'),
      this.destinationPath(path.join(_bootstrapPath, 'src/main/resources' , 'application.yml'))
    );
    this.fs.copyTpl(
      this.templatePath('bootstrap/MyHexagonalApplication.java'),
      this.destinationPath(path.join(_bootstrapPath, `src/main/java/${packagePath}` , `${appName}.java`)),
      {
        group		: groupId,
        appname		: appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('bootstrap/BootstrapConfig.java'),
      this.destinationPath(path.join(_bootstrapPath, `src/main/java/${packagePath}/config` , 'BootstrapConfig.java')),
      {
        group		: groupId,
        jpaSupport		: jpaSupport
      }
    );
    this.fs.copyTpl(
      this.templatePath('bootstrap/SwaggerConfiguration.java'),
      this.destinationPath(path.join(_bootstrapPath, `src/main/java/${packagePath}/config` , 'SwaggerConfiguration.java')),
      {
        group		: groupId
      }
    );
  }
};