# revealer

![](https://img.shields.io/badge/standardjs-%E2%9C%93-brightgreen.svg)

the fastest (and easiest!) way to build reveal.js presentations _without any boilerplate_.

## usage

to create and serve a new, hot-reloading presentation:

- `npx revealer --start`

:tada:!  that's it.  your presentation is now in `src/index.html`.  next consider adding some helpful npm scripts:

```json
{
  "scripts": {
    "start": "revealer --start",
    "build": "revealer --build [dest-dir]"
  }
}
```

let me use `revealer` programmatically you say.  no problem.  <big>**official API docs live [here](https://cdaringe.github.io/revealer/)**</big>

## why

starting a reveal.js project should be as simple as `npm install reveal.js`, authoring some content, and hitting the go-button.  unfortunately, there's more to it.

reveal.js is amazing.  however, when it's time to actually build a presentation, your choices to quickly scaffold a presentation are both less-than-ideal.  your two primary options to start building a presentation are either:

1. clone and hack the reveal.js source, or
1. use the npm package

let's discuss these strategies, then discuss `revealer`'s solution to the cons on both sides.

### the ol' clone-n-hack

**option #1**.  the reveal.js source code comes with a great set of rails.  it's packed with valuable css, plugins, and tooling to get your developing your presentation quickly (e.g. file server & live reload).  however, cloning a repo then modifying it isn't really a great way to use a _library_.  instead of consuming it as a library, you end up using it as a standalone application.  what are this strategy's weaknesses?

1. what happens when you need upstream updates? merge conflicts are almost guaranteed, at some point.
1. how does your presentation repository structure look? it looks like the reveal.js source code, not simply your precious presentation content.  this yields some degree of complication & misdirection.

many reveal.js projects choose this path.

### consume the npm package

**option #2**. `npm install reveal.js` _is a thing_.  you can install it as a dependency.  however, when done so, you no longer have rails.  the helpful reveal.js assets are still nested inside of `node_modules/reveal.js/...`, but you don't have a runable solution ready to go.  that is to say, the ease of developing a presentation suddenly becomes much more difficult.  you need to manually construct your page, your assets, and development workflow, vs. using those which reveal.js already provides for you. these bells and whistles don't need to be redesigned--reveal.js' workflow is just fine!  some projects, like [reveal-boilerplate](https://github.com/Retozi/reveal-boilerplate), do _rewire_ up a set of assets into a full presentation, BUT, is it worth reimplementing all of the reveal.js tooling again in your own project?  probably not!

### give me the best of both worlds, please!

here's what we want:
  - quick setup time for a reveal.js project
  - to use reveal.js as a dependency, and permit rolling version updates
  - to keep our project source looking like _just_ our source, not the reveal.js source
  - to maintain ease of use, keeping the reveal.js rails intact.  that is, make  plugins/css/tooling that ship with reveal.js accessible

**revealer achieves these goals**. specifically, it:

  - installs `reveal.js`'s dev dependencies within the reveal.js dependency
  - watches your `src` dir, and copies them into the `reveal.js` package src
  - runs `reveal.js`'s server-watcher-browser-launcher tooling.
  - onbuild, `revealer --build`, automatically merges your content with reveal.js' and outputs a runnable, static website!
        For this to work, you need to have ``grunt-cli`` installed relative to the base directory (``npm install --save-dev grunt-cli``)


**you're left with a simple, beautiful folder structure**.  no cruft.  just your package.json and your presentation content!

```
$ tree -L 1
.
├── node_modules
├── package.json
└── src
```
