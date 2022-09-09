const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

const commonFiles = {
	packageJson: [
		{
			condition: generator => generator.skipClient,
			templates: ['package.json'],
		},
	],
	global: [
		{
			templates: ['src/main/resources/banner.txt'],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(commonFiles, this, false);
}

module.exports = {
	writeFiles,
};
