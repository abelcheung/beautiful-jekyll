---
---
require.config
  baseUrl: `'{{ "assets/js" | relative_url }}'`
  shim:
    bootstrap:
      deps: ['jquery']
  paths:
    jquery: "//code.jquery.com/jquery-1.12.4.min"
    bootstrap: '//stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min'

