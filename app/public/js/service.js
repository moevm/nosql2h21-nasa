function importDB(){
    console.log("importDB")
    const inputElement = document.getElementById("file-input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {

        const fileList = this.files;
        const file = fileList.item(0)
        var url = new URL(window.location.origin + "/service/import");

        const fileReader = new FileReader()
        

        fileReader.addEventListener("load", () => {
            console.log("read file", fileReader.result)
            $.ajax({
                url: url,
                type: 'POST',
                data: fileReader.result,
                contentType: 'application/json; charset=utf-8',
            }).done(function( msg ) {
                console.log("success", msg);
                location.reload()
            });
        }, false);

        fileReader.readAsText(file)
        
    }
    document.getElementById('file-input').click();
    
    
}

function exportDB(){
    console.log("exportDB")
    var url = new URL(window.location.origin + "/service/export");
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    }).done(function( msg ) {
        console.log("success", msg);

        const blob = new Blob([msg], { type: 'application/json' });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.style = "display: none";
        a.download = "export.json";
        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(blobUrl);
    });

    
}