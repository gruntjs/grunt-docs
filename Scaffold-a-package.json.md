## Screencast

<iframe src="//player.vimeo.com/video/78207685?portrait=0&amp;color=ff9933" width="738" height="415" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## What is a package.json?

Node modules use package.json files to store package information and dependencies.

## Why do we need it for Grunt?

Grunt uses the package.json to consume meta information about the current project in order to use that information in Grunt tasks. Another very useful function is the storing of development dependencies for the project. Having those dependencies stored in the package.json allow you to exclude the node_modules folder from version control because developers can install necessary node modules quickly by using the command `npm install`.

You don't need a package.json file in order to use Grunt but I would highly recommend it. Especially when you're working in teams.

Although when you create a grunt plugin the package json is mandatory since you will want to publish it to npm for others to use.

## So how do you create a package.json file?

There are a few ways to to do this.

The first option is when you use the scaffolding tool grunt-init, most of the templates will create a project-specific package.json file. This is actually also true for Yeoman. So when you use one of those scaffolding tools there is nothing else to do, you have your package.json.

The second option is the `npm init` command which is provided by npm and allows you to create a basic package.json file.

The third option is just to copy and paste a little snippet of code from gruntjs.com that can be used as a starting point

Since you have npm installed I will now show you how to use `npm init` to create your package.json file.

Open your terminal of choice, type in `npm init` and hit return.

![npm init](/img/guides/npm-init/npm-init-01.png)

As you can see npm gives you a nice explanation of what is going to happen. First it wants to know the package name. It has to be URL friendly in order to be valid. Next, npm wants to know the version number.

![npm init](/img/guides/npm-init/npm-init-02.png)

Usually you would choose something like 0.0.1 or 0.1.0 to start with.

You don't need a description for your Grunt project so we are going to skip that.

Same goes for the entry point and the test command.

![npm init](/img/guides/npm-init/npm-init-03.png)

Once you have Grunt installed you will be able to configure your tests as Grunt tasks and run them with the command grunt test.

On the next step we can insert the link to the git repo of the project if we have one.

If your project is a gruntplugin, or a bower component or an npm module you should enter relevant keywords for the keywords property it will be used in search after you published your project.

![npm init](/img/guides/npm-init/npm-init-04.png)

Now fill in your name and which license you are using and we're done.

![npm init](/img/guides/npm-init/npm-init-05.png)

npm then shows you a nice little summary that we confirm with yes.

![npm init](/img/guides/npm-init/npm-init-06.png)

Then open the package.json file in your favorite editor.

As you can see there is a bunch of stuff in there that we don't need. Throw out main, scripts and description and add the devDependencies property and we're done.

![npm init](/img/guides/npm-init/npm-init-07.png)

Now when you install gruntplugins use the `--save-dev` option to store the plugin as a development dependency. This way you can just commit your package.json to version control and then quickly install your dependencies with `npm install` on the command line.

![npm init](/img/guides/npm-init/npm-init-08.png)
