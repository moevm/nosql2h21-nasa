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



function addOne(){
    console.log("addOne")

        var url = new URL(window.location.origin + "/service/add_one");


        var inp_name = document.getElementById("inputName").value.toString();
	    var inp_class = document.getElementById("inputClass").value.toString();
	    var inp_mass = document.getElementById("inputMass").value.toString();
	    var inp_year = document.getElementById("inputYear").value.toString();
        var inp_lat = document.getElementById("inputlat").value.toString();
        var inp_long = document.getElementById("inputlong").value.toString();


        const add = JSON.stringify({"name": inp_name, 
                                    "nametype": "Valid", 
                                    "recclass": inp_class, 
                                    "mass": inp_mass, 
                                    "fall": "Fell",
                                    "year": inp_year,
                                    "reclat": inp_lat,
		                            "reclong": inp_long,
		                            "GeoLocation": "("+inp_lat +", "+ inp_long + ")"})
        

            $.ajax({
                url: url,
                type: 'POST',
                data: add,
                contentType: 'application/json; charset=utf-8',
            }).done(function( msg ) {
                console.log("success", msg);
                location.reload()
            });

        //document.getElementById('input-button').click();
    }

