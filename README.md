# JHipster Svelte

[![NPM version][npm-image]][npm-url] [![code style: prettier][prettier-image]][prettier-url] [![Generated applications build status][github-actions-generated-applications]][github-actions-url]

> Generate cybernetically enhanced JHipster Svelte web applications

## Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that intends to use [SvelteKit](https://kit.svelte.dev/) / [Svelte](https://svelte.dev/) as the client side development framework.

## What's new

Refer to the [changelog](./CHANGELOG.md) to gain more insights into each release details.

## Supported flows and integrations

> Under active development

Following integrations are supported:

    ✅ Monolithic, Micro-services architecture applications
    ✅ Spring WebFlux based reactive applications
    ✅ Session, JWT, OIDC (Keycloak, Okta, Auth0 out of box integration) authentication types
    ✅ Dark Mode support
    ✅ SvelteKit, Vite integration
    ✅ Tailwind CSS
    ✅ Prettier, EsLint integration
    ✅ Cypress integration for end to end tests
    ✅ Jest and Testing Library integration for unit tests
    ✅ JHipster application JDL
    ✅ JHipster entity JDL
    ✅ JHipster elasticsearch integration
    ✅ Swagger UI

Following functional flows are covered with end-to-end tests:

    ✅ Sign in
    ✅ Sign up
    ✅ Forgot Password
    ✅ Home
    ✅ Account
        ✅ Change Password
        ✅ Settings
        ✅ Sign out
    ✅ Administration
        ✅ User Management (List, Create, Update, View, Delete)
        ✅ Loggers
        ✅ Docs (Swagger UI)
        ✅ Gateway (micro-services routes)
    ✅ Entities
        ✅ Entity (List, Create, Update, View, Delete, Search, Pagination)

For more details, you can check out the source code of [sample application](https://github.com/jhipster/jhipster-sample-app-svelte)

## Technical Stack

<a href="https://svelte.dev" target="_blank" ><img alt="Svelte JS" height="50px" src="https://svelte.dev/svelte-logo-horizontal.svg"></a>
<a href="https://tailwindcss.com/" target="_blank" ><img alt="Tailwind CSS" height="50px" src="https://refactoringui.nyc3.cdn.digitaloceanspaces.com/tailwind-logo.svg"></a>
<a href="https://fontawesome.com/" target="_blank"><img alt="Font Awesome" height="50px" src="https://api.iconify.design/simple-icons:fontawesome.svg"></a>
<a href="https://www.cypress.io/" target="_blank" style="display:inline-block;" ><img alt="Cypress" height="50px" src="https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png"></a>
<a href="https://jestjs.io/" target="_blank" ><img alt="Jest" height="50px" src="https://api.iconify.design/logos:jest.svg"></a>
<a href="https://testing-library.com/" target="_blank"><img alt="Testing Library" height="50px" src="https://testing-library.com/img/octopus-128x128.png"></a>
<a href="https://prettier.io/" target="_blank"><img alt="Prettier" height="50px" src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-dark.png"></a>
<a href="https://prettier.io/" target="_blank"><img alt="ESLint" height="50px" src="https://api.iconify.design/logos:eslint.svg"></a>
<a href="https://vitejs.dev/guide/" target="_blank"><img alt="Vite" height="50px" src="https://vitejs.dev/logo.svg"></a>

## Installation

To install the blueprint, run below command:

```bash
npm install -g generator-jhipster-svelte
```

To update the blueprint, run below command:

```bash
npm update -g generator-jhipster-svelte
```

## Usage

-   JHipster Svelte blueprint exposes a `cli` to use the correct version of `JHipster`. Run the below command to generate new applications (`interactive` approach):

    ```bash
    jsvelte
    ```

-   Alternatively, you can also use the application `JDL` to generate new applications (`config` approach). Refer to [JDL application](https://www.jhipster.tech/jdl/applications) documentation for all supported options.

    Create a new application JDL like below and save it in a file (`app.jdl` in this example):

    ```
    application {
        config {
            baseName SampleBlogApp,
            applicationType monolith,
            authenticationType session,
            packageName tech.jhipster.samples.blog,
            prodDatabaseType postgresql,
            cacheProvider caffeine,
            buildTool maven
        }
        entities *
    }

    entity Blog {
        name String required minlength(3)
        handle String required minlength(2)
    }

    entity Post {
        title String required
        content TextBlob required
        date Instant required
    }

    entity Tag {
        name String required minlength(3)
    }

    relationship ManyToOne {
        Blog{user(login)} to User
        Post{blog(name)} to Blog
    }

    relationship ManyToMany {
        Post{tag(name)} to Tag{entry}
    }

    paginate Tag with pagination
    ```

    Or, To generate a `micro-services` architecture application, use JDL like below and save it in a file (`app.jdl` in this example):

    ```
    application {
      config {
    	baseName gateway
    	packageName tech.jhipster.samples.gateway
    	applicationType gateway
    	authenticationType oauth2
    	prodDatabaseType postgresql
    	serviceDiscoveryType eureka
    	testFrameworks [cypress]
    	reactive true
      }
      entities Blog, Post, Tag
    }

    application {
      config {
    	baseName blog
    	packageName tech.jhipster.samples.blog
    	applicationType microservice
    	authenticationType oauth2
    	prodDatabaseType mysql
    	serverPort 8081
    	serviceDiscoveryType eureka
      }
      entities Blog, Post, Tag
    }

    entity Blog {
      name String required minlength(3)
      handle String required minlength(2)
    }

    entity Post {
      title String required
      content TextBlob required
      date Instant required
    }

    entity Tag {
      name String required minlength(2)
    }

    relationship ManyToOne {
      Blog{user(login)} to User,
      Post{blog(name)} to Blog
    }

    relationship ManyToMany {
      Post{tag(name)} to Tag{post}
    }

    paginate Post, Tag with pagination

    microservice Blog, Post, Tag with blog

    deployment {
      deploymentType docker-compose
      appsFolders [gateway, blog]
    }
    ```

    Refer to [JDL entity fields](https://www.jhipster.tech/jdl/entities-fields) documentation for all supported entity data types and constraints. Refer to [JDL relationships](https://www.jhipster.tech/managing-relationships/) documentation for supported relationships and syntax. Refer [JHipster micro-services](https://www.jhipster.tech/microservices-architecture/) documentation for all supported components.

    Pass `import-jdl` option along the file path to `jsvelte` cli to generate new application:

    ```bash
    jsvelte import-jdl app.jdl
    ```

    To generate Swagger UI, pass `--swagger-ui` option:

-   ```bash
      jsvelte import-jdl app.jdl --swagger-ui
    ```

-   If you have already setup [JHipster](https://www.jhipster.tech/installation/) on your workstation, then, run the below command (it overrides to use the global `JHipster` version). Be cautious to use compatible `JHipster Svelte` and `JHipster` versions.

    ```bash
    jhipster --blueprints svelte
    ```

## JHipster Compatibility Matrix

| `JHipster` | `JHipster Svelte` |
| ---------- | ----------------- |
| `6.10.5`   | `0.1` - `0.2.1`   |
| `7.0.x`    | `0.3` - `0.4`     |
| `7.1.x`    | `0.5`             |
| `7.3.x`    | `0.6`             |
| `7.4.x`    | `0.7` - `0.7.1`   |
| `7.8.x`    | `0.8` - `0.9`     |
| `7.9.x`    | >= `0.10.1`       |

## Docker development

JHipster Svelte docker images are available at [DockerHub](https://hub.docker.com/r/jhipster/jhipster-svelte)

To develop against the latest published release, follow below steps:

-   Pull the `JHipster Svelte` docker image:

```sh
docker pull jhipster/jhipster-svelte
```

In case, you want to try out the latest code (unpublished), then, pull the image with `main` tag as:

```sh
docker pull jhipster/jhipster-svelte:main
```

-   Create a new directory for your application and run the below command to generate the application:

```sh
mkdir svelte-app && cd svelte-app

docker run -it --rm -v $PWD:/app jhipster/jhipster-svelte
```

-   You can also run the generated application from within the container. Following examples consider `maven` as the build tool:

    -   To run unit test cases, use the command:

    ```sh
    docker run -it --rm -v $PWD:/app -v ~/.m2:/home/jsvelte/.m2 --entrypoint ./mvnw jhipster/jhipster-svelte clean test
    ```

    -   To start the application using the default `dev` profile, use the command:

    ```sh
    docker run -it --rm -v $PWD:/app -v ~/.m2:/home/jsvelte/.m2 -p 8080:8080 --entrypoint ./mvnw jhipster/jhipster-svelte -DskipTests
    ```

    Access application with http://localhost:8080/

-   If you would like to access the container file system, you can also attach a bourne shell:

```sh
docker run -it --rm -v $PWD:/app -v ~/.m2:/home/jsvelte/.m2 --entrypoint sh jhipster/jhipster-svelte
```

## 🛠️ Local Development

> Pull requests are encouraged and always welcome.

To setup your development environment, follow below steps:

1. Link svelte blueprint globally:

```bash
cd generator-jhipster-svelte
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the main branch or your own custom fork)

```bash
cd generator-jhipster
npm link

cd generator-jhipster-svelte
npm link generator-jhipster
```

3. Create a new directory for your application and link `JHipster` and `svelte` blueprint.

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-svelte
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jsvelte

```

## License

Apache-2.0 © [Vishal Mahajan](https://twitter.com/vishal423)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-svelte.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-svelte
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[github-actions-generated-applications]: https://github.com/jhipster/generator-jhipster-svelte/workflows/Svelte%20Generated%20Applications/badge.svg
[github-actions-url]: https://github.com/jhipster/generator-jhipster-svelte/actions
