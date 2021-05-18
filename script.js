window.currentRowID = 0;
window.updateID = undefined;
$(document).ready(function () {
    $("#personUpdateForm").submit(function (event) {
        event.preventDefault();
        var email = $("input[name='email']").val();
        var id = $("input[name='userId']").val();
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users/"+id,
            type: "PUT",
            beforeSend: function () {
                $("#updateBtn").text("Updating").attr("disable", "disabled");
            }
        }).done(function (response) {
            event.target.reset();
            $("#" + id+ " .email").text(email);
            $("#updateFormDiv").hide();
        }).catch(function (error) {
            $("#updateBtn").text("Update").removeAttr("disable");
            console.log(error);
            alert("An Error Occured while Updating Email. Please see Console for Error Details.");
        });
    });
    $("#cancelBtnBtn").click(function () {
        $("#updateFormDiv").hide();
    })
    $("#list tbody").on("click", ".update", function (e) {
        window.updateID = $(e.currentTarget.closest('tr')).attr("id");
        $("input[name='email']").val($("#" + window.updateID + " .email").text());
        $("input[name='userId']").val(window.updateID);
        $("#updateFormDiv").show();
    });
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET"
    }).done(function (response) {
        console.log(response);
        response.map(function (value) {
            $("#noRecordRow").remove();
            $("#list tbody").append(function () {
                return "<tr id=\"" + value.id + "\">" +
                    "<td class=\"name\">" + value.name + "</td>" +
                    "<td class=\"email\">" + value.email + "</td>" +
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