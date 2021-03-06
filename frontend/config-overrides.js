const {addLessLoader, fixBabelImports, override} = require("customize-cra");

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		lessOptions: {
			modifyVars: {
				'@primary-color': '#f01a49',
				'@link-color': '#3f6bc4',
				'@success-color': '#29c43e',
				'@warning-color': '#f11212',
				// '@error-color': '#f01a49',
				'@font-size-base': '16px',
				// '@heading-color': 'rgba(0, 0, 0, 0.85)',
				// '@text-color': 'rgba(0, 0, 0, 0.65)',
				// '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
				// '@disabled-color': 'rgba(0, 0, 0, 0.25)',
				// '@border-radius-base': '4px',
				// '@border-color-base': '#d9d9d9',
				// '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)'
			},
			javascriptEnabled: true,
		}
	}),
);
