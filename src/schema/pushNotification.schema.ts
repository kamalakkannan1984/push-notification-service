/**
 * @createdBy Kamal
 * @createdOn 27th June 2020
 */

const pushNotificationSchema: any = {};

/* ##################################################################################### */

/**
 * pushNotification
 */
/*
{
  "campaign_name" : "",
  "application" : ["VECTONE", "DELIGHTCALLING", “UNIFIEDRING”],
  "device_type" : ["Android", "ios", "both"],
  "target_audience": [xml],
  "marketing_content" "notification message content"
}
*/
pushNotificationSchema.pushNotification = {
  body: {
    type: 'object',
    properties: {
      campaign_name: { type: 'string' },
      application: { type: 'string', enum: ['VEC', 'DC', 'UR'] },
      device_type: { type: 'number', enum: [1, 2, 0] },
      target_audience: { type: 'string' },
      marketing_content: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        },
      },
    },
    required: ['application', 'device_type', 'marketing_content'],
  },
};

/**
 * In app pushNotification
 */
/*
{
  "campaign_name" : "",
  "application" : ["VECTONE", ""],
  "device_type" : ["Android", "ios", "both"],
  "target_audience": [],
  "marketing_content" ""
 
    "offer_name": "Offer Name",
    "offer_small_text": "Offer Small Text",
    "offer_image": "offer image url",
    "offer_header":[
        {
            "header": "Offer Header",
            "header_text": "Offer Header Text"
        },
        {
            "header": "Offer Header",
            "header_text": "Offer Header Text"
        }
    ]
}
*/
pushNotificationSchema.inAppPushNotification = {
  body: {
    type: 'object',
    properties: {
      campaign_name: { type: 'string' },
      application: { type: 'string', enum: ['VEC', 'DC', 'UR'] },
      device_type: { type: 'string', enum: ['Android', 'ios', 'both'] },
      target_audience: { type: 'string' },
      marketing_content: {
        type: 'object',
        properties: {
          offer_name: { type: 'string' },
          offer_small_text: { type: 'string' },
          offer_image: { type: 'string' },
          offer_header: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                header: { type: 'string' },
                header_text: { type: 'string' },
              },
            },
          },
        },
      },
    },
    required: ['application', 'device_type', 'marketing_content'],
  },
};

/* ######################################################################################## */
export const pushNotificationSchemas = pushNotificationSchema;
