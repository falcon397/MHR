/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

//Globals needed for endpoints.
var urlMHR = 'https://huckshome.com/projects/MHR/';

//Stuff to do at page load.
$(document).ready(function () {
    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () { return false; });

    //Main Functions
    //getData();


});

function upload() {
    $.ajax({
        url: 'www.huckshome.com/projects/mhr/default.aspx/GetData',
        type: 'POST',
        dataType: 'json',
        data: { file: $('FileUpload1').val() },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    })
};

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
                );
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}