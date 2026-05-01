import esbuild from "esbuild";

const production = process.argv.includes("production");
const builtin = [
  "assert","async_hooks","buffer","child_process","cluster","console",
  "constants","crypto","dgram","dns","domain","events","fs","http","http2",
  "https","inspector","module","net","os","path","perf_hooks","process",
  "punycode","querystring","readline","repl","stream","string_decoder",
  "sys","timers","tls","trace_events","tty","url","util","v8","vm","zlib",
];

esbuild.build({
  entryPoints: ["src/main.ts"],
  outfile: "main.js",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "ES2015",
  external: ["obsidian", ...builtin],
  minify: production,
  sourcemap: production ? false : "inline",
}).then(() => {
  console.log(production ? "Build complete." : "Built.");
});
