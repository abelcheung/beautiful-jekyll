# Fork of Beautiful Jekyll

Forked from official Beautiful Jekyll theme, with changes moving faster
forward, since Dean Attali desires a more stable theme as it has a large
user base. Intended and finished changes include:

- [x] Remote theme support
- Speed up page loading with:
  - [x] [Require.JS](https://requirejs.org/) integration
  - [ ] [loadCSS](https://github.com/filamentgroup/loadCSS/) integration
- [x] URL settings follow Jekyll guideline (available upstream)
- [x] Font Awesome updated to 5.9.0 webfont version
    - Not using SVG due to [problem in IE for CSS pseudo element][4]
- [x] Bootstrap updated to 3.4.1 to migitate XSS vulnerability
- [ ] Use Bootstrap 4.x with SASS integration
- [ ] More SASS refactoring, currently theme only uses raw CSS

Hopefully some of the modifications can be merged upstream in the future.
For any issues not mentioned here, please visit upstream theme
repository for info.

## Remote theme support
Please check out [my example repository][1] on how to use this theme as
remote theme. Only limited files need to be copied (mainly config and
some top level files), no template and no asset needed, unless you
want to override them. So remember:

> ***No forking!***

Forking would copy each and every file, which defeats the purpose of
remote theme per se.

[1]: https://github.com/abelcheung/site-test/

## Require.JS integration

With require.js, it is possible to load all required javascript libraries
asynchronously with dependencies fulfilled. Major part of relevant config
is available under `requirejs` variable in `_config.yml`. There are 2
subkeys under `requirejs`:

| subkey | explanation |
| --- | --- |
| `mods` | Script module name, usually the base script file name without `.js` extension |
| `libs` | Dependencies used by script modules |

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

One would notice `Gemfile` and friends are removed from this repository,
and even `Dockerfile` is gone, since I'm using `docker-compose` for
development.

Using `docker-compose` is one of the easiest way for local testing of Jekyll
themes, especially on Windows where Jekyll isn't officially supported. With
existing jekyll docker image it is a breeze to get it running, all the while
keeping your Windows free from Ruby installation (which involves quite some
work to get Jekyll usable). Here is an example `docker-compose.yml`:

```yml
version: '3'
services:
  mysite:
    image: jekyll/jekyll:pages
    environment:
      - JEKYLL_ENV=production
    command: jekyll serve --config _config.yml,_config-dev.yml
    ports:
      - 4000:4000
    volumes:
      - .:/srv/jekyll
```

**BEWARE 1:** This config assumes all of `docker-compose.yml`, `_config.yml` and
`_config-dev.yml` (used for overriding `site.url` etc. for local testing)
are placed on root of git repository folder.

**BEWARE 2:** `JEKYLL_ENV` environment variable defaults to 'development',
and `site.url` would be forcefully set to `http://0.0.0.0:4000/` as result.
If you use custom `site.url`, setting it to any other value suffices, not
necessarily 'production'.

With Docker properly set up to make use of native system (Linux, or WSL --
Windows Subsystem for Linux), it is a matter of

```sh
$ docker-compose up

Creating github_mysite_1 ... done
Attaching to github_mysite_1
mysite_1  | ruby 2.6.3p62 (2019-04-16 revision 67580) [x86_64-linux-musl]
mysite_1  | ......

# Test your site on http://localhost:4000/

$ docker-compose down
```

## Docker-toolbox on older Windows and Mac

It's a bit involved for Docker-toolbox, which uses Virtualbox for its backend.
One of the major obstacle is, it's very probable for docker container to fail
accessing host folder, since shared folder inside Virtualbox image is not
properly configured. To alleviate the problem, one can follow
[the guide written by Charles Stover][2], which is briefly:

1. Use Virtualbox UI, turn off virtual machine (alternatively, run
   `docker-machine stop`, but next step needs Virtualbox anyway)
2. Configure custom shared folder, making your git repository available to
   the VM (say, `/mysite` mount point inside VM)
3. Modify `docker-compose.yml` to use bind mount instead of accessing host folder

With above setting, exmaple config using bind mount would look like:

```yml
version: '3.2'
services:
  mysite:
    image: jekyll/jekyll:pages
    environment:
      - JEKYLL_ENV=production
    command: jekyll serve --config _config.yml,_config-dev.yml --force_polling
    ports:
      - 4000:4000
    volumes:
      - type: bind
        source: /mysite
        target: /srv/jekyll
```

**BEWARE:** Jekyll `--watch` behavior (default since 2.4) won't work by
itself on Virtualbox shared folder, [`--force_polling` is also needed][3].

[2]: https://medium.com/@Charles_Stover/fixing-volumes-in-docker-toolbox-4ad5ace0e572
[3]: https://stackoverflow.com/a/23084706
[4]: https://github.com/FortAwesome/Font-Awesome/issues/12994
