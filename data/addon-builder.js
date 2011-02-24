
var menuList = document.getElementById("editor-menu-wrapper").firstElementChild;

// Add menu separator
var listItem = document.createElement("li");
listItem.setAttribute("class", "UI_Editor_Menu_Separator");
menuList.appendChild(listItem);

// Add button to load+choose editor
listItem = document.createElement("li");
listItem.setAttribute("class", "UI_Editor_Menu_Button UI_Section_Open");
listItem.innerHTML = "<a href='#'>External Editor</a>";
listItem.addEventListener("click", loadEditor, false);
menuList.appendChild(listItem);

// Add button to clear editor choice
listItem = document.createElement("li");
listItem.setAttribute("class", "UI_Editor_Menu_Button UI_Section_Close");
listItem.innerHTML = "<a href='#'>Clear Editor Choice</a>";
listItem.addEventListener("click", clearEditor, false);
menuList.appendChild(listItem);

// Load Bespin contents into external editor
function loadEditor() {
  postMessage({
    text: window.fd.bespin.getContent()
  });
}

// Load external editor contents into Bespin
onMessage = function(message) {
  window.fd.bespin.setContent(message);
};

// Clear external editor choice
function clearEditor() {
  postMessage({
    clear: true
  });
}

