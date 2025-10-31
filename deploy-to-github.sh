#!/bin/bash

# Deploy to GitHub Script
# Usage: ./deploy-to-github.sh YOUR_GITHUB_USERNAME YOUR_REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./deploy-to-github.sh YOUR_GITHUB_USERNAME YOUR_REPO_NAME"
    echo "Example: ./deploy-to-github.sh john-doe salesforce-fullstack"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2

echo "📦 Pushing code to GitHub..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo "🔗 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "Next step: Set up Amplify Hosting"
echo "Run: ./deploy-to-amplify.sh"

