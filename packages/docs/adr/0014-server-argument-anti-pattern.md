# 14. server-argument-anti-pattern

Date: 2019-10-24

## Status

2019-10-24 proposed

## Context

When I added the Schedule plugin to this project I started to realise the limitations of passing the Hapi server as an argument. Take for example saving the `TopTracks` in the pipeline plugin:

```JavaScript
export const saveRawTopTracks = async server => {
  const rawTopTracks = await server.methods.korin.getChartTopTracks();
  const tracks = parseRawTopTracks(rawTopTracks);

  await server.app.db.RawTopTrack.deleteMany();
  await server.app.db.RawTopTrack.insertMany(tracks);

  return tracks;
};
```

### Too much server

It initially seemed efficient to use the server as a global state that can be modified and passed around. But this looks ugly when I have to pass the server to a series of functions e.g.

```JavaScript
async importChartTracks() {
  console.info(`Started: scheduled saveRawTopTracks at ${new Date()}`);

  try {
    await this.server.methods.pipeline.saveRawTopTracks(this.server);
    await this.server.methods.pipeline.convertRawTopTracks(this.server);
    await this.server.methods.pipeline.addSpotifyData(this.server);
    await this.server.methods.pipeline.addTrackProfile(this.server);
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
}
```

It would look much better if I could pass the server once and hide the implementation of how the server is used. This points towards using a class structure. For example:

```JavaScript
// register the pipeline plugin
{
  ...
  register: server => {
    server.methods.pipeline = new Pipeline(server);
  }
}

// start a scheduled job
async startImportChartTracks() {
  console.info(`Started importChartTracks at ${new Date()}`);

  try {
    await this.server.methods.pipeline.importChartTracks();
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
}
```

Or even better, avoid using the server as the API boundary e.g.

```JavaScript
// register the pipeline plugin
{
  ...
  register: server => {
    const pipeline = new Pipeline();
    server.method({
      name: 'pipeline',
      method: pipeline,
    });

    server.route({ ... });
  }
}

// start a scheduled job
async startImportChartTracks() {
  console.info(`Started importChartTracks at ${new Date()}`);

  try {
    await this.pipeline.importChartTracks();
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
}
```

### Inject or not

The Pipeline class depends on not just the server but on the Korin plugin and several models which have to be available on the server object. I have avoided an explicit Dependency Injection approach because I wanted to hide some of the implementation details and Hapi's server seemed to be a way to achieve that:

```JavaScript
// when creating the pipeline class with Dependency Injection
{
  export default class Pipeline {
    constructor({ RawTopTrackModel, TopTrackModel, Korin }) {
      ...
    }
  }
}
```

#### Alternatives

Some alternatives I found are:

- [Schmervice][github-schmervice]: This moves the API boundary to the `request` object from `server` but the pipeline can be triggered by scheduled job would should not have to be an HTTP request.

```JavaScript
(async () => {
  const server = Hapi.server();
  await server.register(Schmervice);

  server.registerService(
    class MathService extends Schmervice.Service {
      add(x, y) { ... }
    }
  );

  server.route({
    method: 'get',
    path: '/add/{a}/{b}',
    handler: (request) => {
      const { a, b } = request.params;
      const { mathService } = request.services();

      return mathService.add(a, b);
    }
  });
})();
```

- [Clean architecture][hapi-clean-architecture]: This relies on Dependency Injection and strict separation of concerns. The example belowe is a use case for [creating new users][hapi-clean-use-case-example] which is how the behaviour of the system is composed from its parts - business logic, repositories etc. An additional advantage is that the tests can actually be decoupled from the implementation via the use cases.

```JavaScript
// create-user use case
const User = require('../../enterprise_business_rules/entities/User');

module.exports = (firstName, lastName, email, password, { userRepository }) => {
  const user = new User(null, firstName, lastName, email, password);
  return userRepository.persist(user);
};

// test create-user use case
const User = require('../../../lib/enterprise_business_rules/entities/User');
const UserRepository = require('../../../lib/application_business_rules/repositories/UserRepository');
const mockUserRepository = new UserRepository();
const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');

test('should resolve with the newly persisted user (augmented with an ID)', async () => {
  // given
  const persistedUser = new User(123, 'John', 'Doe', 'john.doe@email.com', 'P@s$W0rD');
  mockUserRepository.persist = jest.fn(() => persistedUser);

  // when
  const user = await CreateUser('John', 'Doe', 'john.doe@email.com', 'P@s$W0rD', { userRepository: mockUserRepository });

  // then
  expect(mockUserRepository.persist).toHaveBeenCalledWith(new User(null, 'John', 'Doe', 'john.doe@email.com', 'P@s$W0rD'));
  expect(user).toEqual(persistedUser);
});
```

## Decision

- Use classes to group methods into features that can be easily called.
- Create use cases to decouple tests from implementation.

## Consequences

- Major refactor of how plugins and tests work.
- Better decoupling of tests, features and components.
- More files and "things" that make up the system.

[github-schmervice]: https://github.com/hapipal/schmervice
[hapi-clean-architecture]: https://github.com/jbuget/nodejs-clean-architecture-app
[hapi-clean-use-case-example]: https://github.com/jbuget/nodejs-clean-architecture-app/blob/master/lib/application_business_rules/use_cases/CreateUser.js
