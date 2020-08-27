# Assignment 

## How will you go about in building this chat application
* [ ]  Dependencies Installation
  * [ ]  Create Express Server and Socket.io connection to make it Real Time .
  * [ ]  Create Middlewares 
  * [ ]  Create Error Handlers 
  * [ ]  Create Routes 
    * [ ] GET Routes to get messages , contacts , Tasks and its Status ,Settings , Profile Info.
    * [ ] POST Routes to Create Authentication ,Add Task , Send Message .
    * [ ] PUT Routes to Edit TASKS , Profile Info's .
    * [ ] DELETE ROUTES to delete TASKS , Delete Accounts
 
 * [ ] Database Setup 
    * [ ] Define Schema for user Tasks and Chat . 
    * [ ] DataBase connection 
    * [ ] Design Queries to make insertion deletion and updation in the selected database . 
  
  
## Can you define the schema for the same
  * Refer to the Schema.js File 
  * Schema Format ,
    * Users Schema
    * Groups 
      * User_owner_id -> user 
      * group_id
    * Group Admins
      * group_id 
      * user_id -> user
    * Group Members 
      * group_id -> group
      * user_id -> user
    * Group Invites 
      * group_id -> group
      * invite String
    * Tasks
      * group_id
			* starting date
			* time Alloted
			* Assigned to 
			* Assigned By
			* Description
    * Messages
      * From_id 
      * To_id 
      * Date 


## Adding caching to make it super fast (explain about this) 
  * Using Memory-Cache for caching ( In - Memory )
      Install memory Cache .
      
      ``` npm i memory-cache ```

      Import the Module and Create and configure the middleware .
      
      ``` 
      const cache = require('memory-cache'); 
      
      /*A sample Code to implement the memory-cache Module*/
      let memCache = new cache.Cache();
      let cacheMiddleware = (duration) => {
          return (req, res, next) => {
              let key =  '__express__' + req.originalUrl || req.url
              let cacheContent = memCache.get(key);
              if(cacheContent){
                  res.send( cacheContent );
                  return
              }else{
                  res.sendResponse = res.send
                  res.send = (body) => {
                      memCache.put(key,body,duration*1000);
                      res.sendResponse(body)
                  }
                  next()
              }
          }
      }
      ```
      * The duration representing how long the values need to stored in the cache
      * A unique key based on the request url is generated and a check is made to see if there is already content stored for that key .
      * If the Key exist data is sent back as the response without having to make the <b>extra query to our database</b> .
      * If the cache has NO content then it will processed as a usual get request and result will be stored in cache before the respose is sent .
        
        ``` 
          app.get('/getReq' , cacheMiddleware(30) ,(req,res)=>{
            res.send('Default Data ');
          });
          
        ``` 
 
  * Using Redis for caching
    
    ``` npm i redis ```
    
    We Need to have a radis Server Running , after making sure the server is installed and running properly import and configure the module .
    
    ```
      const redis  = require('redis');
      const client = require('client');
      
      let redisMiddleware = (req, res, next) => {
      let key = "__expIress__" + req.originalUrl || req.url;
      client.get(key, function(err, reply){
        if(reply){
            res.send(reply);
        }else{
            res.sendResponse = res.send;
            res.send = (body) => {
                client.set(key, JSON.stringify(body));
                res.sendResponse(body);
            }
            next();
          }
        });
      };

    ```
    
## Push Notifications.

  This particular task will be done by following way
  
  * Setup a task runner to listen to particular Events .
  * We need to Socket support or socket handler .
  * Check Whether a particular event happened or not and using the socket Send the response 
  * We can Show the response in appropriate window in the client Side

    
      

  
    
