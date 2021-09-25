module.exports = {
  client: {
    includes: ['src/schema/queries/*.graphql'],
    globalTypesFile: 'src/schema/globalTypes.ts',
    service: {
      name: 'ants.graphql-service',
      tagName: 'gql',
    },
  },
};
