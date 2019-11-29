const input_todo = document.querySelector('.input_todo');
const ul = document.querySelector('.ulist');
const itemslefts = document.querySelector('#itemsleft');
const act = document.querySelector('.active');
const all = document.querySelector('.all');
const complete = document.querySelector('.completed');
const clearSelected = document.querySelector('.clear_comp');
let selectAll = document.querySelector('.select_all');
let content = JSON.parse(localStorage.getItem('todolist')) || [];


let switched = false;
// let id = function(){
//     '
// };
function idGenerator(){
	return 'ayushman'.split('').sort(()=> Math.random()-0.5) + '_' + Math.floor(Math.random()*1000);
}
function createUI(todos) {
	ul.innerHTML = "";
	todos.forEach(elem => {    //elem here is each indivitual todo in the array of todos
		var li = document.createElement('li');
		li.classList.add('prime_list');
		var input_check = document.createElement('input');
		input_check.classList.add('input_tick');
		input_check.type = "checkbox";
		input_check.checked = elem.completed;
		input_check.setAttribute('data-id', elem.id);
		var para_todo = document.createElement('p');
		para_todo.textContent = elem.text;
		var spanx = document.createElement('span');
		spanx.classList.add('cross');
		spanx.innerText = 'X';
		spanx.setAttribute('data-id', elem.id);
		li.append(input_check, para_todo, spanx);
		ul.append(li);
		input_check.addEventListener('click', check_complete);
		// para_todo.addEventListener('click',check_complete);
		spanx.addEventListener('click', deletetodo);
		// localStorage.setItem('todolist', JSON.stringify(content));
		let editableInput = document.createElement('input');
		para_todo.addEventListener('dblclick',makeEdit);

		function makeEdit(event){
			para_todo.parentElement.replaceChild(editableInput, para_todo);
			editableInput.value = elem.text;
			editableInput.focus();
			editableInput.addEventListener('keyup',(event)=>{
				if(event.keyCode == 13){
					elem.text = editableInput.value; 
					createUI(content); 
					// console.log(elem.textContent);
				}
			})
			editableInput.addEventListener('blur',(event) => {
				elem.text = editableInput.value; 
				createUI(content);
				localStorage.setItem('todolist', JSON.stringify(content));
			});
		}
	});
	itemsleft();
	selectAll.addEventListener('click',showAllFunc);
}


function addtodo(event) {
	if (event.keyCode == 13 && input_todo.value) {
		content.push({
			completed: false,
			text: input_todo.value,
			id: idGenerator()
		})
		createUI(content);
		localStorage.setItem('todolist',JSON.stringify(content));
		input_todo.value = "";
	}

}


function deletetodo(event) {
	content = content.filter(todo => todo.id != event.target.dataset.id);
	createUI(content);
	localStorage.setItem('todolist', JSON.stringify(content));
}

function check_complete(event) {
	content = content.map(todo => {
		if (todo.id == event.target.dataset.id) {
			todo.completed = !todo.completed
		}
		return todo;
	})
	createUI(content);
	localStorage.setItem('todolist', JSON.stringify(content));
}
function itemsleft() {
	var lefts = content.filter(todo => todo.completed == false).length;
	if (lefts) {
		itemslefts.parentElement.parentElement.classList.add('layout_flex')
	}
	return itemslefts.innerText = lefts;
}

function showAll() {
	createUI(content);
}

function showActive() {
	activeContent = content.filter(todo => todo.completed == false)
	createUI(activeContent);
}
function showComplete() {
	completedContent = content.filter(todo => todo.completed == true);
	createUI(completedContent);

}
function clearcompletedfun() {
	content = content.filter(todo => todo.completed == false)
	createUI(content);
	localStorage.setItem('todolist', JSON.stringify(content));	
}
function showAllFunc() {
	console.log("heo")
	
	if (switched == true) {
		// content = content.map(todo =>{
		// 	 todo.completed = true
		// 		return todo
		// 	})
		content.forEach(todo => todo.completed = true);
		createUI(content);
		localStorage.setItem('todolist', JSON.stringify(content));
	}
	else {
		// content= content.map(todo => {
		// 	todo.completed = false
		// 	return todo;
		// })
		content.forEach(todo => todo.completed = false);
		createUI(content);
		localStorage.setItem('todolist', JSON.stringify(content));
	}
	switched = !switched;


}

	// selectAll.checked = !selectAll.checked;
// }


all.addEventListener('click', showAll);
act.addEventListener('click', showActive);
complete.addEventListener('click', showComplete);
clearSelected.addEventListener('click', clearcompletedfun);
input_todo.addEventListener('keyup', addtodo);
createUI(content);
