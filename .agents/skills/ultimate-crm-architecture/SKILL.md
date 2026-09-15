---
name: ultimate-crm-architecture
description: Guidelines, standards, and workflow instructions for extending, maintaining, and connecting UltimateCRM with Directus, Frappe, or custom REST/GraphQL APIs without modifying core backend code.
---

# UltimateCRM Architecture & Maintenance Skill

Use this skill whenever you need to update, extend, or launch **UltimateCRM**.

---

## 🚀 Launcher Standard (`scripts/launch.bat`)

Always use the single canonical batch launcher located strictly in `scripts/`:

```cmd
scripts\launch.bat
```

- **Pre-flight Type Check**: Runs `npx vue-tsc --noEmit` automatically.
- **Duplicate Guard**: Checks port 3000 to prevent running duplicate server sessions.

---

## 🏗️ Core Architectural Principles

1. **Zero Core Backend Modifications**:
   - Never alter Directus, Frappe, or third-party CRM source code.
   - All integrations communicate through standard OpenAPI, REST, or GraphQL HTTP endpoints.

2. **Decoupled Adapter Pattern**:
   - Every backend implementation resides in `src/adapters/` and implements `CrmBackendAdapter` ([baseAdapter.ts](file:///c:/Users/disha/Documents/CODES/studio/UltimateCRM/src/adapters/baseAdapter.ts)).

3. **Directus Dark Glassmorphic Design System**:
   - Maintain the signature Directus visual aesthetic: deep obsidian/slate backgrounds (`#0b0f17`), frosted glass panels (`backdrop-filter: blur(16px)`), electric violet/indigo accents (`#6366f1`).

---

## 📁 Repository Directory Standards

```
UltimateCRM/
├── .agents/skills/ultimate-crm-architecture/SKILL.md   # This skill file
├── docs/                                                # Modular integrated technical docs
│   ├── INDEX.md                                        # Central documentation index
│   ├── architecture/                                   # System pillars & diagram
│   ├── adapters/                                       # Interface & expansion guide
│   ├── design/                                         # Color tokens & utilities
│   └── workflows/                                      # Launcher & lead lifecycle
├── scripts/
│   ├── launch.bat                                      # SINGLE Canonical Batch Launcher
│   └── sync-schemas.ts                                 # Upstream backend schema sync script
└── src/                                                 # Clean Vue 3 + TypeScript SPA
```
