#!/bin/bash

# 환경별 개발 서버 실행 스크립트
# Usage: ./scripts/dev.sh [dev|stage|prod]

ENV=${1:-dev}

case $ENV in
  dev)
    echo "🚀 Starting Development server..."
    cp .env.development .env.local
    NEXT_PUBLIC_ENV=development pnpm dev
    ;;
  stage)
    echo "🚀 Starting Staging server..."
    cp .env.staging .env.local
    NEXT_PUBLIC_ENV=staging pnpm dev
    ;;
  prod)
    echo "🚀 Starting Production server..."
    cp .env.production .env.local
    NEXT_PUBLIC_ENV=production pnpm dev
    ;;
  *)
    echo "❌ Invalid environment: $ENV"
    echo "Usage: ./scripts/dev.sh [dev|stage|prod]"
    exit 1
    ;;
esac

