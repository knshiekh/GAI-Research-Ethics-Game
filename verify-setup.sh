#!/bin/bash

# Quick verification that all required files exist

echo "🔍 Checking GAI Research Ethics project structure..."
echo ""

PROJECT_ROOT="/Users/kshiekh/Library/CloudStorage/OneDrive-VirginiaTech/GAI Research Ethics Game"

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $2"
    else
        echo "❌ $2 (MISSING)"
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $2/"
    else
        echo "❌ $2/ (MISSING)"
    fi
}

echo "Configuration Files:"
check_file "$PROJECT_ROOT/package.json" "package.json"
check_file "$PROJECT_ROOT/tsconfig.json" "tsconfig.json"
check_file "$PROJECT_ROOT/next.config.js" "next.config.js"
check_file "$PROJECT_ROOT/.eslintrc.json" ".eslintrc.json"
check_file "$PROJECT_ROOT/.npmrc" ".npmrc"
check_file "$PROJECT_ROOT/.gitignore" ".gitignore"

echo ""
echo "App Files (Next.js App Router):"
check_file "$PROJECT_ROOT/app/layout.tsx" "app/layout.tsx"
check_file "$PROJECT_ROOT/app/globals.css" "app/globals.css"
check_file "$PROJECT_ROOT/app/page.tsx" "app/page.tsx"
check_file "$PROJECT_ROOT/app/play/page.tsx" "app/play/page.tsx"
check_file "$PROJECT_ROOT/app/results/page.tsx" "app/results/page.tsx"

echo ""
echo "Components:"
check_file "$PROJECT_ROOT/components/ProgressBar.tsx" "ProgressBar.tsx"
check_file "$PROJECT_ROOT/components/CaseCard.tsx" "CaseCard.tsx"
check_file "$PROJECT_ROOT/components/ConditionsChecklist.tsx" "ConditionsChecklist.tsx"
check_file "$PROJECT_ROOT/components/ResultsBlocks.tsx" "ResultsBlocks.tsx"

echo ""
echo "Logic Libraries:"
check_file "$PROJECT_ROOT/lib/types.ts" "lib/types.ts"
check_file "$PROJECT_ROOT/lib/storage.ts" "lib/storage.ts"
check_file "$PROJECT_ROOT/lib/engine.ts" "lib/engine.ts"

echo ""
echo "Data Files:"
check_file "$PROJECT_ROOT/data/cases.json" "data/cases.json"
check_file "$PROJECT_ROOT/data/conditions.json" "data/conditions.json"

echo ""
echo "Documentation:"
check_file "$PROJECT_ROOT/README.md" "README.md"
check_file "$PROJECT_ROOT/SETUP.md" "SETUP.md"
check_file "$PROJECT_ROOT/IMPLEMENTATION_SUMMARY.md" "IMPLEMENTATION_SUMMARY.md"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "All files created! ✨"
echo ""
echo "Next steps:"
echo "1. cd \"$PROJECT_ROOT\""
echo "2. npm install"
echo "3. npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
