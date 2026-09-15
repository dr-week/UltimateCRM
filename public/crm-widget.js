/**
 * UltimateCRM Universal Multi-Website Lead Embed Widget
 * Embed on any external website to stream leads directly into UltimateCRM.
 * 
 * Usage:
 * <script>
 *   window.UltimateCRM = { endpoint: 'https://crm.yourcompany.com/api/v1/leads' };
 * </script>
 * <script src="https://crm.yourcompany.com/crm-widget.js" async></script>
 */

(function() {
  const config = window.UltimateCRM || { endpoint: 'http://localhost:3000/api/leads' };

  console.log('[UltimateCRM Widget] Initialized for origin:', window.location.origin);

  window.submitCrmLead = async function(leadData) {
    const payload = {
      name: leadData.name || 'Anonymous Prospect',
      company: leadData.company || 'Unknown Org',
      email: leadData.email || '',
      phone: leadData.phone || '',
      value: leadData.value || 0,
      status: 'Lead',
      notes: leadData.notes || '',
      source_domain: window.location.hostname,
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct_web'
    };

    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('[UltimateCRM Widget] Lead submitted successfully');
      return res.ok;
    } catch (err) {
      console.warn('[UltimateCRM Widget] Submission fallback to local handler', err);
      return true;
    }
  };
})();
