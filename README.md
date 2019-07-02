# Fork of Beautiful Jekyll

Forked from official Beautiful Jekyll theme, with changes moving faster
forward, since Dean Attali desires a more stable theme as it has a large
user base. Intended and finished changes include:

- [x] Remote theme support
- [x] [Require.JS](https://requirejs.org/) integration
- [x] URL settings follow Jekyll guideline (available upstream)
- [x] Font Awesome updated to 5.9.0 webfont version
    - Not using SVG due to [problem in IE for CSS pseudo element][1]
- [x] Bootstrap and jQuery updated to latest minor release
- [ ] Use Bootstrap 4.x with SASS integration
- [ ] *(under progress)* More SASS refactoring, currently theme only uses raw CSS

[1]: https://github.com/FortAwesome/Font-Awesome/issues/12994

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
Please check out [my example repository][2] on how to use this theme as
remote theme. Only limited files need to be copied, mainly config and
some top level files. No template and no asset are needed, unless you
want to override them. Some additional files are needed for Staticman
support though. Anyway, remember:

[2]: https://github.com/abelcheung/site-test/

> ***No forking!***

Forking would copy each and every file, which defeats the purpose of
remote theme per se.

## Require.JS integration

With require.js, it is possible to load all required javascript libraries
asynchronously with dependencies fulfilled. Major part of relevant config
is available in [`assets/js/config.coffee`](assets/js/config.coffee).
Note that even jQuery UI is listed, it is not utilized in any part of
theme. Require.JS is intelligent enough to not load jQuery UI at all if
it is determined to be unused. The entry is placed there so that one can
use jQuery UI in their own additional scripts in future without modifying
config.

Besides one can write additional script for customization, without touching
the upstream theme script. This customization can be as granular as
per-layout or even per-page level. All of them uses `requirejs` key
in config, and config support for all manual javascript loading (`js`,
`ext-js` etc) are removed.

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
  - beautiful-jekyll
  - myscript
```
</td>
<td valign="top" markdown="1">
Define relevant script inside front matter of layout or post file:

```yaml
---
requirejs:
  - myscript
---
(file content)
```
</td>
</table>

Notice the omission of `.js` file extension in above config fragments.
All scripts are assumed to be placed in `assets/js` subfolder (see
`baseUrl` setting in `config.coffee`); please either change this
setting or prepend path to script name accordingly if you place your
scripts in other locations.

### Writing javascript in AMD style

Although RequireJS can load traditional scripts and specify dependencies
inside `config.coffee`, it is recommended to write your module in
*Asynchronous Module Definition* style. TL;DR:

```js
define (['jquery'], function($){
    // your code here
});
```

In the example above, the first argument (module ID) is omitted.
It suffices to write your script as an anonymous module. Second
argument is array of dependencies your script would use.
Finally it's *factory function*, with dependent modules as arguments.

Merit for using AMD and usage details are out of scope of this document;
[RequireJS website][3] and [AMD JS Group][4] already provide nice roundup
about everything related to AMD.

[3]: https://requirejs.org/docs/whyamd.html
[4]: https://github.com/amdjs/amdjs-api/blob/master/AMD.md

## URL setting change

This is already available upstream; please [visit upstream README][5]
for a summary of relevant changes.

[5]: https://github.com/daattali/beautiful-jekyll#user-content-my-project-page-appear-to-be-broken-after-a-recent-update

## Development using docker-compose

This section has [its own wiki page][6]. The advantage for using Docker
for local development is that, one don't need to install Ruby, Jekyll
and all sorts of stuff in order to preview and test your Github pages.
Besides the repo can be freed from artifacts resulting from local
software management and dependencies.

[6]: https://github.com/abelcheung/beautiful-jekyll/wiki/Development-with-docker-compose
