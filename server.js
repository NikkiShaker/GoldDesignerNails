
/*
Post Structure:
{
  id: Number, //unique ID
  title: String, //short title of post
  text: String, //main text of the post
  creator: String, //the name of the creator (could reference a user resource)
  comments: Array, //all the comments, again, could reference comment resources
}
*/

/*
Supported operations in our API:
  GET /posts
  GET /posts/:postID
  GET /posts/:postID/title
  GET /posts/:postID/text
  GET /posts/:postID/creator
  GET /posts/:postID/comments

  POST /posts
  POST /posts/:postID/comments
*/

//Store products and comments as objects
//With keys being unique IDs for each
products = {};
//comments = {};
let nextProductID = 0;
//let nextCommentID = 0;

const nailProducts = require('./products.json');

const express = require('express');
const app = express();

posts = {};
let nextPostID = 0;

var path = require('path');
app.set('view engine', 'js');
//app.use(express.json()) 

// Adding nail products to post object
for(let x = 0; x < nailProducts.length; x++){
  nailProducts[x].rating = {};
  posts[x]=nailProducts[x];
  posts[x].numRatings = 0;
}

//Automatically parse JSON data
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Returns post object, for users to see.
app.get("/posts", function(req, res, next){
    //Could use res.format here to send either JSON or HTML back to client
    //console.log(req.url);
	res.status(200).json(posts);
})
/*
//Gets a list of products
//In this case, we send ALL posts, but could send a subset
app.get("/products", function(req, res, next){
    //Could use res.format here to send either JSON or HTML back to client
    res.status(200).json(products);
});*/

//For any request string containing :postID, find the matching post
app.param("postID", function(req, res, next){
  if(posts.hasOwnProperty(req.params.postID)){
    req.post = posts[req.params.postID];
    next();
  }else{
	  //res.status(200).sendFile(path.resolve('products.html'));
	  res.status(404).send("Unknown post ID");
  }
});

// Returns data of products
/*app.post("/productDisplay",function(req, res, next){
	
	console.log("req.body: " + req.searchVal);
	
	console.log("req.query: " + Object.values(req.query));
	
	console.log("req.query.search: " + req.query.searchVal);
	  
	res.status(200).json(nailProducts);
});*/


// Checks to see if two strings have words in common
function isRelated(string1, string2){
		
	if(typeof(string1) === "string" && typeof(string2) === "string")
	{
		let array1 = string1.split(" "); //.toLowerCase();
		let array2 = string2.split(" "); //toLowerCase();
		
		for (let x = 0; x < array1.length; x++)
		{
			if (string2.includes(array1[x])){
				return true;
			}
		}
		
		for (let x = 0; x < array2.length; x++)
		{
			if (string1.includes(array2[x])){
				return true;
			}
		}		
		
		return false;
	}
	
	else
	{
		return false;
	}
}

app.post("/productDisplay", function(req, res, next){
		
	let search = req.query.search.toLowerCase();
	//let search Array = search.split(" ");
		
	let specificSets = [];
	let index = 0
	
	// console.log("search: " + req.query);
	
	if (search.length > 0){
		
		for(let x = 0; x < nailProducts.length; x++){
			
			//console.log("nailProducts[x].size: " + nailProducts[x].size);
			
			let name = nailProducts[x].name.toLowerCase(); // name of product
			let length = nailProducts[x].size.join(" ").toLowerCase(); // size of product
			let shape = nailProducts[x].shape.toLowerCase(); // shape of product
			let colors = nailProducts[x].colors.join(" ").toLowerCase(); // color(s) and/or design(s) of product
			let price = (JSON.stringify((nailProducts[x].price)))[0]; // price of product
			
			if(isRelated(search, name)) //checks to see if user's input is similar to the name of the product
			{
				specificSets[index] = nailProducts[x];
				index++;
			}
			
			else if(isRelated(search, length)) //checks to see if user's input is similar to the length of the product
			{
				specificSets[index] = nailProducts[x];
				index++;
			}
			
			else if(isRelated(search, shape)) //checks to see if user's input is similar to the shape of the product
			{
				specificSets[index] = nailProducts[x];
				index++;
			}
			
			else if(isRelated(search, colors)) //checks to see if user's input is similar to the color(s) and/or design(s) of the product
			{
				specificSets[index] = nailProducts[x];
				index++;
			}
			
			else if(isRelated(search, price)) //checks to see if user's input is similar to the price of the product
			{
				specificSets[index] = nailProducts[x];
				index++;
			}
			
		}		
	}
	
	else {
		specificSets = nailProducts;
	}
	
	res.status(200).json(specificSets);
	
  
});

app.get("/products/:postID", function(req, res, next){
	// console.log("req line 87: " + req.params.postID);
	
	productID = Number(req.params.postID);

	var path = require('path');

	res.status(200).sendFile(path.resolve('public/prodDetails.html'));
  //res.status(200).sendFile('/public/prodDetails.html');

  //res.status(200).json(req.post);
});

//Find product user is searching for
app.post("/prodInfo", function(req, res, next){
		
	let id = Number(req.query.id);
	let returnProd;
	
	for(let x = 0; x < nailProducts.length; x++){
		
		if(id == nailProducts[x].id)
		{
			returnProd = nailProducts[x];
		}
	}
			
	// console.log("req.query.id: " + req.query.id)
	// console.log("type of prodID is a " + typeof(id));

  
  res.status(200).json(returnProd);
});

app.post("/getData", function (request, response) 
{
	let newData = request.body;
	
	//console.log("newData: " + JSON.stringify(newData));
	
	response.statusCode = 200;
	response.setHeader("Content-Type", "application/javascript");

	response.end("hey this works!");
			
});

//Find product user is searching for
app.post("/items", function(req, res, next){
	
	//console.log("req.body: " + JSON.stringify(req.body));
	
	console.log("req.query: " + Object.keys(req.query));
	
	console.log("req.query.inStock: " + req.query.inStock)
	console.log("req.query.name: " + req.query.name)

  
  res.status(200).json("Hey, this also works");
});
/*
app.get("/products/:productID", function(req, res, next){
  //console.log("req line 68: " + req.params.postID);
  
  console.log("req.params.postID " + req.params.postID);

  var path = require('path');

  res.status(200).sendFile("hi"); //path.join(__dirname + '/Product.html'));

  //res.status(200).json(req.post);
});
*/
//Get a particular piece of data about a partiular post
//:postID is the post's ID, :data is what data we are trying to get
app.get("/posts/:postID/:data", function(req, res, next){
	console.log("hellooooo");
  let data = req.params.data;
  let available = ["title", "text"]; //, "creator", "comments"];
  if(available.includes(data)){
    res.status(200).json({[data]: req.post[data]});
  }else{
    res.status(404).send("Unknown resource.");
  }
})

app.get("/",function(req, res, next){
	//console.log("addPost" + req.url);
	//res.status(200).sendFile(path.resolve('views/auth/success.html'));

	res.status(200).sendFile(path.resolve('products.html'));
})

app.get("/client.js", function (request, response) //reads the client.js file
{
	//reads client.js file and sends it back
	fs.readFile("client.js", function(err, data)
	{
		
		if(err)
		{
			response.writeHead(404);
			response.write("File not found!");
		}
		else
		{
			response.write(data);
		}
		
		response.end();
		
	});
});

//Create a product
//Two step process: verify the data, then add the post
app.post("/products", [verifyProduct, addProduct]);

//Express validator can be used for better validation
//Provides lots of nice validation rules
//https://express-validator.github.io/docs/
function verifyProduct(req, res, next){
  //Check the body exists
  if(!req.body){
    res.status(400).send("JSON body required containing title and text.");
  }

  //Check that each required property exists
  //Better validation would be advisable
  const requiredContents = ["title", "text"]; //, "creator"];
  for(let i = 0; i < requiredContents.length; i++){
    if(!req.body.hasOwnProperty(requiredContents[i])){
      res.status(400).send("JSON body required containing title, text, creator.");
      return;
    }
  }

  next();
}

function addProduct(req, res, next){
  let product = {
    id : nextProductID, //creator : req.body.creator,
    title : req.body.title,
    text : req.body.text //, comments : []
  };

  products[nextProductID] = product;
  nextProductID++;
  res.status(200).json(product);
}

//Add a comment to the post with ID=:postID
//app.post("/products/:productID/comments", verifyComment, addComment);
/*
function verifyComment(req, res, next){
  //Check the body exists
  if(!req.body){
    res.status(400).send("JSON body required containing commenter name and comment text.");
  }

  //Check that each required property exists
  //Better validation would be advisable
  const requiredContents = ["text", "creator"];
  for(let i = 0; i < requiredContents.length; i++){
    if(!req.body.hasOwnProperty(requiredContents[i])){
      res.status(400).send("JSON body required containing commenter name and comment text.");
      return;
    }
  }

  next();
}

function addComment(req, res, next){
  let comment = {
    id : nextCommentID,
    creator : req.body.creator,
    text : req.body.text
  };

  comments[nextCommentID] = comment;
  req.post.comments.push(comment);
  nextCommentID++;
  res.status(200).json(comment);
}*/

app.listen(3000);
console.log("Server listening at http://localhost:3000");
