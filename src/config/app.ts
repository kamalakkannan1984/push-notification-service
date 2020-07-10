/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

export const config = {
  server: {
    //82.113.74.51
    host: process.env.HOST ? process.env.HOST : 'localhost',
    port: process.env.PORT ? process.env.PORT : 5003,
  },

  logger_level: process.env.LOGGER_LEVEL,
  jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'sscret',
  basic_uname: process.env.BASIC_UNAME ? process.env.BASIC_UNAME : 'admin',
  basic_pw: process.env.BASIC_PW ? process.env.BASIC_PW : 'Ej@bberD',
  apiRoutePrefix: '/api',
  FCMkey:
    'AAAAGnWQkWU:APA91bGXf3fSHd6jM38WjHzlIqTizwChiyjA6KHMQoH_ivpKbSziympFO8h3arLhm5_MzYxnnT9PZvAEQAMISfnkF_RdMuzXfh8EdrGxkcra1jZQYx0cNVUqnqROHMOMiJtVOeD30klM',
  cors_options: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: null,
    allowedHeaders: null,
    maxAge: null,
    preflight: true,
    hideOptionsRoute: true,
  },
  swagger_options: {
    exposeRoute: true,
    routePrefix: '/api/documentation',
    swagger: {
      host: `${process.env.HOST ? process.env.HOST : '82.113.74.51'}:${process.env.PORT ? process.env.PORT : 5003}`,
      info: {
        title: 'Push notification Rest API Service',
        description: 'Push notification Rest api swagger documentation',
        version: process.env.VERSION,
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        {
          name: 'Notification',
          description: 'Push notification related end-points',
        },
      ],
    },
  },
};
