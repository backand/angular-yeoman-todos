# Todo Project
A simple website demonstrating CRUD with Backand, built using [yeoman](http://yeoman.io/) for Angular

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
    "fields": [
      {
        "name": "description",
        "type": "ShortText"
      },
      {
        "name": "completed",
        "type": "Boolean"
      }
    ]
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

5. Hooray! Now you can interact with API running on Backand! How simple was that??

## Testing

Running `grunt test` will run the unit tests with karma.

### Running your own API server

If you would like to run your own api, then sign-up to [Backand](https://wwww.backand.com) and create new app
