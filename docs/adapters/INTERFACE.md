# CrmBackendAdapter Interface Contract

All backend adapters in `src/adapters/` must implement this interface:

```typescript
export interface CrmBackendAdapter {
  name: string;
  fetchLeads(): Promise<Lead[]>;
  createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead>;
  updateLeadStage(leadId: string, newStage: StageType): Promise<void>;
  deleteLead(leadId: string): Promise<void>;
  fetchActivities(leadId?: string): Promise<Activity[]>;
  addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity>;
}
```
