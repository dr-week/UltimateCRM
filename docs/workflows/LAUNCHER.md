# Smart Batch Launcher Guide (`scripts/launch.bat`)

Location: `scripts/launch.bat`

---

## 🚀 Capabilities

1. **Pre-Flight Type Check**: Runs `npx vue-tsc --noEmit` automatically before server startup.
2. **Duplicate Session Guard**: Inspects port `3000` via `netstat` to detect running server instances and prevent duplicate process spawning.
3. **Auto Browser Launch**: Opens `http://localhost:3000` in default browser upon clean test.

---

## 🛠️ Usage

```cmd
scripts\launch.bat
```
