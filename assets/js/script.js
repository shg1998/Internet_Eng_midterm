
let counter = 0;
var res = [];
window.onload = () => {
    var starShips = document.getElementById("list_starships");
    // for (let i = 1; i < 50; i++) {
    //     if (counter < 10) {
    //         let url = 'https://swapi.dev/api/starships/' + i;
    //         var req = new XMLHttpRequest();
    //         req.overrideMimeType("application/json");
    //         req.open('GET', url, false);
    //         req.onload = () => {

    //             if (req.status === 200) {
    //                 var jsonResponse = JSON.parse(req.responseText);
    //                 counter++;
    //                 console.log(jsonResponse.name);
    //                 res.push(jsonResponse);
    //                 var li_el = document.createElement("li");
    //                 li_el.className = `classes_${counter}`;
    //                 li_el.style.width = document.getElementsByClassName("container")[0].scrollWidth / 2.0;
    //                 li_el.appendChild(document.createTextNode(jsonResponse.name));
    //                 starShips.appendChild(li_el);
    //                 li_el.onclick = (e) => {
    //                     var specifiedElement = li_el.className.split("_");
    //                     var num = specifiedElement[1];
    //                     console.log(res[num - 1]);
    //                 }
    //             }
    //         };
    //         req.onerror = (err) => {
    //             console.log(err)
    //         }
    //         req.send(null);
    //     } else
    //         break;
    // }


}