import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

let packagejs;

export const getPackageJson = () => {
	packagejs = packagejs ?? JSON.parse(readFileSync(join(fileURLToPath(import.meta.url), '../../package.json')).toString());
	return packagejs;
};
