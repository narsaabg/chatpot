window.onload=function(){
	let InputField = document.querySelector('#send-input');
	InputField.addEventListener('keydown',function(e){
		if(e.code == 'Enter'){
			sendMessage();
		}
	});
}

async function sendMessage(){
	let messageInput = document.querySelector('#send-input');
	let message = messageInput.value;

	if(message == ''|| message == 'undefined'){
		return;
	}

	//handle sender message
	showSenderMessage(messageInput,message);

	// handle loading 
	let data = handleReceiverLoading();


// return;
	const response = await fetch('/openai/get-response',{
		method:'POST',
		headers:{
			'Content-Type':'application/json',
		},
		body:JSON.stringify({
			'prompt':message
		})
	});

	if(!response.ok){
		return;
	}

	const jsonData = await response.json();

	if(jsonData.status){
		data.removableNode.remove();
		handleReceiverMessage(data.friendMainNode,data.textNode,jsonData.data)
	}else{
		console.log('try ')
	}
}

function showSenderMessage(messageInput,message){

	let baseContainer = document.querySelector('.base-container');

	const node = document.createElement("div");
	node.className = 'my-text-div';

	const myTextContainerNode = document.createElement('div');
	myTextContainerNode.className = 'my-text-container';

	const myTextNode = document.createElement('div');
	myTextNode.className = 'my-text';
	const textnode = document.createTextNode(`${message}`);
	myTextNode.appendChild(textnode);

	myTextContainerNode.appendChild(myTextNode);
	node.appendChild(myTextContainerNode);
  	baseContainer.appendChild(node);

  	messageInput.value='';
}

function handleReceiverLoading(){
	let baseContainer = document.querySelector('.base-container');

	const friendNode = document.createElement("div");
	friendNode.className = 'friend-text-div';

	const friendTextContainerNode = document.createElement('div');
	friendTextContainerNode.className = 'friend-text-container';

	const friendImageContainerNode = document.createElement('img');
	friendImageContainerNode.src = `https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light`;

	const friendloaderContainerNode = document.createElement('img');
	friendloaderContainerNode.src = `/loading-dot.gif`;

	friendNode.appendChild(friendImageContainerNode);

	// loading gif will replaced with response later
	friendNode.appendChild(friendloaderContainerNode);
  	
  	baseContainer.appendChild(friendNode);

  	let data ={
  		'friendMainNode':friendNode,
  		'textNode':friendTextContainerNode,
  		'removableNode':friendloaderContainerNode
  	}
  	return data;

}

function handleReceiverMessage(friendMainNode,friendTextContainerNode,message){
	const friendTextNode = document.createElement('div');
	friendTextNode.className = 'friend-text';
	let textNode = document.createTextNode(message);
	friendTextNode.appendChild(textNode);

	friendTextContainerNode.appendChild(friendTextNode);
	friendMainNode.appendChild(friendTextContainerNode);

}

