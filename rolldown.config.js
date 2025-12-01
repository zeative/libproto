import { defineConfig } from "rolldown";

export default defineConfig({
  input: "lib/index.js",
  output: { file: "dist/bundle.js" },
});
