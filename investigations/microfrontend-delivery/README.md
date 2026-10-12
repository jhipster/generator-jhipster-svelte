# Microfrontend delivery experiment

AI-assisted investigation for JHipster Svelte issue #525. This is a source overlay for a disposable generated application, not a production feature or bounty claim.

## Reproduce

Use Node 20.11 or later and npm. The recorded run used Node 24.19.0 on Windows. Obtain `jhipster/generator-jhipster-svelte` at commit `8552e36f6a3ab2efce6b5eb3b922ff383e89df24` in a folder named `generator-jhipster-svelte`. Install its locked dependencies with `npm ci --ignore-scripts`.

1. Create a new, empty demo folder beside that checkout. Copy the checkout's `.github/workflows/scripts/sample-svelte-app.json` into the demo as `.yo-rc.json`.
2. From the demo, run:

    ```powershell
    node ../generator-jhipster-svelte/cli/jsvelte.cjs app --skip-server --skip-install --skip-git --no-insight --skip-prompts --force
    npm install --ignore-scripts
    ```

3. Copy this package's `microfrontend-proof` directory into the demo root. Copy the **contents** of `overlay` into the demo, merging directories and replacing the generated configuration/home page. Do this only in the disposable demo: its homepage becomes the experiment.
4. From the demo, run:

    ```powershell
    node node_modules/vite/bin/vite.js build --config microfrontend-proof/vite.config.js
    npm run build
    npm test
    node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 9201 --strictPort
    ```

5. Open the displayed local origin. Expect the remote heading, `Independent component loaded`, and count 2. Click the counter button and expect 3.

## Remote-only replacement

While the same preview remains running, change only the heading in `microfrontend-proof/Counter.svelte`. Rebuild **only** the remote using step 4's first command. Copy its emitted `src/main/webapp/static/microfrontend-proof/remote.js` into both `target/classes/static/microfrontend-proof/remote.js` (deployment output) and `target/svelte-kit/output/client/microfrontend-proof/remote.js` (Vite preview output). Open another tab on the same origin; the new heading should appear. Do not rebuild or restart the host between these steps.

The remote directory is excluded from SvelteKit's service-worker static asset list. Without that exclusion the original experiment kept serving an older bundle despite updated server bytes. The existing worker's network-first fallback handles assets outside that list. This is not an offline verification or a general release-management solution. Existing installations of an older worker may need a separate upgrade strategy.

## Evidence and limits

-   Baseline before overlay: production build passed; 36 tests in 4 files passed.
-   Independent bundle/host built and browser interaction verified.
-   With the remote-directory cache exclusion, v2 to v3 appeared on the same preview origin without host rebuild/restart; hashes of all 56 non-remote host deployment files stayed identical.
-   Four new host tests cover mount/props, destructor on removal, late resolution after removal, load failure, and mount failure. The loader is mocked in these lifecycle tests; real module delivery is covered by the browser experiment.
-   Test configuration aliases the `svelte` package to its browser runtime. Without it this dependency set resolves the server runtime, whose mount callback does not run. This alias applies to tests only.
-   No generated entity federation, SSR/hydration integration, shared identity/state, CSS isolation, offline operation, or production deployment has been verified. The original repository's authentication implementation is unchanged.

The overlay's generated configuration derives from the Apache-2.0-licensed JHipster Svelte generator at the commit above. Preserve upstream license notices when incorporating this into a repository. No account credentials, payment details, dependency directories, or generated backend are included.

Final checks: full suite passed 40/40 tests; after using Node's portable fileURLToPath for the test alias, the four lifecycle tests passed again. The extracted host component's production build passed. Upstream LICENSE and NOTICE are included.

## Scope and design choice

The issue's reference, https://github.com/escalon/microfrontends at e3bfc39, describes independently delivered Svelte components plus server rendering/hydration and Spring/Thymeleaf aggregation. This experiment tests the client-side delivery boundary in the current static-adapter application. It does not replace the broader entity-federation proposals or establish a server-rendering architecture.

The important result is that an independently built remote must also be independently delivered: including it in the host service worker's static cache couples its visible version to the host release. An explicit remote-asset ownership rule resolves that coupling in this experiment. A full implementation still needs remote discovery, version compatibility, navigation, shared state, CSS and upgrade/offline policies.
