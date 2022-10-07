import fs from "fs";
import path from "path";

function readFolder(p: string) {
  try {
    const files = fs.readdirSync(p);
    return files.map((file) => path.join(p, file));
  } catch (e) {
    return [];
  }
}

export default function readCodeFiles(
  entry: string,
  type: string,
  isAllowed?: boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fields: any;
  const files = readFolder(entry);
  files.forEach((file) => {
    let field;
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      const allowed = isAllowed || file.endsWith(type);
      field = readCodeFiles(file, type, allowed);
    } else if (isAllowed || file.match(new RegExp(`${type}.(json|ts|js)$`))) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const child = require(file);
      field = child.default || child;
    }

    if (field) {
      if (typeof field !== "object")
        throw new Error(
          `export from ${file} must be an object but found ${typeof field}`
        );
      if (!fields) {
        fields = Array.isArray(field) ? [] : {};
      }
      if (Array.isArray(field)) {
        fields = [...fields, ...field];
      } else fields = { ...fields, ...field };
    }
  });
  return fields;
}

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });
