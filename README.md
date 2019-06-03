# Fork of Beautiful Jekyll

Forked from official Beautiful Jekyll theme, with changes moving faster
forward, since Dean Attali desires a more stable theme as it has a large
user base. Intended and finished changes include:

- [x] Remote theme support
- [x] URL settings follow Jekyll guideline
- [x] Font Awesome updated to 5.8
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

## Special note on URL settings

Beautfiul-jekyll theme deviates from standard Jekyll recommended
settings, which would cause some liquid URL filters to fail. This
repository uses standardized Jekyll setting, but that would mean
old theme adapters would need some work to get it working.

When in doubt, simply comment out `url` and `baseurl` properties
in `_config.yml`. GitHub would determine correct values for them
automatically.

## Development using docker-compose

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

With Docker properly set up to make use of native system (Linux, or WSL &ndash;
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

[2]: https://medium.com/@Charles_Stover/fixing-volumes-in-docker-toolbox-4ad5ace0e572

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

[3]: https://stackoverflow.com/a/23084706
