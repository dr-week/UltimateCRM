import fs from 'fs';
import path from 'path';

/**
 * Dynamic Upstream Backend Schema Sync Script for UltimateCRM
 * 
 * Fetches upstream Directus / Frappe field metadata and generates
 * dynamic UI field contracts so upstream GitHub changes don't break the CRM.
 */

export async function syncDirectusSchema(directusUrl: string, token: string) {
  try {
    console.log(`[Schema Sync] Fetching Directus fields from ${directusUrl}...`);
    const res = await fetch(`${directusUrl}/fields/leads`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      const targetPath = path.resolve(process.cwd(), 'references/directus/schema_reference.json');
      fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
      console.log(`[Schema Sync] Directus schema updated successfully!`);
    }
  } catch (err) {
    console.warn('[Schema Sync] Directus sync skipped:', err);
  }
}

export async function syncFrappeDocType(frappeUrl: string, apiKey: string, apiSecret: string) {
  try {
    console.log(`[Schema Sync] Fetching Frappe CRM Lead DocType from ${frappeUrl}...`);
    const res = await fetch(`${frappeUrl}/api/resource/DocType/CRM Lead`, {
      headers: { 'Authorization': `token ${apiKey}:${apiSecret}` }
    });
    if (res.ok) {
      const data = await res.json();
      const targetPath = path.resolve(process.cwd(), 'references/frappe/doctype_reference.json');
      fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
      console.log(`[Schema Sync] Frappe CRM Lead schema updated successfully!`);
    }
  } catch (err) {
    console.warn('[Schema Sync] Frappe sync skipped:', err);
  }
}

console.log('--- UltimateCRM Upstream Schema Sync Ready ---');
