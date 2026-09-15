import { CrmBackendAdapter } from './baseAdapter';
import { Lead, Activity, StageType } from '@/types/crm';
import { DynamicFieldMapper } from '@/services/dynamicFieldMapper';

export class FrappeAdapter implements CrmBackendAdapter {
  name = 'Frappe REST API';

  constructor(private baseUrl: string, private apiKey: string, private apiSecret: string) {}

  private get headers() {
    return {
      'Authorization': `token ${this.apiKey}:${this.apiSecret}`,
      'Content-Type': 'application/json'
    };
  }

  async fetchLeads(): Promise<Lead[]> {
    if (!this.baseUrl) return [];
    try {
      const res = await fetch(`${this.baseUrl}/api/resource/CRM Lead?fields=["*"]`, {
        headers: this.headers
      });
      if (!res.ok) throw new Error(`Frappe returned status ${res.status}`);
      const payload = await res.json();
      return (payload.data || []).map((item: any) => 
        DynamicFieldMapper.mapToDynamicLead(item, 'frappe')
      );
    } catch (err) {
      console.error('Frappe Adapter Error:', err);
      throw err;
    }
  }

  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead> {
    const res = await fetch(`${this.baseUrl}/api/resource/CRM Lead`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        lead_name: lead.name,
        organization: lead.company,
        email_id: lead.email,
        mobile_no: lead.phone,
        status: lead.status,
        annual_revenue: lead.value
      })
    });
    const data = await res.json();
    return DynamicFieldMapper.mapToDynamicLead(data.data, 'frappe');
  }

  async updateLeadStage(leadId: string, newStage: StageType): Promise<void> {
    await fetch(`${this.baseUrl}/api/resource/CRM Lead/${leadId}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ status: newStage })
    });
  }

  async deleteLead(leadId: string): Promise<void> {
    await fetch(`${this.baseUrl}/api/resource/CRM Lead/${leadId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  async fetchActivities(leadId?: string): Promise<Activity[]> {
    return [];
  }

  async addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    return {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: 'Just now'
    };
  }
}
