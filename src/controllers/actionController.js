const slackService = require('../services/slackService');

exports.handleApprove = async ({ ack, body, client }) => {
  await ack();

  const { requester, approvalText } = JSON.parse(body.actions[0].value);

  try {
    await slackService.notifyRequester(client, requester, approvalText, true);
    console.log('Approval notification sent successfully');
  } catch (error) {
    console.error('Error sending approval notification:', error);
  }
};

exports.handleReject = async ({ ack, body, client }) => {
  await ack();

  const { requester, approvalText } = JSON.parse(body.actions[0].value);

  try {
    await slackService.notifyRequester(client, requester, approvalText, false);
    console.log('Rejection notification sent successfully');
  } catch (error) {
    console.error('Error sending rejection notification:', error);
  }
};
