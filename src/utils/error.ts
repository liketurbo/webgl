import errors from '../data/errors.json';

type CodeId = keyof typeof errors;
const error = (code: CodeId, ...rest: string[]): number => {
  console.log(errors[code].msg, rest);
  return errors[code].id;
};

export default error;
