export type DefaultLang = 'node';
export type PackagePublisher = 'edudash';

export interface EduDashUserAgent {
  bindings_version: string;
  lang: DefaultLang;
  lang_version: string;
  platform: string;
  publisher: PackagePublisher;
  uname: string | null;
  /**
   * Optionally indicates whether you are using typescript,
   * only used for analytics and passed in user-agent header
   */
  typescript?: boolean;
}
