$(document).ready(function() {
    let random = document.getElementById("random");
    $(random).on("click", function() {
        random.setAttribute("href", "https://en.wikipedia.org/wiki/Special:Random");
    });
});
//https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=india+constitution&callback=JSON_CALLBACK
function formFunction() {
    var searchValue = document.getElementById("inputbox").value + " ";
    searchValue = searchValue.split(" ").join("_");
    var callback =
        "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
        searchValue +
        "&prop=info&inprop=url&utf8=&format=json";
    $.ajax({
        url: callback,
        dataType: "jsonp",
        success: function(response) {
            var response = response.query;
            var srdiv = document.getElementById("srdiv");
            response.search.forEach((happy) => {
                var htmlres =
                    `<div class="snips"><p>${happy.title}</p><hr/>` +
                    happy.snippet +
                    "</div><br><hr style='height:3px;'/>";
                var newchild = document.createElement("a");
                newchild.className = "page";
                newchild.innerHTML = htmlres;
                newchild.style.cursor = "pointer";
                newchild.target = "blank";
                newchild.href = "https://en.wikipedia.org/?curid=" + happy.pageid;
                srdiv.appendChild(newchild);
            });
        },
    });
}