/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
export default {
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  entryPoints: ['./src/index.ts'],
  out: 'docs/api',
  docsRoot: 'docs',
  excludeGroups: false,
  useCodeBlocks: false,
  parametersFormat: 'table',
  propertiesFormat: 'list',
  typeDeclarationFormat: 'table',
  // outputFileStrategy: 'modules',
}
