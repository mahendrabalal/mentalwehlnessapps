#!/usr/bin/env node

const https = require('https');

/**
 * Deployment notification script
 * Sends notifications about deployment status to various channels
 */

async function sendNotification(message, type = 'info') {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('⚠️  No Slack webhook URL configured, skipping notification');
    return;
  }

  const payload = {
    text: message,
    attachments: [
      {
        color: type === 'success' ? 'good' : type === 'error' ? 'danger' : 'warning',
        fields: [
          {
            title: 'Environment',
            value: process.env.NODE_ENV || 'unknown',
            short: true
          },
          {
            title: 'Branch',
            value: process.env.GITHUB_REF_NAME || 'unknown',
            short: true
          },
          {
            title: 'Commit',
            value: process.env.GITHUB_SHA?.substring(0, 7) || 'unknown',
            short: true
          },
          {
            title: 'Deployed By',
            value: process.env.GITHUB_ACTOR || 'unknown',
            short: true
          }
        ],
        footer: 'Mental Wellness App',
        ts: Math.floor(Date.now() / 1000)
      }
    ]
  };

  return new Promise((resolve, reject) => {
    const req = https.request(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  const message = args[0] || 'Deployment completed';
  const type = args[1] || 'info';

  try {
    await sendNotification(message, type);
    console.log('✅ Notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send notification:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { sendNotification };