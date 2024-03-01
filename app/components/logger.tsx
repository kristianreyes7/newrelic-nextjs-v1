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
            guid: "MTk2OTM4N3xCUk9XU0VSfEFQUExJQ0FUSU9OfDExMjAyNzk1Mzg",
          },
        },
        transports: [
          new WinstonNewrelicLogsTransport({
            licenseKey: "1b3fb7457dce4b4d7785242acb7bb5a3b3ab5d94",
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
