import pino from 'pino';
import fs from 'fs'


const logToConsole = pino({
    level: 'debug',
    formatters: {
        level(label) {
            return { level: label };
        }
    },
    timestamp: () => {
        const date = new Date();
        return `[${date.toLocaleString()}]`;
    },
    messageKey: 'msg'
});

const logToFile = pino({
    level: 'debug',
    formatters: {
        level(label) {
            return { level: label };
        }
    },
    timestamp: () => {
        const date = new Date();
        return `[${date.toLocaleString()}]`;
    },
    messageKey: 'msg'
}, pino.destination('./loggers.log'));

const warnToFile = pino({
    level: 'debug',
    formatters: {
        level(label) {
            return { level: label };
        }
    },
    timestamp: () => {
        const date = new Date();
        return `[${date.toLocaleString()}]`;
    },
    messageKey: 'msg'
}, pino.destination('./warn.log'));

const errorToFile = pino({
    level: 'debug',
    formatters: {
        level(label) {
            return { level: label };
        }
    },
    timestamp: () => {
        const date = new Date();
        return `[${date.toLocaleString()}]`;
    },
    messageKey: 'msg'
}, pino.destination('./error.log'));


export const logger = {
    info: (message) => {
        logToConsole.info(message);
        // logToFile.info(message);
    },
    warn: (message) => {
        logToConsole.warn(message);
        warnToFile.warn(message);
    },
    error: (message) => {
        // logToConsole.error(message);
        errorToFile.error(message);
    },
};

logger.info('info')
logger.warn('warn')
logger.error('error')