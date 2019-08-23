# Personal portfolio and blog

Made with

- [NodeJS][node-green]
- [Hapi][hapijs]
- [Vue][vue]

## Development

- `npm run dev`
  - install dependencies
  - watches and builds css files
  - watches and runs server

### Testing

Each package has a test and test watch script e.g.

- `npm run watch-server-test`

  - watches server tests

- `npm run server-test`

  - runs server tests

- `npm run dry-run` (to check deployment)
  - builds css
  - starts data
  - starts server

### Docker

- `make build && make run` to start build and run docker image
- `make help` for more options

## Deployment

- `npm run deploy`
  - runs tests
  - runs e2e tests (needs development server to be running e.g. `yarn dev`)
  - pushes to [Clever cloud][clever-cloud]
  - pushes to [Github][repo]

## Design principles

### 1. Structure folders by components

Organising the project by components, and by extension features, makes the folder hierarchy helpful in searching, reading and editing code. [See][breakintcomponents]

### 2. Folders are plugins

Each folder contains one or more features that will be registered as a HapiJS plugin. This is used to create API boundaries between parts of the application. A plugin contains -

- methods: for sharing features across plugin boundaries
- helpers: where the features are implemented
- plugin: HapiJS plugin definition e.g. name, version etc.
- index.js: exported function that can be registered on the server. [See][require-modules]

This makes testing easier since a feature can be easily composed, spied or mocked.

### 3. Test everything

Instead of asking how much should I test, I've made it a design goal to make everything testable. HapiJS makes this easier by providing tools and properties to spy or inspect. For example,

```JavaScript
await server.register({
  plugin,
  options: { methods: stubMethods },
});

const { method, url } = routes.v1.get_blog_posts();
const { result } = await server.inject({
  method,
  url,
});

expect(result).to.equal(files);

```

### 4. Behaviour Driven Design for test descriptions

Test results should make it clear what features are working or broken. Using a BDD makes this easier by providing the context for the test results. [See][bdd]. For example,

```JavaScript
suite('Given model `connex` helper', () => {
  suite('And `isTest` is true', () => {
    test('dbName is correct', () => {
      expect(connex.dbName(true)).to.equal('test');
    });
  });
});
```

### 5. Add tools sparingly

Each additional tool like a compiler, library, framework etc. adds a maintenance burden that can slow down progress. Instead of focusing on what I want to do, I'm forced to debug and fix an upstream issue.

### 6. Tabs over spaces

I've tried both and I prefer tabs because I can change my indentation without changing the file history. Except in Markdown files because the linter is not customisable and it's not code.

### 7. Pay down debts

I want to keep this site running over a a few years (2+) and technical debt is what makes it harder to make changes over time. They should be paid down and in order to do this -

- Keep concepts and abstractions simple
- Have test coverage above 90%
- Refactor frequently
- Ship often to keep code in working state

### 8. Architecture Decision Records

Documenting significant architecture decisions will help in reflection and learning from previous iterations. [See][adr]

[Visit][site] or [follow][twitter]

[clever-cloud]: https://www.clever-cloud.com/en/
[repo]: https://github.com/iampeterbanjo/iampeterbanjo.com
[hapijs]: https://hapijs.com
[node-green]: https://node.green/
[site]: https://iampeterbanjo.com
[twitter]: https://twitter.com/dayosuperstar
[breakintcomponents]: https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md
[require-modules]: https://github.com/goldbergyoni/nodebestpractices#-39-require-modules-by-folders-opposed-to-the-files-directly
[bdd]: https://github.com/goldbergyoni/nodebestpractices#-42-include-3-parts-in-each-test-name
[vue]: https://vuejs.org
[adr]: https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records
