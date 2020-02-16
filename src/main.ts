import * as core from '@actions/core';

(function run() {
  try {
    console.log('to be implemented');
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
