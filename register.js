function validate() {
    var frm = document.forms["frm"];
    var fn = frm.fname.value;
    localStorage.setItem("firstname", fn);

    for (let x = 0; x < fn.length; x++) {
        let ch = fn.charCodeAt(x);
        if ((ch < 65 || ch > 90) && (ch < 97 || ch > 122)) {
            alert("Invalid first name");
            return false;
        }
    }

    var ln = frm.lname.value;
    localStorage.setItem("lastname", ln);

    for (let y = 0; y < ln.length; y++) {
        let ch = ln.charCodeAt(y);
        if ((ch < 65 || ch > 90) && (ch < 97 || ch > 122)) {
            alert("Invalid last name");
            return false;
        }
    }

    var phn = frm.phone.value;
    localStorage.setItem("phone", phn);
    if (phn.length !== 10) {
        alert("Phone number should be 10 digits");
        return false;
    }

    var pwd1 = frm.pwd.value;
    localStorage.setItem("password", pwd1);
    if (pwd1.length < 8) {
        alert("Password length should be at least 8 characters");
        return false;
    }

    var mail = frm.mailid.value;
    localStorage.setItem("email", mail);
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(mail)) {
        alert("Invalid email");
        return false;
    }

    alert("Registration successful");
    return true;
}
