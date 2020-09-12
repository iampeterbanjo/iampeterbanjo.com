---
tags: elixir
title: Elixir methods
description: Arity, types and all
date: 2019-10-29
---

The best programming book I've read was [Atomic Scala by Bruce Eckel and Dianne Marsh][atomic-scala-book]. It was so good that when I went for a job interview I chose to use Scala for the technical test because I was so in love with the language and its programming concepts. Well, that was premature and I bombed the interview but I'm still fond of the book and Scala. As I learn [Elixir][elixir-lang], what I'm coming across in the literature doesn't fill me with the same excitement. I've read about Elixir structs, maps, lists and pattern matching too many times. I want to get to a working knowledge of the language and at this point I don't really care if strings are UTF-8, how large a float is or the Erlang representation behind them. When I'm on holidy in Spain what I care about is how to say "Good morning, table for two please" not ["Spanish is a Romance language that originated in the Iberian Peninsula and today has over 450 million native speakers in Spain and the Americas. It is a global language and the world's second-most spoken native language, after Mandarin Chinese"][spanish-language].

Ok, so this is an ode to Atomic scala. I will adapt the form of that book, with my own flavour of course, and apply it to Elixir and let's see what happens.

## Methods aka. Function aka. Do something

A method groups programming logic that can be executed by name or anonymously. Simple functions are used to build more complex logic structures. You don't need a `return` statement.

### Terms

- Arity - the number of parameters to a method e.g `List.first/1` means one parameter required for the function named `first` in the `List` module.
- Typedef - i.e. `@spec` - explicit type information used to find errors. [Learn more][see-dialyxer]
- Pattern matching - the method signature is determined by the type of arguments
- Guard - conditional that is checked before executing a function. [Learn more][see-fn-guards]
- Default value - i.e. `argument \\ value`

### Explanation

Named functions exist in modules and have the structure:

```elixir
defmodule Module_name do
 # note the comma before 'do'
  def function_name (arg1), do
  ...
 end

 @spec function_name(type()) :: return_type()
 def function_name (arg1, arg2) when arg1 > 0 do
  ...
 end
end
```

Private functions start with `defp` instead of `def`.

Anonymous functions have two structures with `fn` and `&`. E.g.

```elixir
function_name = fn (arg1, arg2) -> ... end
capture_function = &(&1 ... &2)
```

A header function is a function with the same name as a named function and no body used to set the default value for the named function's argument(s). E.g.

```elixir
defmodule Module_name do
  def function_name(arg1 \\ default_value)
 def function_name(arg1), do
    ...
  end
end
```

### Examples

```elixir
@spec multiply(number()) :: number()
defmodule Calculator do
  def multiply(arg1, arg2) when arg1 > 0 do
    arg1 * arg2
  end
end

Calculator.multiply(0, 2) # -> (FunctionClauseError) no function clause matching in Calculator.named_multiply/2
Calculator.multiply(2, 3) # -> 6

anon_multiply = fn (arg1, arg2) -> arg1 * arg2 end
capture_multiply = &(&1 * &2)

anon_multiply.(2, 4) # -> 8
capture_multiply.(5, 4) # -> 20

defmodule Greeter do
  def hello(name \\ "world")
  def hello(names) when is_list(names) do
    names
    |> Enum.join(", ")
    |> hello
  end

  def hello(name) when is_binary(name) do
    phrase() <> name
  end

  def phrase, do: "Hello, "
end

Greeter.hello() # -> "Hello, world"
Greeter.hello("Mark") # -> "Hello, Mark"
Greeter.hello(["Mark", "Luke"]) # -> "Hello, Mark, Luke"
```

[atomic-scala-book]: https://gumroad.com/discover?query=Atomic%20scala#aoQY
[elixir-lang]: https://elixir-lang.org/
[spanish-language]: https://en.wikipedia.org/wiki/Spanish_language
[see-dialyxer]: https://elixirschool.com/en/lessons/specifics/debugging/
[see-fn-guards]: https://elixirschool.com/en/lessons/basics/functions/#guards
