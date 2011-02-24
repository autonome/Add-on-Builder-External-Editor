// external editor for builder
const prefs = require("preferences-service");
const extEditor = require("ext-editor");
const pageMods = require("page-mod");

let editorPath = prefs.get("builder.editor.path");
let editor = new extEditor.Editor(editorPath);

pageMods.PageMod({
  include: "https://builder.mozillalabs.com/addon/*",
  contentScriptWhen: "ready",
  contentScriptFile: require("self").data.url("addon-builder.js"),
  onAttach: function onAttach(worker, mod) {
    worker.on('message', function(message) {
      if (message.text) {
        editor.launch(message.text, worker.postMessage);
        prefs.set("builder.editor.path", editor.editorPath);
      }
      else if (message.clear) {
        editor.editorPath = "";
        prefs.reset("builder.editor.path");
      }
    });
  }
});
