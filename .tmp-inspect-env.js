const fs = require("fs");

function inspect(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  console.log("FILE", file);
  for (const line of lines) {
    if (!line.startsWith("MONGODB_URI=") && !line.startsWith("AUTH_SECRET=")) continue;
    const key = line.split("=")[0];
    const value = line.slice(key.length + 1).trim();
    const host = value.replace(/^mongodb(\+srv)?:\/\//, "").replace(/.*@/, "").split("/")[0].split(",")[0];
    console.log(
      " ",
      key,
      "len=" + value.length,
      "host=" + host,
      "quoted=" + /^["']/.test(value),
    );
  }
}

inspect(".env");
inspect(".env.local");
inspect(".env.example");
