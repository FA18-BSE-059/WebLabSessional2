window.currentRowID = 0;
window.updateID = undefined;
$(document).ready(function () {
    $("#personAddUpdateForm").submit(function (event) {
        event.preventDefault();
        $("#noRecordRow").remove();
        var addRecord = $("#updateBtn").is(":disabled");
        var name = $("input[name='name']").val();
        var gender = $("input[name='gender']:checked").val();
        var age = $("input[name='age']").val();
        var city = $("select[name='city']").val();
        var rowID = addRecord ? ("row____" + (currentRowID++)) : window.updateID;
        console.log(rowID);
        if (addRecord) {
            $("#list tbody").append(function () {
                return "<tr id=\"" + rowID + "\"></tr>";
            });
        }
        
        $("#"+rowID).html(function () {
            return "<td class=\"name\">" + name + "</td>" +
                "<td class=\"gender\">" + gender + "</td>" +
                "<td class=\"age\">" + age + "</td>" +
                "<td class=\"city\">" + city + "</td>" +
                "<td>" +
                "<button class=\"update\">Update</button>" +
                "<button class=\"delete\">Delete</button>" +
                "</td > ";
        });

        $("#addBtn").removeAttr("disabled");
        $("#updateBtn").attr("disabled", "disabled");
        event.target.reset();
    });
    $("#list tbody").on("click", ".update", function (e) {
        window.updateID = $(e.currentTarget.closest('tr')).attr("id");
        $("input[name='name']").val($("#" + window.updateID + " .name").text());
        $("input[name='gender']#"+$("#"+window.updateID+" .gender").text().toLowerCase()).prop('checked',true);
        $("input[name='age']").val($("#"+window.updateID+" .age").text());
        $("select[name='city']").val($("#" + window.updateID + " .city").text());
        $("#updateBtn").removeAttr("disabled");
        $("#addBtn").attr("disabled", "disabled");
    }).on("click",".delete",function (e) {
        if (confirm("Are you sure you want to delete this Record")) {
            e.currentTarget.closest('tr').remove();
            if ($('#list tbody tr').length <= 0) {
                $("#list tbody").append(function () {
                    return "<tr id=\"noRecordRow\">" +
                    "<td colspan=\"5\" class=\"text-center\">No Record Found</td>" +
                    "</tr>";
                });
            }
        }
    })
});