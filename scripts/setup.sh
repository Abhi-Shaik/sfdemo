#!/bin/bash

echo "🚀 Salesforce FullStack Application Setup"
echo "=========================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
echo "🔍 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured."
    echo "   Please run: aws configure"
    exit 1
fi

echo "✅ AWS credentials configured"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Install Amplify dependencies
echo "📦 Installing Amplify dependencies..."
cd amplify
npm install
cd ..

echo "✅ Amplify dependencies installed"
echo ""

# Deploy Amplify backend
echo "🚀 Deploying Amplify backend..."
echo "   This will create AWS Cognito User Pool and other resources"
echo ""

read -p "Do you want to deploy the backend now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx ampx sandbox
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Backend deployed successfully!"
        echo "   amplify_outputs.json has been generated"
    else
        echo "❌ Backend deployment failed"
        exit 1
    fi
else
    echo "⏭️  Skipping backend deployment"
    echo "   Run 'npx ampx sandbox' when ready to deploy"
fi

echo ""
echo "=========================================="
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. If you haven't deployed the backend, run: npx ampx sandbox"
echo "2. Start the development server: npm run dev"
echo "3. Visit http://localhost:3000"
echo ""
echo "For deployment to AWS Amplify Hosting:"
echo "- See DEPLOYMENT.md for detailed instructions"
echo "- Push your code to GitHub"
echo "- Connect your repository to AWS Amplify Console"
echo ""

