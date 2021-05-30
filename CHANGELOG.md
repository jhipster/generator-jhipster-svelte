# Change Log

> All notable changes to the "generator-jhipster-svelte" project will be documented in this file.

## [Unreleased]

### Added

-   ✅ Integrate `Lighthouse CI` in [GitHub Actions](https://github.com/jhipster/generator-jhipster-svelte/actions/workflows/application-lighthouse.yml). Lighthouse verification of all generated pages [#380](https://github.com/jhipster/generator-jhipster-svelte/pull/380)
-   ✅ Integrate `Tailwind JIT` mode as default in the build system [#407](https://github.com/jhipster/generator-jhipster-svelte/pull/407)
-   ✅ Generate `Loggers` page under `Administration` menu. Allows viewing default configured loggers level and change logger level on the fly [#461](https://github.com/jhipster/generator-jhipster-svelte/pull/461)
-   ✅ Support `--skip-user-management` option in the `CLI` and `JDL`. Allows to not generate the `User Management` pages.[#463](https://github.com/jhipster/generator-jhipster-svelte/pull/463)

### Changed

-   ✅ Improved `Tailwind` CSS integration, theme colors externalization [#408](https://github.com/jhipster/generator-jhipster-svelte/pull/408)
-   ✅ Improved layout of `Toast` notifications.
-   ✅ Bump `Cypress` dependency.
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
