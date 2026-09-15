# UltimateCRM Core Architectural Pillars

1. **Zero Core Backend Modifications**:
   - Directus, Frappe, and third-party backends run untouched.
   - All data sync occurs via standard OpenAPI, REST, or GraphQL HTTP APIs.

2. **Pluggable Decoupled Adapters**:
   - Backend APIs implement `CrmBackendAdapter` (`src/adapters/`).
   - Switch backends at runtime via Settings UI without touching Vue code.

3. **Directus Dark Glassmorphic Design System**:
   - Signature obsidian backgrounds (`#0b0f17`), frosted glass panels, and electric violet accents (`#6366f1`).
