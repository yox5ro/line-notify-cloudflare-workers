# A Toy LINE Notifier bot with Cloudflare workers

## Overview

A toy program that sends random string and an URL of cat image to LINE Notify.

## Prerequisite

You need a LINE Notify API token. Visit LINE Notify API documentations. (https://notify-bot.line.me/doc/)

Create `.dev.vars` file and fill your token in the file.

```
$ cp .dev.vars.example .dev.vars
```

## Development

Install dependencies

```
$ npm install
```

Format and Lint

```
$ npm run check
```

Start development server

```
$ npm run start
```

To test cron job, run

```
$ curl "http://localhost:<port>/__scheduled?cron=0+14+*+*+*"
```

`<port>` should be the port where development server runs. cron job time schedule is defined on `wrangler.toml`.
View Couldflare Workers documentations for more details. (https://developers.cloudflare.com/workers/configuration/cron-triggers/)
