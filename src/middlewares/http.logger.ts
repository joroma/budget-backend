import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info("\ue66a Incoming Request", {
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    // headers: req.headers, // beware here
  });

  // Get the original send function
  const originalSend = res.send;

  //Override the send function to log the response
  res.send = function (body): Response {
    logger.info("\ue66a Outgoing Response", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      body: body,
    });

    // Call the original send function
    return originalSend.call(this, body);
  };

  next();
};
