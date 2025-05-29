module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Add support for importing .tsx files
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/image': require.resolve('./nextjs-mocks.js'),
      'next/link': require.resolve('./nextjs-mocks.js'),
    };
    return config;
  },
};
