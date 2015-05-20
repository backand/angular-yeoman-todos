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

#### Configure Security Settings

Perform the following steps to set the security settings for your application

1. Click on the **Security & Auth** header
1. Go to the *Security & Auth --> Configuration* page

##### Configure Security Settings - User settings
1. **Enable Anonymous Access**:
  Upon completion, this will allow users to access your application without logging in, and will assign these users a *ReadOnly* role.
  1. In the first secction of the page, entitled *Anonymous Access*, click the switch on the right. It should turn green to indicate that anonymous access is enabled.
  1. In the drop-down that appeared beneath *Anonymous Access*, select *ReadOnly*.
1. **Set the New Users Role** by selecting *User* from the dropdown beneath the *Public App* heading. This will set the role that new users are given when they sign up for - or are created in - your application. By setting this to *User*, all new users will be created with the *User* role already assigned.
1. (optional) Click on the switch on the right side of the panel to make your application Public. When enabled, this allows any user that can register with your application to do so. When disabled, all new users must be invited by a user with the *Admin* role. This switch between *Public* and *Private* modes does not require a code change - it happens behind the scenes.
3. In the section labeled **Custom Registration Page URL**, set the value of the textbox to `http://localhost:9000/#/login`. This sets the login page for your application to the instance of your application running locally. When users are invited by an *Admin*, they will get an invitation email with this link included. **NOTE**: You will need to change this URL when the app is published to a webserver instead of being run locally.
4. In the section labeled **Custom Verified Email Page URL**, also set the value of the text box to `http://localhost:9000/#/login`. This application uses the same page for both registration and log in. After a user registers, they receive a verification email that includes a link to verify their identity. Once this is completed, they are redirected to the URL entered here. **NOTE**: You will also need to change this URL when the app is published onto a webserver, instead of being run locally

##### Configure Security Settings - **Security Actions**

Backand is an ORM system, which means that every object in the systel has a correlated database table. Backand provides you with the ability to create SQL scripts that execute in the context of each ORM action's transaction. These are called "Transactional sql script" actions. In addition to the pre-built object tables, Backand also provides an internal *Users* table that tracks users of your application. Each of the actions listed on the *Security & Auth* page is triggered by a CRUD operation performed against this internal table, meaning that you can use the provided action hooks here to update your application's database whenever a new user is added to Backand's internal *User* table for your application.

While you can get by using just Backand's internal *Users* table, We highly recommend that you create your own *Users* table and sync it with the internal Backand user record. Luckily we have already created this object - when we provided the JSON above to create the application's database, we included a description of a *User* object. In order to facilitate syncing with your custom-defined *User* table, Backand has provided 3 predefined actions that you can customize, allowing you to perform the synchronization effortlessly. Each of the three actions, and their intention, are described below.

1. **Create My App User**
  This action is triggered right after a Backand user is created, but with new record not yet committed to the database. This means that if the *Create My App User* action  fails, the entire transaction will roll back - including the Backand user creation!

  To enable this action, perform the following steps:
  1. On the *Security & Auth* page go to the *Actions* section and click on *Create My App User*
  1. Click on the *Edit Action* button.
  1. Change the following script:

        ```sql
        insert into `<your app users table here>` (`email`,`name`,`role`...) values ('{{Username}}','{{FirstName}}','{{Role}}'...) 
        ```  
      to  
      
        ```sql
        insert into `users` (`email`,`name`,`role`) values ('{{Username}}','{{FirstName}}','{{Role}}') 
        ```  
  1. Change the *Where Condition* from *false* to *true* and *Save* the action
      
2. **Update My App User**  
  This action is triggered right after a Backand user is updated, but with the new changes not yet committed to the database. This means that if the *Update My App User* action  fails, the entire transaction will roll back - including the Backand user update!

  To enable this action, we perform the exact same steps as above:
  1. Click on *Update My App User*
  1. Click on the *Edit Action* button.
  1. Change:
        ```sql
        update `<your app users table here>` set `name` = '{{FirstName}}', `role` = '{{durados_User_Role}}' where `email` = '{{Username}}'  
        ```  
      to:
        ```sql
        update `users` set `name` = '{{FirstName}}',  `role` = '{{durados_User_Role}}' where `email` = '{{Username}}'
        ```  
  1. Change the *Where Condition* from *false* to *true* and *Save* the action.
3. **Delete My App User**
  This action is triggered right after a Backand user is deleted, but with the deletion not yet committed to the database. This means that if the *Delete My App User* action  fails, the entire transaction will roll back - including the deletion!
      
  To enable this action, we perform the exact same steps as above, again:
  1. Click on *Delete My App User*
  1. Click on the *Edit Action* button.
  1. Change:
        ```sql
        delete `<your app users table here>` where `email` = '{{Username}}'
        ```  
      to  
      
        ```sql
        delete `users` where `email` = '{{Username}}'
        ```  
  1. Change the *Where Condition* from *false* to *true* and *Save* the action.

##### Configure Security Settings - **Anonymous Token**

For an anonymous user to connect with backand you need the *Anonymous Token* provided on the *Security & Auth Configuration* page. 

To enable anonymous access in your application, first copy the *Anonymous Token* from the *Security & Auth* page. Once that is done, add it to app.js in your repository by modifying the following code to reflect your new anonymous token's value:

```javascript
	BackandProvider.setAnonymousToken('c3b61359-6843-440b-8a39-1d54f5b907be');
```

##### Configure Security Settings - **Signup Token**  

Much as you needed a token to enable anonymous access, you will also need a token for user registration.

To enable user registration ("sign up") in your application, first copy the *API Signup Token* from the *Security & Auth* page. Once that is done, add it to app.js in your repository by modifying the following code to reflecct your new sign up token's value:  

```javascript
	BackandProvider.setSignUpToken('035F6716-4E87-46FB-A8C9-2C5212A37E80');
```
      
### Configuring your application's code and access
#### Manually Syncing Your User

If you navigate to *Security & Auth --> Team*, you will find that your email is the only member in the team. This happens when you create the Backand application. Backand automatically assigns the creating user the *Admin* role as a team member. As this happened before the above synchronization actions were created, you need to manually sync your admin user into the application's custom *User* table. Luckily, Backand has a tool for that! To manually sync your user:

1. Navigate to *Objects --> users* 
2. Click on the tab *REST API*
3. Click on *POST /objects/{name}*
4. Paste the following json inside the object text area:
    ```json
    {
      "email": "<your email>",
      "name": "<your name>",
      "role": "Admin"
    }
    ```
5. Replace <your email> and <your name> in the JSON above with the values from the single row in the *team member*
6. Click *Try it Out*!
  
This will manually sync your Backand user with the rest of your app's users. **NOTE** - this should be the only time you need to perform a manual sync. When additional users and team members are invited or register, they will be automatically synced into your application's *User* table via the three custom actions we modified above.
  
## Invite Users to the application

Once you have completed the above, you are ready to begin inviting users to your application! To invite new users:

1. Navigate to *Security & Auth --> Users* 
2. Enter an email in the *invite user(s)* input box. Please use a valid email that is able to receive messages sent by Backand. 
3. Click on *Invite User(s)* button. A new user will be added to the users list, and assigned the *User*. This will also trigger an invitation email that is sent to the entered email address.
4. Open the email message.
5. Click on the invitation link. This will navigate to the sign in/sign up page to complete the sign in process.
6. Check the new user checkbox and enter the sign up detail. 

At this point, when this new user signs in they will have full read-only access to the application, but will only be able to update or delete objects that they personally created. However, in order to enable this behavior we have just a few more steps to follow!

## Set Current User Validation
If you sign in as a user with a *User* role, or with a user with the *Admin* role, you should see that both roles share the same set of permissions. In other words, both types of users have full access to the database! Below, we will modify the *User* role to restrict their database permissions to only allow modifications or deletions of objects that they have personally created, and will also ensure that the *ReadOnly* role can, indeed, only read objects. In order to do this, we need to write some server-side Javascript in the Backand dashboard. 

### Modifying the Create Action for Todo Objects
1. Go to *Objects --> todo* 
2. Click on the *Actions* tab
3. Click on the *New Action* button
4. In the *Event Trigger...* dropdown, select *Create - during data saving before it is committed*
5. Leave the *Input Parameters* empty
6. In the *Type* dropdown, select *Server side javascript code*. A text area containing a JavaScript function will be displayed. 
7. Paste the following code into the body of the provided function:

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
8. In the *name your action* input box enter *Validate current user on create*
9. Save the action.  

### Modifying the Update Action for Todo Objects

A similar modification needs to be made for when a *todo* item is updated. The only differece here is that we also need to validate that users with *User* role cannot change the creator of the *todo* item. To make the modifications for the Update action, perform the following steps: 

1. Click on the *New Action* button
2. In the *Select Trigger...* dropdown, select *Update - during data saving before it is committed*
3. Leave the *Input Parameters* empty
4. In the *Type* dropdown, select *Server side javascript code*. A text area containing a JavaScript function will be displayed.
5. Enter the following code as the body of the provided JavaScript function:
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
6. Name the action *Validate current user on update*.    


### Modifying the Create Action for Todo Objects
There is no user input for delete requests, so you only need to verify that the item you about to delete was created by the current user.  To make the modifications for the Update action, perform the following steps: 

1. Click on the *New Action* button
2. In the *Select Trigger...* dropdown, select *Delete - during recored deleted before it is committed*.
3. Leave the *Input Parameters* empty 
4. In the *Type* dropdown, select *Server side javascript code*.  A text area containing a JavaScript function will be displayed.
5. Enter the following code as the body of the provided JavaScript function:
  
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
6. Name the action *Validate current user on delete*. 

## Finished!
At this point, your application is ready to use! You can test the security roles by signing in with a User role and see that you can only delete and update the todo items you create. If you then log out and log back in as a user with the *Admin* role, you will see that you can now perform all CRUD actions on every object in the database! You can also add a new user and see that they are assigned the *User* role by default, and not able to update records that are not their own.

## Testing

As a part of the installation process, NPM installed Karma for unit testing. Run `grunt test` to execute all of the unit tests in the system.

## Building your own application

Now that you've implemented a Todo application, you can build your own. Simply sign-up at [Backand's website](https://wwww.backand.com) and create a new app to get started!

