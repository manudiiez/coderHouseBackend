import pino from 'pino';

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
    info: (req) => {
        const message = `Ruta: ${req.originalUrl}, Metodo: ${req.method}`
        logToConsole.info(message);
        // logToFile.info(message);
    },
    warn: (req) => {
        const message = `Ruta: ${req.originalUrl} y  metodo: ${req.method} inexistentes`
        logToConsole.warn(message);
        warnToFile.warn(message);
    },
    error: (req, error) => {
        // logToConsole.error(message);
        const message = `Ruta: ${req.originalUrl} y  metodo: ${req.method}, no funciono correctamente. ${error}`
        errorToFile.error(message);
    },
};

