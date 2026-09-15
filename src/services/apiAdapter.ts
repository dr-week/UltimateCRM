import { Lead, Activity, ApiConfig, StageType } from '@/types/crm';

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Connor',
    company: 'Cyberdyne Systems',
    email: 'sarah.c@cyberdyne.io',
    phone: '+1 (555) 019-2831',
    status: 'Qualified',
    value: 85000,
    assignedTo: 'Alex Mercer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    notes: 'Key decision maker for security infrastructure expansion.',
    lastContacted: '2 hours ago',
    createdAt: '2026-09-10'
  },
  {
    id: 'lead-2',
    name: 'Bruce Wayne',
    company: 'Wayne Enterprises',
    email: 'bruce@waynecorp.com',
    phone: '+1 (555) 012-9988',
    status: 'Proposal',
    value: 240000,
    assignedTo: 'Diana Prince',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    notes: 'Requested custom enterprise SLA and multi-region backup cluster.',
    lastContacted: '1 day ago',
    createdAt: '2026-09-08'
  },
  {
    id: 'lead-3',
    name: 'Tony Stark',
    company: 'Stark Industries',
    email: 'tony@starkind.com',
    phone: '+1 (555) 314-1592',
    status: 'Negotiation',
    value: 450000,
    assignedTo: 'Alex Mercer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    notes: 'Final contract terms under review by legal counsel.',
    lastContacted: '3 hours ago',
    createdAt: '2026-09-01'
  },
  {
    id: 'lead-4',
    name: 'Elena Rostova',
    company: 'Apex BioTech',
    email: 'elena@apexbio.org',
    phone: '+44 20 7946 0912',
    status: 'Closed Won',
    value: 120000,
    assignedTo: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    notes: 'Annual license agreement signed and onboarding initiated.',
    lastContacted: 'Yesterday',
    createdAt: '2026-08-25'
  },
  {
    id: 'lead-5',
    name: 'David Zhao',
    company: 'Quantum Dynamics',
    email: 'zhao@quantum.ai',
    phone: '+86 21 6123 4567',
    status: 'Lead',
    value: 65000,
    assignedTo: 'Diana Prince',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    notes: 'Inbound inquiry via website pricing page.',
    lastContacted: '4 days ago',
    createdAt: '2026-09-14'
  }
];

const INITIAL_MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    leadId: 'lead-3',
    type: 'meeting',
    title: 'Executive Demo & Security Review',
    description: 'Walked through ISO 27001 compliance and automated failover capabilities with CTO.',
    timestamp: 'Today at 10:30 AM',
    author: 'Alex Mercer'
  },
  {
    id: 'act-2',
    leadId: 'lead-2',
    type: 'email',
    title: 'Sent Revised Proposal v2.4',
    description: 'Included 15% volume discount for 3-year commitment.',
    timestamp: 'Yesterday at 4:15 PM',
    author: 'Diana Prince'
  },
  {
    id: 'act-3',
    leadId: 'lead-1',
    type: 'call',
    title: 'Discovery Call with Procurement',
    description: 'Confirmed budget allocation for Q4 software rollout.',
    timestamp: 'Sep 12 at 2:00 PM',
    author: 'Alex Mercer'
  }
];

class ApiAdapterService {
  private mockLeads: Lead[] = [...INITIAL_MOCK_LEADS];
  private mockActivities: Activity[] = [...INITIAL_MOCK_ACTIVITIES];

  async getLeads(config: ApiConfig): Promise<Lead[]> {
    if (config.backendType === 'directus' && config.directusUrl) {
      try {
        const res = await fetch(`${config.directusUrl}/items/leads`, {
          headers: {
            'Authorization': `Bearer ${config.directusToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          return data.data.map((item: any) => ({
            id: String(item.id),
            name: item.name || 'Unnamed Contact',
            company: item.company || 'N/A',
            email: item.email || '',
            phone: item.phone || '',
            status: (item.status as StageType) || 'Lead',
            value: Number(item.value) || 0,
            assignedTo: item.assigned_to || 'Unassigned',
            notes: item.notes || '',
            lastContacted: 'Recently',
            createdAt: item.date_created || new Date().toISOString().split('T')[0]
          }));
        }
      } catch (err) {
        console.warn('Directus API connection failed, using fallback data', err);
      }
    }

    if (config.backendType === 'frappe' && config.frappeUrl) {
      try {
        const res = await fetch(`${config.frappeUrl}/api/resource/CRM Lead?fields=["name","lead_name","organization","email_id","mobile_no","status","annual_revenue"]`, {
          headers: {
            'Authorization': `token ${config.frappeApiKey}:${config.frappeApiSecret}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          return data.data.map((item: any) => ({
            id: item.name,
            name: item.lead_name || item.name,
            company: item.organization || 'N/A',
            email: item.email_id || '',
            phone: item.mobile_no || '',
            status: (item.status as StageType) || 'Lead',
            value: Number(item.annual_revenue) || 0,
            assignedTo: 'Frappe User',
            notes: 'Fetched live from Frappe DocType',
            lastContacted: 'Recently',
            createdAt: new Date().toISOString().split('T')[0]
          }));
        }
      } catch (err) {
        console.warn('Frappe API connection failed, using fallback data', err);
      }
    }

    // Default: Mock Engine
    return [...this.mockLeads];
  }

  async createLead(config: ApiConfig, lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead> {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      lastContacted: 'Just now',
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=150&auto=format&fit=crop&q=80`
    };

    this.mockLeads.unshift(newLead);
    return newLead;
  }

  async updateLeadStage(config: ApiConfig, leadId: string, newStage: StageType): Promise<void> {
    const index = this.mockLeads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      this.mockLeads[index].status = newStage;
      this.mockLeads[index].lastContacted = 'Just now';
    }
  }

  async deleteLead(config: ApiConfig, leadId: string): Promise<void> {
    this.mockLeads = this.mockLeads.filter(l => l.id !== leadId);
  }

  async getActivities(config: ApiConfig, leadId?: string): Promise<Activity[]> {
    if (leadId) {
      return this.mockActivities.filter(a => a.leadId === leadId);
    }
    return [...this.mockActivities];
  }

  async addActivity(config: ApiConfig, activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: 'Just now'
    };
    this.mockActivities.unshift(newActivity);
    return newActivity;
  }
}

export const apiAdapter = new ApiAdapterService();
