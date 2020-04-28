# 6.894 FP: UI Execution Visualization

A final project repo for 6.894 Interactive Data Visualization at MIT

By Geoffrey Litt, glitt@mit.edu

[⏯ Live demo link (early prototype)](https://github.mit.edu/pages/6894-sp20/FP-Program-Execution-Visualization/)

[📹 Video demo (early prototype)](https://www.loom.com/share/164ad22b95554784bf06919781ec3fe5)

## Problem statement

Often, the best way to understand a program is to see the data inside as it runs.
This is particularly true for interactive systems, where you can
play with a UI and get a sense for what happens as you provide different inputs.

Many research projects have explored ideas in this area—
both to help novices learn to program,
and to help proficient programmers understand and debug their code.

[Learnable Programming](http://worrydream.com/LearnableProgramming/) by Bret Victor, which identified runtime data visualization as a key component of making programs understandable, and inspired much of the subsequent work in this area:

![](sketches/learnable2.png)

[Theseus](https://dl-acm-org.libproxy.mit.edu/doi/10.1145/2556288.2557409), by Tom Lieber, Joel Brandt, and Rob Miller, which proposed an "always-on debugger" for Javascript web UIs:

![](sketches/theseus.jpg)

[Python Tutor](http://www.pythontutor.com/), by Philip Guo, which visualizes the memory state of Python programs (and other languages):

![](sketches/python-tutor.png)

[Augmenting Code with In Situ Visualizations to Aid Program Understanding](https://dl-acm-org.libproxy.mit.edu/doi/10.1145/3173574.3174106), by Jane Hoffswell, Arvind Satyanarayan, and Jeffrey Heer, which proposed a taxonomy/design space for visualizing program state inline with source code:

![](sketches/in-situ.png)

Despite the progress made by these projects, there are important research questions in this space which haven't been fully addressed yet, which I aim to explore in this project:

## How can runtime visualization help with navigating execution traces?

A critical question for runtime program visualization is:
what are the best concrete, specific use cases?

I've recently been using the "time-travel debugging" functionality
in [Redux Devtools](https://github.com/reduxjs/redux-devtools),
which lets you scrub back in time to previous states of the application.
This is a tremendously useful feature.
However, the views of state provided by the tool are primitive,
mostly amounting to a rich viewer for raw JSON data. It's easy to drill
into the state at any individual point in time, or to see state diffs
at each point in time,
but it's hard to get a general sense of how the state evolved over time.

When using this tool myself to navigate large execution traces,
I often struggle to find the right previous state
that I want to navigate to. I find myself scrubbing back and forth
in time, blindly searching. See the [video demo](https://www.loom.com/share/164ad22b95554784bf06919781ec3fe5)
for a brief example of this.

My plan for this project is to build on the existing Redux Devtools
infrastructure and add data visualizations to help better answer
the questions that I've found myself asking:

* how did the system's state change over time?
* What's an overview/summary of the system's state at this one point in time? Does anything in that state violate my expectations?
* where is the prior state that I want to navigate back to, to investigate this particular bug?

These ideas aren't limited to Redux either, they apply to
any system for navigating recorded execution traces.

One exciting future deployment path is in [WebReplay](https://webreplay.io/), an
emerging technology spinning out of the Firefox team
for record-and-replay debugging in the web browser.
For example, they offer the ability to retroactively add/edit `console.log` statements
in Javascript code and have those statements execute on previously recorded
execution traces. Currently their views for navigating execution traces
are limited, so some of the same challenges apply as in Redux Dev Tools.
I've been discussing with the team working on that project the possibility
of implementing some of my visualization ideas in their debugger environment.

### How can we visualize generic user interfaces?

Some other systems like Python Tutor aim to visualize programs of any kind. This forces them to focus on low-level details like individual variables and lines of code, which makes them more useful for beginner programmers understanding how Python works than for an experienced programmer trying to understand a large Python program. By focusing on UIs as a specific category of program, I hope to provide useful constraints leading to more useful visualizations.

On the other hand, Hoffswell et al focus specifically on people writing data visualization programs in Vega; this allows them to make very strong assumptions and create a higher-level view of the system's behavior, but limits the applicability of the tool to a single domain. By focusing on more general UIs, I hope to create visualizations with broader applications.

My target domain is any interactive web application built with the popular [Redux](https://redux.js.org/) pattern (also known as the [Elm Architecture](https://guide.elm-lang.org/architecture/). This pattern imposes some useful constraints on how UI logic is organized, while also remaining general enough to support a vast variety of UIs, ranging from video games to business apps. It also provides some pragmatic implementation constraints that prove convenient for implementing visualizations.

### How can we visualize abstract conceptual state, not low-level state?

Many runtime visualizations are fairly low-level, focusing on
individual lines of source code or variable values. See the Python tutor
example above for one concrete example. This is especially true when
the visualization is linked to the source code. If the code
doesn't fit on one screen, the data can't be runtime-visualized on one screen.
Hoffswell et al achieve a higher level of abstraction by working with
the declarative Vega language, but by tying their visualization to
source code, they still limit how far they can zoom out.

Unfortunately, most complex UIs have logic spread across many files,
making the inline source code view impractical for visualizing
overall system behavior.

In this work I aim to capture a higher-level view of a system's behavior.
Rather than visualize specific small local snippets of data,
I want to visualize derived quantities that capture the essence of
the behavior.

Brad Myers' [taxonomy of program visualization](https://www.cs.cmu.edu/~bam/papers/vltax2.pdf)
gives name to these different styles of visualization. **Dynamic data visualization**
automatically provides low-level views of existing state of the program, whereas
**dynamic algorithm visualization** allows the programmer to add additional
information about how to display the program's behavior.

This begs the question: how should we specify this higher-level view? Which details are important, and which ones can be omitted?

The Redux architecture offers one convenient mechanism for starting to answer
this question. It encourages the entire core UI state to be captured in a centralized object, and all UI actions to go through a single dispatcher. Redux apps are usually
split up across many files, but this centralized state and stream of actions
provides a useful focus for visualizing the core essence of the system,
as defined by the programmer, and eliminating unnecessary details.

As one example of this: in TodoMVC-Redux, when a user is typing in a new todo,
a Redux action is only triggered when they hit enter; the process of building
up the todo character by character is considered local state and is managed
privately by the text input component. This means that adding a todo
is registered as a single atomic action in the system's history.

So, Redux is convenient, because it already requires the programmer
to make some choices around what state is essential. But this
probably isn't fully sufficient for explaining the essence of the
program's behavior—some details excluded by the main app state are worth
visualizing; conversely, some parts of the main app state need to be
further aggregated and condensed for easier comprehension. I think
the programmer should be able to dynamically specify ad hoc expressions to visualize,
and I'm curious to explore how useful this is in practice.

In some sense, I think of this as "live literate programming"—
like literate programming, the programmer is encoding additional context
into the code artifact. But instead of writing prose,
they're creating dynamic visualizations of the program behavior
that are useful for understanding. If the visualizations are easy enough
to specify, maybe this can be as easy as writing code comments
and documentation is today—not zero work, but reasonably plausible.

### How can we visualize complex objects and non-numeric values?

Many runtime visualization projects focus on example programs which have
relatively simple state, with many primitive numerical values that are
a natural fit for data visualization.

However, many real-world programs don't fit this profile. Many UIs contain:

* highly nested data structures: many collections and key-value objects
* many non-numeric values: strings, booleans, enums/symbols

Visualizing these structures remains an open challenge for runtime
visualization. I aim to use the fundamental data visualization principles
we've learned in this class to explore new techniques for effectively
visualizing these types of data in the context of real UIs.

Often, precision isn't particularly important in these visualizations—
the user is looking for general patterns, not to make precise
comparisons between quantities. This might provide hints for
appropriate visual encodings to consider, eg using color heavily.

My initial test program is the TodoMVC UI benchmark app. It's not particularly
complex, but it at least has some nested data structures and lots
of non-numeric data, and represents many of the typical characteristics of
generic web UIs. Time permitting, I hope to test out my visualization
system with other more complex applications.

## Mockups

Below is a mockup illustrating some initial ideas:

* Show the current state of the application in a JSON tree view
* Next to tree nodes, show small sparkline-style visualizations that show the state of that node back in time
* For collection nodes, provide different (customizable?) summarization options. Hoffswell et al's taxonomy provides more ideas for visualizing numeric
collections, but we need ways to visualize collections of nested objects
and non-numeric values.
* Allow linked brushing across all the mini visualizations, to enable the user to connect data at the same point in time across different graphs

![](sketches/mockup.png)

Enum values with small numbers of possible values (eg, the todo filter state)
could be represtented with this kind of visualization showing
changes over time:

![](sketches/enum.png)

Sometimes, values like strings are hard to aggregate, but they also change
rarely, creating the opportunity to show the entire string value
along with showing when it changed:

![](sketches/string.png)

One idea for summarizing a small collection is to show dots representing members,
each with a stable color over time. This gives a sense of collection length,
but also could help illustrate sort order, insertion/deletion over time, etc.

![](sketches/collection.png)

## Open questions

What existing work is there on visualizing nested tree data, strings, booleans, etc?

One theme I want to explore in this work is going beyond targeted debugging
("something's wrong and I want to fix it") to general system understanding
(onboarding a new engineer, showing them how the system fits together).
Would be curious for any feedback on how to make this system more conducive
to serving as a form of documentation. There's some prior work
on this from the lens of computing education, eg [BALSA](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.117.8787&rep=rep1&type=pdf)

# Prototype Implementation

I've started some early code prototyping of these ideas. See the links at the top of this repo for a live demo link and video demo.

![](sketches/prototype.png)

This repo currently packages two pre-existing components:

* The Redux implementation of TodoMVC, copied from [here](https://github.com/reduxjs/redux/tree/master/examples/todomvc)
* The [Redux DevTools](https://github.com/reduxjs/redux-devtools) system for managing Redux state

On top of that, I've built a panel exploring new ideas for visualizing Redux state. It usees React to manage most of the UI, and D3 + svg for the sparkline visualizations.


## Development

To run locally:

```
npm run start
```

To deploy to Github pages:

```
npm run deploy
```
