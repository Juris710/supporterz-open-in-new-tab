import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    crx({
      manifest: {
        manifest_version: 3,
        name: 'supporterz-open-in-new-tab',
        version: process.env.npm_package_version!,
        description: process.env.npm_package_description,
        content_scripts: [
          {
            matches: ['https://talent.supporterz.jp/*'],
            js: ['src/content_scripts/main.ts'],
          },
        ],
      },
    }),
  ],
});
