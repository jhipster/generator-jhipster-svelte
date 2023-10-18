import chalk from 'chalk';
import colorConvert from 'color-convert';
import { getPackageJson } from '../generators/util.js';

export const getLogo = () => `
  ${chalk.cyan('      .d88888b.                     .d88888b.')}
  ${chalk.cyan('    d888888888888b.             .d888888888888d')}
  ${chalk.cyan('   888888888888888888.       .888888888888888888')}
  ${chalk.cyan('  8888888888888888888888   8888888888888888888888')}
  ${chalk.cyan('  88888888888888888888888888888888888888888888888')}
  ${chalk.cyan('  8888888888888888888888   8888888888888888888888')}
  ${chalk.cyan('   888888888888888888"       "888888888888888888')}
  ${chalk.cyan('    Y8888888888888P"            "d888888888888P')}
  ${chalk.cyan('      "Y888P8P"                     "Y888P8P"')}

${chalk.white.bold('             https://www.jhipster.tech')}

${chalk.white('Welcome to JHipster Svelte ') + chalk.yellow(`v${getPackageJson().version}`)}
${chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`)}
${chalk.rgb(...colorConvert.keyword.rgb('orange'))(
	' _________________________________________________________________________________________________________________________\n',
)}
${chalk.white('  If you find JHipster Svelte useful, support with a star and follow ')}${chalk.yellow(
	'https://github.com/jhipster/generator-jhipster-svelte',
)}
${chalk.green(
	' _________________________________________________________________________________________________________________________\n',
)}
`;
