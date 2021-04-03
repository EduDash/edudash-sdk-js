const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (
  key: U
): any => obj[key];

const setKeyValue = <T extends object, U extends keyof T>(obj: T) => (
  key: U
) => (val: any): void => {
  obj[key] = val;
};

export { getKeyValue, setKeyValue };
