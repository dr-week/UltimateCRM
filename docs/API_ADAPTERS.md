# API Adapters & Backend Integration Guide

Implement `CrmBackendAdapter` interface to connect any backend API without touching Vue UI code:

```typescript
export interface CrmBackendAdapter {
  name: string;
  getLeads(config: ApiConfig): Promise<Lead[]>;
  createLead(config: ApiConfig, lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead>;
  updateLeadStage(config: ApiConfig, leadId: string, newStage: StageType): Promise<void>;
  deleteLead(config: ApiConfig, leadId: string): Promise<void>;
  getActivities(config: ApiConfig, leadId?: string): Promise<Activity[]>;
  addActivity(config: ApiConfig, activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity>;
}
```

## Adding a Custom Backend (e.g. Twenty / Odoo)
1. Create `src/adapters/customAdapter.ts` implementing `CrmBackendAdapter`.
2. Register backend choice in `src/types/crm.ts` (`BackendType`).
3. Instantiate in `src/services/apiAdapter.ts`.
4. Verify types: `npx vue-tsc --noEmit`.
