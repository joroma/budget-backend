import { NextFunction, Request, RequestHandler, Response, response } from "express";

export default {

  get(req: Request, res: Response, next: NextFunction) {
    res.send("Not yet implemented");
  }
}
