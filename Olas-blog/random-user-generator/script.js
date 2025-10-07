const userCard = document.getElementById("user-card");
const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click",() => {

    userCard.innerHTML = "<p>Loading...</p>";

  fetch("https://randomuser.me/api/")
      .then((res) =>{
        return res.json()})
          
      .then((data) => {
        const user = data.results[0];

          userCard.innerHTML =` 
            <img src="${user.picture.large}" alt="User Picture"  />
              <h2>${user.name.first} ${user.name.last}</h2>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Location:</strong> ${user.location.city} ,${user.location.country}</p>
          `
              
          
      })
      .catch((error) => {
          console.error("Error fetching user:", error);
          userCard.innerHTML = "<p>Oops! Something went wrong.</p>";
      });
});