// @ts-check
/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'agents-libs',
  tagline: 'Agent libraries and utilities',
  url: 'https://curry-katsu.github.io',
  baseUrl: '/agents-libs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'curry-katsu',
  projectName: 'agents-libs',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '.',
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Exclude node_modules and build/cache dirs to avoid scanning huge trees
          exclude: ['**/node_modules/**', '**/.cache/**', '**/*.test.*', '**/__tests__/**'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
