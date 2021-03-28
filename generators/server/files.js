const commonFiles = {
	global: [
		{
			templates: ['src/main/resources/banner.txt', 'src/main/resources/config/application-dev.yml'],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(commonFiles, this, false);
}

module.exports = {
	writeFiles,
};
