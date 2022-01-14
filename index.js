const amount = document.querySelector("#amount");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const swap = document.querySelector("#swap");
const result = document.querySelector("#result")
const form = document.querySelector("form")

function convert() {
    fetch(`https://v6.exchangerate-api.com/v6/86ef3b3bcca802b90a1ea572/latest/${from.value}`)
        .then(response => response.json()
        .then(data => {
            if (amount.value == 1) {
                result.innerHTML = `${amount.value} ${from.value} is equal to ${(amount.value * data.conversion_rates[to.value]).toFixed(2)} ${to.value}.`;
            }
            else {
                result.innerHTML = `${amount.value} ${from.value} are equal to ${(amount.value * data.conversion_rates[to.value]).toFixed(2)} ${to.value}.`;
            }
        }))
        .catch(error => {
            result.innerHTML = "Oops! Something went wrong! Try again.";
        })
}

convert();

swap.addEventListener("click", function () {
    let current = from.value;
    from.value = to.value;
    to.value = current;
    convert();
})

form.addEventListener("submit", function (event) {
    event.preventDefault();
    convert();
});