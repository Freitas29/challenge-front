document.getElementById('card-button').addEventListener('click', () => {
    let card = document.getElementById('card')

    if(card.style.display === "block")
        card.style.display = "none"
    else
        card.style.display = "block"
})