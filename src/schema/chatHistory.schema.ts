/**
 * @createdBy Kamal
 * @createdOn 19th June 2020
 */

const chatHistory: any = {};

/* ##################################################################################### */

/**
 * get chat history
 */
chatHistory.getLastMessages = {
  body: {
    type: 'object',
    properties: {
      limit: { type: 'number' },
      offset: { type: 'number' },
    },
    required: ['limit', 'offset'],
  },
};

/* ######################################################################################## */
export const chatHistorySchema = chatHistory;
