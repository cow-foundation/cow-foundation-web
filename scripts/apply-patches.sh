#!/bin/bash
set -e

echo "🐄 Applying cow.foundation patches..."

# Backup original files (in case we want to restore)
if [ ! -d "vendor/cowswap/apps/cow-fi/.originals" ]; then
  echo "📦 Creating backup of original files..."
  mkdir -p vendor/cowswap/apps/cow-fi/.originals/app/\(main\)
  cp vendor/cowswap/apps/cow-fi/app/\(main\)/page.tsx vendor/cowswap/apps/cow-fi/.originals/app/\(main\)/
fi

echo "🔧 Applying patches..."
# Copy our patches over the appropriate directories
if [ -d "patches" ]; then
  # Use cp to copy patches (excluding .DS_Store files)
  find patches -name '.DS_Store' -type f -delete 2>/dev/null || true
  
  # Copy app-specific patches to cow-fi (excluding libs)
  for item in patches/*; do
    if [ -f "$item" ] || [ -d "$item" ]; then
      # Skip the libs directory - it goes to the monorepo root
      if [ "$(basename "$item")" != "libs" ]; then
        cp -r "$item" vendor/cowswap/apps/cow-fi/
      fi
    fi
  done
  
  # Copy libs patches to the monorepo libs directory
  if [ -d "patches/libs" ]; then
    find patches/libs -name '.DS_Store' -type f -delete 2>/dev/null || true
    cp -r patches/libs/* vendor/cowswap/libs/
    echo "   Applied libs patches"
  fi
fi

echo "🗑️ Removing conflicting routes for static export..."
# Remove the conflicting (learn)/page.tsx that conflicts with (main)/page.tsx
if [ -f "vendor/cowswap/apps/cow-fi/app/(learn)/page.tsx" ]; then
  rm vendor/cowswap/apps/cow-fi/app/\(learn\)/page.tsx
  echo "   Removed (learn)/page.tsx"
fi

# Remove the [tokenId] directory entirely since we don't need it
if [ -d "vendor/cowswap/apps/cow-fi/app/(main)/tokens/[tokenId]" ]; then
  rm -rf vendor/cowswap/apps/cow-fi/app/\(main\)/tokens/\[tokenId\]
  echo "   Removed tokens/[tokenId] directory"
fi

# Remove all learn dynamic routes since we don't need them
if [ -d "vendor/cowswap/apps/cow-fi/app/(learn)/learn" ]; then
  rm -rf vendor/cowswap/apps/cow-fi/app/\(learn\)/learn
  echo "   Removed learn directory"
fi

# Remove the [...not_found] catch-all route
if [ -d "vendor/cowswap/apps/cow-fi/app/[...not_found]" ]; then
  rm -rf vendor/cowswap/apps/cow-fi/app/\[...not_found\]
  echo "   Removed [...not_found] directory"
fi

echo "🔧 Fixing cowswap postinstall script..."
# Replace 'yarn run patch-package' with 'npx patch-package' in cowswap's package.json
if [ -f "vendor/cowswap/package.json" ]; then
  sed -i.bak 's/"postinstall": "yarn run patch-package"/"postinstall": "npx patch-package"/' vendor/cowswap/package.json
  rm -f vendor/cowswap/package.json.bak  # Clean up backup file
  echo "   Updated postinstall script to use npx"
fi

echo "✅ Patches applied!"
echo "📁 cow.foundation customizations are now active"
echo "🚀 Ready to run: cd vendor/cowswap && yarn start:cowfi"