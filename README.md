# CoW Foundation Website

This repository builds the **cow.foundation** website by applying a minimal set of patches to the official CoW Protocol `cow-fi` application.

## How It Works

Instead of maintaining a separate fork, this repository uses a lightweight, patch-based approach:

1.  **Git Submodule:** It includes the official `cowswap` monorepo as a git submodule, ensuring we can easily pull in upstream updates.
2.  **Minimal Patches:** We maintain a `patches/` directory containing only the files we need to override. This makes our custom changes explicit and easy to manage.
3.  **Direct Build:** The build process intentionally bypasses the monorepo's complex Nx build system and runs a standard `next build` directly on the `cow-fi` application.

This approach gives us:

- ✅ **Minimal Maintenance:** We only manage the files we change.
- ✅ **Easy Upstream Updates:** `git submodule update` pulls in the latest from CoW Protocol.
- ✅ **No Forking:** Avoids the overhead of maintaining a full fork.
- ✅ **Version Locked:** The submodule is pinned to a specific commit for deterministic and reproducible builds.

## Prerequisites

- **Node.js:** Version `20.0.0` or higher is required.
- **Yarn:** Version `1.x` is used for dependency management.

## Quick Start

```bash
# Clone the repository with its submodules
git clone --recursive <this-repo-url>
cd cow-foundation-web

# Install dependencies for the Vercel deployment helper
yarn install

# Run the development server
yarn dev
```

The development server will be available at **http://localhost:3001**. The `yarn dev` command handles applying patches and installing all monorepo dependencies automatically.

## Commands

| Command              | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| `yarn dev`           | Applies patches and starts the local development server.         |
| `yarn build`         | Applies patches and runs a production build of the `cow-fi` app. |
| `yarn clean`         | Restores original `cow-fi` files, removing all applied patches.  |
| `yarn apply-patches` | Applies patches without starting the server or building.         |

## Deployment on Vercel

The project is configured for seamless deployment on Vercel via the `vercel.json` file.

### How the Vercel Build Works

1.  **Install Command:** The `installCommand` first installs root dependencies (like `next` and `pino-pretty`), applies our patches, then navigates into `vendor/cowswap` to install the full monorepo dependencies.
2.  **Build Command:** The `buildCommand` navigates directly to the `cow-fi` app directory and runs a standard `npx next build`. This bypasses the monorepo's Nx build system.
3.  **Framework Hint:** We use `"framework": null` to tell Vercel to treat the output as a standard static site, preventing it from looking for Next.js-specific files that don't exist in a static export.
4.  **Root Dependencies:** The `package.json` at the repository root includes `next` and `pino-pretty` in `devDependencies`. These are required to solve Vercel-specific issues:
    - `next`: Its presence satisfies Vercel's framework detection, which runs _before_ our build command.
    - `pino-pretty`: This is a missing runtime dependency for the `cow-fi` application that is required for the build to succeed.

## Troubleshooting

**Q: My local build is failing with dependency errors.**
A: Ensure you are using **Node.js v20.0.0 or higher**. The upstream `cowswap` project uses packages that require a modern Node version.

**Q: My Vercel build is failing.**
A: Check the `vercel.json` file. It contains a carefully crafted set of commands to navigate the monorepo structure and build the application correctly. Also, ensure the `devDependencies` in the root `package.json` are present.

**Q: How do I see what's different from upstream?**
A: Compare the files in the `patches/` directory with their counterparts in `vendor/cowswap/apps/cow-fi/`. The `patches/` directory is the source of truth for all our custom code.
