# Change Log

> All notable changes to the "generator-jhipster-svelte" project will be documented in this file.

## [Unreleased]

### Added

-   ✅ Support dynamic server (success/error) notifications and integrate them into `User` CRUD flows
-   ✅ `Toast` component to display notification messages

### Changed

-   ✅ Bump third party library dependencies
-   ✅ Use `svelte:fragment` instead of a DOM node to wrap forwarded components to a slot
-   ✅ Encapsulate `fetch` API invocation and refactor request/response processing

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
