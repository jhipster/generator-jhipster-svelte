const chalk = require('chalk');
const _ = require('lodash');
const ServerGenerator = require('generator-jhipster/generators/server');
const {
	prepareEntityForTemplates,
	prepareEntityPrimaryKeyForTemplates,
	loadRequiredConfigIntoEntity,
} = require('generator-jhipster/utils/entity');
const { formatDateForChangelog, prepareFieldForLiquibaseTemplates } = require('generator-jhipster/utils/liquibase');
const { prepareFieldForTemplates } = require('generator-jhipster/utils/field');
const { OAUTH2 } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { SQL } = require('generator-jhipster/jdl/jhipster/database-types');
const { CommonDBTypes } = require('generator-jhipster/jdl/jhipster/field-types');
const { defaultConfig } = require('generator-jhipster/generators/generator-defaults');

const { writeFiles } = require('./files');
const blueprintPackageJson = require('../../package.json');

const { STRING: TYPE_STRING, LONG: TYPE_LONG } = CommonDBTypes;

module.exports = class extends ServerGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')} `
			);
		}

		this.configOptions = jhContext.configOptions || {};
		this.blueprintjs = blueprintPackageJson;
	}

	get initializing() {
		const phaseFromJHipster = super._initializing();
		return {
			...phaseFromJHipster,
			displayLogo() {
				// don't overwrite logo
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get prompting() {
		return super._prompting();
	}

	get configuring() {
		return super._configuring();
	}

	_createUserManagementEntities() {
		this.configOptions.sharedLiquibaseFakeData = this.configOptions.sharedLiquibaseFakeData || {};

		if (
			this.configOptions.sharedEntities.User ||
			(this.jhipsterConfig.skipUserManagement && this.jhipsterConfig.authenticationType !== OAUTH2)
		) {
			return;
		}

		const changelogDateDate = this.jhipsterConfig.creationTimestamp
			? new Date(this.jhipsterConfig.creationTimestamp)
			: new Date();
		const changelogDate = formatDateForChangelog(changelogDateDate);

		const userEntityDefinition = this.readEntityJson('User');
		if (userEntityDefinition) {
			if (userEntityDefinition.relationships && userEntityDefinition.relationships.length > 0) {
				this.warning('Relationships on the User entity side will be disregarded');
			}
			if (userEntityDefinition.fields && userEntityDefinition.fields.some(field => field.fieldName !== 'id')) {
				this.warning('Fields on the User entity side (other than id) will be disregarded');
			}
		}

		// Create entity definition for built-in entity to make easier to deal with relationships.
		const user = {
			name: 'User',
			builtIn: true,
			entityTableName: `${this.getTableName(this.jhipsterConfig.jhiPrefix)}_user`,
			relationships: [],
			changelogDate,
			fields: userEntityDefinition ? userEntityDefinition.fields || [] : [],
		};

		loadRequiredConfigIntoEntity(user, this.jhipsterConfig);
		// Fallback to defaults for test cases.
		loadRequiredConfigIntoEntity(user, defaultConfig);

		const oauth2 = user.authenticationType === OAUTH2;
		const userIdType = oauth2 || user.databaseType !== SQL ? TYPE_STRING : this.getPkType(user.databaseType);
		const fieldValidateRulesMaxlength = userIdType === TYPE_STRING ? 100 : undefined;

		let idField = user.fields.find(field => field.fieldName === 'id');
		if (!idField) {
			idField = {};
			user.fields.unshift(idField);
		}
		_.defaults(idField, {
			fieldName: 'id',
			fieldType: userIdType,
			fieldValidateRulesMaxlength,
			fieldTranslationKey: 'global.field.id',
			fieldNameHumanized: 'ID',
			id: true,
			builtIn: true,
		});

		if (!user.fields.some(field => field.fieldName === 'login')) {
			user.fields.push({
				fieldName: 'login',
				fieldType: TYPE_STRING,
				builtIn: true,
			});
		}

		if (!user.fields.some(field => field.fieldName === 'firstName')) {
			user.fields.push({
				fieldName: 'firstName',
				fieldType: TYPE_STRING,
			});
		}

		if (!user.fields.some(field => field.fieldName === 'lastName')) {
			user.fields.push({
				fieldName: 'lastName',
				fieldType: TYPE_STRING,
			});
		}

		prepareEntityForTemplates(user, this);
		prepareEntityPrimaryKeyForTemplates(user, this);

		user.fields.forEach(field => {
			prepareFieldForTemplates(user, field, this);
			prepareFieldForLiquibaseTemplates(user, field);
		});
		this.configOptions.sharedEntities.User = user;

		user.resetFakerSeed();
		const liquibaseFakeData = oauth2
			? []
			: [
					{ id: userIdType === TYPE_LONG ? 1 : user.primaryKey.fields[0].generateFakeData() },
					{ id: userIdType === TYPE_LONG ? 2 : user.primaryKey.fields[0].generateFakeData() },
			  ];
		user.liquibaseFakeData = liquibaseFakeData;
		user.fakeDataCount = liquibaseFakeData.length;
		this.configOptions.sharedLiquibaseFakeData.User = liquibaseFakeData;
	}

	get composing() {
		return super._composing();
	}

	get loading() {
		const defaultPhaseFromJHipster = super._loading();
		return {
			...defaultPhaseFromJHipster,
			createUserManagementEntities() {
				this._createUserManagementEntities();
			},
		};
	}

	get preparing() {
		return super._preparing();
	}

	get default() {
		return super._default();
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		const phaseFromJHipster = super._writing();
		return {
			...phaseFromJHipster,
			writeAdditionalFile() {
				writeFiles.call(this);
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get postWriting() {
		// override to not include package scripts
		return {};
	}

	get end() {
		const jhipsterDefault = super._end();
		return {
			...jhipsterDefault,
			end() {
				let executable = 'mvnw';
				if (this.buildTool === 'gradle') {
					executable = 'gradlew';
				}

				this.log(
					chalk.green(
						`\nStart backend Spring Boot application with : ${chalk.yellow.bold(`./${executable}`)}`
					)
				);
			},
		};
	}
};
