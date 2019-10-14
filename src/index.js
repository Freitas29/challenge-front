document.getElementById('card-button').addEventListener('click', () => {
    let card = document.getElementById('card')

    if(card.style.display === "block")
        card.style.display = "none"
    else
        card.style.display = "block"
})

const cardItem = document.getElementById('card-item')

const buildListItems = data => {
    let row = buildRow()
    let image = buildImage(data.cart.item[0].image)

    let divRow = cardItem.appendChild(row)
    let imageDiv = divRow.appendChild(buildColums("col-lg-4", false))
    imageDiv.appendChild(image)

    let main = divRow.appendChild(buildColums("col-lg-8"))
    let mainTitle = main.appendChild(buildColums("col-lg-12"))
    mainTitle.appendChild(buildTitle(data.cart.item[0].name))

    let mainDescription =  main.appendChild(buildColums("col-lg-12"))
    let rowDescription = mainDescription.appendChild(buildRow("align-items-center"))
    let colDescription = rowDescription.appendChild(buildColums("col-lg-4"))
    colDescription.appendChild(buildLabelQtd(data.cart.item[0].quantity))
}

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
    buildListItems(result)
}

const convertToJSON = value => JSON.parse(value)


// Contrutores dos elementos
const buildRow = (value = false) => {
    let element =  document.createElement('div')
    element.classList.add('row')
    element.style.padding = 0
    element.style.margin = 0
    if(value){
        element.classList.add("d-flex")
        element.classList.add(value)
    }
    return element
}

const buildColums = (value,padding = true) => {
    let element =  document.createElement('div')
    element.classList.add(value)
    if(padding){
        element.style.padding = 0
        element.style.margin = 0
    }
    return element
}

const buildImage = path => {
    let element = document.createElement("IMG")
    element.classList.add("img-fluid")
    element.src = `..${path}`
    return element
}

const buildTitle = value => {
    let element = document.createElement('P')
    element.classList.add("title")
    element.innerText = value
    return element
}

const buildLabelMoney = value => {
    let element = document.createElement('LABEL')
    element.classList.add("description-money")
    element.innerText = value
    return element
}

const buildLabelQtd = value => {
    let element = document.createElement('LABEL')
    element.classList.add("description")
    element.classList.add("strong")
    element.innerText = `Qtd: ${value}`
    return element
}