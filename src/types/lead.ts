export type StageType = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: StageType;
  value: number;
  assignedTo: string;
  avatarUrl?: string;
  notes?: string;
  lastContacted: string;
  createdAt: string;
  customFields?: Record<string, any>;
}
