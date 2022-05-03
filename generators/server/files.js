const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

const commonFiles = {
	global: [
		{
			templates: ['src/main/resources/banner.txt'],
		},
	],
	serverJavaAuthConfig: [
		{
			condition: generator => generator.reactive,
			path: SERVER_MAIN_SRC_DIR,
			templates: [
				{
					file: 'package/config/SecurityConfiguration_reactive.java',
					renameTo: generator => `${generator.javaDir}config/SecurityConfiguration.java`,
				},
			],
		},
		{
			condition: generator => !generator.skipUserManagement,
			path: SERVER_MAIN_SRC_DIR,
			templates: [
				{
					file: 'package/web/rest/UserResource.java',
					renameTo: generator => `${generator.javaDir}web/rest/UserResource.java`,
				},
			],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(commonFiles, this, false);
}

module.exports = {
	writeFiles,
};
