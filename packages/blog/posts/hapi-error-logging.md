---
tags: tests
title: Hapi error logging
description: How to log server errors during tests
date: 2019-07-23
---

It was so annoying - there I was trying to test my hapi server but it was broken and I had no idea why. Because I was using `server.inject` the errors where not being shown in the console. How do I log the error messages from a stub server?

```JavaScript
suite('getBlogFiles', () => {
    let server;

    beforeEach(() => {
        server = Hapi.Server();
        const preResponse = function(request, h) {
            const { response } = request;
            if (!response.isBoom) {
                return h.continue;
            }

            return console.warn(response);
        };

        server.ext('onPreResponse', preResponse);
    });

    test('get posts route gets markdown files', async () => {
        const files = ['that.md', 'this.md'];
        const getBlogFiles = sinon.stub().resolves(files);
        const stubMethods = [{ name: 'blog.getBlogFiles', method: getBlogFiles }];

        await server.register({
            plugin,
            options: { methods: stubMethods },
        });

        const { method, url } = routes.v1.get_blog_posts();
        // errors disappearing between here...
        const { result } = await server.inject({
            method,
            url,
        });
        // ... and here

        expect(result).to.equal(files);
    });
});
```

So I got on the [Hapi hour slack channel][1] to ask this question and a in a few minutes [Eran][2] told me

> @iampeterbanjo it's coming soon, but for now just throw server.events.on('request', console.log) to see what's up.

Brilliant! It feels great to be using a framework from such a friendly and helpful community.

[1]: https://hapihour.slack.com
[2]: https://medium.com/@eranhammer
