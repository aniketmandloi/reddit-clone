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

  // app.get("/", (_, res) => {
  //   res.send("Hello world! 📸");
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
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
