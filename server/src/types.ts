import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
// import { Request, Response } from "express";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: any;
  res: any;
};
