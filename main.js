document.querySelector(".control-buttons span").onclick = function () {
	let yourName = prompt("Whats Your Name");
	// console.log(yourName)
	if (yourName == null || yourName == "") {
		document.querySelector(".name span").innerHTML = "Unknown";
	} else {
		document.querySelector(".name span").innerHTML = yourName;
	}
	document.querySelector(".control-buttons").remove();
};


let duration = 1000;

let blocksContainer = document.querySelector(".momory-game-blocks");

let blocks = Array.from(blocksContainer.children);
// console.log(blocks)

// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
console.log(orderRange)
suffle(orderRange)
console.log(orderRange)

// add order css property to game blocks
blocks.forEach((block,index) => {

	// console.log(index)

	block.style.order = orderRange[index];

	// Add click Event 
	block.addEventListener('click' , function () {
		// Trigger the flip 

		flipBlock(block);
	})
})

// Flip block function 
function flipBlock(selectedBlock) {
	// Add Class Is Flipped
	selectedBlock.classList.add("is-flipped");

	// Colect All flipped cards
	let allFlippedBlock = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
	
	// if there is  two selected blocks
	if (allFlippedBlock.length === 2) {
		

		// stop clicking function 
		stopCliicking();
		//check matched block Function 
		checkMatchedBlock(allFlippedBlock[0],allFlippedBlock[1]);
	}
} 
// stop clicking function 
	function stopCliicking() {
		// Add class no clicking on main container 
		blocksContainer.classList.add("no-clicking")

		setTimeout(() => {
			// remove class no clicking after duration
			blocksContainer.classList.remove("no-clicking")
		}, duration);
	}

	// check matched block 
	function checkMatchedBlock(firstBlock, secondBlock) {
		let triesElement = document.querySelector(".tries span");

		if (firstBlock.dataset.technology === secondBlock.dataset.technology  ) {
			firstBlock.classList.remove("is-flipped")
			secondBlock.classList.remove("is-flipped")

			firstBlock.classList.add("has-match")
			secondBlock.classList.add("has-match")
			document.getElementById("success").play();
		} else {
			triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
			
			setTimeout(() => {
			firstBlock.classList.remove("is-flipped")
			secondBlock.classList.remove("is-flipped")
				
			}, duration);
			document.getElementById("negative").play();
		}
	}

// suffle function 

function suffle(array) {
	// setting vars
	let current = array.length,
	temp,
	random;
	while (current > 0) {
		// GET RANDOM NUMBER 
		random = Math.floor(Math.random() * current);

		//decreas length by one

		current--;
		// console.log(random)

		// [1] save current element in stach 
		temp = array[current];

		//[2] current element  = random element 
		array[current] = array[random];

		//[3] random element = current element in stach

		array[random] = temp;
	}
	return array;
}

// currentarray [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// new array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

/*
[1] save current element in stach 
[2] current element  = random element 
[3] random element = current element in stach
 */