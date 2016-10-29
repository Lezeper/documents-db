# Programming Qustions DB

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
                GET	   /api/cat/:group/:category
                							- find all categories by MainCategory
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
				related: Array
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
				main: String, unique, required
				sub: Array[name]
				group: String, required

### Front End Routing
				/				- index page
				/login			- admin login page
				/doc			- documents navigation page
				/doc/:mainCategory/:subCategory?id
								- documents	by category

### Difficulties
##### Category and Counts showing design
				Front End (Main Category)
					- Angular 12	(Sub Category) (Counts)
					- jQuery 10		(Sub Category) (Counts)
				Category model will include main field and sub field(Array). When page loaded each Sub Category, then call the server to return responding Counts.

