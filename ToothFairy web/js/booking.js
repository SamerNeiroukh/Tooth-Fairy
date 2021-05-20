/* date is only sundays     */
// function book_date() {
//   document.getElementById("bookdate").step = "9";
// }


// make a contact
function csubmitForm() {
    // initiate variables with form content
    var name = $("#cname").val();
    var emailUser = $("#cemail").val();
    var message = $("#cmessage").val();
    var terms = $("#cterms").val();
    var toothEmail = "my.tooth.fairy0@gmail.com";
    //var ander = "מ%0D" + emailUser + message
  
    // *********** //
    window.open(
      "mailto:my.tooth.fairy0@gmail.com?subject=יצירת קשר  - " +
        name +
        "&body=מייל לחזרה: " +
        emailUser +
        "%0d" +
        "%0d" +
        message +
        "%0d"
    );
  
    // *********** //
  }
