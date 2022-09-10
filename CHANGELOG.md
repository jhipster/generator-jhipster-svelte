# Change Log

> All notable changes to the "generator-jhipster-svelte" project will be documented in this file.

## Current

## [0.10.0] - 2022-09-10

### BREAKING CHANGES

-   ✅ The release upgrades the `SvelteKit`, `Cypress`, and `Jest` dependencies having breaking changes. Refer to individual tickets for more details.

### Added

-   ✅ Enhance `Svelte` blueprint to be used as base for new blueprints [#1357](https://github.com/jhipster/generator-jhipster-svelte/pull/1357)

### Fixed

-   ✅ Fix Sonar violations [#1364](https://github.com/jhipster/generator-jhipster-svelte/pull/1364)
-   ✅ Use ESM import for `Font Awesome` icons inclusion in the generated application [#1363](https://github.com/jhipster/generator-jhipster-svelte/pull/1363)
-   ✅ Fix frontend build for applications generated with the `swagger` option [#1361](https://github.com/jhipster/generator-jhipster-svelte/pull/1361)

### Changed

-   ✅ Use `password`, `password-confirm` components from `jhipster-svelte-library` [#1284](https://github.com/jhipster/generator-jhipster-svelte/pull/1284)
-   ✅ Rename the `data-test` attribute to `data-testid` for reuse of data selectors between cypress and testing library unit tests. Rename `getBySel` cypress custom command with `getByTestId` [#1284](https://github.com/jhipster/generator-jhipster-svelte/pull/1284)
-   ✅ Upgrade `JHipster` dependency to `7.9.3` [#1351](https://github.com/jhipster/generator-jhipster-svelte/pull/1351)
-   ✅ Upgrade `Cypress` dependency to `10.x` [#1241](https://github.com/jhipster/generator-jhipster-svelte/pull/1241)
-   ✅ Upgrade `Svelte/Kit`, `Eslint`, `Husky` and other third party dependencies [#1277](https://github.com/jhipster/generator-jhipster-svelte/pull/1277) [#1336](https://github.com/jhipster/generator-jhipster-svelte/pull/1336)

## [0.9.0] - 2022-05-18

### BREAKING CHANGES

-   ✅ Svelte blueprint configures the [JHipster Prettier Java](https://github.com/jhipster/prettier-java) plugin as default to style Java code.

### Added

-   ✅ Support generation of JHipster `microservice` and `gateway` application types. A `Gateway` application is bundled with a UI page to view configured micro-services routes. With this change, you can now generate `micro-services` architecture applications using `Svelte` as a frontend technical stack. [#1146](https://github.com/jhipster/generator-jhipster-svelte/pull/1146), [#1147](https://github.com/jhipster/generator-jhipster-svelte/pull/1147), [#1150](https://github.com/jhipster/generator-jhipster-svelte/pull/1150), [#1163](https://github.com/jhipster/generator-jhipster-svelte/pull/1163)
-   ✅ Support `Auth0` OIDC provider in Cypress end-to-end tests [#1121](https://github.com/jhipster/generator-jhipster-svelte/pull/1121)
-   ✅ Support `Spring WebFlux` based reactive backend applications [#1146](https://github.com/jhipster/generator-jhipster-svelte/pull/1146)
-   ✅ Remember navigation context before login and redirect after successful authentication [#1164](https://github.com/jhipster/generator-jhipster-svelte/pull/1164)

### Changed

-   ✅ Cypress environment variables externalizing username and password have been renamed to `USER_USERNAME`, `USER_PASSWORD`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` [#1140](https://github.com/jhipster/generator-jhipster-svelte/pull/1140)
-   ✅ Upgrade `Cypress`, `Svelte`, `Svelte/Kit`, `Eslint`, `Husky` etc dependencies.

## [0.8.0] - 2022-04-24

### BREAKING CHANGES

-   ✅ Reusable svelte components and functions are extracted into a separate npm library [JHipster Svelte Library](https://github.com/vishal423/jhipster-svelte-library) as part of [#1008](https://github.com/jhipster/generator-jhipster-svelte/pull/1008)

### Added

-   ✅ Integrate `Swagger UI` under `Administration` > `API` menu. Allows to interactively Try backend REST APIs. By default, the Swagger UI generation is disabled. Use `--swagger-ui` command line option to generate the Swagger UI. [#900](https://github.com/jhipster/generator-jhipster-svelte/pull/900), [#1105](https://github.com/jhipster/generator-jhipster-svelte/pull/1105)

### Changed

-   ✅ Bump `JHipster` dependency to support `v7.8.1` release
-   ✅ Improved GitHub Action Workflows to test generated applications [#919](https://github.com/jhipster/generator-jhipster-svelte/pull/919)
-   ✅ Upgrade `Cypress`, `svelte`, `svelte/kit`, `eslint` etc dependencies

## [0.7.1] - 2022-01-03

### Changed

-   ✅ Bump `JHipster` dependency to support `7.5.0` release
-   ✅ Bump `Svelte/Kit` dependency to support latest patch release

## [0.7.0] - 2022-01-01

### Added

-   ✅ JHipster entity `JDL` supporting `Create`, `Update` pages along with `Cypress` e2e tests [#786](https://github.com/jhipster/generator-jhipster-svelte/pull/786), [#792](https://github.com/jhipster/generator-jhipster-svelte/pull/792), [#804](https://github.com/jhipster/generator-jhipster-svelte/pull/804), [#812](https://github.com/jhipster/generator-jhipster-svelte/pull/812), [#822](https://github.com/jhipster/generator-jhipster-svelte/pull/822), [#823](https://github.com/jhipster/generator-jhipster-svelte/pull/823)
-   ✅ JHipster relationship `JDL` supporting `one-to-one`, `one-to-many`, `many-to-one`, and `many-to-many` relationships along with `Cypress` e2e tests [#824](https://github.com/jhipster/generator-jhipster-svelte/pull/824), [#866](https://github.com/jhipster/generator-jhipster-svelte/pull/866)
-   ✅ Use `cypress` session API to improve e2e tests performance [#753](https://github.com/jhipster/generator-jhipster-svelte/pull/753)

### Changed

-   ✅ Bump `JHipster` dependency to support `7.4.1` release [#800](https://github.com/jhipster/generator-jhipster-svelte/pull/800), [#852](https://github.com/jhipster/generator-jhipster-svelte/pull/852)
-   ✅ Bump `Tailwind` dependency to support `3.0.x` release [#852](https://github.com/jhipster/generator-jhipster-svelte/pull/852)
-   ✅ Bump `Jest` dependency to support `27.x` release and enable `ECMAScript Modules` [#873](https://github.com/jhipster/generator-jhipster-svelte/pull/873)
-   ✅ Regular maintenance to bump `Cypress`, `svelte`, `svelte/kit`, `eslint` etc dependencies

## [0.6.0] - 2021-10-15

### Added

-   ✅ JHipster entity `JDL` data types (`String`, `Integer`, `Long`, `BigDecimal`, `Float`, `Double`, `Boolean`, `LocalDate`, `ZonedDateTime`, `Instant`, `Duration`, `UUID`, `Enum`, `Blob`, `AnyBlob`, `ImageBlob`, `TextBlob` ) support in the `List`, `View`, and `Delete` entity pages along with `Cypress` e2e tests [#723](https://github.com/jhipster/generator-jhipster-svelte/pull/723)
-   ✅ `date-fns` library integration to format and parse date data types [#651](https://github.com/jhipster/generator-jhipster-svelte/pull/651)
-   ✅ `PaginatedTable` component to encapsulate pagination and sort events, client-side pagination [#557](https://github.com/jhipster/generator-jhipster-svelte/pull/557)
-   ✅ Improvement in GitHub Action workflows to cancel previous PR runs on a new commit [#558](https://github.com/jhipster/generator-jhipster-svelte/pull/558)

### Changed

-   ✅ Client-side pagination support in the `Logger` page [#557](https://github.com/jhipster/generator-jhipster-svelte/pull/557)
-   ✅ Bump `JHipster` dependency to support `7.3.0` release [#715](https://github.com/jhipster/generator-jhipster-svelte/pull/715), [#726](https://github.com/jhipster/generator-jhipster-svelte/pull/726)
-   ✅ Bump `Cypress`, `Tailwind` dependencies [#714](https://github.com/jhipster/generator-jhipster-svelte/pull/714)
-   ✅ Bump `husky` dependencies [#724](https://github.com/jhipster/generator-jhipster-svelte/pull/724) [#725](https://github.com/jhipster/generator-jhipster-svelte/pull/725)

### Fixed

-   ✅ Fix an issue to apply filter criteria after an update of logger level on the selected page [#557](https://github.com/jhipster/generator-jhipster-svelte/pull/557)

## [0.5.0] - 2021-07-07

### BREAKING CHANGES

-   ✅ Generate applications using the [`SvelteKit`](https://kit.svelte.dev/) framework in place of `Sapper`

### Added

-   ✅ Sapper to `SvelteKit` migration. Use `jsconfig` to specify absolute paths from the `lib` directory. `Vite` is now used as the build tool to provide an awful frontend development experience with ESM module builds, Lighting fast HMR, Optimized production bundles [#482](https://github.com/jhipster/generator-jhipster-svelte/pull/482)
-   ✅ Support `OIDC` authentication (`Keycloak`, `Okta` integration out of the box) with `Cypress` e2e tests [#495](https://github.com/jhipster/generator-jhipster-svelte/pull/495)
-   ✅ JHipster entity `JDL` support to generate `List`, `View`, and `Delete` entity pages along with `Cypress` e2e tests [#518](https://github.com/jhipster/generator-jhipster-svelte/pull/518)
-   ✅ JHipster `elasticsearch` support to search entity records along with `Cypress` e2e tests [#542](https://github.com/jhipster/generator-jhipster-svelte/pull/542)

### Changed

-   ✅ Bump `JHipster` dependency to support `7.1.0` release [#513](https://github.com/jhipster/generator-jhipster-svelte/pull/513)
-   ✅ Polished `Tailwindcss` integration to use integrated `Vite` build [#531](https://github.com/jhipster/generator-jhipster-svelte/pull/531)
-   ✅ Bump `Cypress`, `Tailwind` dependencies.
-   ✅ Bump third party library dependencies.

## [0.4.0] - 2021-05-30

### Added

-   ✅ Integrate `Lighthouse CI` in [GitHub Actions](https://github.com/jhipster/generator-jhipster-svelte/actions/workflows/application-lighthouse.yml). Lighthouse verification of all generated pages [#380](https://github.com/jhipster/generator-jhipster-svelte/pull/380)
-   ✅ Integrate `Tailwind JIT` mode as default in the build system [#407](https://github.com/jhipster/generator-jhipster-svelte/pull/407)
-   ✅ Generate `Loggers` page under `Administration` menu. Allows viewing default configured loggers level and change logger level on the fly [#461](https://github.com/jhipster/generator-jhipster-svelte/pull/461)
-   ✅ Support `--skip-user-management` option in the `CLI` and `JDL`. Allows to not generate the `User Management` pages.[#463](https://github.com/jhipster/generator-jhipster-svelte/pull/463)

### Changed

-   ✅ Improved `Tailwind` CSS integration, theme colors externalization [#408](https://github.com/jhipster/generator-jhipster-svelte/pull/408)
-   ✅ Improved layout of `Toast` notifications.
-   ✅ Bump `Cypress`, `Tailwind` dependencies.
-   ✅ Bump third party library dependencies.

## [0.3] - 2021-04-14

### BREAKING CHANGES

-   Support JHipster version `v7.0.x`

### Added

-   ✅ Svelte Hipster `cli` (`shipster`), a lightweight wrapper on the compatible localized `jhipster` cli
-   ✅ JHipster application `JDL` support to generate new applications (`shipster import-jdl app.jdl`)
-   ✅ Support dynamic server (success/error) notifications and integrate them into `User` CRUD flows
-   ✅ `Toast` component to display notification messages
-   ✅ GitHub Actions to verify generated applications with `Prod` profile

### Fixed

-   ✅ Fixed `SonarQube` integration issues observed in newly generated applications.
-   ✅ Fixed `Prettier` formatting issues observed in newly generated applications.

### Changed

-   ✅ Use `svelte:fragment` instead of a DOM node to wrap forwarded components to a slot
-   ✅ Encapsulate `fetch` API invocation and refactor request/response processing
-   ✅ Upgrade `JHipster` dependency to `v7.0.0`
-   ✅ Bump third party library dependencies

## [0.2.1] - 2021-02-21

### Added

-   ✅ Dark mode support
-   ✅ JWT authentication support
-   ✅ Protect routes to disallow unauthenticated user access
-   ✅ Add end-to-end `Cypress` tests for user `create`, `update`, `view`, `delete` pages

### Changed

-   ✅ Bump third party library dependencies

### Fixed

-   ✅ Fixed tailwind missing component button classes in the production build

## [0.1.0] - 2021-01-27

### Added

#### Supported Integrations:

-   ✅ Session authentication
-   ✅ Prettier, ESLint integration
-   ✅ Cypress integration for end to end tests
-   ✅ Jest and Testing Library integration for unit tests
-   ✅ Rollup module bundler

#### Supported functional flows

-   ✅ Sign in
-   ✅ Sign up
-   ✅ Forgot Password
-   ✅ Home
-   ✅ Account
    -   ✅ Change Password
    -   ✅ Settings
    -   ✅ Sign out
-   ✅ Administration
    -   ✅ User Management
