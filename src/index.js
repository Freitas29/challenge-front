document.getElementById('card-button').addEventListener('click', () => {
    let card = document.getElementById('card')

    if(card.style.display === "block")
        card.style.display = "none"
    else
        card.style.display = "block"
})

const cardItem = document.getElementById('card-item')

var totalValue = 0

const buildListItems = data => {
    let row = buildRow()
    data.cart.item.map(item => {
        let image = buildImage(item.image)
        totalValue = totalValue + item.bestPrice
        // Constro a imagem
        let divRow = cardItem.appendChild(row)
        let imageDiv = divRow.appendChild(buildColums("col-lg-4", false))
        imageDiv.appendChild(image)

        //Constroi o titulo
        let main = divRow.appendChild(buildColums("col-lg-8"))
        let mainTitle = main.appendChild(buildColums("col-lg-12"))
        mainTitle.appendChild(buildTitle(item.name))

        let mainDescription =  main.appendChild(buildColums("col-lg-12"))
        let rowDescription = mainDescription.appendChild(buildRow("align-items-center"))

        //Constroi a qtd
        let colDescription = rowDescription.appendChild(buildColums("col-lg-4"))
        colDescription.appendChild(buildLabelQtd(item.quantity))

        let colValue = rowDescription.appendChild(buildColums("col-lg-6"))
        colValue.appendChild(buildLabelMoney(item.bestPriceFormated))
    })
    document.getElementById("total-value").innerText = numberToReal(totalValue)
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


function numberToReal(numero) {
    numberFormated = []
    
    var firstPart = numero.toString();
    firstPart = firstPart.substring(0,firstPart.length-2)
    numberFormated.push(firstPart)

    var seccondPart = numero.toString()
    seccondPart = seccondPart.substring(seccondPart.length,seccondPart.length-2)
    numberFormated.push(seccondPart)
    
    numberFormated[0] = "R$ " + numberFormated[0].split(/(?=(?:...)*$)/).join('.');
    return numberFormated.join(',');
}