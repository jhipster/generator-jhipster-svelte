const config = require('../../../../../.github/workflows/scripts/sample-svelte-app.json');


module.exports = {
	baseName: config['generator-jhipster']['baseName'],
	authenticationType: config['generator-jhipster']['authenticationType'],
	skipUserManagement: config['generator-jhipster']['skipUserManagement'],
};


