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
