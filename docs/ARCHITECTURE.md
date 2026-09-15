# UltimateCRM Technical Architecture

**UltimateCRM** is designed as a decoupled, zero-backend-modification CRM frontend built with **Vue 3, TypeScript, Vite, and Pinia**.

---

## Architecture Diagram

```
+-------------------------------------------------------------------+
|                   UltimateCRM Decoupled Frontend                  |
|                                                                   |
|   +-------------------+    +-----------------+    +-----------+   |
|   | Directus UI Theme |    | Kanban / Table  |    | Lead      |   |
|   | (Glassmorphism)   |    | View Components |    | Drawer    |   |
|   +---------+---------+    +--------+--------+    +-----+-----+   |
|             |                       |                   |         |
|             +-----------------------+-------------------+         |
|                                     |                             |
|                           Pinia Store (crmStore)                  |
|                                     |                             |
|                        CrmBackendAdapter Interface                |
+-------------------------------------+-----------------------------+
                                      |
              +-----------------------+-----------------------+
              |                       |                       |
              v                       v                       v
      +---------------+       +---------------+       +---------------+
      | Directus REST |       |  Frappe REST  |       |   Mock Data   |
      |    Adapter    |       |    Adapter    |       |    Adapter    |
      +---------------+       +---------------+       +---------------+
              |                       |                       |
              v                       v                       v
      Directus Instance       Frappe / ERPNext         Local Memory
```

---

## Core Pillars

### 1. Zero Core Modifications
- Backends (Directus, Frappe, Odoo, custom Node/Python services) operate in their standard distribution form.
- Authentication and data transfer happen strictly over HTTP using standard API tokens or API Key/Secret pairs.

### 2. Pluggable Adapters
- All network interaction is mediated through implementations of the `CrmBackendAdapter` contract interface.
- Switching backends is zero-downtime and controlled at runtime via a UI setting or environment configuration.

### 3. Maintenance Isolation
- Reference repositories, third-party schemas, and doc specs are housed in `references/` and `docs/`.
- Frontend source code (`src/`) remains isolated and clean.
