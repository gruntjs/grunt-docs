If your plugin is not already Grunt 0.4 compatible, would you please consider updating it? For an overview of what's changed, please see our [migration guide](https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4).

If you'd like to develop against the final version of Grunt before Monday, please specify `"grunt": "0.4.0rc8"` as a devDependency in your project. After Monday's release, you'll be able to use `"grunt": "~0.4.0"` to actually publish your plugin. If you depend on any plugins from the grunt-contrib series, please see our [list of release candidates](https://github.com/gruntjs/grunt/wiki/Plugin-Release-Candidate-Versions) for compatible versions. All of these will be updated to final status when Grunt 0.4 is published.

Also, in an effort to reduce duplication of effort and fragmentation in the developer community, could you review the [grunt-contrib](https://github.com/gruntjs) series of plugins to see if any of your functionality overlaps significantly with them? Grunt-contrib is community maintained with 40+ contributors—we'd love to discuss any additions you'd like to make.

Finally, we're working on a new task format that doesn't depend on Grunt: it's called [node-task](https://github.com/tkellen/node-task). Once this is complete, there will be one more conversion, and then we'll never ask you to upgrade your plugins to support our changes again. Until that happens, thanks for bearing with us!

If you have any questions about how to proceed, please respond here, or join us in `#grunt on irc.freenode.net`.

Thanks, we really appreciate your work!
