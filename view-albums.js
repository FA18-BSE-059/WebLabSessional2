$(document).ready(function () {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums",
        type: "GET"
    }).done(function (response) {
        console.log(response);
        response.map(function (value) {
            $("#noRecordRow").remove();
            $("#list tbody").append(function () {
                return "<tr id=\"" + value.id + "\">" +
                    "<td class=\"name\">" + value.id + "</td>" +
                    "<td class=\"email\">" + value.title + "</td>" +
                    "<td>" +
                    "<a href=\"./view-albums.html?user="+value.id+"\"><button type=\"button\">View Albums</button></a>" +
                    "<button class=\"update\">Update User Email</button>" +
                    "</td></tr>";
            });
        })
    }).catch(function (error) {
        console.log(error);
        $("#noRecordRow td").text("Unable to fetch Record. Please see Console for Errors");
    })
});
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}