import chalk from 'chalk';
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
 ${chalk.white.bold('\n                https://www.jhipster.tech\n')}
 ${
		chalk.white(' Welcome to ') +
		chalk.hex('#FF8800')('JHipster Svelte ') +
		chalk.yellow(`v${getPackageJson().version}`)
 }
 ${chalk.hex('#FF8800')(
		'_______________________________________________________________________________________________________________\n',
 )}
 ${chalk.white(' Support JHipster Svelte with a star and follow ')}${chalk.yellow(
		'https://github.com/jhipster/generator-jhipster-svelte',
 )}
 `;
