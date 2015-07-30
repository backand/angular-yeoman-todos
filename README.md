# Todo Project With User Roles

This demo application shows you how to implement [Backand](https://www.backand.com) user roles in a basic ToDo application written in AngularJS. This demonstrates the security features that Backand's API has to offer, and allows you to see how actions by a user are restricted based upon their assigned role.

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


1. Create a new application in [Backand](https://www.backand.com/apps).
2. After creation, paste the following JSON into the "Custom Model" text box on the "New Hosted Database" tab. This JSON represents two objects that will be created in your database: the tasks list, named 'todo', and the users list. The two objects are related via the 'created_By' field in the 'todo' object and the collection 'todo' in the object 'users'.

  ```json
[
  {
    "name": "todo",
    "fields": {
      "created_By": {
        "object": "users"
      },
      "description": {
        "type": "string"
      },
      "completed": {
        "type": "boolean"
      }
    }
  },
  {
    "name": "users",
    "fields": {
      "todo": {
        "collection": "todo",
        "via": "created_By"
      },
      "email": {
        "type": "string"
      },
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      }
    }
  }
]
  ```
3. Press the "Next" button and wait for the database to be created (around 15 seconds).
4. Open a console on your machine, and navigate to (or create) a directory to hold the source code.
5. Run the following commands from the console, to clone the repository and install dependencies:

  ```bash
  git clone https://github.com/backand/angular-yeoman-todos.git --branch todo-with-users --single-branch
  cd angular-yeoman-todos

  npm install
  bower install
  ```

6. Run the app:

  ```bash
  grunt serve
  ```
7. Navigate to [localhost:9000](http://localhost:9000) to see the basic app in action!
8. You can sign in to the app using you Back& credentials and the name you chose for the app. (The app name should later be configured in app/config/consts.js.) Then you will be able to add, edit and remove tasks.
  
### Configuring the Application
Open your application in [Backand](https://www.backand.com/apps).

#### Configure Security Settings
 Go to the *Security & Auth --> Configuration* page

##### Configure Security Settings - User settings
1. **Enable Anonymous Access**:
  Upon completion, this will allow users to access your application without logging in, and will assign these users a *ReadOnly* role.
  1. In the first section of the page, entitled *Anonymous Access*, click the switch on the right. It should turn green to indicate that anonymous access is enabled.
  2. In the drop-down that appeared beneath *Anonymous Access*, select *ReadOnly*.
  3. Copy the Anonymous Token and paste it in app/config/consts.js as the value of 'anonymousToken'.
  4. Refresh the browser window presenting your app and click on 'Sign Out'. You will be able to see the todo list by clicking on the 'view the todo list as a guest (read only)' link in the sign in page. You will not be able to add or modify tasks.

2. **Enable Sign Up and Set the New Users Role** 
	1. Select *User* from the dropdown beneath the *Public App* heading. This will set the role that new users are given when they sign up for - or are created in - your application. By setting this to *User*, all new users will be created with the *User* role already assigned. 
	2. Copy the API Sign-up Token and paste it in app/config/consts.js as the value of signUpToken.
3. **Enable Public Sign Up** (optional)
	Click on the switch on the right side of the panel to make your application Public. When enabled, this allows any user to register with your application. When disabled, all new users must be invited by a user with the *Admin* role (via the Security & Auth -> Registered Users section). This switch between *Public* and *Private* modes does not require a code change - it happens behind the scenes.
4. **Configure Authentication URLs** (optional)
	Set the URLs for **Custom Registration Page**,  **Custom Verified Email Page** and **Custom Reset Password Page**. 
	**NOTE: ** You will need to change the URLs when the app is published to a webserver instead of being run locally. 
	1. Set **Custom Registration Page URL** to `http://localhost:9000/#/login`. This is the link that will be sent by email to users when invited by an *Admin*.
	2. Set **Custom Verified Email Page URL** to `http://localhost:9000/`. When **Sign-up Email Verification** is switched on, after a user registers they receive a verification email that includes a link to verify their identity. Once this is completed, they are redirected to the URL entered here.
	3. Set **Custom Reset Password Page** to `http://localhost:9000/#/changePassword`. This is the link that will be sent by email to users who forgot their password. (This page is also used for signed-in users to change their password.)

At this stage, the app is ready for users to sign up, using email and password or via a social provider (Google, Github or Facebook). New users should select the ‘New User checkbox’ before signing in. Registered users can add tasks and modify them.

##### Managing Signed-Up Users
Back& provides an internal *Users* object for your app users. You can see the users table in **Secturity & Auth --> Registered Users**. However, it is highly recommended to create a separate 'users' object to hold custom information, as we did in the database model JSON.  Backand provides three predefined actions that synchronize the internal *Users* object with your custom one. You can customize these actions according to your needs. These actions are defined in the bottom of the **Configuration** page: **Create**, **Update** and **Delete My App User**. Some additional actions are predefined here, for instance, **requestResetPassword** sends email to users who forgot their password.
**NOTE:** If you give a different name for your 'users' object, or have different fields you wish to synchronize, you should modify these actions accordingly. 
**NOTE:** You can configure your own actions to perform on the *Users* object in the **configuration** page, or on any of the app database object, by selecting the object's name under **Objects** and clicking on the **Actions** tab. The actions can be triggered by database actions (hooks) or on demand, by calling the action's *Request Url* (presented when you test the action). Actions can send emails, execute transactional SQL scripts, and execute server-side JavaScript Code.

## Invite Users to the application

Once you have completed the above, you are ready to begin inviting users to your application! To invite new users:

1. Navigate to *Security & Auth --> Users* 
2. Enter an email in the *invite user(s)* input box. Please use a valid email address that is able to receive messages sent by Backand. 
3. Click on *Invite User(s)* button. A new user will be added to the users list, and assigned the *User*. This will also trigger an invitation email that is sent to the entered email address.
4. Open the email message.
5. Click on the invitation link. This will navigate to the sign in/sign up page you set in the configuration page, to complete the sign in process.
6. Check the new user checkbox and enter the sign up details. 

## Set Current User Validation
At this point, when new users sign in they will have full access to the application, and will be able to create, update and delete all the tasks. In order to restrict the users to update only tasks they created we will configure a few actions on the 'todo' object.

### Modifying the Create Action for Todo Objects
1. Go to *Objects --> todo* 
2. Click on the *Actions* tab
3. Click on the *New Action* button
4. Name the action *Validate current user on create*
5. In the *Event Trigger...* dropdown, select *Create - during data saving before it is committed*
6. Leave the *Input Parameters* empty
7. In the *Type* dropdown, select *Server side JavaScript code*. A text area containing a JavaScript function will be displayed. 
8. Paste the following code into the body of the provided function:

  ```javascript
    // if the current user has an *Admin* role then she is allowed to create a todo for another user
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
9. Save the action.  

### Modifying the Update Action for Todo Objects

A similar modification needs to be made for when a *todo* item is updated. The only differece here is that we also need to validate that users with *User* role cannot change the creator of the *todo* item. To make the modifications for the Update action, perform the following steps: 

1. Click on the *New Action* button
2. Name the action *Validate current user on update*.    
3. In the *Select Trigger...* dropdown, select *Update - during data saving before it is committed*
4. Leave the *Input Parameters* empty
5. In the *Type* dropdown, select *Server side javascript code*. A text area containing a JavaScript function will be displayed.
6. Enter the following code as the body of the provided JavaScript function:
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
7. Save the action.
### Modifying the Create Action for Todo Objects
There is no user input for delete requests, so you only need to verify that the item you about to delete was created by the current user.  To make the modifications for the Update action, perform the following steps: 

1. Click on the *New Action* button
2. Name the action *Validate current user on delete*. 
3. In the *Select Trigger...* dropdown, select *Delete - during recored deleted before it is committed*.
4. Leave the *Input Parameters* empty 
5. In the *Type* dropdown, select *Server side javascript code*.  A text area containing a JavaScript function will be displayed.
6. Enter the following code as the body of the provided JavaScript function:
  
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
  7. Save the action

## Finished!
At this point, your application is ready to use! You can test the security roles by signing in with a User role and see that you can only delete and update the todo items you create. If you then log out and log back in as a user with the *Admin* role, you will see that you can now perform all CRUD actions on every object in the database! You can also add a new user and see that they are assigned the *User* role by default, and not able to update records that are not their own.

## Testing

As a part of the installation process, NPM installed Karma for unit testing. Run `grunt test` to execute all of the unit tests in the system.

## Building your own application

Now that you've implemented a Todo application, you can build your own. Simply sign-up at [Backand's website](https://wwww.backand.com) and create a new app to get started!

