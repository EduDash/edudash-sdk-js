/// <reference path="../lib.d.ts" />

declare module 'edudash' {
  export namespace EduDash {}

  export class EduDash {
    static EduDash: typeof EduDash;
    constructor(apiKey: string, config: EduDash.EduDashConfig);
    setAppInfo(info: EduDash.AppInfo): void;
  }

  export default EduDash;
}
