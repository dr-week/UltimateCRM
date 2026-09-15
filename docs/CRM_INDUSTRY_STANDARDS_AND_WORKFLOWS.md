# CRM Industry Standards, Procedures & Multi-Website Workflows

This document details industry-standard CRM workflows, multi-website lead capture procedures, and top open-source projects (Vue 3, TypeScript, Directus, Frappe) that can be reused for website management, company profile portals, and multi-domain sync.

---

## 🧰 Part 1: Top Reusable Open-Source Projects

### 1. Headless CMS & Multi-Website Content Management
* **[Directus](https://github.com/directus/directus)** *(Vue 3 + TypeScript)*
  * **Best for**: Managing multi-domain website content, company profile databases, product catalogs, and client assets.
  * **Reuse Strategy**: Connect UltimateCRM directly to Directus collections (`websites`, `company_profiles`, `client_portals`).
* **[Payload CMS](https://github.com/payloadcms/payload)** *(TypeScript + REST/GraphQL)*
  * **Best for**: Developer-first website content management, SEO metadata, and blog/press releases.

### 2. Customer & Company Profile Portals
* **[Frappe Web Framework](https://github.com/frappe/frappe)** *(Python + Vue 3 UI)*
  * **Best for**: Self-service client portals where companies can update their profile, view deal statuses, upload tax/KYC documents, and view invoices.
* **[ToolJet](https://github.com/ToolJet/ToolJet)** / **[Appsmith](https://github.com/Appsmithorg/appsmith)** *(TypeScript)*
  * **Best for**: Building custom internal admin portals to view multi-company profiles across subsidiaries.

### 3. Multi-Website Lead & Form Capture Engines
* **[Formbricks](https://github.com/formbricks/formbricks)** *(TypeScript)*
  * **Best for**: Embedding privacy-friendly lead capture surveys and feedback widgets across your external websites.
* **[Typebot.io](https://github.com/typebot-io/typebot.io)** *(TypeScript)*
  * **Best for**: Conversational landing page chatbots that stream qualified leads directly into UltimateCRM's API endpoint (`/items/leads`).

---

## 📐 Part 2: Industry-Standard CRM Procedures & Lifecycles

```
+-----------------------------------------------------------------------------------+
|                        Standard CRM Lead & Deal Lifecycle                         |
+-----------------------------------------------------------------------------------+
|  1. Lead Capture      --> Inbound form submission from any external website       |
|  2. Attribution Tag   --> Attach domain, UTM parameters (utm_source, campaign)    |
|  3. MQL Scoring       --> Automatic qualification based on company size & value   |
|  4. SQL Assignment    --> Auto-assign lead to representative based on territory   |
|  5. Deal Pipeline     --> Lead -> Qualified -> Proposal -> Negotiation -> Closed  |
|  6. Client Portal     --> Auto-provision company profile on Closed Won            |
+-----------------------------------------------------------------------------------+
```

### Standard Stages Definition

| Stage Name | Definition & Entry Criteria | Automated Action Triggered |
| :--- | :--- | :--- |
| **New Lead** | Unqualified contact captured from external website form or chat. | Send welcome email & trigger rep notification. |
| **Qualified (MQL)** | Prospect matches target company profile (budget, size, urgency). | Assign sales rep (Alex, Diana, Marcus). |
| **Proposal Sent** | Pricing quote or formal statement of work delivered. | Set follow-up reminder timer (3 days). |
| **Negotiation** | Contract terms, legal review, or procurement under evaluation. | Trigger manager alert for high-value deals. |
| **Closed Won** | Signed contract or initial payment received. | Provision Company Profile in Client Portal. |
| **Closed Lost** | Deal cancelled or competitor selected. | Tag reason (Pricing, Feature Gap, Timing). |

---

## 🌐 Part 3: Multi-Website Integration Architecture

To connect UltimateCRM with your **other websites** without modifying backend code:

```
[ External Website A ] --( REST API / Webhook )--+
[ External Website B ] --( REST API / Webhook )---+--> [ UltimateCRM API Adapter ] --> [ Directus / Frappe DB ]
[ Landing Page Chat  ] --( REST API / Webhook )--+
```

### 1. Universal Website Embed Script (`crm-widget.js`)
Add this lightweight snippet to any of your external websites:

```html
<script>
  window.UltimateCRM = {
    apiKey: 'YOUR_PUBLIC_API_KEY',
    endpoint: 'https://crm.yourcompany.com/api/v1/leads'
  };
</script>
<script src="https://crm.yourcompany.com/crm-widget.js" async></script>
```

### 2. Multi-Website Lead Payload Format
Ensure all your websites send this standard JSON contract:

```json
{
  "name": "Jane Doe",
  "company": "Acme Corp",
  "email": "jane@acme.com",
  "phone": "+1 555-0199",
  "value": 50000,
  "source_domain": "website-b.com",
  "utm_source": "google_ads",
  "utm_campaign": "q3_enterprise"
}
```
