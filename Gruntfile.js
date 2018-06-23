module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-documentation')

  grunt.initConfig({
    documentation: {
      default: {
        files: [{
          'expand': true,
          'src': ['*.js']
        }],
        options: {
          destination: 'wiki',
          format: 'md'
        }
      }
    }
  })
}
