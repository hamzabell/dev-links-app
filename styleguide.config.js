const path = require('path');

module.exports = {
	// set your styleguidist configuration here
	title: 'Dev Link Share',
	components: 'src/components/**/*.vue',
	template: {
		head: {
			links: [
			{
			  key: 'stylesheet',
			  value: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400,700',
			}, 		
		],
		},

	},
	styles: function styles(theme) {
		return {
			Playground: {
				preview: {
					fontFamily: 'Instrument Sans',
					fontSize: '62.5%'
				},
				fontSize: '62.5%'
			},
		};
	},
	// defaultExample: true,
	// sections: [
	//   {
	//     name: 'First Section',
	//     components: 'src/components/**/[A-Z]*.vue'
	//   }
	// ],
	// webpackConfig: {
	//   // custom config goes here
	// },

}
