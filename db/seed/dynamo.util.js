const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { chunk } = require('lodash');

const generateItemRequests = (items) =>
  items.map((i) => ({ PutRequest: { Item: marshall(i) } }));

const initDynamoDBTables = async (dynamoDBClient, tableName, createTable) => {
  const { TableNames } = await dynamoDBClient.listTables({});
  if (!TableNames.includes(tableName)) {
    console.log(`create dynamoDB ${tableName} table`);
  } else {
    console.log(`recreate dynamoDB ${tableName} table`);
    await dynamoDBClient.deleteTable({ TableName: tableName });
  }
  await createTable(dynamoDBClient, tableName);
};

const batchInjectDynamoItems = async (client, tableName, items) => {
  // ! 25 is upper limit of dynamodb batch update operation
  const paramGroups = chunk(items, 25).map((subItems) => ({
    RequestItems: { [tableName]: subItems },
  }));
  await Promise.all(paramGroups.map((param) => client.batchWriteItem(param)));
};

const inject = async (items, tableName, createTable) => {
  const client = new DynamoDB({
    endpoint: process.env.DYNAMO_ENDPOINT,
    region: 'ap-southeast-2',
    credentials: {
      accessKeyId: 'DO_NOT_DELETE',
      secretAccessKey: 'DO_NOT_DELETE',
    },
  });

  await initDynamoDBTables(client, tableName, createTable);
  const requests = generateItemRequests(items);
  await batchInjectDynamoItems(client, tableName, requests);
};

module.exports = { inject };
