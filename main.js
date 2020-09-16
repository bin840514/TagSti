var inputElement = document.getElementById("files");
var textJfull = document.getElementById("textJfull");
var textJfullSti = document.getElementById("textJfullSti");

var fileName;
var jsonElement;

inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    var selectedFile = document.getElementById("files").files[0];
    fileName = selectedFile.name;
    
    var reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function(){
        jsonElement = JSON.parse(this.result);
        textJfull.value = jsonElement.JFULL;
    };
}

function run() {
	jsonElement.JFULL = textJfull.value.replace(textJfullSti.value, "[STI]" + textJfullSti.value + "[STI]");
    jsonElement.JFULL_STI = textJfullSti.value;

	jsonElement.JFULL = deleteRedundant(jsonElement.JFULL);
	jsonElement.JFULL_STI = deleteRedundant(jsonElement.JFULL_STI);

	/* textJfull.value = jsonElement.JFULL; */
  
    exportJson();
}

function deleteRedundant(str) {
	return str.replace(/ /g, '').replace(/　/g, '').replace(/\n/g, '').replace(/\r/g, '');
}

function exportJson() {
    const jsonStr = JSON.stringify(jsonElement);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}