//Dell laptop version uses localhost
//var uri = 'http://localhost:53560/api/contacts' //served up by IIS Express. 
var uri = 'http://localhost/contactadder/api/contacts' 
//var uri = 'http://skookumjapery.com/ContactAdder/api/contacts' //Scobes2013's gotta be plugged into Ethernet for this to work!
//var uri = 'http://bizexpedite.com/contactadder/api/contacts' //main DB on the server, must match with Act!Database.cs
var actdb = 'PPSearch'
//var actdb = 'GladPixGarden'
//var actdb = 'PPTalent'

//Both jamporium.com and skookumjapery.com/localhost are published correctly. I should be able to just switch these uri's at will
var globalcount = 0 

//$(document).ready(function () { //maybe need window.onload instead for chrome extension popup?
 window.onload = function () {

     //modern way to respond to a button click
     
    var el = document.getElementById("addbutton");
    el.addEventListener('click', sendcontact, false); //this is having some trouble within the extension
    

    //web api out there?
    CheckConnection();
 
     //extra stuff here, but at the core it injects javascript (one file per call) into the open/active browser window
    
    chrome.windows.getCurrent(function (currentWindow) { //this is getting called prematurely?? window.onload instead of $(document).ready()???
        chrome.tabs.query({ active: true, windowId: currentWindow.id },
                          function (activeTabs) {
                              chrome.tabs.executeScript(
                                activeTabs[0].id, { file: 'LInameparser.js', allFrames: true });
                          });
                          
    });
 
    

    //function for simple testing of the API connection. commented out for normal operation
    //Fake_Parser();

}
//});

function Fake_Parser() {
    $('#contactname').val("Joe Baduca"); //set input control to name snagged from LI
    $('#linkedinurl').val("http://www.linkedin.com"); //set input control to name snagged from LI
    $('#company').val("TeriCom"); //set input control to name snagged from LI
    $('#title').val("Director"); //set input control to name snagged from LI
    $('#department').val("Engineering"); //set input control to name snagged from LI

}


//apparently, this function just needs to be defined, not called. it waits for the injected javascript to send data back
//this function extracts the LI contact goodness and gets it ready to send to Act!
chrome.extension.onRequest.addListener(function (contact) {
    //Grab Name from the returned object 
    //contactname control = name from returned object
    //var fullname = contact.
    $('#contactname').val(contact.fullname); //set input control to name snagged from LI
    $('#linkedinurl').val(contact.liurl); //set input control to name snagged from LI
    $('#company').val(contact.company); //set input control to name snagged from LI
    $('#title').val(contact.jobtitle); //set input control to name snagged from LI
    $('#department').val(contact.department); //set input control to name snagged from LI
    if (contact.imgurl != "")
        jQuery("#contactpic").attr('src', contact.imgurl); //new-to-me JQuery format!!
});

function sendcontact() {

    var localJSONdata = buildJSONdata();
          
    var status = $('#statusbox').val();
    status = "Attempting Contact Add...\n" + status;
    $('#statusbox').val(status);

    $.post(uri, localJSONdata)
       .success(function (data) {
               var status = $('#statusbox').val();
               var newdata = "Contact Add Successful\n";
               newdata.fontcolor = "green"
               status = newdata + status;
               $('#statusbox').val(status);

               ContactCount();
           })
       .fail(function (jqXHR, textStatus, err) {
           var status = $('#statusbox').val();
           document.getElementById("Status").style.color = "red";
           status = "Contact Add Failure\n" + status;
           $('#statusbox').val(status);

       });

}

function buildJSONdata() {
    var localJSONdata;
    var conlogin = "zenkutsu64";
    var conpassword = "UechiU11"; 
    var conf = $('#contactname').val();
    var conbiz = $('#businessemail').val();
    var conpers = $('#personalemail').val();
    var cont = $('#title').val();
    var cond = $('#department').val();
    var conc = $('#company').val();
    var conl = $('#linkedinurl').val();
    var conimage = $('#contactpic').attr('src'); 
    var conr = "LinkedIn Parser";
    var condb = actdb; //this is new

    localJSONdata = {
        Actlogin: conlogin, ActPassword: conpassword, 
        ContactName: conf, BusinessEmail: conbiz,
        PersonalEmail: conpers, JobTitle: cont, Department: cond,
        Company: conc, ReferredBy: conr,
        ActDatabase: condb, //this is new
        LinkedInURL: conl, ImageURL: conimage
    };
    return (localJSONdata);
}

//Asks Web Api for a GetAll() and checks the response
function CheckConnection() {
    $.getJSON(uri)
    .done(function (data) {
        // On success, 'data' contains a list of products.
        $.each(data, function (key, item) {
            if (item.LastName != "&N3m3") {
                var status = $('#statusbox').val();
                var newdata = "Connection: Failure\n";
                newdata.fontcolor = "red"
                status = newdata  + status;
                $('#statusbox').val(status);
            }
            else {
                var status = $('#statusbox').val();
                //var newdata = "Connection: Successful\n";
                var newdata = "Connection Successful: " + actdb +"\n"; // this is new
                newdata.fontcolor = "green"
                status = newdata + status;
                $('#statusbox').val(status);
            }
        })//closes .each
    })//closes .done
     .fail(function (data) {
         // On success, 'data' contains a list of products.
        // document.getElementById("Status").style.color("red");
         var status = $('#statusbox').val();
         status = "Connection: Failure\n" + status;
         $('#statusbox').val(status);
     }); //closes .fail

} //close CheckConnection

function ContactCount() {
   
    var status = $('#statusbox').val();
    var newdata = "Contacts Added: " + ++globalcount + "\n";
    newdata.fontcolor = "black"
    status = newdata + status;
    $('#statusbox').val(status);

}



