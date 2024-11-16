A Slack bot built using **Node.js** and **Express.js** to manage approval workflows within an organization. The bot allows a requester to send approval requests to an approver and receive real-time notifications based on their decisions.

#Features

- Slash command `/approval-test` to initiate approval requests.
- Interactive modal for selecting an approver and entering the approval text.
- Approver receives approval requests with options to **Approve** or **Reject**.
- Requester is notified of the approver's decision in real time.

#Prerequisites

1. [Create a Slack app](https://api.slack.com/apps) and configure it with the necessary permissions.
2. Install **Node.js** (v16 or later) and **npm**.

#Installation

1. Clone the repository:

   
   git clone https://github.com/your-username/slack-approval-bot.git
   cd slack-approval-bot
  

2. Install dependencies:

   
   npm install
  

3. Create a `.env` file in the project root and add the following keys:

  
   SLACK_BOT_TOKEN=your_bot_token
   SLACK_SIGNING_SECRET=your_signing_secret
   SLACK_APP_TOKEN=your_app_token
   PORT=3000
  

   Replace the placeholders with your Slack app credentials.

#Configuration

##Slack App Setup

1. Go to your Slack app settings and navigate to **OAuth & Permissions**:
   - Add the following **Bot Token Scopes**:
     - `chat:write`
     - `commands`
     - `users:read`

2. Enable Interactivity & Shortcuts:
   - Turn on interactivity and set the request URL to:
     
     https://<your-hostname>/slack/events
     

3. Register the Slash Command:
   - Command: `/approval-test`
   - Request URL: `https://<your-hostname>/slack/events`
   - Short description: "Initiate an approval workflow."
   - Usage hint: `[optional] approval text`

4. Set **Event Subscriptions**:
   - Enable events and set the request URL to:
     
     https://<your-hostname>/slack/events
     

5. Subscribe to bot events:
   - `message.channels`
   - `message.im`

6. Reinstall the app into your workspace.

##Hosting

You can host your app using platforms like Heroku, AWS, or any hosting service that supports Node.js. Update the public URL in your Slack app settings.

#Running the Application

1. Start the app locally:

   
   npm start
   

2. Use the Slack slash command `/approval-test` to test the bot.

#Testing

Run the test suite to ensure the bot functions correctly:


npm test


## Folder Structure

project-root/  
├── src/  
│   ├── app.js               # Main Slack app logic  
│   ├── handlers/            # Command and action handlers  
│   │   ├── approvalCommand.js  
│   │   ├── approveAction.js  
│   │   └── rejectAction.js  
│   └── utils/               # Utility functions  
├── test/  
│   └── app.test.js          # Jest test cases  
├── .env                     # Environment variables  
├── .gitignore               # Git ignore file  
├── package.json             # Node.js dependencies  
└── README.md                # Project documentation  


