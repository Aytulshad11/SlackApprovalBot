exports.openApprovalModal = async (client, triggerId) => {
    return client.views.open({
      trigger_id: triggerId,
      view: {
        type: 'modal',
        callback_id: 'approval_request_modal',
        title: { type: 'plain_text', text: 'Request Approval' },
        blocks: [
          {
            type: 'input',
            block_id: 'approver_block',
            element: {
              type: 'users_select',
              placeholder: { type: 'plain_text', text: 'Select an approver' },
              action_id: 'approver_select',
            },
            label: { type: 'plain_text', text: 'Approver' },
          },
          {
            type: 'input',
            block_id: 'approval_text_block',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'approval_text_input',
            },
            label: { type: 'plain_text', text: 'Approval Text' },
          },
        ],
        submit: { type: 'plain_text', text: 'Submit' },
      },
    });
  };
  
  exports.sendApprovalRequest = async (client, approver, requester, approvalText) => {
    return client.chat.postMessage({
      channel: approver,
      text: `You have a new approval request from <@${requester}>`,
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `Approval request from <@${requester}>:\n\n${approvalText}` },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'Approve' },
              style: 'primary',
              action_id: 'approve_request',
              value: JSON.stringify({ requester, approvalText }),
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: 'Reject' },
              style: 'danger',
              action_id: 'reject_request',
              value: JSON.stringify({ requester, approvalText }),
            },
          ],
        },
      ],
    });
  };
  
  exports.notifyRequester = async (client, requester, approvalText, approved) => {
    const status = approved ? 'approved' : 'rejected';
    return client.chat.postMessage({
      channel: requester,
      text: `Your approval request has been ${status}`,
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `Your approval request has been ${status}:\n\n${approvalText}` },
        },
      ],
    });
  };
  