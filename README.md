# Programming Documents DB

### Framework and Plugin			
				Mongoose
				Express
				AngularJS
				NodeJS
				Jwt

### RESTful API
				(* means it has been protected by token)
##### Documents
                GET    /api/doc/id/:id     	- find specific document
                GET    /api/doc/c/:category?- find all documents by category
               *POST   /api/doc             - create document
               *PUT    /api/doc             - update document
               *DELETE /api/doc/id/:id		- delete document
##### Quizs
                GET    /api/que/id/:id     	- find specific question
                GET    /api/que/c/:category - find all questions by category
               *POST   /api/que             - create question
               *PUT    /api/que             - update question
               *DELETE /api/que/id/:id		- delete question
##### Category
                GET	   /api/cat             - find all technical categories
                GET	   /api/cat/:group		- find all categories by group (doc, que...)
               *POST   /api/cat             - create technical category
               *PUT    /api/cat             - update technical category
               *DELETE /api/cat             - delete a technical category
##### Search				
				GET	   /api/s/q/:keyword?	- find all questions by keyword and need
				GET	   /api/s/d/:keyword?	- find all documents by keyword and need
##### User
				GET    /api/user     		- find all user
                GET    /api/user/:id      	- find specific user
                POST   /api/login    		- user login
               *POST   /api/user     		- user register
                PUT    /api/user     		- update user
                DELETE /api/user     		- delete user
##### Log
               *GET    /api/log?ip/?date 	- find logs may by conditions
               *Delete /api/log 		    - delete all logs 
##### Counter
				GET    /api/count/doc 		- count # of documents
				GET    /api/count/que 	    - count # of questions
                GET	   /api/count/doc/:category
                							- count the numbers of doc by category
                GET	   /api/count/que/:category
                							- count the numbers of que by
                							category
                GET    /api/count/que/all/:answer
                							- count the number of que by 
                							answer
##### Settings
			   *GET    /api/settings 		- get settings
			   *GET    /api/settings/dbbu 	- DB backup signal
			   *PUT    /api/settings 		- update settings
			   *DELETE /api/settings 		- delete settings
##### User Request
			   *GET    /api/req 			- get all user requests
				POST   /api/req 			- create user request
			   *DELETE /api/req/:id 		- delete user request by id

### DB Model
##### Settings
				version: String, required
				admin: String, required
				web_title: String, required
				db_backup: String 
				created: Date, required
##### User
				email: String, unique, required
				name: String, required
				role: String, required
				created: Date, required
				password: crypto, passport
##### Document
				title: String, unique, required
				description: String
				usage: String
				related: Array[title, group, _id]
				notes: String
				category: String, required
				group: String, required
				author: String
				created: Datem required
##### Question
				title: String, unique, required
				answer: String
				author: String
				group: String, required
				related: Array
				category: String, required
				created: Date, required
##### Cateogry
				main: String, required
				sub: Array[name]
				weight: Number
				group: String, required
##### Logger
				ip: String, required
				target: String, required
				created: Date, required
##### UserRequest
				contents: String
				name: String
				link: String
				created: Date, required

### Front End Routing
				(* means protected)
				/				- index page
				/login			- admin login page
				/nav/doc		- documents navigation page
				/doc/:mainCategory/:subCategory
								- documents	by category
				/doc?id 		- specific document
				/nav/que		- quiz naviagation page
				/que/:mainCategory/:subCategory
								- questions	by category or specific one
				/que?id 		- specific question
			   */admin/overviews- admin overviews page
			   */admin/access	- logger for monitoring visitor
			   */admin/users	- user lists
			   */admin/settings - admin settings page
			   */admin/mg 		- module management page

### Functions in some pages
				/ 				- search bar, update and delete
				/nav/doc 		- (nav) Doc Category CRUD
				/doc/:m/:s 		- (doc) CRUD
				/doc?id=		- specific doc
				/nav/que 		- (nav) Que Category CRUD
				/doc?id=		- specific que
				/que/:m/:s 		- (que) CRUD
				/admin/access	- logger check and delete 
				/admin/overviews- # of doc,que
				/admin/users	- user delete
				/admin/settings - backup DB,

### Modules
##### Document Lists
		Need from parent:	prismHighlight
		Functions:
				if(docId): get specific doc, or show all.
				doDeepCopy: when click update button, make backupCopy.
				updateDocList:  update current page.
				resetUpdateDoc: reset current doc to backup.
				updateDoc: update
				deleteDoc: delete
##### Related Lists
		start:	scope.selRelateds = model.related;
		Need from parent:	None
		Functions:
				removeCurSelRelated: remove selected related from list.
				addThisRelated: add selected tag to list.
				getRelatedByKeyword: search related by keyword
##### Category selector
		start:	showCategories(model.group); categorySetter(model.category);
		Need from parent:	None
		

### Difficulties
##### Category and Counts showing design
				Front End (Main Category)
					- Angular 12	(Sub Category) (Counts)
					- jQuery 10		(Sub Category) (Counts)
				Category model will include main field and sub field
				(Array). When page loaded each Sub Category, then call
				the server to return responding Counts.
##### Two ways to make update
				1. After doing ng-repeat, modified the data based on the 
				original data. There is no new variable declare. But 
				using this way, it will be a little bit complicated to 
				cancel the update, we need to backup original data by using angular.copy before clicking update button.
				2. declare a new variable, use ng-init.

### Future Features
				1. Self-Test module
				2. Hot update
				3. Actice Code
				4. Model Generator

### Bugs
##### ng-repeat scope
				The scope of a directive which inside ng-repeat is isolated scope. Even {scope: false};
				<ng-repeat>
					<directive></directive>
				</ng-repeat>
##### update ng-model
				Need to go over all the property of ng-model to make
				update change.
				updateQ = question will not works. But below works:
				Object.keys(updateQ).forEach(function(property){
	          		updateQ[property] = question[property];
	          	});	