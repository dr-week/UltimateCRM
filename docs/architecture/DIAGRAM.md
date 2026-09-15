# System Architecture & Data Flow Diagram

```
+-------------------------------------------------------------+
|                   Vue 3 Presentation Layer                  |
|     (CrmHeader, CrmKanban, CrmTable, CrmLeadDrawer)         |
+------------------------------+------------------------------+
                               |
                      Pinia Reactive Store
                         (crmStore.ts)
                               |
                  DynamicFieldMapper Service
                     (dynamicFieldMapper.ts)
                               |
                  CrmBackendAdapter Interface
                     (src/adapters/baseAdapter.ts)
                               |
        +----------------------+----------------------+
        |                      |                      |
 DirectusAdapter        FrappeAdapter          MockAdapter
(/items/leads REST)    (/resource/CRM Lead)   (In-Memory DB)
```
