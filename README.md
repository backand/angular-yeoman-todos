# Todo Project With User Roles

This demo application shows you how to implement [Backand](www.backand.com) user roles in a basic ToDo application written in AngularJS. This demonstrates the security features that Backand's API has to offer, and allows you to see how actions by a user are restricted based upon their assigned role.

The Todo project has the following user roles enabled:
* An *Admin* role, with which the user can perform all available CRUD actions on all items
* A *User* role, which allows the user to read all items, but to only Create, Update, or Delete items that have been created by the user.
* A *ReadOnly* role, which restricts the user to only reading items in the application.

Furthermore, there are two ways to access the application:
* Users with the *Admin* or *User* roles must sign in with their username and password
* Users that browse the app without signing in are assigned the *ReadOnly* role (In the code, those users are referred to as *anonymous users*).

## Prerequisites
To run this project, you will need:
* [Git](http://git-scm.com/), for source control
* [NodeJS and NPM](https://gist.github.com/isaacs/579814), to serve as a webserver
* [Backand's Server side REST API](https://www.backand.com), to control the back-end of the application.

## Getting Started
To get the application running, perform the following steps:


1. Create a new application in Backand.
2. After creation, paste the following JSON into the "Custom Model" text box on the "New Hosted Database" tab:

  ```json
[
  {
    "name": "users",
    "fields": [
      {
        "name": "email",
        "type": "ShortText"
      },
      {
        "name": "name",
        "type": "ShortText"
      },
      {
        "name": "role",
        "type": "ShortText"
      }
    ]  
  },
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
      },
      {
        "name": "createdBy",
        "type": "SingleSelect",
        "relatedTable": "users"
      }
    ]
  }
]
  ```
3. Press the "Create" button to create your database.
4. Open a console on your machine, and navigate to (or create) a directory to hold the source code.
5. Run the following commands from the console:

  ```bash
  git clone https://github.com/backand/angular-yeoman-todos.git
  cd angular-yeoman-todos

  npm install
  bower install
  grunt serve
  ```

6. Navigate to [localhost:9000](http://localhost:9000) to see the basic app in action!
  
### Configuring the Application
1. Log in to [Backand](www.backand.com)
2. Open the application that you created in the previous section
3. Configure your appliction by performing the following steps:   
  4. Configure the security settings 
    1. Open the  **Security & Auth** tab
    1. Go to the *Security & Auth --> Configuration* page
    1. **Enable Anonymous Access**:
      Upon completion, this will allow users to access your application without logging in, and will assign these users a *ReadOnly* role.
      1. In the first secction of the page, entitled *Anonymous Access* click the switch on the right. It should turn green to indicate that anonymous access is enabled.
      1. In the drop-down that appeared beneath *Anonymous Access*, select *ReadOnly*.
    1. **Set the New Users Role** by selecting *User* from the dropdown beneath the *Public App* heading. This will set the role that new users are given when they sign up for - or are created in - your application. By setting this to *User*, all new users will be created with the *User* role already assigned.
    1. (optional) Click on the switch on the right side of the panel to make your application Public. When enabled, this allows any user that can register with your application to do so. When disabled, all new users must be invited by a user with the *Admin* role. This switch between *Public* and *Private* modes does not require a code change - it happens behind the scenes.
    3. In the section labeled **Custom Registration Page URL**, set the value of the textbox to `http://localhost:9000/#/login`. This sets the login page for your application to the instance of your application running locally. When users are invited by an *Admin*, they will get an invitation email with this link included. **NOTE**: You will need to change this URL when you publish your app  
      4. **Custom Verified Email Page URL**  
      Set this field also to *http://localhost:9000/#/login*  
      In this app the same page is used both for sign in and sign up.
      After users register they receive a verification email to verifiy their identity by clicking on a link on the email, 
      After they click on the link they are redirected to the url above.
      You will need to change this local url to a real url after you publish your app  
      5. **Security Actions**  
      Backand is an ORM system which means that every object has a compatible database table.
      In the following actions we are going to use action of "Transactional sql script" type which means that you can execute sql statements directly in the database. 
      In order to manage security, Backand has an internal users table. We recommend that you will add your own users table and sync it with Backand users. In this *Todos* example we added the users object for that purpose.
      The actions on the *Security & Auth* page are triggered by any CRUD operation on the internal Backand users.
    Backand prepared 3 predefined actions for you that you can customize in order to sync Backand users with your app users.
      1. **Create My App User**  
      On the *Security & Auth* page go to the *Actions* section and click on *Create My App User*
      and then on the *Edit Action* button.
      This action is triggered right after a Backand user is created, but not yet committed, which means that if the action *Create My App User* will fail to execute the entire transaction will rollback including the Backand user creation.
      Change the following script:

        ```sql
        insert into `<your app users table here>` (`email`,`name`,`role`...) values ('{{Username}}','{{FirstName}}','{{Role}}'...) 
        ```  
      to  
      
        ```sql
        insert into `users` (`email`,`name`,`role`) values ('{{Username}}','{{FirstName}}','{{Role}}') 
        ```  
      Change the *Where Condition* from *false* to *true* and *Save* the action
      2. **Update My App User**  
      The exact same goes to the *Update My App User* action,
      change:  
        ```sql
        update `<your app users table here>` set `name` = '{{FirstName}}', `role` = '{{durados_User_Role}}' where `email` = '{{Username}}'  
        ```  
      to  
      
        ```sql
        update `users` set `name` = '{{FirstName}}',  `role` = '{{durados_User_Role}}' where `email` = '{{Username}}'
        ```  
        Change the *Where Condition* from *false* to *true* and *Save* the action.
      3. **Delete My App User**  
      The exact same also goes the *Delete My App User* action, 
      change:  
      
        ```sql
        delete `<your app users table here>` where `email` = '{{Username}}'
        ```  
      to  
      
        ```sql
        delete `users` where `email` = '{{Username}}'
        ```  
        Change the *Where Condition* from *false* to *true* and *Save* the action.
    6. **Anonymous Token**  
    For an anonymous user to connect with backand you need the *Anonymous Token*
    Copy the *Anonymous Token* from the *Security & Auth* page and replace it in the app.js following code:
    
      ```javascript
      BackandProvider.setAnonymousToken('c3b61359-6843-440b-8a39-1d54f5b907be');
      ```
    7. **Signup Token**  
    You need the sign up token for the sign up as well
    Copy the *Signup Token* from the *Security & Auth* page and replace it in the app.js following code:  
    
      ```javascript
      BackandProvider.setSignUpToken('035F6716-4E87-46FB-A8C9-2C5212A37E80');
      ```
  2. **Manual Sync for My User**  
  If you go to *Security & Auth --> Team*, you will find your email as the only team member in the team.
  That is because when you create a Backand app you automatically assigned when an *Admin* role as a team member.
  That happened before you created the sync actions, so you need to manually sync yourself.
  Backand has a tool for that.
  Go to *Objects --> users* click on the last tab *REST API*
  Click on *POST /objects/{name}*
  Paste the following json inside the object text area and replace <your email> and <your name> with the values from the single row in the *team member*:

    ```json
    {
      "email": "<your email>",
      "name": "<your name>",
      "role": "Admin"
    }
    ```
  and click on Try it Out!
  this will manually sync your Backand user with your app's users
  That is the only time you will need to perform a manual sync,
  Later when you will invite additional team members and users, they will automatically synced into your app's users
  3. Invite Users
  Now you may invite users into your app, to do that go to *Security & Auth --> Users* and enter an email in the *invite user(s)* input box. please use a valid email that you can receive the emails that Backand will send. Click on *Invite User(s)* button. A new user with a *User* role will be added to the users list. You will get an invitation email for this user email address. On the email, click on the invitation link, this will navigate to the sign in/sign up page to complete the sign in process.
Check the new user checkbox and enter the sign up detail. When you will sign in with this user you should only be able to update or delete the items that this user created. But this won't happen until you finish the next steps.
  4. Set Current User Validation
  If you sign in as with a *User* role and with an *Admin* role, you can see that both roles can do CRUD for all the todo items. 
  To ensure that users with *Admin* role can perform CRUD for all items, users with *User* role can perform CRUD just for their own items and users with *ReadOnly* role can only read items, you need to write some server side javascript.  
  Go to *Objects --> todo* and click on the *Actions* tab, click on the *New Action* button, on the *Select Trigger...*, select *Create - during data saving before it is committed*. Leave the *Input Parameters* empty and in the *Type* select *Server side javascript code*. A text area for javascript code will show. Please paste the following code inside the function body:

  ```javascript
    // if the current user has an *Admin* role then he is allowed to create a todo for another user
    if (userProfile.role == "Admin")
	    return {};
    var createdByFromInput = userInput.createdBy;
    // do not allow anonymous users to create a todo
    if (!createdByFromInput)
        throw new Error('The creator of the todo is unknown.');
    var currentUsername = userProfile.username;
    if (!currentUsername)
        throw new Error('The current user is unknown.');
    
    // get the current user information from the app users table by filter with the email
    var currentUser = null;
    try{
        currentUser = $http({method:"GET",url:CONSTS.apiUrl + '/1/objects/users?filter=[{ fieldName: "email", operator: "equals", value: "' + encodeURIComponent(currentUsername) + '" }]', headers: {"Authorization":userProfile.token, "AppName": userProfile.app}});
    }
    catch (err){
        throw new Error('Failed to get the current user. ' + err.message);
    }
    // get the current user id
    var currentUserId = null;
    if (currentUser && currentUser.data && currentUser.data.length == 1){
        currentUserId = currentUser.data[0].Id;
    }
    else {
         throw new Error('Could not find the current user in the app.');
    }
    // do not allow non *Admin* users to create a todo for other users 
    if (createdByFromInput !=  currentUserId)
        throw new Error('Please create todo only for yourself.');
	  return {};
  ```  
  In the *name your action* input box enter *Validate current user on create* and save the action.  
  a very similar verification is needed in the update of a *todo* item. The differece is that we also need to validate that users with *User* role do not change the creator of the todo. 
  click on the *New Action* button, on the *Select Trigger...*, select *Update - during data saving before it is committed*. Leave the *Input Parameters* empty and in the *Type* select *Server side javascript code*. A text area for javascript code will show.
  In the javascript text area, please enter the following code:
  ```javascript
    // if the current user has an *Admin* role then he is allowed to update a todo for other users
    if (userProfile.role == "Admin")
	    return {};
    var createdByFromInput = userInput.createdBy;
    // do not allow anonymous users to create a todo
    if (!createdByFromInput)
        throw new Error('The creator of the todo is unknown.');
    var createdByFromRow = dbRow.createdBy;
    if (!createdByFromRow)
        throw new Error('The creator of the todo is unknown.');
    var currentUsername = userProfile.username;
    if (!currentUsername)
        throw new Error('The current user is unknown.');
    
    // get the current user information from the app users table by filter with the email
    var currentUser = null;
    try{
        currentUser = $http({method:"GET",url:CONSTS.apiUrl + '/1/objects/users?filter=[{ fieldName: "email", operator: "equals", value: "' + encodeURIComponent(currentUsername) + '" }]', headers: {"Authorization":userProfile.token, "AppName": userProfile.app}});
    }
    catch (err){
        throw new Error('Failed to get the current user. ' + err.message);
    }
    var currentUserId = null;
    // get the current user id
    if (currentUser && currentUser.data && currentUser.data.length == 1){
        currentUserId = currentUser.data[0].Id;
    }
    else {
         throw new Error('Could not find the current user in the app.');
    }
    // do not allow non *Admin* users to update a todo for other users 
    if (createdByFromRow !=  createdByFromInput)
        throw new Error('You can can not change the creator of the todo.');
    // do not allow non *Admin* users to change the creator of the todo 
    if (createdByFromInput !=  currentUserId)
        throw new Error('You can only update your own todo.');
	return {};
  ```
  Name the action *Validate current user on update*.    
  In delete requests there is no user input, so you just need to verify that the item you about to delete was created by the current user.
  Click on the *New Action* button, on the *Select Trigger...*, select *Delete - during recored deleted before it is committed*. Leave the *Input Parameters* empty and in the *Type* select *Server side javascript code*. A text area for javascript code will show.
  In the javascript text area, please enter the following code:
  
  ```javascript
    // if the current user has an *Admin* role then he is allowed to delete a todo that was created by other users
    if (userProfile.role == "Admin")
	    return {};
    var createdByFromRow = dbRow.createdBy;
    if (!createdByFromRow)
        throw new Error('The creator of the todo is unknown.');
    var currentUsername = userProfile.username;
    if (!currentUsername)
        throw new Error('The current user is unknown.');
    
    var currentUser = null;
    // get the current user information from the app users table by filter with the email
    try{
        currentUser = $http({method:"GET",url:CONSTS.apiUrl + '/1/objects/users?filter=[{ fieldName: "email", operator: "equals", value: "' + encodeURIComponent(currentUsername) + '" }]', headers: {"Authorization":userProfile.token, "AppName": userProfile.app}});
    }
    catch (err){
        throw new Error('Failed to get the current user. ' + err.message);
    }
    var currentUserId = null;
    if (currentUser && currentUser.data && currentUser.data.length == 1){
        currentUserId = currentUser.data[0].Id;
    }
    else {
         throw new Error('Could not find the current user in the app.');
    }
    // do not allow non *Admin* users to delete a todo created by other users 
    if (createdByFromRow !=  currentUserId)
        throw new Error('You can only delete your own todo.');
    return {};
  ```
  Name the action *Validate current user on delete*. 
  
  This is it, your app is ready. You can test it by sign in with a User role and see that you can only delete and update the todo items you created while *Admin* can still do everything.
## Testing

As a part of the installation process, NPM installed Karma for unit testing. Run `grunt test` to execute all of the unit tests in the syste,.

### Building your own application

Now that you've implemented a Todo application, you can build your own. Simply sign-up at [Backand's website](https://wwww.backand.com) and create a new app to get started!

