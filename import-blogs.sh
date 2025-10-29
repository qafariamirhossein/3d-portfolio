#!/bin/bash

# Blog Import Script for Strapi CMS
# This script will import all blog posts from src/data/blog.json into Strapi

echo "🚀 Blog Import Script for Strapi CMS"
echo "======================================"
echo ""

# Check if Strapi is running
echo "📡 Checking if Strapi is running..."
if ! curl -s https://timely-book-1ffa54b15e.strapiapp.com/admin > /dev/null 2>&1; then
    echo "❌ Strapi is not running!"
    echo ""
    echo "Please start Strapi first:"
    echo "  cd cms && npm run dev"
    echo ""
    exit 1
fi

echo "✅ Strapi is running!"
echo ""

# Prompt for API token
echo "🔑 Strapi API Token"
echo "=================="
echo ""
echo "To create an API token:"
echo "1. Open https://timely-book-1ffa54b15e.strapiapp.com/admin in your browser"
echo "2. Go to Settings > API Tokens"
echo "3. Click 'Create new API Token'"
echo "4. Set Name: 'Blog Import Token'"
echo "5. Set Type: 'Full access'"
echo "6. Copy the generated token"
echo ""
read -p "Paste your API token here: " API_TOKEN

if [ -z "$API_TOKEN" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

# Export the token
export STRAPI_API_TOKEN="$API_TOKEN"

# Run the import script
echo ""
echo "📦 Importing blog posts..."
echo ""

cd cms
npm run auto-setup-blog

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! All blog posts have been imported."
    echo ""
    echo "Next steps:"
    echo "1. Create .env.local with: echo 'VITE_STRAPI_URL=https://thankful-books-8c2655df05.strapiapp.com' > .env.local"
    echo "2. Visit https://timely-book-1ffa54b15e.strapiapp.com/admin to see your blog posts"
    echo "3. Start your frontend: npm run dev"
    echo ""
else
    echo ""
    echo "❌ Import failed. Please check the errors above."
    exit 1
fi

