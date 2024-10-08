import { Logger } from '@nestjs/common';

function LoggingForAsync() {
  const logger = new Logger(LoggingForAsync.name);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = propertyKey;
      const logPrefix = `[${className} - ${methodName}]`;

      try {
        logger.log(`${logPrefix} - Method started `);
        const result = await originalMethod.apply(this, args);
        logger.log(`${logPrefix} - Method finished`);
        return result;
      } catch (error) {
        logger.error(`${logPrefix} - Exception thrown: ${error}`);
        throw error;
      }
    };

    return descriptor;
  };
}

function LoggingForSync() {
  const logger = new Logger(LoggingForSync.name);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = propertyKey;
      const logPrefix = `[${className} - ${methodName}]`;

      try {
        logger.log(`${logPrefix} - Method started`);
        const result = originalMethod.apply(this, args);
        logger.log(`${logPrefix} - Method finished`);
        return result;
      } catch (error) {
        logger.error(`${logPrefix} - Exception thrown: ${error}`);
        throw error;
      }
    };

    return descriptor;
  };
}

export { LoggingForAsync, LoggingForSync };
