# Recurring Development & Automated Testing Workflow

This document outlines the standard recurring development lifecycle for **UltimateCRM** to maintain code quality, zero-error type safety, and seamless backend API synchronization across iterations.

---

## 🔁 The 4-Step Recurring Cycle

```
+-------------------------------------------------------------------------------+
|                       Recurring Development Loop                             |
+-------------------------------------------------------------------------------+
| 1. Implement Feature   --> Write micro-components (< 50 lines each)           |
| 2. Type Check          --> Run `npx vue-tsc --noEmit`                         |
| 3. Production Build    --> Run `npm run build` (`nuxt build`)                 |
| 4. Sync & Commit       --> Execute `scripts\launch.bat` & Push to GitHub      |
+-------------------------------------------------------------------------------+
```

---

## ⚙️ Workflow Standard Procedures

### Step 1: Micro-Component Code Development
- Maintain strict modularity: keep Vue components under 50-80 lines per file in `src/components/`.
- Ensure all third-party API logic is isolated in `src/adapters/` and `src/services/`.

### Step 2: Automated Pre-Flight Type Check
Before committing changes, execute:
```bash
npx vue-tsc --noEmit
```
Must pass with **0 errors**.

### Step 3: Nitro Production Build Validation
Verify that Nitro SSR and client assets build cleanly:
```bash
npm run build
```

### Step 4: Upstream Schema Sync & Launch
If schema updates were made on Directus or Frappe backends, run schema sync:
```bash
npx tsx scripts/sync-schemas.ts
```
Then launch the development server using the canonical batch launcher:
```cmd
scripts\launch.bat
```

---

## ⏱️ Task Scheduling

To run recurring automated checks or timers, use the `/schedule` command or schedule background checks directly.
