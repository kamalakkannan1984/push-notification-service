import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import Ajv from 'ajv';
import { config } from './config/app';
import { utils } from './utils/utils';
import { authHandler } from './handlers/auth.hanlder';
import { configureRoutes } from './routes';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
  trustProxy: true,
});

server.register(require('fastify-swagger'), config.swagger_options);
server.register(require('fastify-cors'), config.cors_options);

// add hooks with relevant handlers
server.addHook('preHandler', utils.formReqData);
server.addHook('onResponse', utils.formResData);
server.addHook('onError', utils.handleError);

// decorate functions
server
  .decorate('validateSession', authHandler.validateSession)
  .register(require('fastify-auth'))
  .register(configureRoutes)
  .after(() => {
    // routes.registerRoutes(fastify);
  });

const ajv = new Ajv({
  // the fastify defaults (if needed)
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
  nullable: true,
});

// set fastify default schema compiler
server.setSchemaCompiler((schema) => {
  return ajv.compile(schema);
});

// handle unhandled exception
process.on('uncaughtException', (err) => {
  server.log.error(err);
});

// Run the server!
const start = async () => {
  try {
    const host: any = config.server;
    server.listen(host);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
