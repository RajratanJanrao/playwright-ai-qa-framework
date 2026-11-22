# Day 01 — Foundation

## 1. Git & Project Scaffolding

| Command | What It Does | Why We Did It (Engineering Rationale) |
|---|---|---|
| `git checkout -b feat/day1-framework-setup` | Creates and switches to a new isolated branch off `main`. | Never commit directly to `main`. Feature branches enforce code review, keep `main` always deployable, and trigger PR CI checks cleanly. |
| `npm init -y` | Generates a default `package.json` manifest. | Tracks project dependencies and scripts so any teammate or CI runner gets identical versions via `package-lock.json`. |
| `npm init playwright@latest` | Scaffolds Playwright Test, TypeScript config, and downloads browser binaries. | Sets up the official test runner (`@playwright/test`) rather than standalone browser automation, giving built-in parallel workers, fixtures, and trace recording. |
| `npm install -D eslint ... prettier dotenv` | Installs linters, formatters, and env loaders as devDependencies. | Enforces consistent TypeScript style across contributors and keeps environment URLs/secrets out of hardcoded test files. |

## 2. Inside `playwright.config.ts`: Why Every Setting Matters

- **`fullyParallel: true`**
  Runs every test within the same file concurrently across worker processes instead of sequentially. This forces tests to be independent from Day 1 and prevents hidden state coupling.

- **`forbidOnly: !!process.env.CI`**
  Fails the build immediately in CI if someone accidentally leaves `test.only(...)` in a commit, preventing a silent partial test run from passing a Pull Request.

- **`retries: process.env.CI ? 2 : 0`**
  Disables retries locally so flakes fail loudly while you develop, while allowing 2 retries in CI to absorb transient network blips (and capture traces on retry).

- **`workers: process.env.CI ? 2 : undefined`**
  Uses all available CPU cores locally (`undefined`), while capping workers in CI to prevent out-of-memory crashes on smaller runner VMs.

- **`baseURL: process.env.BASE_URL || '...'`**
  Allows `await page.goto('/')` in tests without hardcoding domains, enabling one-variable switching between local, staging, and production environments.

- **`trace: 'on-first-retry'` / `screenshot: 'only-on-failure'` / `video: 'retain-on-failure'`**
  Avoids slowing down passing tests with heavy I/O while capturing full DOM snapshots, network logs, and console errors the exact moment a test fails.

- **`actionTimeout: 10_000` & `navigationTimeout: 20_000`**
  Caps how long a click/fill or page load can hang before failing fast with a clear error instead of stalling the entire suite.

## 3. Process & Test Design Before Writing Code

- **`.github/pull_request_template.md`**
  Standardizes every PR description with a checklist (no `waitForTimeout`, no raw XPath, boundary cases covered). In team repos, this shifts quality left during code review before code ever merges.

- **Equivalence Partitioning (EP)**
  Divides inputs into valid and invalid groups (e.g., registered email vs. unregistered email) so you test one representative case per behavior class instead of redundant inputs.

- **Boundary Value Analysis (BVA)**
  Targets the exact edges where validation bugs hide (0, 1, 999, -1 for cart quantity) rather than testing arbitrary middle numbers like 5 or 10.

## 4. Execution Modes & Inspection Commands

| Command | What It Does | When to Use It |
|---|---|---|
| `npx playwright test --project=chromium` | Runs tests headless in Chromium without opening a browser window. | Default mode for fast local verification and CI execution. |
| `npx playwright test --headed --project=chromium` | Launches a visible browser window during execution. | Useful when visually confirming layout shifts, modals, or animations. |
| `npx playwright test --ui` | Opens the interactive Playwright UI runner with time-travel DOM snapshots, network tab, and locator picker. | Best mode for authoring new tests, testing locators live, and stepping backward/forward through failed actions. |
| `git push -u origin feat/day1-framework-setup` | Pushes the local branch to GitHub and links upstream tracking (`-u`). | Publishes your work so you can open a Pull Request and inspect the diff cleanly. |

## 5. Self-Check Questions (Test Your Recall)

1. Why do we set `retries: 0` locally instead of `retries: 2` everywhere?
2. If you want to test the same suite against a staging server tomorrow without editing any `.spec.ts` file, what exactly do you change?
3. Why did we test quantity values 0, 1, and -1 instead of 2, 3, and 4?
