let loginUserName = document.getElementById("loginUserName");
let loginUserPassword = document.getElementById("loginUserPassword");

let loginBtn = document.getElementById("loginBtn");

let registerUsername = document.getElementById("registerUsername");
let newPassword = document.getElementById("newPassword");
let confirmPassword = document.getElementById("confirmPassword");

let registerBtn = document.getElementById("registerNewLoginBtn");

//checking if user is logged In
window.addEventListener("load", () => {
    let loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
        window.location.href = 'admin_access.html';
    }
});

//initial setting one user and check other login details
let credentialsList = JSON.parse(localStorage.getItem("loginList")) || [{ username: "admin_login", password: "admin@123" }];
localStorage.setItem("loginList", JSON.stringify(credentialsList));

function setToLocalStorage(){
    let registerErrMsg = document.getElementById("registerErrMsg");

    credentialsList = localStorage.getItem("loginList");
    credentialsList = JSON.parse(credentialsList);

    let passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@])/;

    let c1 = passwordPattern.test(newPassword.value);
    let c2 = !/[A-Z]/.test(newPassword.value);
    let c3 = !/[a-z]/.test(newPassword.value);
    let c4 = !/\d/.test(newPassword.value);
    let c5 = !/@/.test(newPassword.value);

    if(c1){
        if(newPassword.value === confirmPassword.value){
            let newRegister = {
                username : registerUsername.value,
                password : newPassword.value
            }
            credentialsList.push(newRegister);
            registerErrMsg.textContent = 'Registration Successfull!';
            console.log(credentialsList);
            localStorage.setItem("loginList", JSON.stringify(credentialsList));
        }else{
            registerErrMsg.textContent = "New password and confirm Password doesn't match!"
        }
    }else if (c2) {
        registerErrMsg.textContent = 'Password must contain at least one uppercase letter.';
    }else if (c3) {
        registerErrMsg.textContent = 'Password must contain at least one lowercase letter.';
    }else if (c4) {
        registerErrMsg.textContent = 'Password must contain at least one number.';
    }else if (c5) {
        registerErrMsg.textContent = 'Password must contain at least one "@" symbol.';
    }
}

registerBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    setToLocalStorage();
})


function validateLoginDetails(){
    let loginErrMsg = document.getElementById("loginErrMsg");
    let loginDetails = localStorage.getItem("loginList");
    let parsedDetails = JSON.parse(loginDetails);

    let loginItem = parsedDetails.find((item) => {
        let condition = item.username === loginUserName.value && item.password === loginUserPassword.value;

        if (condition) {
            localStorage.setItem("loginUser", JSON.stringify({ username: item.username }));
            window.location.href = 'admin_access.html';
            return true;
        }else{
            console.log(condition);
            loginErrMsg.textContent = "Invalid Username and Password!";
            console.log(loginErrMsg.textContent);
        }
    });
}


loginBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    validateLoginDetails(); 
});

