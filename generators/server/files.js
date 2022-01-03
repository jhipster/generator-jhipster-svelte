const commonFiles = {
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
