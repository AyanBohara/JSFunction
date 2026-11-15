//Shoppping cart

function calTotal(price, quantity) {
    if (price <= 0 || quantity <= 0) {
        throw new Error("Price & Quantity never be 0");
    }
    return price * quantity;
}

const total = calTotal(2, 3)
console.log(`Total price: Rs. ${total}`);

// Meaningful name: calculateTotal clearly describes what the function does.

// Parameters: price and quantity make the function reusable.
// Validation: We prevent negative values.
// Error handling: We throw an error when invalid input is provided.
// Return: We return the calculated result instead of directly printing it.
// Template literals: We use backticks to combine text and values.