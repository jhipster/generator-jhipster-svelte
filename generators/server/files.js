const commonFiles = {
	global: [
		{
			templates: ['src/main/resources/banner.txt'],
		},
		{
			condition: generator => generator.buildTool === 'maven',
			templates: [
				{ file: 'npmw', method: 'copy', noEjs: true },
				{ file: 'npmw.cmd', method: 'copy', noEjs: true },
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
