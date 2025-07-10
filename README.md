# CoW Foundation Website

This repository creates the **cow.foundation** website

## How It Works

Instead of duplicating code, this repo:

1. **Uses cow-fi as a submodule** - tracks the upstream cow.fi website code from CoW Protocol
2. **Applies minimal patches** - only overrides the specific files we want to change
3. **Runs with cow-fi's build system** - leverages their dependencies and tooling

This approach gives us:

- ✅ **Zero code duplication** - we only maintain our changes
- ✅ **Easy updates** - `git submodule update` pulls upstream changes
- ✅ **No dependency conflicts** - uses the proven setup from CoW Protocol
- ✅ **Minimal maintenance** - just patch files we actually change
- ✅ **Version locked** - submodule pins exact commit hash for deterministic builds

## Repository Structure

```
cow-foundation-web/
├── vendor/cowswap/          # Git submodule (upstream cow-fi codebase from CoW Protocol)
├── patches/                 # Our custom overrides
│   └── app/(main)/page.tsx  # Homepage with "cow.foundation" hero text
├── scripts/apply-patches.sh # Applies patches to the cow-fi source
└── package.json             # Simple commands
```

## Quick Start

```bash
# Clone with submodules
git clone --recursive <this-repo-url>

# If already cloned, initialize submodules
git submodule update --init --recursive

# Install dependencies in the monorepo
cd vendor/cowswap && yarn install

# Run development server
yarn dev
```

The website will be available at **http://localhost:3001**

## Commands

| Command              | Description                                     |
| -------------------- | ----------------------------------------------- |
| `yarn dev`           | Apply patches + start development server        |
| `yarn build`         | Apply patches + build for production            |
| `yarn clean`         | Restore original cow-fi files (removes patches) |
| `yarn apply-patches` | Apply patches only (without running)            |

## Making Changes

### Adding New Overrides

1. **Create the patch file** in the `patches/` directory with the same path structure as the cow-fi source:

   ```bash
   # Example: Override a page
   mkdir -p patches/app/(main)/about
   cp vendor/cowswap/apps/cow-fi/app/(main)/about/page.tsx patches/app/(main)/about/
   # Edit patches/app/(main)/about/page.tsx with your changes

   # Example: Override configuration
   cp vendor/cowswap/apps/cow-fi/next.config.ts patches/
   # Edit patches/next.config.ts with your changes

   # Example: Override style
   mkdir -p patches/styles
   cp vendor/cowswap/apps/cow-fi/styles/styled.ts patches/styles/
   # Edit patches/styles/styled.ts with your changes
   ```

2. **Run the development server** to see your changes:
   ```bash
   yarn dev
   ```

### Current Overrides

- **Homepage Hero Text**: `patches/app/(main)/page.tsx`
  - Changes "Don't get milked!" to "cow.foundation"
  - Keeps all other functionality identical
- **Next.js Configuration**: `patches/next.config.ts`
  - Custom webpack config for cow.foundation
  - Additional redirects and settings

### Updating from Upstream

1. **Update the submodule**:

   ```bash
   git submodule update --remote vendor/cowswap
   git add vendor/cowswap
   git commit -m "Update to latest cow-fi"
   ```

2. **Test your patches** still work:

   ```bash
   yarn dev
   ```

3. **Fix any conflicts** if upstream changed files you've patched

## How Patches Work

The `scripts/apply-patches.sh` script:

1. **Creates backups** of original files (in `.originals/`)
2. **Copies patch files** over the upstream source files
3. **Preserves git history** - changes are temporary, not committed to the submodule

When you run `yarn clean`, it restores the original files using `git checkout`.

## Submodule Version Lock

The submodule is locked to a specific commit hash for reproducible builds:

```bash
# Check current locked version
git submodule status
# Output: 198db528011ebaf4c2787be1d3413e2e105d2125 vendor/cowswap (v1.49.2-1662-g198db5280)

# See what commit is stored in main repo
git ls-tree HEAD vendor/cowswap
# Output: 160000 commit 198db528011ebaf4c2787be1d3413e2e105d2125
```

This ensures everyone gets the exact same upstream version, making patches predictable and builds deterministic.

## Development Workflow

```bash
# Make changes to patch files
vim patches/app/(main)/page.tsx

# Apply and test
yarn dev

# Build for production
yarn build

# Deploy the built files from vendor/cowswap/apps/cow-fi/out/
```

## Deployment

After running `yarn build`, the static files are generated in:

```
vendor/cowswap/apps/cow-fi/out/
```

Deploy this directory to your static hosting service (Vercel, Netlify, etc.).

## Troubleshooting

**Q: I get dependency errors**  
A: Make sure you've installed dependencies in the monorepo: `cd vendor/cowswap && yarn install`

**Q: My patches aren't applied**  
A: Run `yarn apply-patches` to apply them manually, or `yarn clean && yarn dev` to reset and reapply

**Q: Nx build errors**  
A: This setup bypasses Nx and runs Next.js directly to avoid monorepo complexity

**Q: How do I see what's different from upstream?**  
A: Compare files in `patches/` with `vendor/cowswap/apps/cow-fi/` - anything in `patches/` is our custom code

## Contributing

1. Fork this repository
2. Make your changes in the `patches/` directory
3. Test with `yarn dev`
4. Submit a pull request
