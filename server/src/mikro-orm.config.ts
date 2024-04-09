import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default const mikroOrmConfig = {
  entities: [Post],
  dbName: "redditclone",
  // type: "postgresql",
  debug: !__prod__,
};
