---
tags: frameworks
title: The OK Gatsby
description: Too much of too many good things
date: 2019-04-08
updated: 2019-04-13
---

I have been using Gatsby to build my personal portfolio site and after a few months, I don't think I would recommend it. I've had a few blogs and apps that I didn't maintain over the years and so having something easy to work with over time is a must have for this side project. [GatsbyJS][1] uses the latest (as of writting) front-end tools to build static sites

## Features

- ReactJS (I know this one)
- Webpack (I usually avoid this when I can)
- Graph QL (Oooo... looks nice)
- Service workers (Yikes)

But the combination of all these together feels like riding a bicycle down hill with faulty brakes. I keep running into problems with no way out.

## Problems

- What happened to my static pages? With Gatsby, although it looks like your generated "static" site has regular URLs it is [TOTALLY dependent][2] on client-side JavaScript. I'm from the school of [Progressive Enhancement][6] and [Progressive web apps][7] don't have to fall apart without JavaScript. The good news is that Google seems to be able to read my site fine. But there should be an "eject to HTML" button somewhere.
- Cryptic webpack build errors. Lord deliver me from the evil of Webpack build errors! What does this error output mean?? 🤯

```JavaScript
⢀ Building static HTML for pages/korin/profiles/Khalid/My-Bad

error Building static HTML failed for path "/korin/profiles/The-Black-Keys/LOHI"

See our docs page on debugging HTML builds for help https://gatsby.dev/debug-html

   8 |  else
   9 |          root["lib"] = factory(root["@reach/router"], root["core-js/modules/es6.array.iterator"], root["core-js/modules/es6.array.sort"], root["core-js/modules/es6.function.name"], root["core-js/modules/es6.map"], root["core-js/modules/es6.object.assign"], root["core-js/modules/es6.object.to-string"], root["core-js/modules/es6.regexp.constructor"], root["core-js/modules/es6.regexp.replace"], root["core-js/modules/es6.regexp.split"], root["core-js/modules/es6.regexp.to-string"], root["core-js/modules/es6.string.ends-with"], root["core-js/modules/es6.string.fixed"], root["core-js/modules/es6.string.iterator"], root["core-js/modules/web.dom.iterable"], root["crypto"], root["fs"], root["lodash"], root["path"], root["react"], root["react-dom/server"], root["react-helmet"]);
> 10 | })(this, function(__WEBPACK_EXTERNAL_MODULE__reach_router__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_array_iterator__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_array_sort__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_function_name__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_map__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_object_assign__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_object_to_string__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_regexp_constructor__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_regexp_replace__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_regexp_split__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_regexp_to_string__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_string_ends_with__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_string_fixed__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_es6_string_iterator__, __WEBPACK_EXTERNAL_MODULE_core_js_modules_web_dom_iterable__, __WEBPACK_EXTERNAL_MODULE_crypto__, __WEBPACK_EXTERNAL_MODULE_fs__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_path__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom_server__, __WEBPACK_EXTERNAL_MODULE_react_helmet__) {
     |  ^
  11 | return


  WebpackError: Invariant Violation: Minified React error #130; visit https://reactjs.org/docs/error-decoder.html?invariant=130&args[]=object&args[]= for the full message or   use the non-minified dev environment for full errors and additional helpful warnings.

  - universalModuleDefinition:10 ba
    lib/webpack/universalModuleDefinition:10:2

// truncated for brevity
```

In this case the error is at the url buried in the terminal.

> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

Usually with [create-react-app][8] you get error details nicely laid out in the terminal. So this Webpack format is not a step in the right direction.

- Service worker weirdness. This feature is meant to cache your site so that it works great with less than ideal internet connections - even offline. In practice it means that I have to keep refreshing my site to see what's on it. In development, my end-to-end tests sometimes fail on the first pass. Or second and third pass until I delete browser data or the Cypress binary... and re-install. Below is a screenshot of the same page on first load and then after refresh.

![on first load][3]

> Fig 1: On first load

![after refresh][4]

> Fig 2: After refresh

Create react app has disabled their service workers as a default setting for [similar reasons][5].

So what's a developer to do? Keep it simple - Gatbsy was fun to test drive but I see too many maintenance issues ahead for my side project(s).

[1]: https://gatsbyjs.org
[2]: https://github.com/gatsbyjs/gatsby/issues/962
[3]: /images/Screenshot_2019-04-08-service-workers-no-tracks-found.png
[4]: /images/Screenshot_2019-04-08-service-workers-top-40-tracks-found.png
[5]: https://twitter.com/dan_abramov/status/954146978564395008
[6]: https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/
[7]: https://web.dev/installable/discover-installable
[8]: https://github.com/facebook/create-react-app#npm-start-or-yarn-start
