import debugLib from 'debug';
export type LogLevels =
  | 'error'
  | 'warn'
  | 'log'
  | 'debug'
  | 'develop'
  | 'verbose'
  | 'startup';
export type LogFilters = Record<LogLevels, (message: string) => boolean>;
const logger = (prefix: string, filters = {}) => {
  prefix = (process.env.LOG_PREFIX || `formio:`) + prefix;
  // 💥 Pay attention to these! 💥
  const error = debugLib(`${prefix}:error`);
  error.color = '1';
  // Higher priority messages
  const warn = debugLib(`${prefix}:warn`);
  warn.color = '3';
  // Status messages (responses and such)
  const log = debugLib(`${prefix}:log`);
  log.color = '2';
  // For logging out objects (responses and such)
  const debug = debugLib(`${prefix}:debug`);
  debug.color = '4';
  // Remove these before merging
  const develop = debugLib(`${prefix}:develop`);
  develop.color = '5';
  // Startup
  const startup = debugLib(`${prefix}:startup`);
  startup.color = '6';
  // Verbose
  const verbose = debugLib(`${prefix}:verbose`);
  verbose.color = '7';
  const out = {
    error,
    warn,
    develop,
    log,
    debug,
    startup,
    verbose,
  };
  Object.keys(out).forEach((key) => {
    const fn = out[key];
    out[key] = (...args) => {
      if (filters[key]) {
        if (!filters[key](...args)) {
          return;
        }
      }
      fn(...args);
    };
  });
  return out;
};
export default logger;
