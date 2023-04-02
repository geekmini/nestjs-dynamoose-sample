## Nest.js Dynamoose Sample
- [Install and Run](#install-and-run)
- [Dashboard for Local DynamoDB](#dashboard-for-local-dynamodb)
- [Get Access to Context Object](#get-access-to-context-object)
- [Add Environment Variables](#add-environment-variables)
- [Get Environment Variables](#get-environment-variables)


### Install and Run
```sh
npm install
docker-compose up -d
npm run start:dev
```

### Dashboard for Local DynamoDB
```sh
npm run db:local
```
### Get Access to Context Object

It's free to inject the `Context` object into any layer (controller, service or repo layer). Developer can use this feature for contextual logging. You can also customize the `Context` generation logic in `src/common/context/context.ts`

```typescript
export class SomeController {
    @Inject()
    context: Context
}
```


### Add Environment Variables

- add in `.env.local`
- set default value in `src/providers/config/derive.ts`
- set derived values in `src/providers/config/derive.ts`
- add type and validation rules in `src/providers/config/envs.ts`


### Get Environment Variables
```typescript
const port = config.get<string>("PORT")
// not recommended, only for rare cases
process.env.PORT
```