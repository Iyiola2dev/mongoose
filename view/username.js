const form = document.getElementById("usernameForm");

const formData = () => {
  const {  oldUsername, newUsername, confirmUserame } = form;

  const data = {
   
    oldUsername: oldUsername.value,
    newUsername: newUsername.value,
    confirmUserame: confirmUserame.value,
  };

  //This is to confirm if the newusername matches with the confirmNewUsername
  if(data.newUsername !== data.confirmUserame){
    alert("The usernames doesn't match")
  };

  const url = `http://localhost:3000/api/v1/user/changeUserName/${oldUsername.value}`;
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

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formData()
})