# Todo Project
A simple website demonstrating CRUD with Backand, built using [Yeoman](http://yeoman.io/) for Angular

## Example
We've provided a quick summary of the changes necessary to get this app working at [codepen](http://codepen.io/backand/pen/OyKxOB).

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)
* [Server side REST API](https://www.backand.com)

## Getting Started
To get the application running, perform the following steps:

1. Create a new application in Backand.
2. After creation, paste the following JSON into the "Custom Model" text box on the "New Hosted Database" tab:

```json
[
  {
    "name": "todo",
    "fields": {
      "description": {
        "type": "string"
      },
      "completed": {
        "type": "boolean"
      }
    }
  }
]
```
3. Run the following commands from the console:

  ```bash
  git clone https://github.com/backand/angular-yeoman-todos.git
  cd angular-yeoman-todos

  npm install
  bower install
  grunt serve
  ```

4. Navigate to [localhost:9000](http://localhost:9000).

Now you can interact with your Backand-powered API! New items will be automatically populated in the Backand database behind your application, and instantly available for usage. How simple was that?

## Testing

Running `grunt test` will run the unit tests, which were built using Karma.

### Running your own API server

This app uses a default Backand account. If you'd like to start with your own, private API, create your account at [Backand](https://wwww.backand.com), then create a new app. You'll need to update the code to specify your Backand app name - look for lines that reference `Backand.setAppName()` - this is used by backand.js to connect your app to your API on Backand's servers.
