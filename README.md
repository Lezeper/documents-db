# Programming Documents DB

### Framework and Plugin			
				Mongoose
				Express
				AngularJS
				NodeJS
				Jwt

### RESTful API
				GET    /api/doc/c			- find all document categories
                GET    /api/doc/id/:id     	- find specific document
                GET    /api/doc/c/:category?- find all documents by category
                POST   /api/doc             - create document
                PUT    /api/doc             - update document
                DELETE /api/doc/id/:id		- delete document

                GET    /api/que/c			- find all question categories
                GET    /api/que/id/:id     	- find specific question
                GET    /api/que/c/:category - find all questions by category
                POST   /api/que             - create question
                PUT    /api/que             - update question
                DELETE /api/que/id/:id		- delete question

                GET	   /api/cat             - find all technical categories
                GET	   /api/cat/:group		- find all categories by group (doc, que...)
                POST   /api/cat             - create technical category
                PUT    /api/cat             - update technical category
                DELETE /api/cat             - delete a technical category
				
				GET	   /api/s/q/:keyword?	- find all questions by keyword and need
				GET	   /api/s/d/:keyword?	- find all documents by keyword and need

				GET    /api/user     		- find all user
                GET    /api/:id      		- find specific user
                POST   /api/login    		- user login
                POST   /api/user     		- user register
                PUT    /api/user     		- update user
                DELETE /api/user     		- delete user

                GET	   /api/count/doc/:category
                							- count the numbers of doc by category
                GET	   /api/count/que/:category
                							- count the numbers of que by
                							category

### DB Model
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

### Front End Routing
				/				- index page
				/login			- admin login page
				/nav/doc		- documents navigation page
				/doc/:mainCategory/:subCategory
								- documents	by category
				/doc?id 		- specific document
				/nav/que		- quiz naviagation page
				/que/:mainCategory/:subCategory?id
								- questions	by category or specific one
				/que?id 		- specific question
				/admin			- admin home page

### Functions in each page
				/ 				- search, update
				/doc 			- (nav) CRUD
				/doc/:m/:s 		- (doc) CRUD
				/admin			- 

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