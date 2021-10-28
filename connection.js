import mongoose from "mongoose";

const username = "jimmy";
const pw = "passw0rd";
const db = "exampledb";

const connectionString = `mongodb://${username}:${pw}@localhost:27017/${db}`;

mongoose.connection.on(
  "error",
  (e) => console.log("[M] Error!", e) || process.exit(0)
);
mongoose.connection.on("connecting", () => console.log("[M] Connecting"));
mongoose.connection.on("connected", () => console.log("[M] Connected"));
mongoose.connection.on("disconnecting", () => console.log("[M] Disconnecting"));
mongoose.connection.on("disconnected", () => console.log("[M] Disconnected"));

export default class Database {
  async connect() {
    return await mongoose.connect(connectionString);
  }
}
