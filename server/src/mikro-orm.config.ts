import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
// import { PostgreSqlDriver, defineConfig } from "@mikro-orm/postgresql";
import path from "path";
// import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";

const mikroOrmConfig = {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pathTs: undefined,
  },
  entities: [Post],
  dbName: "redditclone",
  // type: "postgresql",
  debug: !__prod__,
  extensions: [Migrator],
  driver: PostgreSqlDriver,
  allowGlobalContext: true,
  // metadataProvider: TsMorphMetadataProvider,
} as Parameters<typeof MikroORM.init>[0];

export default mikroOrmConfig;

// export default defineConfig({
//   dbName: "redditclone",
//   driver: PostgreSqlDriver,
//   // folder-based discovery setup, using common filename suffix
//   entities: [Post],
//   // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
//   // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
//   metadataProvider: TsMorphMetadataProvider,
//   allowGlobalContext: true,
//   // enable debug mode to log SQL queries and discovery information
//   debug: true,
// });
