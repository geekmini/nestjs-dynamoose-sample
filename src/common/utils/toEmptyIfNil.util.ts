export const toEmptyIfNil = (value: any) => {
  if (value === null || value === undefined) {
    return {};
  }
  return value;
};
