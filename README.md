# Todo Project With Users Roles
Based on the Todo project with an addition of users roles:
* Users with Admin role can do all the CRUD actions for all the items
* Users with User role can do Create, Update and Delete for the items they created and can read all the items
* Users with ReadOnly role can only read all the items.

Users with Admin or User role must sign in with their username and password,
Users that do not sign in with a username and password, get a ReadOnly role.
In the code, those users are referred to as anonymous users

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
      "name": "items",
      "fields": [
        {
          "name": "name",
          "type": "ShortText"
        },
        {
          "name": "description",
          "type": "LongText"
        }
      ]
    }
  ]
  ```

## App Configuration
2. In the app that you just created, please perform the following configuration 
  1.Security & Auth 
  Go to the Security & Auth --> Configuration page
    1. **Enable Anonymous Access**   
    In the Anonymous Access (first section on the page) swith to enable.
    In the select options chose ReadOnly.
    This means that users can access without username and password and they will be assigned with a ReadOnly role
    2. **New Users Role**   
    In the Public App section (second section in the page), in the select options chose User.
    This means that when new users are created they are assigned with a User role.
    By switching the Public App on and off you can decide if only users that were invited by the Admin can sign up to the app     or that everyone can sign up. This switch between Public and Private does not require any change in your code.
    3. **Custom Registration Page URL**  
    Set this field to http://localhost:9000/#/login
    When users are invited by Admin they will get an invitation email with a link to the registration page of the app.
    You will need to change this to the local url to a real url after you publish your app  
    4. **Custom Verified Email Page URL**  
    Set this field also to http://localhost:9000/#/login
    In this app the same page is used both for sign in and sign up.
    After users register they recieve a verfication email to verfiy their identity by clicking on a link on the email, 
    After they click on the link they are redirect to the url above.
    You will need to change this to the local url to a real url after you publish your app  
    5. **Security Actions**  
    Backand is an ORM system which means that every object has a compatible database table.
    In the following actions we are going to use action of "Transactional sql script" type which means that you can execute sql statements directly in the database. 
    In order to manage security, Backand has an internal users table. We recommend that you will add your own users table and sync it with Backand users.
    The actions on the Security & Auth page are triggered by any CRUD operation on the internal Backand users.
    Backand prepared 3 predefind actions for you that you can customize in order to sync Backand users with your app users.
      1. Create My App User
      On the Security & Auth page go to Actions --> Create --> and click on Create My App User
      and then on the Edit Action button.
      This action is triggered tight after a Backand user is created, but not yet committed, which means that if the action that you created will fail to execute the entire transaction will rollback.
      Change the following script: 
      '''sql
      insert into `<your table name>` (`email`,`name`,`role`, ....) values ('{{Username}}','{{FirstName}}','{{durados_User_Role}}',....) 
      '''
      to
      '''sql
      insert into `users` (`email`,`name`,`role`) values ('{{Username}}','{{FirstName}}','{{durados_User_Role}}') 
      '''
      Change the Where Condition to true
      2. Update My App User
      The exact same goes to Actions --> Update --> and click on Update My App User
      and change:
      '''sql
      update `<your table name>` set `name` = '{{FirstName}}',  `role` = '{{durados_User_Role}}'.... where `email` = '{{Username}}'
      '''
      to
      '''sql
      update `users` set `name` = '{{FirstName}}',  `role` = '{{durados_User_Role}}' where `email` = '{{Username}}'
      '''
      3. Delete My App User
      The exact same goes to Actions --> Delete --> and click on Delete My App User
      and change:
      '''sql
      delete `<your table name>` where `email` = '{{Username}}'
      '''
      to
      '''sql
      delete `users` where `email` = '{{Username}}'
      '''
    6. Anonymous Token
    To an anonymous user to connect with backand you need the anonymous token
    Copy the Anonymous Token from the Security & Auth page and replace it in the app.js following code:
    '''javascript
    BackandProvider.setAnonymousToken('c3b61359-6843-440b-8a39-1d54f5b907be');
    '''
    7. Signup Token
    You need the sign up token for the sign up as well
    Copy the Signup Token from the Security & Auth page and replace it in the app.js following code:
    '''javascript
    BackandProvider.setSignUpToken('035F6716-4E87-46FB-A8C9-2C5212A37E80');
    '''
  2. Manual Sync
  If you go to Security & Auth --> Team, you will find your email as the only team member in the team.
  That is because when you create a Backand app you automatically assigned when an Admin role as a team member.
  That happened before you created the sync actions, so you need to manually sync yourself.
  Backand has a tool for that.
  Go to Objects --> users click on the last tab REST API
  Click on POST /objects/{name}
  Paste the following json inside the object text area:
  '''json
  {
  "email": "<your email>",
  "name": "<your name>",
  "role": "Admin"
  }
  '''
  and click on Try it Out!
  this will manually sync your Backand user with your app's users
  That is the only time you will need to perform a manual sync,
  Later when you will invite additional team members and users, they will automatically synced into your app's users
  3. Invite Users
  4.
3. Run the following commands

  ```bash
  git clone https://github.com/backand/angular-yeoman-todos.git
  cd angular-yeoman-todos

  npm install
  bower install
  grunt serve
  ```

4. Navigate to [localhost:9000](http://localhost:9000).


## Testing

Running `grunt test` will run the unit tests with karma.

### Running your own API server

If you would like to run your own api, then sign-up to [Backand](https://wwww.backand.com) and create new app

