# Workflows, Lifecycles & Launcher

## 1. Lead Lifecycle Stages
`New Lead` -> `Qualified` -> `Proposal` -> `Negotiation` -> `Closed Won` / `Closed Lost`.

## 2. Universal Website Embed Script (`crm-widget.js`)
Embed on external landing pages for automated inbound lead capture:
```html
<script src="https://crm.yourcompany.com/crm-widget.js" async></script>
```

## 3. Canonical Launcher (`scripts/launch.bat`)
Single launcher performing pre-flight type check, port 3000 session detection, and browser auto-launch:
```cmd
scripts\launch.bat
```
