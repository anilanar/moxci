<h1 align="center"><img src="https://github.com/moxci.png" width="36px"/> Moxci</h1>

![CircleCI](https://circleci.com/gh/anilanar/moxci.svg?style=shield)
[![npm version](https://badge.fury.io/js/%40anilanar%2Fmoxci.svg)](https://badge.fury.io/js/%40anilanar%2Fmoxci.svg)

This repository is a fork of [moxci](https://github.com/moxci/moxci). Unlike the original, this one uses status checks instead of posting PR comments.

**Moxci** is a tool that will send [Github commit status](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-status-checks).
It will add a success status. The URL linked to the status is the link to the artifact.

It can be used to send a link of the latest [storybook](https://storybook.js.org/) as a status update..

# :package: Installation

```
yarn add -D @anilanar/moxci
```

# :book: Example

In order to user moxci, you will need to set up a [CircleCI](https://circleci.com/sunset1-0/) project.

In your **Project Settings** -> **Environment Variables**, enter your Circle CI API Token as `CIRCLE_TOKEN`, and Github API Token as `GITHUB_TOKEN`

<img src="https://user-images.githubusercontent.com/6936373/54509831-3f700380-498e-11e9-9180-2b49343aa2ae.png" width="80%">

In your `config.yml` for CircleCI, add commands to specify the path that contains the artifact you'd like to notify.

```yaml
- store_artifacts:
    path: path_to_artifacts
- run:
    name: Send artifact URL to Github
    command: yarn moxci path_to_artifacts/index.html
```
