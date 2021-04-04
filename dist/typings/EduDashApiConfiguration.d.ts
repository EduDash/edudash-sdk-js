import { HttpAgent } from './lib';
/**
 * Configuration for the EduDash API client
 */
export interface EduDashApiConfiguration {
    /**
     * Authentication bearer token for making requests to EduDash
     */
    auth?: string | null;
    /**
     * A custom host, optional.
     */
    host?: string;
    /**
     * Custom port, optional.
     */
    port?: string | number;
    /**
     * Interchange between protocols, `http` or `https`, but note,
     * that only `https` will work with urls at `*.edudash.org`.
     */
    protocol?: 'https' | 'http';
    basePath?: string;
    /**
     * API Version
     */
    version: string;
    timeout?: number;
    maxNetworkRetries?: number;
    agent?: HttpAgent;
    dev?: boolean;
}
