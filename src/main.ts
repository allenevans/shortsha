import * as core from '@actions/core';
import { inputParse } from './utils/input-parse';

(function run() {
  const input = inputParse(core.getInput);

  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        core.debug(`${key}=${process.env[key]}`);
        console.log(`${key}=${process.env[key]}`);
      });

    core.exportVariable(input.name, input.sha.substr(input.offset, input.length));
  } catch (error: unknown) {
    core.setFailed((error as Error).message);
    process.exit(1);
  }
})();
