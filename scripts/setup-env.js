#!/usr/bin/env node

/**
 * 환경 변수 설정 스크립트
 * Usage: node scripts/setup-env.js [dev|stage|prod]
 */

const fs = require('fs');
const path = require('path');

const env = process.argv[2] || 'dev';
const envFiles = {
  dev: '.env.development',
  stage: '.env.staging',
  prod: '.env.production',
};

const sourceFile = envFiles[env];
const targetFile = '.env.local';

if (!sourceFile) {
  console.error(`❌ Invalid environment: ${env}`);
  console.log('Usage: node scripts/setup-env.js [dev|stage|prod]');
  process.exit(1);
}

const sourcePath = path.join(process.cwd(), sourceFile);
const targetPath = path.join(process.cwd(), targetFile);

if (!fs.existsSync(sourcePath)) {
  console.error(`❌ Source file not found: ${sourceFile}`);
  console.log(`Please create ${sourceFile} first.`);
  process.exit(1);
}

try {
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✅ Environment setup completed!`);
  console.log(`📄 Copied ${sourceFile} → ${targetFile}`);
} catch (error) {
  console.error(`❌ Failed to copy file:`, error.message);
  process.exit(1);
}

