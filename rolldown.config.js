import { defineConfig } from "rolldown";
export default defineConfig({
  input: "lib/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    minify: true,
    sourcemap: false,
  },
  resolve: { extensions: [".js", ".ts", ".json"] },
  treeshake: true,
  platform: "node",
  target: "node20",
  minify: {
    compress: {
      drop_console: false,
      passes: 3,
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true,
    },
    mangle: {
      toplevel: true,
      eval: true,
      keep_fnames: false,
      properties: false,
    },
  },
  optimization: { moduleIds: "deterministic", minimize: true },
});
