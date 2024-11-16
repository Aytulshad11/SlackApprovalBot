const { App } = require('@slack/bolt');

// Mock the Slack Bolt App and its methods
jest.mock('@slack/bolt', () => ({
  App: jest.fn(() => ({
    command: jest.fn(),
    view: jest.fn(),
  })),
}));

describe('Slack Approval Bot', () => {
  let app;
  let mockCommandHandler;
  let mockViewHandler;

  beforeEach(() => {
    app = new App({
      token: 'mock-token',
      signingSecret: 'mock-secret',
      socketMode: true,
      appToken: 'mock-app-token',
    });

    // Mock the command and view handler
    mockCommandHandler = jest.fn();
    mockViewHandler = jest.fn();

    app.command.mockImplementation((_, handler) => {
      mockCommandHandler = handler;
    });

    app.view.mockImplementation((_, handler) => {
      mockViewHandler = handler;
    });
  });

  test('should handle /approval-test command', async () => {
    const mockAck = jest.fn();
    const mockClient = {
      views: {
        open: jest.fn().mockResolvedValue({ ok: true }),
      },
    };

    // Simulate a slash command being triggered
    await mockCommandHandler({
      ack: mockAck,
      body: { trigger_id: 'mock-trigger' },
      client: mockClient,
    });

    // Assertions
    expect(mockAck).toHaveBeenCalled();
    expect(mockClient.views.open).toHaveBeenCalledWith(
      expect.objectContaining({
        trigger_id: 'mock-trigger',
        view: expect.objectContaining({
          type: 'modal',
          callback_id: 'approval_request_modal',
        }),
      })
    );
  });

  test('should handle modal submission', async () => {
    const mockAck = jest.fn();
    const mockClient = {
      chat: {
        postMessage: jest.fn().mockResolvedValue({ ok: true }),
      },
    };

    // Simulate a modal submission
    await mockViewHandler({
      ack: mockAck,
      body: { user: { id: 'U123' } },
      view: {
        state: {
          values: {
            approver_block: { approver_select: { selected_user: 'U456' } },
            approval_text_block: { approval_text_input: { value: 'Test approval' } },
          },
        },
      },
      client: mockClient,
    });

    // Assertions
    expect(mockAck).toHaveBeenCalled();
    expect(mockClient.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: 'U456',
        text: expect.stringContaining('You have a new approval request'),
      })
    );
  });

  // You can add more tests for the approve and reject actions in a similar manner

  test('should handle approval action', async () => {
    const mockAck = jest.fn();
    const mockClient = {
      chat: {
        postMessage: jest.fn().mockResolvedValue({ ok: true }),
      },
    };
  
    // Simulate the approve button action
    const mockActionHandler = jest.fn();
    app.action.mockImplementation((_, handler) => {
      mockActionHandler = handler;
    });
  
    await mockActionHandler({
      ack: mockAck,
      body: { actions: [{ value: JSON.stringify({ requester: 'U123', approvalText: 'Test approval' }) }] },
      client: mockClient,
    });
  
    expect(mockAck).toHaveBeenCalled();
    expect(mockClient.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: 'U123',
        text: expect.stringContaining('Your approval request has been approved'),
      })
    );
  });
  
});
