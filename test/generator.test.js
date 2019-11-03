const path = require('path');
const rimraf = require('rimraf');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Parent maven configuration', () => {
  const groupId = 'com.demo.hexagonal';
  const artifactId = 'hexagonal-application';
  const appName = 'Hexagonal Application';
  const isJpa = false;

  before(() => {
    return helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'tmp'))
      .withPrompts({
        group: groupId,
        artifact: artifactId,
        appname: appName,
        jpa: isJpa
      });
  });
  after(() => {
    rimraf.sync(path.join(__dirname, `tmp/`));
  });

  it('create parent pom.xml', () => {
    assert.file(path.join(__dirname, `tmp/${artifactId}/pom.xml`));
  });
  it('create .gitignore file', () => {
    assert.file(path.join(__dirname, `tmp/${artifactId}/.gitignore`));
  });
  it('create readme file', () => {
    assert.file(path.join(__dirname, `tmp/${artifactId}/README.md`));
  });
  it('pom.xml contains correct artifactId', () => {
    assert.fileContent(path.join(__dirname, `tmp/${artifactId}/pom.xml`), `<artifactId>${artifactId}</artifactId>`);
  });
});