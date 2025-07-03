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
# Copy our patches over the cow-fi files
if [ -d "patches" ]; then
  # Use rsync to handle special characters in filenames
  rsync -av --exclude='.DS_Store' patches/ vendor/cowswap/apps/cow-fi/
  
  # Also copy libs patches to the monorepo libs directory
  if [ -d "patches/libs" ]; then
    rsync -av --exclude='.DS_Store' patches/libs/ vendor/cowswap/libs/
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

echo "✅ Patches applied!"
echo "📁 cow.foundation customizations are now active"
echo "🚀 Ready to run: cd vendor/cowswap && yarn start:cowfi"