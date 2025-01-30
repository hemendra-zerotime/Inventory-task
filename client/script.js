const loginFormSubmit = () => {

    fetch('/products/123', {
        method: 'post',
    })

        .then(response => response.json())
        // Handling the data obtained from the response
        .then(data => {
            // Update UI with product details from the response
        });

}
const lsignUpFormSubmit = () => {
    console.log("Login click")
}