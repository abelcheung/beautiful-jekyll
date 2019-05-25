# Beautiful Jekyll

Forked from official Beautiful Jekyll theme, with changes more suitable for
my personal usage,
and hopefully some of the changes can be merged upstream in the future, like:

- Remote theme support
- More updated Font Awesome / Bootstrap with relevant intrastructure
  and code changes
- More in-depth SASS support

and so on.

## Development using docker-compose

Using `docker-compose` is one of the easiest way for local testing of Jekyll
themes, especially on Windows where Jekyll isn't officially supported. With
existing jekyll docker image it is a breeze to get it running, all the while
keeping your Windows free from Ruby installation (which involves quite some
work to get Jekyll running). Here is an example `docker-compose.yml`:

```yml
version: '3'
services:
  mysite:
    image: jekyll/jekyll:pages
    environment:
      - JEKYLL_ENV=docker
    command: jekyll serve --config _config.yml,_config-dev.yml --force_polling --verbose
    ports:
      - 4000:4000
    volumes:
      - .:/srv/jekyll
```

This config assumes all of `docker-compose.yml`, `_config.yml` and
`_config-dev.yml` (used for overriding `site.url` etc. for local testing)
are placed on root of git repository folder.

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

### Docker-toolbox on older Windows and Mac

It's a bit involved for Docker-toolbox, which uses Virtualbox for its backend.
One of the major obstacle is, it's very probable for docker container to fail
accessing host folder, since shared folder inside Virtualbox image is not
properly configured. To alleviate the problem, one can follow
[the guide written by Charles Stover][1], which is briefly:

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
      - JEKYLL_ENV=docker
    command: jekyll serve --config _config.yml,_config-dev.yml --force_polling --incremental
    ports:
      - 4000:4000
    volumes:
      - type: bind
        source: /mysite
        target: /srv/jekyll
```

[1]: https://medium.com/@Charles_Stover/fixing-volumes-in-docker-toolbox-4ad5ace0e572
