module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  
    clean: {
      src: {
        src: 'src/js/scripts.js'
      },
      
      release: {
        src: 'release/*'
      },

      docs: {
        src: 'docs/*'
      }
    },

    sass: {
      release: {
        options: {
          style: 'expanded'
        },

        files: {
          'src/css/style.css': 'src/sass/main.sass'
        }
      },

      src: {
        options: {
          style: 'expanded'
        },
        
        files: {
          'src/css/style.css': 'src/sass/main.sass'
        }  
      }
    },

    cssmin: {
      release: {
        files: {
          'release/css/style.min.css': 'src/css/style-full.css'
        }
      },

      src: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.css.map', '!*.min.css'],
          dest: 'src/css',
          ext: '.min.css'
        }]
      }
    },

//    htmlmin: {
//      release: {
//        options: {
//          removeComments: true,
//          collapseWhitespace: true,
//          removeRedundantAttributes: true,
//          removeEmptyAttributes: true,
//          removeAttributeQuotes: true
//        },
//
//        files: {
//          'release/index.html': 'src/index.html'
//        }
//      }
//    },
    
    validation: {
      release: {
        options: {
          doctype: 'HTML5',
          charset: 'utf-8',
        },

        files: {
          src: 'release/index.html'
        }
      },
      src: {
        options: {
          doctype: 'HTML5',
          charset: 'utf-8'
        },

        files: {
          src: 'src/index.html'
        }
      }
    },

    concat: {
      
      js: {
        src: ['src/js/scrollNavi.js', 'src/js/dummy.js', 'src/js/popUp.js', 'src/js/main.js'],
        dest: 'src/js/scripts.js'
      },
      
      css: {
        src: ['src/css/normalize.css', 'src/css/style.css'],
        dest: 'src/css/style-full.css'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      
      src: {
        files: {
          'release/js/scripts.min.js': 'src/js/scripts.js',
        }
      }
    },
    
    copy: {
      img2release: {
        expand: true,
        cwd: 'src/images',
        src: ['*.*', '**/*.*', '**/**/*.*'],
        dest: 'release/images'
      },
      
      html2release: {
        expand: true,
        cwd: 'src',
        src: ['index.html'],
        dest: 'release'
      },

      docs: {
        expand: true,
        cwd: 'release',
        src: ['*.*', '**/*.*', '**/**/*.*'],
        dest: 'docs'
      }
    },

    watch: {
      sass: {
        files: ['./src/sass/*.sass', './src/sass/*.scss'],
        tasks: ['sass:src']
      },
      js: {
        files: ['./src/js/dummy.js', './src/js/main.js', './src/js/popUp.js', './src/js/scrollNavi.js'],
        tasks: ['concat:js']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['clean', 'sass:release', 'concat','cssmin:release', 'validation:src', 'uglify', 'copy']);
}