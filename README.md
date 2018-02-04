Synopsis
========

Just an small example related with websockets implementation using [GeniusesOfSymfony/WebSocketBundle](https://github.com/GeniusesOfSymfony/WebSocketBundle)

Requirements
============

- Apache >= 2.4
- PHP >= 5.6
- Composer
- Git
- Bower

Instalation
===========

- Clone this repository
- From the command-line:

```
:~$ cd ws-xample
:~$ composer install
:~$ bin/console doctrine:database:create
:~$ bin/console doctrine:schema:update --force
:~$ bin/console doctrine:migrations:execute 20171122055909 --no-interaction
:~$ cd web
:~$ bower install
```

- Fix `var` directory permission. From the command line:

```
:~$ cd ws-xample
:~$ HTTPDUSER=$(ps axo user,comm | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1)
:~$ sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:$(whoami):rwX var
:~$ sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:$(whoami):rwX var
```

Configure
=========

- Open `app/config/parameters.yml` file and update `gos_client_session_handler` value to `session.handler.pdo`

```
// app/config/parameters.yml
parameters:
    // ...
    gos_client_session_handler: 'session.handler.pdo'
```

Configure "wsxample" site in Apache
===================================

- Add `wsxample.loc` to /etc/hosts:

```
# /etc/hosts
127.0.0.5         wsxample.loc
```

- Add a new site in apache and configure as following:

```
<VirtualHost *:80>
    ServerName wsxample_dev

    ServerAlias wsxample.loc www.wsxample.loc 127.0.0.5

    DocumentRoot /path/to/ws-xample/web

    SetEnv ACCESS_SYMFONY_DEV 0

    <Directory /path/to/ws-xample/web>
        Options +FollowSymLinks
        AllowOverride None
        Order allow,deny
        Allow from all

        RewriteEngine On

        # Explicitly disable rewriting for front controllers
        RewriteRule ^app_dev.php - [L]
        RewriteRule ^app.php - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ app.php [QSA,L]
        # RewriteRule ^(.*)$ app_dev.php [QSA,L]
    </Directory>
</VirtualHost>
```

How to run websocket server
===========================

From the command line:

```
:~$ bin/console gos:websocket:server
```

Contributors
============

- Richard Melo [Twitter](https://twitter.com/allucardster), [Linkedin](https://www.linkedin.com/in/richardmelo)
