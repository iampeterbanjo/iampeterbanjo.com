---
tags: tests
title: The hardest test to write
description: The first test is the hardest
date: 2019-04-13
---

I like writing tests because they prove that the code will run like I expect. I like it even more when I can write tests before I write my code but often I can’t do this because I'm still figuring out how the code will come work. To put it another way, I'm not sure where I'm going so how can I ask for directions? Another challenge is when there is already some code in place that was not written with tests in mind. The code is written like a black box, giving out no secrets, taking no prisoners or arguments. That's why tests should be written first.

Still, I convince myself that it's quicker to do manual tests by refreshing the browser or repeating the commands in the terminal. And by quicker I mean slower because automated tests are much faster and less error prone. Do I want to spend my time writing log statements and stepping through breakpoints? No, this sucks, but the alternative is that I'll have to set up [Jest][1], [Mocha][2] or [Cypress][3]. Setting up tests is a one off toll to get on the highway.

Eventually, I find my way. Either the path becomes clear and I know what I'm aiming for or I'm tired of repeating the same actions over and over - code, run, check, code, run, check. And I commit to writing the first test. Code, check, repeat.

[1]: https://jestjs.io
[2]: https://mochajs.org/
[3]: https://www.cypress.io
