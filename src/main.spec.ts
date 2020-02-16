import * as core from '@actions/core';

jest.mock('@actions/core', () => ({
  exportVariable: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn(),
}));

const EXAMPLE_SHA = '77d292e2da837e7990c7ac1d4794835d9cffd736';

describe('short-sha', () => {
  beforeEach(() => {
    process.env.GITHUB_SHA = EXAMPLE_SHA;
  });

  afterEach(() => {
    Object.keys(process.env)
      .filter((key) => key.match(/^(GITHUB_|INPUT_|SHORT_SHA)/))
      .forEach((key) => {
        delete process.env[key];
      });
  });

  it('should output a 7 character short sha by default', () => {
    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '77d292e');
  });

  it('should allow the length of the sha to be changed', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_LENGTH = '3';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '77d');
  });

  it('should allow the name of the exported environment variable to be changed', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_NAME = 'sha7';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '77d292e');
  });

  it('should be able to get the last 7 characters of the commit sha', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_OFFSET = '-1';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', 'cffd736');
  });

  it('should be able to get the middle 8 characters of the commit sha, from the left', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_OFFSET = '7';
    process.env.INPUT_LENGTH = '8';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '90c7ac1d');
  });

  it('should be able to get the middle 8 characters of the commit sha, from the right', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_OFFSET = '-24';
    process.env.INPUT_LENGTH = '8';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '90c7ac1d');
  });

  it('should be able to use a different sha', () => {
    jest.isolateModules(() => require('./main'));

    process.env.INPUT_SHA = '8dd42301aff45e2262c3565fc893f8072bf38497';

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '8dd4230');
  });
});
