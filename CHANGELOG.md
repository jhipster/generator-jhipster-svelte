# Change Log

> All notable changes to the "generator-jhipster-svelte" project will be documented in this file.

## [Unreleased]

### Added

-   ✅ `PaginatedTable` component to encapsulate pagination and sort events, client-side pagination [#557](https://github.com/jhipster/generator-jhipster-svelte/pull/557)
-   ✅ Improvement in GitHub Action workflows to cancel previous PR runs on a new commit [#558](https://github.com/jhipster/generator-jhipster-svelte/pull/558)

### Changed

-   ✅ Client-side pagination support in the `Logger` page [#557](https://github.com/jhipster/generator-jhipster-svelte/pull/557)

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
