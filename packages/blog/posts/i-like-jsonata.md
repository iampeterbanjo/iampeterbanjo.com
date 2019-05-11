---
tags: post
title: I like JSONata and so can you
description: Transforming JSON data is simple and painless with this new tool from IBM Open projects
date: 2019-01-24
---

JSON (JavaScript Object Notation) is a popular way to send and receive objects as strings. The syntax is terse and yet flexible enough to describe a lot of common objects - even deeply nested ones. That's nice, but what happens when you want to transform JSON from one shape to another? How about if you wanted to add comments to describe the transformation?

For example, I invite you to take a look at this JSON object describing the order history of a user.

```json
{
	"Account": {
		"Order": [
			{
				"OrderID": "order103",
				"Product": [
					{
						"Product Name": "Bowler Hat",
						"ProductID": "858383",
						"SKU": "0406654608",
						"Price": "34.45",
						"Quantity": "2"
					},
					{
						"Product Name": "Trilby hat",
						"ProductID": "858236",
						"SKU": "0406634348",
						"Price": "21.67",
						"Quantity": "1"
					}
				]
			},
			{
				"OrderID": "order104",
				"Product": [
					{
						"Product Name": "Bowler Hat",
						"ProductID": "858383",
						"SKU": "040657863",
						"Description": {
							"Colour": "Purple",
							"Width": "300",
							"Height": "200",
							"Depth": "210",
							"Weight": "0.75"
						},
						"Price": "34.45",
						"Quantity": "4"
					},
					{
						"ProductID": "345664",
						"SKU": "0406654603",
						"Product Name": "Cloak",
						"Price": "107.99",
						"Quantity": "1"
					}
				]
			}
		]
	}
}
```

We could calculate the sum for every order by mapping over each item in the `Order` array. That would work but JSONata let's us do the same thing more simply.

```js/1
/* Sum all orders in account history */
$sum(Account.Order[0].Product.Price);
```

This example is taken from the [JSONata exerciser](http://try.jsonata.org/) where you can try it out. What I love the most is the declarative way the transformations are described, errors are handled gracefully and it's even possible to write [functions](http://docs.jsonata.org/programming).
