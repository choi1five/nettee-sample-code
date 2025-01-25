import { build } from 'tsup';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const run = async ({ entryPoints = ['src/index.ts'], config = {} }) => {
  const dev = process.argv.includes('--dev');
  const watch = process.argv.includes('--watch');
  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const baseConfig = {
    entry: entryPoints,
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    minify: !dev,
    sourcemap: true,
    target: 'es2019',
    treeshake: true,
    splitting: true,
    watch,
    external,
    ...config,
  };

  try {
    await build(baseConfig);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

export default run;
