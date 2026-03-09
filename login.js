// sign in
const signIn = () => {
    const userInput = document.getElementById('userInput');
    const username = userInput?.value;
    const passInput = document.getElementById('passInput');
    const password = passInput?.value;
    console.log('sign in sucess...', username, password);

    if(username === 'admin' && password === 'admin123'){
        window.location.href="dashboard.html";
    }
};