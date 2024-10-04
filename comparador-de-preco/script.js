const searchForm = document.querySelector(".searchForm");
const productList = document.querySelector(".productList");
const priceChart = document.querySelector(".priceChart")

let myChart = ""


searchForm.addEventListener("submit", async function(event){
    event.preventDefault();
    const inputValue = event.target[0].value;

    const endpointProducts = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)

    const data = (await endpointProducts.json()).results.slice(0, 10)

    displayItems(data)
    updatePriceChart(data)
})



function displayItems (data) {
    productList.innerHTML = data.map(product => `
        <div class="productCard">
            <img src="${product.thumbnail}" />
            <h3>${product.title}</h3>
            <p>${product.price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</p>
        </div>
        
        `).join("")
}

function updatePriceChart(data){
    const ctx =  priceChart.getContext("2d");

    if (myChart){
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map( product => product.title.substring(0, 20) + "..."),
            datasets: [{
                label: "Preço (R$)",
                data: data.map( product => product.price),
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        }
    })
}