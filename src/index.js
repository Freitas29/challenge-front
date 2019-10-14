document.getElementById('card-button').addEventListener('click', () => {
    let card = document.getElementById('card')

    if(card.style.display === "block")
        card.style.display = "none"
    else
        card.style.display = "block"
})

document.addEventListener("DOMContentLoaded", () => {
    loadDoc()
})


const loadDoc = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        buildCard(this.responseText)
      }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/Freitas29/challenge-front/master/products.json", true);
    xhttp.send(); 
}

const buildCard = (response) => {
    let result = convertToJSON(response)
    console.log(result)
}

const convertToJSON = value => JSON.parse(value)
