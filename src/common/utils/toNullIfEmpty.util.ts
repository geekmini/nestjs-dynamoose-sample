import { isEmpty } from 'lodash';

export const toNullIfEmpty = <T extends object = any>(value: T) => {
  if (isEmpty(value)) {
    return null;
  }
  return value;
};
