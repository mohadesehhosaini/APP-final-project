let movieList = [];

document.querySelector("#list-items").addEventListener("click", function(e) {
  console.log(e.target);
  if (e.target.tagName === "SPAN") {
    let itemLists = e.target.parentNode;
    const index = Array.from(itemLists.parentNode.children).indexOf(itemLists);
    if (index !== -1) {
      movieList.splice(index, 1);
      itemStorage();
      itemLists.remove();
    } 
  }
}); 


document.querySelector("#add").addEventListener("click", function(e) {
    e.preventDefault();
    add();
  });
  
  function add() {
      console.log( "Running add function");
      const inputText = document.querySelector("#inputText");
      const category = document.querySelector("#category");
  
  
      if (!isValidated(inputText.value.trim(), category.value)) {
          console.log("Invalid inputs");
          return;
        }
  
  
        const itemList = document.getElementById("list-items");
          
        const newItem = document.createElement("li");
        newItem.className = "m-4 mt-2 p-4";
  
        const emojiIcon = document.createElement("span");
        emojiIcon.textContent = "➡️   ";
        newItem.appendChild(emojiIcon);
        
        
        const textItem = document.createElement("span");
        textItem.textContent = inputText.value.trim();
        newItem.appendChild(textItem);
        
        const categorySpan = document.createElement("span");
        categorySpan.textContent = category.value;
        categorySpan.className = "p-1.5 rounded-lg ml-6 my-2";
        
        switch (category.value) {
          case "Comedy":
            categorySpan.classList.add("bg-orange-600");
            break;
          case "Horrible":
            categorySpan.classList.add("bg-gray-500");
            break;
          case "Romantic":
            categorySpan.classList.add("bg-red-500");
            break;
          default:
            break;
            }
       
        newItem.appendChild(categorySpan);
        itemList.appendChild(newItem);

      
        const listObject = { name: inputText.value.trim(), category: category.value};
        movieList.push(listObject);
        itemStorage();

        inputText.value = "";
        category.value = "";
        
       
  
  }
   
  
  function isValidated(textInput, dropdown) {
      console.log("Running isValidated function");
    
      let isValid = false;  
    
      if (textInput !== "" && dropdown !== "") {
         isValid = true;
      } 
      else {
        if (textInput.length <= 0 && dropdown.length == "") {
          document.querySelector("#inputText").classList.add("border-red-500");
          document.querySelector("#category").classList.add("border-red-500");
        }
        else if (textInput.length >= 0 && dropdown.length == "") {
          document.querySelector("#category").classList.add("border-red-500");
          document.querySelector("#inputText").classList.remove("border-red-500");
  
        }
        else if (textInput.length <= 0 && dropdown.length != "") {
          document.querySelector("#category").classList.remove("border-red-500");
          document.querySelector("#inputText").classList.add("border-red-500");
  
        }
      }
    
      return isValid;
    }
   


function itemStorage() {
  localStorage.setItem('listItems', JSON.stringify(movieList));
};

document.addEventListener("DOMContentLoaded", function () {
  const listStorage = localStorage.getItem('listItems');
  if (listStorage) {
    movieList = JSON.parse(listStorage);
    movieList.forEach(item => {
          
      const newItem = document.createElement("li");
      newItem.className = "m-4 mt-2 p-4";

      const emojiIcon = document.createElement("span");
      emojiIcon.textContent = "➡️   ";
      newItem.appendChild(emojiIcon);
      
      
      const textItem = document.createElement("span");
      textItem.textContent = item.name;
      newItem.appendChild(textItem);
      
      const categorySpan = document.createElement("span");
      categorySpan.textContent = item.category;
      categorySpan.className = "p-1.5 rounded-lg ml-6 my-2";
      
      switch (item.category) {
        case "Comedy":
          categorySpan.classList.add("bg-orange-600");
          break;
        case "Horrible":
          categorySpan.classList.add("bg-gray-500");
          break;
        case "Romantic":
          categorySpan.classList.add("bg-red-500");
          break;
        default:
          break;
          }
     
      newItem.appendChild(categorySpan);
      document.getElementById("list-items").appendChild(newItem);
      

    });
  }
});

    
  
  