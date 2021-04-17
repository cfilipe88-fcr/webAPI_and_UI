function validateForm() {

    let contactForm = document.value;

    let fName = contactForm.fName.value;  
    let lName = contactForm.lName.value;  
       
    
    if ( fName == "" ) {
        contactForm.fName.focus();
        alert( "Please enter a value for first name");
        return false;
    }
    
    if ( lName == "" ) {
        contactForm.lName.focus();
        alert( "Please enter a value for last name");
        return false;
    }
  
    
    return true;

}
