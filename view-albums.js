$(document).ready(function () {
    window.userId = GetURLParameter("userId");
    if (userId == undefined || userId == "") window.location.replace("/");
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/" + userId,
        type: "GET"
    }).done(function (response) {
        console.log(response);
        $("#titleOfTable").text("List of Albums of " + response.name + " <" + response.email + ">")
    }).catch(function (error) {
        console.log(error);
        $("#noRecordRow td").text("Unable to fetch Record. Please see Console for Errors");
    });
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums?userId=" + userId,
        type: "GET"
    }).done(function (response) {
        console.log(response);
        response.map(function (value) {
            $("#noRecordRow").remove();
            $("#list tbody").append(function () {
                return "<tr id=\"" + value.id + "\">" +
                    "<td class=\"id\">" + value.id + "</td>" +
                    "<td class=\"title\">" + value.title + "</td>" +
                    "<td>" +
                    "<button class=\"update\">Update</button>" +
                    "<button class=\"delete\" type=\"button\">Delete</button>" +
                    "</td></tr>";
            });
        })
    }).catch(function (error) {
        console.log(error);
        $("#noRecordRow td").text("Unable to fetch Record. Please see Console for Errors");
    });
    $("#addNewAlbum").click(function () {
        $("#albumFormTitle").text("Add Album Record");
        $("input").val("");
        $("#addUpdateAlbums").show();
        $("#submitBtn").text("Add Record");
    });

    $("#cancelBtnBtn").click(function () {
        $("#addUpdateAlbums").hide();
    });
    $("#list tbody").on("click", ".update", function (e) {
        $("#albumFormTitle").text("Update Album Record");
        window.updateID = $(e.currentTarget.closest('tr')).attr("id");
        $("input[name='title']").val($("#" + window.updateID + " .title").text());
        $("input[name='albumId']").val(window.updateID);
        $("#addUpdateAlbums").show();
        $("#submitBtn").text("Update Record");
    }).on("click", ".delete", function (e) {
        if (confirm("Are you sure you want to delete this Record")) {
            var rowID = $(e.currentTarget.closest('tr')).attr("id");
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/albums/"+rowID,
                type: "DELETE"
            }).done(function (response) {
                console.log(response);
                e.currentTarget.closest('tr').remove();
                if ($('#list tbody tr').length <= 0) {
                    $("#list tbody").append(function () {
                        return "<tr id=\"noRecordRow\">" +
                            "<td colspan=\"5\" class=\"text-center\">No Record Found</td>" +
                            "</tr>";
                    });
                }
            }).catch(function (error) {
                console.log(error);
                alert("Unable to fetch Record. Please see Console for Errors");
            });
        }
    });
    $("#albumAddUpdateForm").submit(function (event) {
        event.preventDefault();
        $("#noRecordRow").remove();
        var rowID = $("input[name='albumId']").val();
        var addRecord = rowID == "";
        var title = $("input[name='title']").val();

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/albums"+(addRecord ? "" : "/"+rowID),
            type: addRecord ? "POST" : "PUT",
            beforeSend: function () {
                $("#submitBtn").text("Processing").attr("disabled","disabled");
            }
        }).done(function (response) {
            console.log(response);
            $("#submitBtn").text(addRecord ? "Add Record": "Update Record").removeAttr("disabled");
            $("#noRecordRow").remove();
            if (addRecord) {
                rowID = response.id;
                $("#list tbody").append(function () {
                    return "<tr id=\"" + rowID + "\"></tr>";
                });
            }
            $("#list #"+rowID).html(function (){
                return "<td class=\"name\">" + rowID + "</td>" +
                    "<td class=\"title\">" + title + "</td>" +
                    "<td>" +
                    "<button class=\"update\">Update</button>" +
                    "<button class=\"delete\" type=\"button\">Delete</button>" +
                    "</td>";
            });
        }).catch(function (error) {
            $("#submitBtn").text(addRecord ? "Add Record": "Update Record").removeAttr("disabled");
            console.log(error);
            $("#noRecordRow td").text("Unable to fetch Record. Please see Console for Errors");
        });
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