import winston from "winston";
import WinstonNewrelicLogsTransport from "winston-newrelic-logs-transport";

const { createLogger, transports, format } = winston;
const appendAdditionalData = format((info: any, opts: any) => {
  info.level = info.level;
  info.source = "Nextjs-newrelic-logger";
  info.environment = process.env.NODE_ENV || "development";
  return info;
});

const logger =
  process.env.NODE_ENV === "production"
    ? createLogger({
        level: "info",
        format: format.combine(appendAdditionalData(), format.json()),
        defaultMeta: {
          entity: {
            guid: process.env.NEW_RELIC_ENTITY_GUID,
          },
        },
        transports: [
          new WinstonNewrelicLogsTransport({
            licenseKey: process.env.NEW_RELIC_LICENSE_KEY ?? "",
            apiUrl: "https://log-api.newrelic.com",
          }),
        ],
      })
    : createLogger({
        level: "info",
        format: format.combine(appendAdditionalData(), format.json()),
        transports: [new transports.Console()],
      });

export { logger };
