module.exports = {
  client: {
    includes: ['src/schema/queries/*.ts', 'src/schema/mutations/*.ts'],
    service: {
      name: 'ants.graphql-service',
      tagName: 'gql',
    },
  },
};
