// Goes to home page
function home() {
	location.href = "/"; //"products.html";
}

function aFunction()
{
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			products = JSON.parse(this.responseText);
			
			for(let x = 0; x < products.length; x++){
				
				console.log("product: " + products[x].name);
				
			}
			
			//console.log("post id:" + post.id);
			
			//window.location.href = "/JSONproducts/" + post.id;
		
		}
	}
	req.open("GET", `http://localhost:3000/productDisplay`);
	req.send();
}

function anotherFunction()
{
	let dataObj = {"name": "Purple Sparkle Nails", "pictures":["pictures/art7.jpg"], "length":"extra long", "shape":"square", "colors":["dark purple", "light purple", "white"], "price":24.99, "stock":21,"id":0};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() //reads names of restaurants from the server
	{
		if (this.readyState == 4 && this.status == 200) 
		{			
			//let data = JSON.parse(this.response);
			console.log("data: " + this.response);
			
		}
	};
	xhttp.open("POST", "/getData", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(dataObj));
}

function yetAnotherFunction(){
	
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			
			finalProducts = JSON.parse(this.responseText);
			
			console.log(finalProducts);
			
		}
	}
	req.open("POST", `http://localhost:3000/items?name=` + "Purple Sparkle Nails" + `&inStock=` + 21);
	req.send();
}

function loadPage(){
	
	var startTime = performance.now();

	buttonInfo();
	
	var endTime = performance.now();
	console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
}

// Stores id of all size buttons

function sizeButtonPressed(currentSizeBtn)
{
	let pressedButton = document.getElementById(currentSizeBtn);
		
	let nailLengths = document.getElementById("nailLength"); 
	
	for(let x = 0; x < nailLengths.value; x++)
	{
		if(currentSizeBtn == ("id" + x) && pressedButton.classList.contains('sizeBtn'))
		{			
			pressedButton.classList.remove('sizeBtn');
			pressedButton.classList.add('sizeBtnPressed');
			pressedButton.style.bottom = "-5px";
		}
		else
		{
			let releasedButton = document.getElementById("id" + x);
			releasedButton.classList.add('sizeBtn');
			releasedButton.classList.remove('sizeBtnPressed');
			releasedButton.style.bottom = "0px";
		}
	}
}


// Next/previous controls
function plusSlides(n) {
	let slideIndex = document.getElementById("allPics");
	console.log("n 107: " + n);
	slideIndex.value = Number(slideIndex.value) + n;
	
	showSlides(slideIndex.value);
}

// Thumbnail image controls
function currentSlide(n) {
	let slideIndex = document.getElementById("allPics");
	slideIndex.value = n;
	console.log("slideIndex.value: " + slideIndex.value);
	showSlides(slideIndex.value);
}

function showSlides(n) {
	let slideIndex = document.getElementById("allPics");
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("dot");
		
	if (Number(slideIndex.value) > slides.length) 
	{
		console.log("hi");
	}
	if (n > slides.length) 
	{
		slideIndex.value = 1;
		console.log("hey");
	}
	if (n < 1)
	{
		slideIndex.value = slides.length;
	}
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
  
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}

	slides[(Number(slideIndex.value))-1].style.display = "block";
	dots[(Number(slideIndex.value))-1].className += " active";
	
}

function addToCart()
{	
	let popup = document.getElementById("myPopup");
	popup.innerText = "Please choose a nail length";
			
	let canAdd = false; 
	// We must check to see if a specific nail length has been chosen
	
	// Gets all elements inside the nailLength div
	let nailLength = document.getElementById("nailLength").children;
	
	// Loops through all elements in the nailLength div
	for (let x = 0; x < nailLength.length; x++)
	{
		// Checks to see if the element inside of nailLength is a button
		if(nailLength[x].tagName == "BUTTON")
		{
			let id = nailLength[x].id;
			
			// If the button with this id contains the 'sizeBtnPressed' class
			// then it has been pressed, and the product can be added to cart
			if(document.getElementById(id).classList.contains('sizeBtnPressed'))
			{
				canAdd = true;
			}
		}
	}
	
	if (canAdd == false)
	{
		popup.classList.add("show");
		//alert("Choose a nail length.");
	}
	else
	{
		popup.classList.remove("show");
		
		document.getElementById("sidenav").style.display = "block";
	}
}

function productInfo()
{
	let href = window.location.href;
	let hrefArray = href.split("/");

	let allNailSets = document.getElementById("nailSets");
	allNailSets.innerHTML = "";
	
	let prodID = hrefArray[hrefArray.length-1]; // Get ID of product
		
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){

			let product = JSON.parse(this.responseText);
			
			let allPics = document.getElementById('allPics');
			allPics.value = 1;
			
			for (let x = 0; x < product.pictures.length; x++)
			{
				let pic = document.createElement('IMG');
				pic.setAttribute("src", "/" + product.pictures[x]);
				pic.style.height = '315px';
				pic.style.width = '385px';
				pic.classList.add('displayPic');
				
				let mySlides = document.createElement('div');
				mySlides.classList.add('mySlides');
				mySlides.classList.add('fade');
								
				let numberText = document.createElement('div');
				numberText.appendChild(document.createTextNode((x+1) + "/" + product.pictures.length));
				
				mySlides.appendChild(numberText);
				mySlides.appendChild(pic);
				
				let allDots = document.getElementById("allDots");
				let aDot = document.createElement('span');
				aDot.classList.add("dot");
				aDot.onclick = function() {
					currentSlide(x+1);
				}
				allDots.appendChild(aDot);
					
				allPics.appendChild(mySlides);				
			}
									
			let title = document.getElementById('title');
			let name = document.createTextNode(product.name);
			
			title.appendChild(name);
						
			let price = document.getElementById('price');
			price.appendChild(document.createTextNode("$" + product.price));
			
			
			let nailLength = document.getElementById('nailLength');
			nailLength.value = 0;
			nailLength.appendChild(document.createTextNode("Choose Nail Length:"));
			
			nailLength.appendChild(document.createElement('br'));
			nailLength.appendChild(document.createElement('br'));			
						
			for (let x = 0; x < product.size.length; x++)
			{
				let b = document.createElement('button');
				b.appendChild(document.createTextNode(product.size[x]));
				b.style.position = 'relative';
				b.style.borderRadius = "10%";
				b.classList.add('sizeBtn');
				b.classList.add('allSizeBtns');
				b.id = "id" + x;
				b.style.fontSize = "14px";
				
				b.value = "Inset Border";
				b.style.borderStyle = "inset";
				b.onclick = function(){
					sizeButtonPressed(b.id);
				}
				
				b.style.left = String(x*10) + 'px'; 
				
				nailLength.value = nailLength.value + 1;
				nailLength.appendChild(b);
				
			}
			
			let nailShape = document.getElementById('nailShape');
			nailShape.appendChild(document.createTextNode("Shape: " + product.shape));
			nailShape.style.position = 'relative';
						
			let less = document.getElementById("less");
			
			less.onclick = function() {
				let val = document.getElementById("qtyValue");
								
				if(Number(val.innerHTML) > 1)
				{
					val.innerHTML = Number(val.innerHTML)-1;
				}
			}
														
			let more = document.getElementById('more');
			
			more.onclick = function() {
				let val = document.getElementById("qtyValue");
								
				if(Number(val.innerHTML) < 10)
				{
					val.innerHTML = Number(val.innerHTML)+1;
				}
			}
			//let slideIndex = 1;
			showSlides(Number(allPics.value));
		}
	}
	req.open("POST", `http://localhost:3000/prodInfo?id=` + prodID);
	req.send();
	
}

function aboutMe()
{
	// removing all inner items from 'nailSets' div so that the products are
	// not repeatedly added every time a user searches for a product
	
	let allNailSets = document.getElementById("nailSets");
	allNailSets.innerHTML = "";
	
}

function buttonInfo()
{
	// removing all inner items from 'nailSets' div so that the products are
	// not repeatedly added every time a user searches for a product
	let allNailSets = document.getElementById("nailSets");
	allNailSets.innerHTML = "";

	// Preventing errors if the search input returns null
	let search = document.getElementById("search");
	let searchVal;

	if (search == null)
	{
		searchVal = "";
	}
	else
	{
		searchVal = search.value;
	}
	
	// Retrieving the link of the page that the user is 
	// currently browsing on
	let href = window.location.href;
	let hrefId = href.split("/");
	
	// Stores non-empty elements into 'filtered' array
	let filteredHref = hrefId.filter(function (el) {
		return el.length != 0;
	});
	
	// Checks to see if the current link contains "products"
	if(filteredHref[filteredHref.length-1] != "localhost:3000")//"products")
	{
		if (searchVal.length == 0)
		{
			// The listed products dissapear if user is not 
			// searching for them and the input is empty
			document.getElementById("nailSets").innerHTML = "";
			return;
		}
	}
	
					
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			products = JSON.parse(this.responseText);
			
			console.log("products: " + products);
			
			// If there are no products that match the user's search
			if (products.length == 0)
			{
				let message = document.createElement("h1");
				message.innerText = "No Search results for term : " + search.value;
								
				message.title = "Title";
				message.classList.add('dropbtn2');
				
				allNailSets.append(message);
			}
									
			for (let x = 0; x < products.length; x++){
				
				let aPic = document.createElement("IMG");
				aPic.classList.add('img');
				
				aPic.setAttribute("src", ("/" + products[x].pictures[0]));
				
				let title = document.createElement("p");	
				let t = document.createTextNode(products[x].name); // Creating t to put inside of title element
				title.appendChild(t);
				title.style.fontStyle = "italic";
				title.style.fontFamily = "serif"; //"Georgia, serif";
				title.style.fontSize = "28px";
				title.style.fontWeight = "300";
				
				let description = document.createElement("p");
				let d1 = document.createElement("div");
				let d2 = document.createElement("div");
				
				let l = document.createTextNode("Length: " + products[x].size[0].toUpperCase()); // Creating length (l) to put inside of description element
				d1.appendChild(l) //let br = document.createElement("br");
				d1.style.fontFamily = "Times New Roman"; //"Trebuchet MS, Helvetica, sans-serif"; //"Impact,Charcoal,sans-serif";
				d1.style.fontSize = "17px";
				d1.style.fontWeight = "10";
				//d1.style.fontStyle = "italic";
				//d1.style.fontFamily = "serif";
				
				let s = document.createTextNode("Shape: " + products[x].shape); // Creating shape (s) to put inside of description element
				d2.appendChild(s);
				d2.style.fontFamily = "Times New Roman"; //"Trebuchet MS, Helvetica, sans-serif";
				d2.style.fontSize = "17px";
				d2.style.fontWeight = "10";
				//d2.style.fontStyle = "italic";
				//d2.style.fontFamily = "serif";
				
				description.appendChild(d1);
				//description.appendChild(br);
				description.appendChild(d2);
				
				let price = document.createElement("p");
				
				let p;
				
				if (products[x].stock == 0)
				{
					p = document.createTextNode("OUT OF STOCK");
				}
				else
				{
					p = document.createTextNode("$" + products[x].price); // Price to put inside of paragraph p		
				}
				price.appendChild(p);
				//price.style.fontFamily = "Trebuchet MS, Helvetica, sans-serif";
				price.style.fontStyle = "italic";
				price.style.fontFamily = "serif";
				price.style.fontWeight = "400";
				
				let a = document.createElement('a');
				
				a.href = "/products/" + products[x].id;
								
				let aButton = document.createElement("Button");
				
				a.style.textDecoration = "none";
				a.style.color = "#000";
				

				aButton.appendChild(aPic);
				aButton.appendChild(title);
				aButton.appendChild(description);
				aButton.appendChild(price);
				
				aButton.className += "button";
							
				a.appendChild(aButton);
				allNailSets.appendChild(a);
								
			}			
		}
	}
	req.open("POST", `http://localhost:3000/productDisplay?search=` + searchVal);
	req.send();
			
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  console.log("toggles");
}

function myFunction2 () {	
   document.getElementById("dropdown2").classList.toggle("show");
}

function myFunction3 () {	
   document.getElementById("tutorials").classList.toggle("show");
}

window.onclick = function (event) {
	console.log(event.target);
	
	let dropdowns = document.getElementsByClassName("dropdown-content");
	let dropdowns2 = document.getElementsByClassName("dropdown2-content");
	let tutorials = document.getElementsByClassName("tutorials-content");
	
	let stopHere = false; //checks to see if we need to stop
	
	for (let i = 0; i < dropdowns.length; i++) { //looping through dropdown menu contents
			
		let openDropdown = dropdowns[i];
			
		if (openDropdown.classList.contains('show')){ //hiding all contents from the first dropdown menu since it hasn't been clicked on
				openDropdown.classList.remove('show');
				console.log("no show");
								
		}
		else if(event.target.matches('.dropbtn')){ //assuming dropdown isn't being shown 
					stopHere = true;
					console.log("end show");
		}
	}
	
	for (let i = 0; i < dropdowns2.length; i++) { //looping through dropdown menu contents
			
		let openDropdown2 = dropdowns2[i];
			
		if (openDropdown2.classList.contains('show')) { //hiding all contents from the second dropdown menu since it hasn't been clicked on
				openDropdown2.classList.remove('show');
		}
		else if(event.target.matches('.dropbtn2')){
					stopHere = true;
		}
	}
	
	for (let i = 0; i < tutorials.length; i++) { //looping through dropdown menu contents
			
		let openTutorials = tutorials[i];
			
		if (openTutorials.classList.contains('show')) { //hiding all contents from the second dropdown menu since it hasn't been clicked on
				openTutorials.classList.remove('show');
		}
		else if(event.target.matches('.dropbtn3')){
					stopHere = true;
		}
	}
	
	
	if(stopHere == true)
	{
		return;
	}
	
	if (event.target.matches('.dropbtn')) { //if the first dropdown menu isn't clicked
		myFunction();
		
	}
	
	else if (event.target.matches('.dropbtn2')){ //if the second dropdown menu isn't clicked
		
		myFunction2();				
		
	}
	
	else if (event.target.matches('.dropbtn3')){ //if the second dropdown menu isn't clicked
		
		myFunction3();				
		
	}
		
}
