

const form = document.querySelector("#login-form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const data = {
        email, password
    }
    const urlEncodedData = new URLSearchParams(data).toString();
    const response = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData
    })
    if (response.status == 200) {
        window.location.href = "./index.html"
    }


})


const signUpFormSubmit = () => {
    console.log("Login click")
}

