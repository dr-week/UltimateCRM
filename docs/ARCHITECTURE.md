# System Architecture

UltimateCRM uses a decoupled Nuxt 3 frontend communicating strictly via REST/GraphQL APIs.

```
+-------------------------------------------------------------------------+
|                  UltimateCRM Decoupled Nuxt 3 App                       |
|  +--------------------+   +-------------------+   +------------------+  |
|  | CrmSidebar Frame   |   | CrmToolbar Header |   | Active View Tab  |  |
|  +---------+----------+   +---------+---------+   +--------+---------+  |
|            |                        |                      |            |
|            +------------------------+----------------------+            |
|                                     |                                   |
|                           Pinia Store (crmStore)                        |
|                                     |                                   |
|                        CrmBackendAdapter Contract                       |
+-------------------------------------+-----------------------------------+
                                      |
              +-----------------------+-----------------------+
              v                       v                       v
      Directus REST            Frappe REST            Mock Engine
```

## Core Pillars
1. **Zero Backend Modifications**: Standard Directus, Frappe, or custom REST APIs.
2. **Pluggable Adapters**: Runtime backend switching via UI setting (`apiAdapter.ts`).
3. **Micro-Component Family Tree**: Modular `.vue` files strictly under 30-50 lines each.
