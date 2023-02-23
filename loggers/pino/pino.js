import pino from "pino";

const transport = pino.transport({
  target: [{
    level: 'info'
  }],
  options: { destination: './pino-logger.log' }
})
const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
      }
    }
  },
  pino.destination("./pino-logger.log")
);

logger(transport)

logger.info('hi');