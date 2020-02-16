import { ActionInput } from '../types/action-input';

export const inputParse: (getInput: Function) => ActionInput = (getInput) => {
  const input = {
    length: parseInt(getInput('length') ?? '7', 10),
    name: getInput('name') ?? 'SHORT_SHA',
    offset: parseInt(getInput('offset') ?? '0', 10),
    sha: getInput('sha') ?? `${process.env.GITHUB_SHA}`,
  };

  return input;
};
