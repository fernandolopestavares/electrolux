module.exports = function( grunt ) {
	grunt.initConfig({
	// Tasks que o Grunt deve executarrrrrr
		/*uglify : {
			options : {
				mangle : false,
                compress: false,
                drop_console: true,
			},
			my_target : {
				files : {
		  			// 'assets/js/elux-js-rules.js' 	: [ 'assets/_js/elux-js-rules.js' ],
		  			// 'assets/js/elux-produto.js'  	: [ 'assets/_js/elux-produto.js' ],
		  			// 'assets/js/elux-js-plugins.js' 	: [ 'assets/_js/elux-js-plugins.js' ]
                    'assets/js/elux-js-rules.js' : [ 'assets/_js/elux-js-plugins.js', 'assets/_js/elux-js-rules.js', 'assets/_js/elux-js-plugins.js' ]
				}
			}
		}, // uglify*/

		less: {
			development: {
				options: {
					paths: ["assets/css"],
                    compress: true
				},
				files: {
					"assets/css/elux-responsivo.css"   : "assets/_less/elux-responsivo.less",
                    "assets/css/elux-fonts.css"        : "assets/_less/elux-fonts.less",
					"assets/css/elux-menu.css"	       : "assets/_less/elux-menu.less",
					"assets/css/elux-home.css"         : "assets/_less/elux-home.less",
					"assets/css/elux-departamento.css" : "assets/_less/elux-departamento.less",
                    "assets/css/elux-categoria.css"    : "assets/_less/elux-categoria.less",
                    "assets/css/elux-busca.css"       : "assets/_less/elux-busca.less",
                    "assets/css/elux-produto.css"      : "assets/_less/elux-produto.less",
                    "assets/css/elux-institucional.css": "assets/_less/elux-institucional.less"
				}
			}
		}, // less

        concat: {
            options: {
                separator: ';',
            },
            js: {
                src: ['assets/_js/elux-js-plugins.js', 'assets/_js/elux-js-rules.js'],
                dest: 'assets/js/unify/elux-js-rules.js',
            },
            css: {
                src: [  'assets/css/elux-menu.css',
                        'assets/css/elux-fonts.css',
                        'assets/css/elux-responsivo.css', 
                        'assets/css/elux-home.css',
                        'assets/css/elux-departamento.css',
                        'assets/css/elux-categoria.css',
                        'assets/css/elux-busca.css',
                        'assets/css/elux-produto.css',
                        'assets/css/elux-institucional.css'
                ],
                dest: 'assets/css/unify/elux-main.css',
            },
        },

		watch : {
			dist : {
				files : [
					'assets/_js/**/*',
					'assets/_less/**/*'
				],
				tasks : [ /*'uglify',*/ 'less', 'concat' ]
			}
		} // watch
	});

	// Plugins do Grunt
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );


	// Tarefas que serão executadas
	grunt.registerTask( 'default', [ /*'uglify',*/ 'less', 'concat' ] );

	// Tarefa para Watch
  	grunt.registerTask( 'w', [ 'watch' ] );
};