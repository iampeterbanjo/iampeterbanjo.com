# Notes to self

- 27 August 2019: put prettier and its dependencies at the root of the project to make git commit hooks work. Not sure why.
- 30 August 2019: not restoring jest mocks is a memory leak.
- 1 September 2019: [Faker][github-faker] has a memory leak use [Casual][github-casual] instead.
- 1 September 2019: Nunjucks seems to have a memory leak - what are the alternatives?
- 3 September 2019: I initially moved to Marko because `jest` was reporting memory leaks from Nunjucks but I can't get Marko to work in a test environment because:

  - The new Marko 4 syntax breaks e.g.

    ```shell
    /home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/server/src/views/templates/berserker/list.marko:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import Layout from "../layout"
    ```

  - I could compile Marko into JS bundles but the [marko-rollup-sample] doesn't work:

    ```shell
    npm install
    npm start
    marko-rollup@1.0.0 build /home/iampeterbanjo/github/marko-js-samples/marko-rollup
    rollup -c rollup.config.js

    (node:24262) [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated 🚨   The argument 'path' must be a string or Uint8Array without null bytes. Received '\u0000commonjs-proxy:/home/iampeterbanjo/github/marko-js-samples/marko-rollup/node_modules/marko/src/runtime/package.json'
    ```

  - 3 September 2019: Converting to Typescript and Jest has reduced code coverage from 97% to 85%. How come? Maybe Jest calculates line coverage differently to Lab.

[github-faker]: https://github.com/marak/faker.js
[github-casual]: https://github.com/boo1ean/casual
[marko-rollup]: https://github.com/marko-js-samples/marko-rollup
