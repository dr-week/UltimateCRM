# Guide: Building Custom CRM Backend Adapters

This guide explains how to connect any new backend API (e.g., Twenty, Odoo, Salesforce, custom Node/Express API) to **UltimateCRM** without touching existing Vue UI components.

---

## Step 1: Implement `CrmBackendAdapter`

Create a new file in `src/adapters/<backendName>Adapter.ts`:

```typescript
import { CrmBackendAdapter } from './baseAdapter';
import { Lead, Activity, StageType } from '@/types/crm';

export class CustomBackendAdapter implements CrmBackendAdapter {
  name = 'Custom Backend API';

  constructor(private apiUrl: string, private token: string) {}

  async fetchLeads(): Promise<Lead[]> {
    const res = await fetch(`${this.apiUrl}/leads`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    const data = await res.json();
    return data.map((item: any) => this.mapToLead(item));
  }

  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead> {
    // Implement POST endpoint call
    throw new Error('Not implemented');
  }

  async updateLeadStage(leadId: string, newStage: StageType): Promise<void> {
    // Implement PATCH endpoint call
  }

  async deleteLead(leadId: string): Promise<void> {
    // Implement DELETE endpoint call
  }

  async fetchActivities(leadId?: string): Promise<Activity[]> {
    return [];
  }

  async addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    throw new Error('Not implemented');
  }

  private mapToLead(item: any): Lead {
    return {
      id: String(item.id),
      name: item.full_name || item.name,
      company: item.company_name || 'N/A',
      email: item.email || '',
      phone: item.phone || '',
      status: (item.stage as StageType) || 'Lead',
      value: Number(item.amount) || 0,
      assignedTo: item.owner || 'Unassigned',
      lastContacted: 'Recently',
      createdAt: item.created_at || new Date().toISOString().split('T')[0]
    };
  }
}
```

---

## Step 2: Register the Backend in Types & Store

1. Add your backend name to `BackendType` in `src/types/crm.ts`:
   ```typescript
   export type BackendType = 'mock' | 'directus' | 'frappe' | 'custom';
   ```

2. Update `src/services/apiAdapter.ts` to instantiate your adapter when `config.backendType === 'custom'`.

3. Test type verification:
   ```bash
   npx vue-tsc --noEmit
   ```
