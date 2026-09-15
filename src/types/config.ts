export type BackendType = 'mock' | 'directus' | 'frappe';

export interface ApiConfig {
  backendType: BackendType;
  directusUrl: string;
  directusToken: string;
  frappeUrl: string;
  frappeApiKey: string;
  frappeApiSecret: string;
}
