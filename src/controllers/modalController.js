const slackService = require('../services/slackService');

exports.openModal = async ({ ack, body, client }) => {
  await ack();

  try {
    await slackService.openApprovalModal(client, body.trigger_id);
    console.log('Modal opened successfully');
  } catch (error) {
    console.error('Error opening modal:', error);
  }
};

exports.handleModalSubmission = async ({ ack, body, view, client }) => {
  await ack();

  const approver = view.state.values.approver_block.approver_select.selected_user;
  const approvalText = view.state.values.approval_text_block.approval_text_input.value;
  const requester = body.user.id;

  try {
    await slackService.sendApprovalRequest(client, approver, requester, approvalText);
    console.log('Approval request sent successfully');
  } catch (error) {
    console.error('Error sending approval request:', error);
  }
};
