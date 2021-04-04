declare const getKeyValue: <T extends object, U extends keyof T>(obj: T) => (key: U) => any;
declare const setKeyValue: <T extends object, U extends keyof T>(obj: T) => (key: U) => (val: any) => void;
export { getKeyValue, setKeyValue };
