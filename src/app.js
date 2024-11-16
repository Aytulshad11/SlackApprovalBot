require('dotenv').config();
const { App } = require('@slack/bolt');
const expressApp = require('./expressApp');
const slackRoutes = require('./routes/slack');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Use Slack routes
slackRoutes(app);

// Start the Slack app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack Bolt app is running!');
})();
