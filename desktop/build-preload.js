import esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

esbuild.build({
  entryPoints: [path.join(__dirname, 'electron/preload.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile: path.join(__dirname, 'dist-electron/preload.cjs'),
  external: ['electron'],
  sourcemap: true,
}).catch(() => process.exit(1));
