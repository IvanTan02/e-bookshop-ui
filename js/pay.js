window.onload = () => {

    // Get card details from the form
    const getCardDetails = () => {
        const cardDetails = {
            master_card: document.querySelector('#card-number').value.replace(/\s/g, ''),
            exp_year: document.querySelector('#exp-year').value,
            exp_month: document.querySelector('#exp-month').value,
            cvv_code: document.querySelector('#sec-code').value
        };
        return cardDetails;
    }

    // Validate the card details and send details to server
    const validateCard = () => {
        let card = getCardDetails();
        if (checkCardNum(card.master_card) && checkSecCode(card.cvv_code) && checkExpired(card.exp_month, card.exp_year))
            sendToServer(card);
        else
            alert('The card details you entered are invalid or expired, please refill the form.');
    }

    // Check format and length of card number
    const checkCardNum = (cardNum) => {
        let pattern = /^5[1-5][0-9]{14}$/;
        return cardNum.match(pattern);
    }

    // Check if card is expired
    const checkExpired = (expMonth, expYear) => {
        date = new Date();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();

        if (expYear < currentYear) return false;

        if (expYear > currentYear)
            return true;
        else
            if (expMonth >= currentMonth)
                return true;
            else
                return false;
    }

    // Check length of security code
    const checkSecCode = (secCode) => {
        let pattern = /^[0-9]{3,4}$/;
        return secCode.match(pattern);
    }

    // Send card to server and gets its response 
    const sendToServer = async (card) => {
        let response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
            method: "POST",
            body: JSON.stringify(card),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (response.status === 200) {
            let res = await response.json();
            localStorage.setItem("cardNumber", res.data.master_card);
            localStorage.setItem("resMsg", res.message);
            location.replace('success.html');
        } else {
            alert(`ERROR: Server responds with STATUS CODE ${response.status} (${response.statusText}).`);
        }
    }

    // Add event listener to checkout button
    const checkoutBtn = document.querySelector('#checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', validateCard);
    }

    // Automatic space every 4 characters for the credit card number
    document.querySelector('#card-number').addEventListener('keydown', (e) => {
        e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2')
    })
}







