# Multi-Website Lead Embed Integration

Embed snippet on external websites:

```html
<script src="https://your-crm-domain/crm-widget.js"></script>
<script>
  window.submitCrmLead({
    name: 'Jane Doe',
    company: 'Acme Corp',
    email: 'jane@acme.com',
    value: 50000
  });
</script>
```

Embed script automatically captures `source_domain` and `utm_source` parameters.
