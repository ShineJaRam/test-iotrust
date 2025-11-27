#!/bin/bash

# 환경별 빌드 스크립트
# Usage: ./scripts/build.sh [dev|stage|prod]

ENV=${1:-dev}

case $ENV in
  dev)
    echo "🔨 Building for Development environment..."
    cp .env.development .env.production.local
    NEXT_PUBLIC_ENV=development pnpm build
    ;;
  stage)
    echo "🔨 Building for Staging environment..."
    cp .env.staging .env.production.local
    NEXT_PUBLIC_ENV=staging pnpm build
    ;;
  prod)
    echo "🔨 Building for Production environment..."
    cp .env.production .env.production.local
    NEXT_PUBLIC_ENV=production pnpm build
    ;;
  *)
    echo "❌ Invalid environment: $ENV"
    echo "Usage: ./scripts/build.sh [dev|stage|prod]"
    exit 1
    ;;
esac

echo "✅ Build completed for $ENV environment!"

