---
name: ultimate-crm-architecture
description: Guidelines, standards, and workflow instructions for extending, maintaining, and adding backend adapters to UltimateCRM without modifying core Directus or Frappe codebases.
---

# UltimateCRM Architecture & Maintenance Skill

Use this skill whenever you need to update, extend, or add new features or backend adapters to **UltimateCRM**.

---

## 🏗️ Core Architectural Principles

1. **Zero Core Backend Modifications**:
   - Never alter Directus, Frappe, or third-party CRM source code.
   - All integrations must communicate through standard OpenAPI, REST, or GraphQL HTTP endpoints.

2. **Decoupled Adapter Pattern**:
   - Every backend implementation resides in `src/adapters/` and implements the `CrmBackendAdapter` interface ([baseAdapter.ts](file:///c:/Users/disha/Documents/CODES/studio/UltimateCRM/src/adapters/baseAdapter.ts)).
   - Adding a new backend (e.g., Odoo, Twenty, HubSpot) requires creating a single adapter file without changing existing Vue components.

3. **Directus Dark Glassmorphic Design System**:
   - Maintain the signature Directus visual aesthetic: deep obsidian/slate backgrounds (`#0b0f17`), frosted glass panels (`backdrop-filter: blur(16px)`), electric violet/indigo accents (`#6366f1`), and crisp typography (`Outfit` & `Inter`).

---

## 📁 Repository Directory Standards

Maintain this strict folder structure to keep the root directory lean and organized:

```
UltimateCRM/
├── .agents/skills/ultimate-crm-architecture/SKILL.md   # This skill file
├── docs/                                                # Integrated technical docs
│   ├── ARCHITECTURE.md                                 # Architectural overview
│   ├── ADAPTER_GUIDE.md                                # Guide for adding new adapters
│   └── THEME_GUIDE.md                                  # Design system & CSS tokens
├── references/                                          # Structured reference data
│   ├── crms/                                           # Cloned reference codebases
│   ├── directus/schema_reference.json                  # Directus collection schemas
│   └── frappe/doctype_reference.json                   # Frappe DocType schemas
└── src/                                                 # Clean Vue 3 + TypeScript SPA
    ├── adapters/                                       # Pluggable backend adapters
    ├── assets/main.css                                 # Directus glassmorphic styling
    ├── components/                                     # Vue 3 UI components
    ├── stores/crmStore.ts                              # Pinia state management
    └── types/crm.ts                                    # TypeScript entity interfaces
```

---

## 🔌 How to Add a New Backend Adapter

To add support for a new CRM backend (e.g. Odoo):

1. **Create the Adapter File**:
   Create `src/adapters/odooAdapter.ts` implementing `CrmBackendAdapter`:
   ```typescript
   import { CrmBackendAdapter } from './baseAdapter';
   import { Lead, Activity, StageType } from '@/types/crm';

   export class OdooAdapter implements CrmBackendAdapter {
     name = 'Odoo REST API';
     constructor(private url: string, private apiKey: string) {}

     async fetchLeads(): Promise<Lead[]> { /* ... */ }
     async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>): Promise<Lead> { /* ... */ }
     async updateLeadStage(leadId: string, newStage: StageType): Promise<void> { /* ... */ }
     async deleteLead(leadId: string): Promise<void> { /* ... */ }
     async fetchActivities(leadId?: string): Promise<Activity[]> { /* ... */ }
     async addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> { /* ... */ }
   }
   ```

2. **Register in Store**:
   Update `src/types/crm.ts` (`BackendType`) and `src/services/apiAdapter.ts` to instantiate the adapter when selected.

---

## 🛠️ Verification Protocol

Before completing any maintenance or feature addition:
1. Run static type checks: `npx vue-tsc --noEmit`.
2. Test view mode toggling (Kanban vs Table).
3. Verify that zero source files inside `references/` or third-party core repositories were altered.
