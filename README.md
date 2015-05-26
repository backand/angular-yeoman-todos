# Todo Project
A simple website demonstrating CRUD with Backand, built using [yeoman](http://yeoman.io/) for Angular

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)
* [Server side REST API](https://www.backand.com)

## Getting Started
1. Create new App in Backand with the following model:
 
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

2. Run the following commands

  ```bash
  git clone https://github.com/backand/angular-yeoman-todos.git
  cd angular-yeoman-todos

  npm install
  bower install
  grunt serve
  ```

3. Navigate to [localhost:9000](http://localhost:9000).

4. Hooray! Now you can interact with API running on Backand! How simple was that??

## Testing

Running `grunt test` will run the unit tests with karma.

### Running your own API server

If you would like to run your own api, then sign-up to [Backand](https://wwww.backand.com) and create new app
