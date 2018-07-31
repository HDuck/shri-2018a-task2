module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  
    clean: {
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
          'release/css/style.min.css': 'src/css/style.css'
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

    htmlmin: {
      release: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeAttributeQuotes: true
        },

        files: {
          'release/index.html': 'src/index.html'
        }
      }
    },

//    imagemin: {
//      jpg: {
//        options: {
//          optimizationLevel: 3
//        },
//
//        files: [{
//          expand: true,
//          cwd: 'src/img/',
//          src: ['*.{jpg,jpeg}'],
//          dest: 'release/img/',
//          ext: '.jpg'
//        }]
//      },
//
//      png: {
//        options: {
//          optimizationLevel: 3
//        },
//
//        files: [{
//          expand: true,
//          cwd: 'src/img/',
//          src: '*.png',
//          dest: 'release/img/'
//        }]
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

//    w3c_css_validation: {
//
//      release: {
//        options: {
//          logfile: 'w3cErrors/css/w3c_css_validation(release).json',
//          warning: '2'
//        },
//
//        src: 'release/css/*.min.css'
//      },
//
//      src: {
//        options: {
//          logfile: 'w3cErrors/css/w3c_css_validation(src).json',
//          warning: '2'
//        },
//
//          src: 'src/css/style.css'
//      }      
//    },

    copy: {
      img2release: {
        expand: true,
        cwd: 'src',
        src: ['images/*.*', 'images/**/*.*', 'images/**/**/*.*'],
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
        files: ['src/sass/*.sass', 'src/sass/*.scss'],
        tasks: ['sass:src']
      }
    },

    svgstore: {
      default: {
        files: {
          'src/img/sprites/sprite.svg': ['src/img/svg/svg_for_sprite/*.svg']
        }
      }
    }
  });

//  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
//  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
//  grunt.loadNpmTasks('grunt-w3c-css-validation');
//  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask('build', ['clean', 'sass:release', 'cssmin:release', 'htmlmin', 'validation:release', 'copy']);
}