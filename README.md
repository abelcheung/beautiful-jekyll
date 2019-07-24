# Fork of Beautiful Jekyll

Forked from official Beautiful Jekyll theme, with changes moving faster
forward, since Dean Attali desires a more stable theme as it has a large
user base. Intended and finished changes include:

- [x] Remote theme support
- Speed up page loading with:
  - [x] Delegating most JavaScript and CSS loading to fast CDN with best worldwide presence ([jsDelivr][11] and [Cloudflare cdnjs][12])
  - [x] [Require.JS](https://requirejs.org/) integration
  - [x] [loadCSS][40] integration
- [x] Font Awesome updated to 5.8.2 webfont version
    - Not using SVG due to [problem in IE for CSS pseudo element][10]
- [x] Bootstrap and jQuery updated to latest minor release
- [x] URL settings follow Jekyll guideline (available upstream)
- [ ] Use Bootstrap 4.x with SASS integration
- [ ] *(under progress)* More SASS refactoring, currently theme only uses raw CSS
- [x] Layout reorganization and cleanup, some parts rewritten (like tag page)

[10]: https://github.com/FortAwesome/Font-Awesome/issues/12994
[11]: https://www.jsdelivr.com/
[12]: https://cdnjs.com/

Hopefully some of the modifications can be merged upstream in the future.
For any issues not mentioned here, please visit upstream theme
repository for info.

## Entry point for customization

Due to switching to SCSS from raw CSS and Require.JS integration (see
below), the appropriate place for user customization has deviated from
upstream theme.

| &nbsp; | CSS | Javascript |
| --- | --- | --- |
| Original | <ul><li>Change color and background image in site config</li><li>Modify `css/main.css` directly for everything else</li><li>Alternatively, add extra style sheet to 'css' folder and add its path to `common-css` key of layout front matter</li></ul> | Modify `js/main.js` directly |
| Now | <ul><li>Change color, background image and font in `_sass/beautiful-jekyll/_variables.scss`</li><li>Modify `_sass/customize.scss` for everything else</li></ul> | <ul><li>Add your script to `assets/js/`, and</li><li>Add module name to site config `requirejs` variable</li><li>See Require.JS section below for detail</li></ul> |

The intention of change is to keep upstream main CSS / script body intact, while modularizing user changes as much as possible. It would be relatively easier to sync from upstream change without messing up with one's own customizations.

## Remote theme support
Please check out [my example repository][20] on how to use this theme as
remote theme. Only limited files need to be copied, mainly config and
some top level files. No template and no asset are needed, unless you
want to override them. Some additional files are needed for Staticman
support though. Anyway, remember:

[20]: https://github.com/abelcheung/site-test/

> ***No forking!***

Forking would copy each and every file, which defeats the purpose of
remote theme per se.

## Require.JS integration

With require.js, it is possible to load all required javascript libraries
asynchronously with dependencies fulfilled. Major part of relevant config
is available under `requirejs` variable in `_config.yml`. There are 2
subkeys under `requirejs`:

| subkey | explanation |
| --- | --- |
| `mods` | Script module name, usually the base script file name without `.js` extension. |
| `libs` | Dependencies used by script modules. Only specified in `_config.yml`. |

Each library dependency in turn contains 3 properties: `name`, `href` and
`sri` (optional, see [this mozilla web doc][30] for explanation). Here is part
of default config:

[30]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

```yaml
requirejs:
  mods:
    - beautiful-jekyll
  libs:
    - name: jquery
      href: 'https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min'
      sri: 'sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ'
    - name: bootstrap
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min'
      sri: 'sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd'
```

One can write additional script for customization, without touching
the upstream theme script. This customization can be as granular as
per-layout or even per-page level. All of them uses `requirejs.mods`
variable just like how it is used in global config. In exchange,
all manual javascript loading facilities (`js`, `ext-js` etc) are dropped.

Following examples assume you have added your AMD style javascript
as `assets/js/myscript.js`:

<table>
<tr>
<th width="50%">Additional site script</th>
<th width="50%">Per-layout or per-page script</th>
</tr>
<tr>
<td valign="top" markdown="1">
Add your script beside the main one in `_config.yml`, for example:

```yaml
requirejs:
  mods:
    - beautiful-jekyll
    - myscript
```
</td>
<td valign="top" markdown="1">
Define relevant script inside front matter of layout or post file:

```yaml
---
requirejs:
  mods:
    - myscript
---
(post content or layout content)
```
</td>
</table>

All scripts are assumed to be placed under `assets/js/` subfolder
(see `_includes/head-scripts.html`); for overriding single script,
it is possible to use relative path when specifying script module
name like:

```yaml
requirejs:
  mods:
    - ../myscript
```

### Writing javascript in AMD style

Although RequireJS can load traditional scripts and specify dependencies
manually, it is recommended to write your module in
*Asynchronous Module Definition* style. TL;DR:

```js
define (['jquery'], function($){
    // your code here
});
```

In the example above, the first argument (module ID) is omitted.
It suffices to write your script as an anonymous module. Second
argument is array of dependencies your script would use. Finally
argument is *factory function*, with dependent modules as arguments.

Merit for using AMD and usage details are out of scope of this document;
[RequireJS website][31] and [AMD JS Group][32] already provide nice roundup
about everything related to AMD.

**Note:** for traditional scripts one has no control over (or loaded from
CDN), there is [shim config under requirejs][33]. For example, Bootstrap
3.x jQuery modules have no support for AMD (only supported for 4.x), thus
this fragment is used inside `_includes/head-scripts.html`:

```js
shim: {
  bootstrap: { deps: ['jquery'] }
}
```

[31]: https://requirejs.org/docs/whyamd.html
[32]: https://github.com/amdjs/amdjs-api/blob/master/AMD.md
[33]: https://requirejs.org/docs/api.html#config-shim

## loadCSS integration

[loadCSS][40] is chosen to attempt loading non-critical style sheets
asynchronously, like what `require.js` is doing for javascripts.
There are not much user related changes, except that an extra boolean key
`critical` is added to denote a style sheet being important, and must be loaded
in a blocking manner. Here is the default config demonstrating its use
in Bootstrap style sheet:

```yaml
common-css:
  - "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css":
      sri: "sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
      critical: true
```

[40]: https://github.com/filamentgroup/loadCSS/

## Notes for delegating resource to CDN

Since most JavaScript and CSS libraries have been offloaded externally, it is
essential that they were not tempered, compromising user experience. The
`common-css` variable fragment above shows the usage of [Subresource Integrity (SRI)][41],
which accompanies relevant resource with checksums to guarantee they are not changed
in any way. Once resource is loaded and checksum doesn't match, browser would refuse
to use the resource.

[41]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

## URL setting change

This is already available upstream; please [visit upstream README][50]
for a summary of relevant changes.

[50]: https://github.com/daattali/beautiful-jekyll#user-content-my-project-page-appear-to-be-broken-after-a-recent-update

## Layout reorganization

Layouts are a bit different from upsteram theme:

| Upstream | This fork |
| --- | --- |
| `base` | `default` |
| `default` | `minimal` |
| `minimal` | (removed) |

There are 2 reasons:

- Upstream `minimal` theme seems to be abandoned and completely out of place
  when compared with any site theme template; while its `default` layout
  does not contain any bells and whistles yet included enough elements to
  be considered as part of site.
- Another reason is, `default.html` is [the convention adopted by Jekyll][60] as
  the base template file name.

[60]: https://jekyllrb.com/docs/layouts/

## Change in site settings

The variables list here only includes those not available from Jekyll or from original
beautiful-jekyll theme. 

- Jekyll defaults: they are already available from [Jekyll variable documentation page][61].
  Won't be mentioned here unless there is significant deviation from Jekyll default.
- Beautiful Jekyll variables: please refer to [YAML parameter section in upstream readme][62]

| Parameter | Scope | Notes |
| --- | --- | --- |
| `category` | Page | This is already natively supported in Jekyll but completely unused in beautiful-jekyll. However, this fork has enabled its use when generating permalinks (using `permalink: pretty`). Future work is also planned on making category more useful. |
| `meta-description`, `meta-title` | Page | Removed. Originally undocumented upstream, they were used during social media sharing. Now social sharing would use original page title and description instead. |
| `requirejs` | Site, Layout, Page | Added. See require.js support above. |
| `js`, `ext-js`, `common-js`, `common-ext-js` | Layout, Page | Removed due to require.js integration. |
| `ext-css`, `common-ext-css` | Layout, Page | Removed. No more distinction between external and internal resource. |
| `css`, `common-css` | Layout, Page | Structure for subsettings are different from upstream. In this fork the URL itself is used as hash key. See loadCSS section for reference. |
| `googlefonts` | Layout, Page | Removed. All Google font resource are actually CSS and thus merged into `css` settings above. |
| `title-separator` | Site | Removed, now using bullet (U+2022) |
| `link-tags` | Site | Removed, now setting is enforced |
| `url-pretty` | Site | Removed, deemed redundant. Link to landing page already exists in navigation bar. |

[61]: https://jekyllrb.com/docs/variables/
[62]: https://github.com/daattali/beautiful-jekyll/#yaml-front-matter-parameters

## Development using docker-compose

This section has [its own wiki page][70]. The advantage for using Docker
for local development is that, one don't need to install Ruby, Jekyll
and all sorts of stuff in order to preview and test your Github pages.
Besides the repo can be freed from artifacts resulting from local
software management and dependencies.

[70]: https://github.com/abelcheung/beautiful-jekyll/wiki/Development-with-docker-compose
