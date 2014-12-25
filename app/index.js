var generators  = require('yeoman-generator')
  , yosay       = require('yosay')
  , chalk       = require('chalk')
  ;

module.exports = generators.Base.extend({

  prompting: function() {
    var done    = this.async()
      , prompts
      , callback
      ;

    this.log(yosay(
      'Welcome to the ' + chalk.red('Node Library') + ' generator!'
    ));
    this.log('This will generate a Library in the current directory ' + this.destinationPath());
    this.log('Ctrl-C to abort.\n\n');

    prompts = [{
      type: 'input',
      name: 'name',
      require: true,
      message: 'What will you call your library',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'What is the description for your library' 
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Enter some keywords as a comma separated list'
    }, {
      type: 'input',
      name: 'username',
      message: 'What is your Github username',
      store: true
    }, {
      type: 'input',
      name: 'fullname',
      message: 'What is your full name',
      store: true
    }, {
      type: 'input',
      name: 'email',
      message: 'What is your email address',
      store: true
    }];

    callback = function(props) {
      this.name         = props.name;
      this.description  = props.description;
      this.keywords     = String.prototype.split.call(props.keywords, ',');
      this.username     = props.username;
      this.fullname     = props.fullname;
      this.email        = props.email;
      done();
    }.bind(this);

    this.prompt(prompts, callback);
  },



  writing: {
    gitignore: function() {
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    jshint: function() {
      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },
    gruntfile: function() {
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
    },
    index: function() {
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('index.js'),
        { 
          name: this.name
        }
      );
    },
    license: function() {
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          fullname: this.fullname
        }
      );
    },
    package: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        { 
          name:         this.name,
          description:  this.description,
          keywords:     this.keywords,
          username:     this.username,
          fullname:     this.fullname,
          email:        this.email
        }
      );
    },
    libCore: function() {
      this.fs.copy(
        this.templatePath('lib/core.js'),
        this.destinationPath('lib/' + this.name + '.js')
      );
    },
    testJshintrc: function() {
      this.fs.copy(
        this.templatePath('test/_jshintrc'),
        this.destinationPath('test/.jshintrc')
      );
    },
    testCore: function() {
      this.fs.copyTpl(
        this.templatePath('test/core.js'),
        this.destinationPath('test/' + this.name + '.js'),
        { name: this.name }
      );
    }
  },



  install: {
    dev: function() {
      var deps = [
        'chai',
        'grunt',
        'grunt-contrib-jshint',
        'grunt-mocha-test',
        'mocha'
      ];
      this.npmInstall(deps, { saveDev: true });
    }
  }

});