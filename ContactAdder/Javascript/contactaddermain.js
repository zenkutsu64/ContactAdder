//This script is only active in the index.html that demonstrates basic life

//var uri = 'http://localhost:53560/api/contacts'
var uri = 'http://localhost/ContactAdder/api/contacts'
//var uri = 'http://skookumjapery.com/ContactAdder/api/contacts'
//var uri = 'http://jamporium.com/ContactAdder/api/contacts'
//var uri = 'http://bizexpedite.com/ContactAdder/api/contacts'
//var uri = 'api/contacts'

$(document).ready(function () {

    /*
    $("ContactAddForm").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();
        // Get some values from elements on the page:
        var $form = $(this),
        term = $form.find("input[name='firstname']").val(),
        url = $form.attr("action");
        //url = uri; 
        // Send the data using post
        var posting = $.post(url, { firstname: term });
        // Put the results in a div
        posting.done(function (data) {
            var content = $(data).find("#content");
            //$("#result").empty().append(content);
        }); //close function(event);
    }); //close submit()
    */

    //from Chrome pages. Gotta avoid inline jscipt in html files
    var el = document.getElementById("addbutton");
    el.addEventListener('click', sendcontact, false);

    $.getJSON(uri)
       .done(function (data) {
           // On success, 'data' contains a list of products.
           $.each(data, function (key, item) {
               // Add a list item for the product.
               $('<li>', { text: formatItem(item) }).appendTo($('#contacts'));
           });
       });



    // var req = new XMLHttpRequest();
    // req.onload = displaypeople; //here's the big lift
    // req.open("GET", uri); //GET @ jamporium/ContactAdder/api/contacts will trigger send of static <Person> list
    // req.send();

    LI_Parser();
    //GetList(); //test HTTP GET

});

function displaypeople() {
    //parse HTMLResponse for data and put it in contacts section
    // console.log(this.responsetext); 
    if (req.readyState == 4 && req.status == 200) {
        if (req.responseText == "Not found") {
            document.getElementById("contacts").value = "Not found";
            //document.getElementById("TextBoxCustomerAddress").value = "";
        }
        else {
            var info = eval("(" + req.responseText + ")"); //this is a dangerous practice

            // No parsing necessary with JSON!        
            document.getElementById("contacts").value = info.jsonData[0].ContactName;
            //document.getElementById("TextBoxCustomerAddress").value = info.jsonData[0].cmaddr1;
        }
    }
}

function PostContact() {
    $.getJSON(uri)
    .done(function (data) {
        // On success, 'data' contains a list of products.
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $('<li>', { text: formatItem(item) }).appendTo($('#products'));
        });
    });
}

function GetList() {
    $.getJSON(uri)
    .done(function (data) {
        // On success, 'data' contains a list of products.
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $('<li>', { text: formatItem(item) }).appendTo($('#products'));
        });
    });
}
function formatItem(item) {
    return 'Full Name: ' + item.FirstName + ' ' + item.LastName;
}

function find() {
    var id = $('#prodId').val();
    $.getJSON(uri + '/' + id)
        .done(function (data) {
            $('#product').text(formatItem(data));
        })
        .fail(function (jqXHR, textStatus, err) {
            $('#product').text('Error: ' + err);
        });
}
function sendcontact() {

    var localJSONdata = buildJSONdata();
    //var localJSONdata ="{contact: { firstname: \"Joe\", lastname: \"Baduca\" }}"; 

    //var userID = id;
    // var userfirstname = $('.firstname').val();
    //var userfirstname = "Thurgood"; var userlastname = "Marshall";
    //var userlastname = $('.lastname').val();
    // var localJSONdata = { person: { 'firstname': userfirstname, 'lastname': userlastname } };
    // var contact = new Object();
    // contact.FirstName = "Josie";
    // contact.LastName = "Baduca";
    // contact.MainEmail = "josie.baduca@jamporium.com"
    // var filter = new Array();
    // filter[0] = "FirstName";
    // filter[1] = "LastName";
    //TODO - figure out the formatting details of JSON data
    // $.post(uri, conf+ " " +conl); //calls HTTP POST methiod
    //var $form = $(this);
    // = $form.find("input[name='firstname']").val();
    //$.post(uri, { FirstName: contact.FirstName, LastName: contact.LastName, MainEmail: contact.MainEmail }); //calls HTTP POST methiod
    //$.post(uri, JSON.stringify(contact, filter)); //calls HTTP POST method
    $.post(uri, localJSONdata);

    /*
    var http = new XMLHttpRequest();
    http.open("POST", uri, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(localJSONdata);
    */

    /*
    $("ContactAddForm").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();
        // Get some values from elements on the page:
        var $form = $(this),
        term = $form.find("input[name='firstname']").val(),
        url = $form.attr("action");
        //url = uri; 
        // Send the data using post
        var posting = $.post(url, { firstname: term });
        // Put the results in a div
        posting.done(function (data) {
            //var content = $(data).find("#content");
            //$("#result").empty().append(content);
        }); //close function(event);
    }); //close submit()
    */

}
function buildJSONdata() {
    var localJSONdata;
    var conf = $('#contactname').val();
    var cone = $('#mainemail').val();
    var cont = $('#Title').val();
    var cond = $('#Department').val();
    var conc = $('#Company').val();
    var conr = "LinkedIn Parser"
    //localJSONdata = conf + " " + conl;
    //localJSONdata = '{ firstname: term }';
    //var $form = $(this),
    //term = $form.find("input[name='firstname']").val(),
    localJSONdata = {
        ContactName: conf, MainEmail: cone, 
        JobTitle: cont, Department: cond,
        Company: conc, ReferredBy: conr
    };
    return (localJSONdata);
}
function LI_Parser() {
    LI_NameParser();
    LI_EmailParser();
    LI_TitleParser();
    LI_CompanyParser();

}

function LI_NameParser() {
    $('#contactname').val("Cheryl Ladd");
    //$('#contactname').val($("span.full-name"))
}

function LI_EmailParser() {
    $('#mainemail').val("Kris@charliesangels.la");
  
}

function LI_TitleParser() {
    $('#Title').val("Detective");
    $('#Department').val("Sexiness");
   
}

function LI_CompanyParser() {
    $('#Company').val("Townsend Detective Agency");
   
}