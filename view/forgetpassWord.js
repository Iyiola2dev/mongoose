const form = document.getElementById("loginForm");

// console.log(form, typeof(form))

const formData = () => {
  const {  userName, oldPassword, newPassword, confirmPassword   } = form;

  const data = {
    userName: userName.value,
    oldPassword: oldPassword.value,
    newPassword : newPassword.value,
    confirmPassword: confirmPassword.value
    
  };
  
//  Basic input validation
if (data.newPassword !== data.confirmPassword) {
  alert("The passwords don't match");
  return;
}


//
const url = `http://localhost:3000/api/v1/user/changePassword/${userName.value}`;
  console.log(data);
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formData();
});
