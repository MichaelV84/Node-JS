 
   //  Show all the songs from `music.json` to the client, in a table. 
   function get() {
            
    // XMLHttpRequest - 
    let req = new XMLHttpRequest();

    // XMLHttpRequest.open(method: string, url: string)
    req.open('GET', 'http://localhost:3000/cars');

    req.onreadystatechange = () => {
        // readyState of 4 - DONE (operation is complete).
        if(req.readyState === 4){
            // req.response - is the data that returns from the address
            // JSON.parse() - convert to array. 
            let arr = JSON.parse(req.response);

            let result = '';
            result += `<th>ID</th><th>Model</th><th>Year</th><th>Km</th><th>Address</th>
            <th>Edit</th><th>Delete</th>
          `

            for (const car of arr) {
                // tr -> table row, td -> table data(cell)
                result += ` 
                <tr>
                    <td>${car.CarId}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                    <td>${car.km}</td>
                    <td>${car.city}</td>
                    <td><button class="btn btn-success" onclick="put('${car.CarId}')">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteCar('${car.CarId}')" >Delete</button></td>
                </tr>
                `
            }

            document.getElementById('cars').innerHTML = result;
        } 
    }
    req.send();
}

function post(){

    // get all the values from the inputs
    let newCarId = document.getElementById('CarId').value;
    let newmodel = document.getElementById('model').value;
    let newyear = document.getElementById('year').value;
    let newkm = document.getElementById('km').value;
    let newcity = document.getElementById('city').value;

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/cars/add');

    req.onreadystatechange = () =>{
        // when we finish adding new shoe - call the shoe's list again
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"CarId":newCarId, "model":newmodel, "year":newyear, 
    "km":newkm, "city":newcity}));
}

function put(CarId){
    // input from user:
    let newYearForCar = prompt('Enter the new year');

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:3000/cars/update/${CarId}`);

    // after update - refresh the table:
    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"newYear":newYearForCar}));
}
function deleteCar(CarId){
    //let param = Number(param);
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/cars/delete/${CarId}`);
    // show the updated table after request is sent. 
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}
