/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

//Globals needed for endpoints.
var urlMHR = 'https://huckshome.com/projects/MHRServices/MHRService.svc/';

//Stuff to do at page load.
$(document).ready(function () {
    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function (event) { event.preventDefault(); });

    //Main Functions
    //Test

});

function setData(url) {
    var test = new Object();
    var csv = document.getElementById('fileUpload').files[0];
    if (csv) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(csv);
        reader.onload = function (e) {
            // browser completed reading file - display it
            //upload(urlMHR + url, csvJSON(e.target.result));
            test = csvJSON(e.target.result);
        };
    }

    var xhr = createCORSRequest('POST', urlMHR + url);
    xhr.onload = function (data) {
        console.log(data.target.response);
    };
    xhr.onerror = OnError;
    xhr.send();
}

function OnError() {
    console.error('Failed');
}

function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}

//Build XHR object
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function upload(url, json) {
    //TODO: switch to $.getJSON when a JSON is the return type of the service.
    $.ajax({
        url: url,
        method: 'POST',
        //contentType: "application/json; charset=utf-8",
        dataType: 'json',
        processData: true,
        data: json,
        success: function (data) {
            console.log(data.responseText);
        },
        error: function (xhr, status, error) {
            console.error("Failed to send JSON data.");
            console.log(xhr.responseText);
        }
    });
}