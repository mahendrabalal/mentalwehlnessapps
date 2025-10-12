#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking environment variables...');

// Read the example environment file
const exampleEnvPath = path.join(process.cwd(), '.env.production.example');
if (!fs.existsSync(exampleEnvPath)) {
  console.log('⚠️  No .env.production.example file found, skipping environment check');
  process.exit(0);
}

const exampleEnv = fs.readFileSync(exampleEnvPath, 'utf8');
const requiredVars = exampleEnv
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => line.split('=')[0].trim());

// Check if production environment file exists
const prodEnvPath = path.join(process.cwd(), '.env.production');
if (!fs.existsSync(prodEnvPath)) {
  console.log('⚠️  .env.production file not found');
  console.log('Please copy .env.production.example to .env.production and fill in the values');
  process.exit(1);
}

const prodEnv = fs.readFileSync(prodEnvPath, 'utf8');
const prodVars = prodEnv
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => line.split('=')[0].trim());

// Check for missing variables
const missingVars = requiredVars.filter(varName => !prodVars.includes(varName));

if (missingVars.length > 0) {
  console.log('❌ Missing environment variables:');
  missingVars.forEach(varName => console.log(`  - ${varName}`));
  console.log('\nPlease add these variables to your .env.production file');
  process.exit(1);
}

// Check for empty values
const emptyVars = [];
requiredVars.forEach(varName => {
  const match = prodEnv.match(new RegExp(`^${varName}=(.*)$`, 'm'));
  if (match && !match[1].trim()) {
    emptyVars.push(varName);
  }
});

if (emptyVars.length > 0) {
  console.log('❌ Empty environment variables:');
  emptyVars.forEach(varName => console.log(`  - ${varName}`));
  console.log('\nPlease provide values for these variables in your .env.production file');
  process.exit(1);
}

console.log('✅ All environment variables are properly configured');