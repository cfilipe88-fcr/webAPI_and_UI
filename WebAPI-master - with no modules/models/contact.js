function contact(id = null, Fname, Lname, email, message) {
    this.id = id;
    this.firstName = Fname;
    this.lastName = Lname;
    this.email = email;
    this.userMessage = message;
    };

    module.exports = contact;
