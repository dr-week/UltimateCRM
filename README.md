# UltimateCRM

A high-performance, decoupled CRM frontend inspired by **Directus dark glassmorphism** and **Frappe data architecture**, built with **Nuxt 3 (Vue 3 + TypeScript)**.

---

## 🚀 Quick Start

Launch using the canonical Windows batch launcher:

```cmd
scripts\launch.bat
```

Or start the Nuxt development server manually:

```bash
npm run dev
```

App URL: `http://localhost:3000`

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Nuxt 3](https://nuxt.com/) (`srcDir: 'src/'`)
- **Logic**: Vue 3 Composition API + TypeScript (`<script setup lang="ts">`)
- **State**: Pinia (`@pinia/nuxt`)
- **Styling**: Vanilla CSS custom properties (`src/assets/main.css`) — Directus Dark Glassmorphism (`#0b0f17`, `#6366f1` violet accents)
- **API Adapters**: Pluggable REST/GraphQL clients (`Directus`, `Frappe`, `Mock`)
- **Drag & Drop**: Native HTML5 Drag-and-Drop API

---

## 📁 Repository Structure

```
UltimateCRM/
├── .agents/skills/    # Agent skill definition
├── docs/              # Modular technical docs
│   ├── architecture/  # Core pillars & diagrams
│   ├── adapters/      # API adapter specs
│   ├── design/        # CSS design tokens & glass utilities
│   └── workflows/     # Launcher & lead lifecycle
├── public/            # Public static assets & crm-widget.js embed script
├── scripts/           # Maintenance scripts & launch.bat launcher
└── src/               # Nuxt 3 application root
    ├── adapters/      # Backend API adapter contracts
    ├── assets/        # Global CSS design system
    ├── components/    # Micro-components (< 50 lines each)
    ├── pages/         # Nuxt route pages (index.vue)
    ├── services/      # Dynamic field mapper & API factory
    ├── stores/        # Pinia crmStore
    └── types/         # TypeScript interface contracts
```

---

## 📚 Lean Documentation

- [Architecture Diagram](docs/ARCHITECTURE.md)
- [Building Custom Adapters](docs/ADAPTER_GUIDE.md)
- [Design Tokens & Theme Guide](docs/THEME_GUIDE.md)
- [CRM Lifecycles & Multi-Site Embed](docs/CRM_INDUSTRY_STANDARDS_AND_WORKFLOWS.md)
- [Full Documentation Index](docs/INDEX.md)
