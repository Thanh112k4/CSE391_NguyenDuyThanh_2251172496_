const nameInput =
document.querySelector("#name");

const emailInput =
document.querySelector("#email");

const passwordInput =
document.querySelector("#password");

const confirmInput =
document.querySelector("#confirmPassword");

const phoneInput =
document.querySelector("#phone");

const submitBtn =
document.querySelector("#submitBtn");

const form =
document.querySelector("#registerForm");

const modal =
document.querySelector("#modal");

const userInfo =
document.querySelector("#userInfo");

let validName=false;
let validEmail=false;
let validPassword=false;
let validConfirm=false;
let validPhone=false;

// NAME

nameInput.addEventListener("input",()=>{

const value=nameInput.value.trim();

if(value.length>=2 && value.length<=50){

validName=true;

document.querySelector("#nameError")
.textContent="✓ Hợp lệ";

document.querySelector("#nameError")
.className="success";

}else{

validName=false;

document.querySelector("#nameError")
.textContent=
"Tên phải từ 2-50 ký tự";

document.querySelector("#nameError")
.className="";
}

checkForm();
});

// EMAIL

emailInput.addEventListener("input",()=>{

const regex=
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(regex.test(emailInput.value)){

validEmail=true;

document.querySelector("#emailError")
.textContent="✓ Email hợp lệ";

document.querySelector("#emailError")
.className="success";

}else{

validEmail=false;

document.querySelector("#emailError")
.textContent=
"Email không hợp lệ";

document.querySelector("#emailError")
.className="";
}

checkForm();
});

// PASSWORD

passwordInput.addEventListener("input",()=>{

const password=passwordInput.value;

const bar=
document.querySelector("#strengthBar");

let score=0;

if(password.length>=8)
score++;

if(/[A-Za-z]/.test(password)
&& /\d/.test(password))
score++;

if(/[A-Z]/.test(password)
&& /[a-z]/.test(password)
&& /\d/.test(password)
&& /[^A-Za-z0-9]/.test(password))
score++;

if(score===1){

bar.style.width="33%";
bar.style.background="red";

document.querySelector("#passwordError")
.textContent="Mật khẩu yếu";

validPassword=false;
}

else if(score===2){

bar.style.width="66%";
bar.style.background="orange";

document.querySelector("#passwordError")
.textContent="Mật khẩu trung bình";

validPassword=true;
}

else if(score===3){

bar.style.width="100%";
bar.style.background="green";

document.querySelector("#passwordError")
.textContent="Mật khẩu mạnh";

validPassword=true;
}

else{

bar.style.width="0%";

document.querySelector("#passwordError")
.textContent="";

validPassword=false;
}

checkConfirm();

checkForm();
});

// CONFIRM PASSWORD

confirmInput.addEventListener("input",()=>{

checkConfirm();

checkForm();
});

function checkConfirm(){

if(
confirmInput.value!=="" &&
confirmInput.value===passwordInput.value
){

validConfirm=true;

document.querySelector("#confirmError")
.textContent=
"✓ Mật khẩu khớp";

document.querySelector("#confirmError")
.className="success";

}else{

validConfirm=false;

document.querySelector("#confirmError")
.textContent=
"Mật khẩu không khớp";

document.querySelector("#confirmError")
.className="";
}
}

// PHONE

phoneInput.addEventListener("input",()=>{

let value=
phoneInput.value.replace(/\D/g,"");

if(value.length>10){

value=value.slice(0,10);
}

if(value.length>4){

value=
value.slice(0,4)
+"-"+
value.slice(4);
}

if(value.length>8){

value=
value.slice(0,8)
+"-"+
value.slice(8);
}

phoneInput.value=value;

const digits=
value.replace(/\D/g,"");

if(digits.length===10){

validPhone=true;

document.querySelector("#phoneError")
.textContent=
"✓ Số điện thoại hợp lệ";

document.querySelector("#phoneError")
.className="success";

}else{

validPhone=false;

document.querySelector("#phoneError")
.textContent=
"Số điện thoại phải đủ 10 số";

document.querySelector("#phoneError")
.className="";
}

checkForm();
});

// ENABLE BUTTON

function checkForm(){

submitBtn.disabled=!(
validName &&
validEmail &&
validPassword &&
validConfirm &&
validPhone
);
}

// SUBMIT

form.addEventListener("submit",(e)=>{

e.preventDefault();

modal.classList.remove("hidden");

userInfo.innerHTML=`
<p><b>Họ tên:</b> ${nameInput.value}</p>
<p><b>Email:</b> ${emailInput.value}</p>
<p><b>Điện thoại:</b> ${phoneInput.value}</p>
`;
});

// CLOSE MODAL

document.querySelector("#closeModal")
.addEventListener("click",()=>{

modal.classList.add("hidden");
});