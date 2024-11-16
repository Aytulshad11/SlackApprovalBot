const modalController = require('../controllers/modalController');
const actionController = require('../controllers/actionController');

module.exports = (app) => {
  app.command('/approval-test', modalController.openModal);
  app.view('approval_request_modal', modalController.handleModalSubmission);
  app.action('approve_request', actionController.handleApprove);
  app.action('reject_request', actionController.handleReject);
};
