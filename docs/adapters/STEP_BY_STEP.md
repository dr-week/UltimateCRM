# Step-by-Step Guide: Adding a New Backend Adapter

1. **Create Adapter File**:
   Create `src/adapters/<name>Adapter.ts` implementing `CrmBackendAdapter`.

2. **Register Backend Type**:
   Add backend name to `BackendType` in `src/types/config.ts`.

3. **Update Factory**:
   Add instantiation logic to `src/services/apiAdapter.ts`.

4. **Verify Type Compilation**:
   ```bash
   npx vue-tsc --noEmit
   ```
