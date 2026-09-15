import { CrmBackendAdapter } from './baseAdapter';
import { Lead, Activity, StageType } from '@/types/crm';
import { DynamicFieldMapper } from '@/services/dynamicFieldMapper';

export class DirectusAdapter implements CrmBackendAdapter {
  name = 'Directus REST API';

  constructor(private baseUrl: string, private token: string) {}

  async fetchLeads(): Promise<Lead[]> {
    if (!this.baseUrl) return [];
    try {
      const res = await fetch(`${this.baseUrl}/items/leads`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error(`Directus returned status ${res.status}`);
      const payload = await res.json();
      return (payload.data || []).map((item: any) => 
        DynamicFieldMapper.mapToDynamicLead(item, 'directus')
      );
    } catch (err) {
      console.error('Directus Adapter Error:', err);
      throw err;
    }
  }

  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead> {
    const res = await fetch(`${this.baseUrl}/items/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lead)
    });
    const data = await res.json();
    return DynamicFieldMapper.mapToDynamicLead(data.data, 'directus');
  }

  async updateLeadStage(leadId: string, newStage: StageType): Promise<void> {
    await fetch(`${this.baseUrl}/items/leads/${leadId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStage })
    });
  }

  async deleteLead(leadId: string): Promise<void> {
    await fetch(`${this.baseUrl}/items/leads/${leadId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  async fetchActivities(leadId?: string): Promise<Activity[]> {
    const endpoint = leadId 
      ? `${this.baseUrl}/items/activities?filter[leadId][_eq]=${leadId}`
      : `${this.baseUrl}/items/activities`;
    const res = await fetch(endpoint, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    const data = await res.json();
    return data.data || [];
  }

  async addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    const res = await fetch(`${this.baseUrl}/items/activities`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    });
    const data = await res.json();
    return data.data;
  }
}
