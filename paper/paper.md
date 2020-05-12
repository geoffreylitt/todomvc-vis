---
title: "Abstract Program Visualization for Model-View-Update User Interfaces"
author: "[Geoffrey Litt](https://www.geoffreylitt.com/)"
bibliography: references.bib
link-citations: true
csl: acm-sigchi-proceedings.csl
reference-section-title: References
figPrefix:
  - "Figure"
  - "Figures"
secPrefix:
  - "Section"
  - "Sections"
abstract: |
  This is the abstract
---

# Introduction

Lots of recent program vis work is low level. Tied directly to the source code, visualizing state at individual lines, individual variables. Makes sense for novices: small programs, need help understanding small details.

OTOH: many tasks require higher level of understanding system behavior. Eg, initial explanation of a codebase. How do we make a "whiteboard drawing" live? Some challenges:

* relevant state isn't necessarily individual variable values: need to select certain relevant attributes to visualize. Corollary:  can't be as automated as low level visualization.
* Too much work on "targeted debugging", not enough on generalized understanding of a system. More specifically: if we don't know what change you might want to make to a codebase, how can we maximally equip you to be ready to make an arbitrary change?
  * Naur Programming as theory building
*   combines both static + dynamic aspects: code modules, abstracted state
*   Lots of non-numeric data

Abstract visualization is an interesting direction. Can be super-specific, eg algorithm animation [@brown1984; @stasko1990] or class and thread vis of [@reiss2003; @reiss2005].

But a major challenge is making it easy enough for programmer to actually make it worth it [@reiss2007]

This is an initial exploration. Some solution characteristics:

* redux apps [@czaplicki; @fowler2020]: 1) broader than Vega, narrower than general programs, 2) imposes a worldview of abstract state and simplified event stream. THIS IS THE HEART OF THE WORK
  * In this work: focus on TodoMVC specifically, but in theory should generalize to Redux programs. (Future work: how to efficiently generate a visualization like this one)
* "Guided tour": introducing you to how the application works.


# Related Work {#sec:related-work}

* low level program vis
  * Learnable [@victora]
  * omnicode [@kang2017]
  * Projection boxes [@lerner2020]
  * Theia [@pollock2019]
  * Theseus [@lieber2014]
* Whyline, targeted interrogation [@ko2004]
* In-situ: nice taxonomy of visualizations (but still limited to Vega, narrow domain) [@hoffswell2018a]
* Myers taxonomy [@myers1990]
* Redux / Elm
  * redux dev tools Tree viewer
* http://cs.brown.edu/~spr/research/bloom/jvlexec.pdf
* Steve Reiss overview
* Brad Myers incense
* Girba's Mondrian: a toolkit for programmers building vis [@meyer2006]

## Methods

Only some initial experiments.

Redux dev tools monitor
D3 + react

Show the mockups
Developed 3-4 sparkline style visualizations

* line graph
* Categorical graph
* Collection dots view?
* String change view?

## Results

* get feedback from 1-2 people?
* Tried using it myself

## Discussion



## Future work

* guided tour
* screenshots?
* learnability
* dynamic queries
