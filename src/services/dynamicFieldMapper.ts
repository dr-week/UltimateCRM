import { Lead, StageType } from '@/types/crm';

export interface DynamicLead extends Lead {
  customFields?: Record<string, any>;
}

export class DynamicFieldMapper {
  /**
   * Safely maps any backend JSON payload (Directus, Frappe, custom) to a Lead entity
   * while dynamically preserving all extra fields added in upstream GitHub code updates.
   */
  static mapToDynamicLead(raw: Record<string, any>, source: 'directus' | 'frappe' | 'generic'): DynamicLead {
    const knownKeys = new Set([
      'id', 'name', 'lead_name', 'company', 'organization', 'email', 'email_id',
      'phone', 'mobile_no', 'status', 'value', 'annual_revenue', 'assigned_to',
      'assignedTo', 'notes', 'date_created', 'createdAt'
    ]);

    const customFields: Record<string, any> = {};
    for (const [key, val] of Object.entries(raw)) {
      if (!knownKeys.has(key) && val !== null && val !== undefined) {
        customFields[key] = val;
      }
    }

    if (source === 'frappe') {
      return {
        id: String(raw.name || raw.id),
        name: String(raw.lead_name || raw.name || 'Unnamed Contact'),
        company: String(raw.organization || 'N/A'),
        email: String(raw.email_id || ''),
        phone: String(raw.mobile_no || ''),
        status: (raw.status as StageType) || 'Lead',
        value: Number(raw.annual_revenue) || 0,
        assignedTo: String(raw.owner || 'Frappe User'),
        notes: raw.notes || '',
        lastContacted: 'Recently',
        createdAt: raw.creation ? String(raw.creation).split(' ')[0] : new Date().toISOString().split('T')[0],
        customFields
      };
    }

    // Directus / Generic mapping
    return {
      id: String(raw.id),
      name: String(raw.name || 'Unnamed Contact'),
      company: String(raw.company || 'N/A'),
      email: String(raw.email || ''),
      phone: String(raw.phone || ''),
      status: (raw.status as StageType) || 'Lead',
      value: Number(raw.value) || 0,
      assignedTo: String(raw.assigned_to || raw.assignedTo || 'Unassigned'),
      notes: raw.notes || '',
      lastContacted: 'Recently',
      createdAt: raw.date_created ? String(raw.date_created).split('T')[0] : new Date().toISOString().split('T')[0],
      customFields
    };
  }
}
