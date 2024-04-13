import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { PostResolver } from "./resolvers/Post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/User";
// import redis from "redis";
import session from "express-session";
import { MyContext } from "./types";
// import cors from "cors";
// import { RedisStore } from "connect-redis";
// import RedisStore from "connect-redis";
// import connectRedis from "connect-redis";
import { createClient } from "redis";
const RedisStore = require("connect-redis").default;

const main = async () => {
  // console.log(__dirname);
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();

  // const post = orm.em.create(Post, {
  //   title: "my first post",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const app = express();

  // app.use(cors());

  // app.use(
  //   cors({
  //     origin: "https://studio.apollographql.com",
  //     credentials: true,
  //   })
  // );

  // app.get("/", (_, res) => {
  //   res.send("Hello world! 📸");
  // });

  const redisClient = createClient();
  redisClient.connect().catch(console.error);
  let redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
    prefix: "session:",
  });

  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "SECRET",
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any });

  app.listen(4000, () => {
    console.log("server listening on port 4000 🚀");
  });
};

main().catch((err) => {
  console.error(err);
});
