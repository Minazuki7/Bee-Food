import mongoose, { Schema } from "mongoose";
import fsPromise from "fs/promises";
import path from "path";
import readCodeFiles, { delay } from "./helpers";

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.set("debug", true);

const mongoURI = process.env["MONGO_URI"] || "mongodb://localhost:27017/food";

function connect() {
  console.log("mongoURI", mongoURI);
  return mongoose.connect(mongoURI);
}

export async function getFixtures(file: string, clg = true) {
  const dropped: string[] = [];

  async function generateDocs(
    documents: unknown[],
    schema: Schema<unknown>,
    name: string,
    clg = true,
    counter?: number
  ) {
    const model = mongoose.model(name, schema);
    if (clg) {
      console.log(
        `Generating for model: ${name} - ${documents.length} entries`
      );
    }
    try {
      if (!dropped.find((_name) => _name === name)) {
        await model.collection.drop();
        dropped.push(name);
      }
      await model.insertMany(documents, { ordered: true });
    } catch (e: any) {
      if (clg) {
        console.log("Error in fixtures : ", e.message);
      }

      if (e.message === "ns not found") {
        dropped.push(model.collection.name);
      }
      if (!counter || counter < 5) {
        await delay(1000);
        await generateDocs(
          documents,
          schema,
          name,
          clg,
          counter ? counter + 1 : 1
        );
      } else {
        if (clg) {
          console.log(e.message);
        }
        process.exit(1);
      }
    }
  }

  const files = await fsPromise.readdir(file);
  const fixtures = readCodeFiles(file, "fixtures") || [];
  const modelFile = files.find((file) => file.endsWith(".entity.ts"));
  if (modelFile && fixtures.length) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(file, modelFile)).default;
    await generateDocs(
      fixtures,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model.schema,
      model.name,
      clg
    );
  }
  return fixtures;
}

async function generate() {
  await connect();
  const moduleDir = path.join(__dirname);
  const dir = await fsPromise.readdir(moduleDir);

  for (let i = 0; i < dir.length; i += 1) {
    const file = path.join(moduleDir, dir[i]);
    const stat = await fsPromise.stat(file);
    if (stat.isDirectory()) {
      await getFixtures(file);
    }
  }

  await mongoose.connection.close();
  process.exit(0);
}

generate();
