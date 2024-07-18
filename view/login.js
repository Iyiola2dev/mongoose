const form = document.getElementById("loginForm");

// console.log(form, typeof(form))

const formData = () => {
  const {  userName, password } = form;

  const data = {
    userName: userName.value,
    password: password.value,
  };

  console.log(data);
  fetch("http://localhost:3000/api/v1/user/signIn", {
    method: "POST",
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
