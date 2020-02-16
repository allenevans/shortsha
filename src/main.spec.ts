import * as core from '@actions/core';
import { ActionInput } from './types/action-input';
import { resetAllWhenMocks, when } from 'jest-when';

jest.mock('@actions/core');

const EXAMPLE_SHA = '77d292e2da837e7990c7ac1d4794835d9cffd736';

const mockInput = (input: Partial<ActionInput>) => {
  Object.keys(input).forEach((key) => {
    when(<jest.Mock>core.getInput)
      .calledWith(key)
      .mockReturnValue(`${input[key]}`);
  });
};

describe('short-sha', () => {
  beforeEach(() => {
    process.env.GITHUB_SHA = EXAMPLE_SHA;
    resetAllWhenMocks();
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
    mockInput({
      length: 3,
    });

    jest.isolateModules(() => require('./main'));

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
    mockInput({
      offset: -7,
    });

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', 'cffd736');
  });

  it('should be able to get the middle 8 characters of the commit sha, from the left', () => {
    mockInput({
      offset: 16,
      length: 8,
    });

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '90c7ac1d');
  });

  it('should be able to get the middle 8 characters of the commit sha, from the right', () => {
    mockInput({
      offset: -24,
      length: 8,
    });

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '90c7ac1d');
  });

  it('should be able to use a different sha', () => {
    mockInput({
      sha: '8dd42301aff45e2262c3565fc893f8072bf38497',
    });

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('SHORT_SHA', '8dd4230');
  });
});
