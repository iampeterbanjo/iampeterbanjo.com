---
tags: tests
title: OMG! I 💓 these tests 😍
description: You can't live without it and you shouldn't try
date: 2019-02-20
updated: 2019-02-23
---

I like writing tests but writing good tests is a skill - just like any other - that is best learnt by doing. So, here is a callout of the tests I have seen on the internet that inspired me to say

> Wow, that's nice. I should do that.

And in no particular order -

### 1. [Redux reducer tests](https://redux.js.org/recipes/writing-tests#example-2) with Jest

```JavaScript
describe('todos reducer', () => {
  it('should handle ADD_TODO', () => {
    expect(
      reducer([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ]);
  });
});
```

[Figure 1: Redux reducer test from redux documentation](https://redux.js.org/recipes/writing-tests#example-2)

At first glance this looks like a unit test but it also tests the reducer types. And when I want to expand the store I can easily use a test-driven approach by using [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject) instead of `toEqual`.

### 2. Express app integration tests with [Supertest](https://github.com/visionmedia/supertest)

```JavaScript
describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
```

[Figure 2: Express integration test from Supertest documentation](https://github.com/visionmedia/supertest)

These integration tests run quickly and make it possible to test routes, controllers and models all in one go. Although Express is the #1 NodeJS server framework, I [prefer HapiJS](https://hueniverse.com/why-you-should-consider-hapi-6163689bd7c2) but more on that in another post.

### 3. [Mocking Axios](https://jestjs.io/docs/en/mock-functions#mocking-modules) with Jest

```JavaScript
test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(resp => expect(resp.data).toEqual(users));
});
```

[Figure 3: Mock of axios from documentation Jest documentation](https://jestjs.io/docs/en/mock-functions#mocking-modules)

This little bit of wizadry turns slow integration tests into faster unit tests by removing the need for an API to respond. Of course mocks can be used for many things but **this** is [my number #1 guy](https://www.youtube.com/watch?v=-VRwTiQWoXU).
