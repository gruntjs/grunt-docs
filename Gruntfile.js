/*global module:false*/
module.exports = function(grunt) {

  // project config
  grunt.initConfig({
    gollum: {},
    watch: {
      markdown: {
        files: ['*.md'],
        tasks: ['gollum']
      }
    }
  });

  // default task
  grunt.registerTask('default', ['gollum']);

  // gollum
  grunt.registerTask('gollum', 'Runs gollum for github wiki', function() {
    var options = this.options({
      port: 4567,
      host: 'localhost'
    });
    var args = grunt.util._.chain(Object.keys(options)).map(function(key) {
      return ['--' + key, options[key]];
    }).flatten().value();
    var done = this.async();
    var cli = grunt.util.spawn({
      cmd: 'gollum',
      args: args
    }, done);
    cli.stdout.on('data', function(buf) { grunt.log.write(String(buf)); });
    cli.stderr.on('data', function(buf) {
      buf = grunt.log.uncolor(String(buf));
      if (!grunt.util._.isBlank(buf)) { grunt.log.error(buf); }
    });
  });
};
