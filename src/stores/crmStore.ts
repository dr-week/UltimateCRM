import { defineStore } from 'pinia';
import { Lead, Activity, ApiConfig, StageType } from '@/types/crm';
import { apiAdapter } from '@/services/apiAdapter';

const DEFAULT_CONFIG: ApiConfig = {
  backendType: 'mock',
  directusUrl: '',
  directusToken: '',
  frappeUrl: '',
  frappeApiKey: '',
  frappeApiSecret: ''
};

export const useCrmStore = defineStore('crm', {
  state: () => ({
    leads: [] as Lead[],
    activities: [] as Activity[],
    selectedLead: null as Lead | null,
    isDrawerOpen: false,
    isSettingsOpen: false,
    isNewLeadOpen: false,
    viewMode: 'kanban' as 'kanban' | 'table',
    searchQuery: '',
    selectedStageFilter: 'all',
    isLoading: false,
    apiConfig: JSON.parse(localStorage.getItem('ultimate_crm_config') || JSON.stringify(DEFAULT_CONFIG)) as ApiConfig
  }),

  getters: {
    filteredLeads(state): Lead[] {
      return state.leads.filter(lead => {
        const matchesSearch = 
          lead.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          lead.company.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(state.searchQuery.toLowerCase());

        const matchesStage = state.selectedStageFilter === 'all' || lead.status === state.selectedStageFilter;

        return matchesSearch && matchesStage;
      });
    },

    totalPipelineValue(state): number {
      return state.leads
        .filter(l => l.status !== 'Closed Lost')
        .reduce((sum, l) => sum + l.value, 0);
    },

    wonPipelineValue(state): number {
      return state.leads
        .filter(l => l.status === 'Closed Won')
        .reduce((sum, l) => sum + l.value, 0);
    },

    activeDealsCount(state): number {
      return state.leads.filter(l => l.status !== 'Closed Won' && l.status !== 'Closed Lost').length;
    },

    winRate(state): number {
      const closed = state.leads.filter(l => l.status === 'Closed Won' || l.status === 'Closed Lost');
      if (closed.length === 0) return 0;
      const won = state.leads.filter(l => l.status === 'Closed Won').length;
      return Math.round((won / closed.length) * 100);
    }
  },

  actions: {
    async fetchLeads() {
      this.isLoading = true;
      try {
        this.leads = await apiAdapter.getLeads(this.apiConfig);
        this.activities = await apiAdapter.getActivities(this.apiConfig);
      } finally {
        this.isLoading = false;
      }
    },

    async updateStage(leadId: string, newStage: StageType) {
      const lead = this.leads.find(l => l.id === leadId);
      if (lead) {
        lead.status = newStage;
        lead.lastContacted = 'Just now';
        await apiAdapter.updateLeadStage(this.apiConfig, leadId, newStage);
      }
    },

    async createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>) {
      const created = await apiAdapter.createLead(this.apiConfig, leadData);
      this.leads.unshift(created);
      this.isNewLeadOpen = false;
    },

    async removeLead(leadId: string) {
      await apiAdapter.deleteLead(this.apiConfig, leadId);
      this.leads = this.leads.filter(l => l.id !== leadId);
      if (this.selectedLead?.id === leadId) {
        this.isDrawerOpen = false;
        this.selectedLead = null;
      }
    },

    async addLogActivity(leadId: string, type: 'call' | 'email' | 'meeting' | 'note', title: string, description: string) {
      const newAct = await apiAdapter.addActivity(this.apiConfig, {
        leadId,
        type,
        title,
        description,
        author: 'Alex Mercer'
      });
      this.activities.unshift(newAct);
    },

    openLeadDetails(lead: Lead) {
      this.selectedLead = lead;
      this.isDrawerOpen = true;
    },

    closeLeadDetails() {
      this.isDrawerOpen = false;
      this.selectedLead = null;
    },

    saveConfig(newConfig: ApiConfig) {
      this.apiConfig = newConfig;
      localStorage.setItem('ultimate_crm_config', JSON.stringify(newConfig));
      this.isSettingsOpen = false;
      this.fetchLeads();
    }
  }
});
