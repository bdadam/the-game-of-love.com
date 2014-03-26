module.exports = function(grunt) {

    require('time-grunt')(grunt);

    var devmode = grunt.option('dev');

    grunt.initConfig({
        assemble: {
            options: {
                assets: "dist/static",
                layout: "layout.hbs",
                partials: "src/templates/partials/**/*.hbs",
                layoutdir: 'src/templates/layouts',
                helpers: ['src/helpers/**.js']
            },

            site: {
                options: {
                    postprocess: devmode ? false : require('pretty')
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'content/',
                    src: ['**/*.{md,hbs,html,xml}'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            static: ['dist/static/**/*.{css,js}'],
            html: ['dist/**/*.html', '!dist/google*.html']
        },

        less: {
            main: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/static/main.css': 'src/less/main.less'
                }
            }
        },

        uncss: {
            dist: {
                files: {
                    'dist/static/main.css': ['dist/**/*.html']
                }
            }
        },

        requirejs: {
            options: {
                baseUrl: 'src/js',
                wrap: true,
                optimizeAllPluginResources: true,
                optimize: devmode ? 'none' : "uglify2",
                findNestedDependencies: true
            },

            main: {
                options: {
                    name: '../bower_components/requirejs/require',
                    include: ['main'],
                    out: 'dist/static/main.js'
                }
            }
        },

        hashres: {
            options: {
                fileNameFormat: '${name}.${ext}?${hash}',
                renameFiles: false
            },
            dist: {
                src: ['dist/static/main.css', 'dist/static/main.js'],
                dest: 'dist/**/*.html'
            }
        },

        connect: {
            dev: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3000,
                    base: 'dist',
                    livereload: true
                }
            }
        },

        watch: {
            options: {
                livereload: true,
                spawn: false
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less', 'uncss', 'hashres']
            },

            requirejs: {
                files: ['src/js/**/*.js'],
                tasks: ['requirejs', 'hashres']
            },

            assemble: {
                files: ['content/**/*', 'src/templates/**/*'],
                tasks: ['assemble', 'hashres']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'assemble', 'less', 'uncss', 'requirejs', 'hashres']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    if (devmode) {
        grunt.task.registerTask('hashres', function(){ console.log('Skipping hashres task because of --dev flag'); });
        grunt.task.registerTask('uncss', function(){ console.log('Skipping uncss task because of --dev flag'); });
    }
};