# Personal portfolio and blog

| Packages    | Coverage                            |
| ----------- | ----------------------------------- |
| server      | ![server coverage][coverage-server] |
| hapi-roller | 98.77% (2/163)                      |
| data        | 100.00%                             |

## Made with

- [NodeJS][node-green]
- [Hapi][hapijs]
- [Typescript][typescript]
- [Jest][jest]

## Development

- `npm run dev`
  - install dependencies
  - watches and builds css files
  - watches and runs server

### Testing

Each package has a test and test watch script e.g.

- `npm test`

  - runs data, e2e and server tests

- `npm run dry-run` (to check deployment)
  - builds css
  - starts server

### Docker

- `make build && make run` to start build and run docker image
- `make help` for more options

## Deployment

- `npm run deploy`
  - runs tests
  - runs e2e tests (needs development server to be running e.g. `npm run dev`)
  - pushes to [Clever cloud][clever-cloud]
  - pushes to [Github][repo]

## Design principles

### 0. :thinking: Reflect on decisions and processes

> The best approach to improving a software development environment is to amplify learning. _Lean software development, an Agile Toolkit - Mary Poppendick, Tom Poppendick._

[Journaling][journal] and documenting significant [architecture decisions][adr] will help in reflection and learning from previous iterations. [Learn more][adr]

### 1. :gear: Structure folders by projects and components

> It turns out that understanding the existing product is the dominant maintenance activity... Once we know what we need to change, the modification itself may well be trivial. But the road to that enlightenment is often painful. This means our primary task as programmers isn’t to write code, but to understand it. _Your Code as a Crime Scene - Adam Tornhill_

Organising the project by components, and by extension features, makes the folder hierarchy helpful in searching, reading and editing code. [Learn more][breakintcomponents]

A follow-on from this idea is that each server folder contains one or more features that will be registered as a HapiJS plugin. This is used to create API boundaries between parts of the application. A plugin contains -

- methods: for sharing features across plugin boundaries
- helpers: where the features are implemented
- plugin: HapiJS plugin definition e.g. name, version etc.
- index: exported function that can be registered on the server. [Learn more][require-modules]

This makes testing easier since a feature can be easily composed.

### 2. :shield: Test everything

> Tip 48: Design to test: Start thinking about testing before you write a line of code. _The Pragmatic Programmer: From journeyman to master - Andrew Hunt, David Thomas_

Instead of asking how much should I test, I've made it a design goal to make everything testable. HapiJS makes this easier by providing an API that can use dependency injection and instrument requests. For example,

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

### 3. :open_book: Behaviour Driven Design for test descriptions

> ...vocabulary is the perhaps the most important aspect of BDD, because it tries to normalize the vocabulary used by programmers, business developers, testers and others in the development of a system when discussing problems, requirements, and solutions. _Test-driven JavaScript Development - Christian Johansen_

Test results should make it clear what features are working or broken. Using BDD makes this easier by providing the context for the test results. [Learn more][bdd]. For example,

```JavaScript
describe('Given model `connex` helper', () => {
  describe('And `isTest` is true', () => {
    it('When dbName is correct', () => {
      expect(connex.dbName(true)).to.equal('test');
    });
  });
});
```

### 4. :hammer_and_wrench: Add tools sparingly

> [4] UNPLANNED WORK OR RECOVERY WORK: These include operational incidents and problems, often caused by the previous types of work and always come at the expense of other planned work commitments. _The Four Types of Work from The Phoenix Project - George Spafford, Kevin Behr, Gene Kim_

Each additional tool like a compiler, library, framework etc. adds a maintenance burden that can potentially slow down progress. This has the unintended consequence of distracting me from my goals and working on upstream issues. [Learn more][journal]

### 5. :money_with_wings: Pay down technical debts

> Always leave the code base healthier than when you found it. It will never be perfect, but it should be better. _Refactoring: Improving the Design of Existing Code - Martin Fowler_

I want to keep this site running over a few years (5+) and technical debt is what makes it harder to make changes over time. They should be paid down and in order to do this -

- Keep concepts and abstractions simple
- Have test coverage above 90%
- Refactor frequently
- Ship often to keep code in working state

#### [ADR Table of Contents][adr-toc]

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
[adr-toc]: ./packages/docs/adr/README.md
[typescript]: https://www.typescriptlang.org
[jest]: https://jestjs.io
[coverage-server]: ./packages/server/badges/badge-lines.svg
[journal]: ./JOURNAL.md
