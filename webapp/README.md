# Web app

We use a React app to visualize data on the web.

## Set up

We use Yarn to manage dependencies, so install it:
https://yarnpkg.com/lang/en/docs/install/#debian-stable

Now, use Yarn to install dependencies:

    yarn install

## Run locally

Start dev server:

    npm run start_web:dev

**Tip:** set `NODE_ENV=dev` to use mock data:

    NODE_ENV=dev npm run start_web:dev

**Tip:** bind to a different host by passing the `--host` flag:

    npm run start_web:dev -- --host 0.0.0.0

Visit http://127.0.0.1:8080/ in your browser to view the webapp.

## Deploy

Bundle assets:

    yarn build:dev

Serve assets:
https://trello.com/c/LapPIUpM/24-deploy-static-assets

