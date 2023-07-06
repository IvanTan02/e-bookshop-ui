window.onload = () => {
    const cardDisplay = document.getElementById('card-display');
    const resMsg = document.getElementById('res-msg');
    let cardNum = localStorage.getItem('cardNumber');

    // Display response message from server
    resMsg.innerText = `Response from server: \"${localStorage.getItem('resMsg')}\"`;

    // Display last 4 digits of card number
    cardDisplay.innerText = `Your credit card number ends in **** **** **** ${cardNum.substring(11, 15)}`;

}