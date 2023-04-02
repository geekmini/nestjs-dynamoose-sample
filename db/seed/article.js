const { inject } = require('./dynamo.util');

const articles = [
  {
    slug: 'fc81597b-f1b2-440f-a669-af3e241081f9',
    title: 'First Article',
    body: 'some content',
    likes: 25,
    tags: ['education'],
    createdAt: new Date('2023-03-12T01:53:42.217Z').getTime(),
    updatedAt: new Date('2023-03-12T01:53:42.217Z').getTime(),
  },
];

const createArticleTable = async (client, tableName) => {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [{ AttributeName: 'slug', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'slug', KeyType: 'HASH' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
  };
  await client.createTable(params);
};

const tableName = process.env.DYNAMODB_ARTICLE_TABLE_NAME;

inject(articles, tableName, createArticleTable);
