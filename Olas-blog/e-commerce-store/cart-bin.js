let bin = [];

function deletedCart(){
    const binItemsContainer = document.getElementById(".js-cartbin-container");

    if (bin.length === 0){
        binItemsContainer.innerHTML = "<p>Your bin is empty</p>";
    }

    bin.forEach((binItems,index) => {
        const unwanted = document.querySelector(".remove");
        const binItem = unwanted;

          binItems.innerHTML = `
              <img src = "${binItem.image}" 
                   alt = "${binItem.title}"/>
              <h3> ${binItem.title} </h3>
              <p> $${binItem.price.toFixed(2)} </p>
          `;
    })
    addToBin();
    saveCart();
}