const form = document.getElementById('cost-estimator-form');
const resultDiv = document.getElementById('cost-estimation-result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get user inputs
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const checkInDate = form.elements['check-in-date'].value;
    const numberOfNights = form.elements['number-of-nights'].value;
    const roomType = form.elements['room-type'].value;
    const numberOfAdults = form.elements['number-of-adults'].value;
    const numberOfChildren = form.elements['number-of-children'].value;
    const discounts = form.elements['discounts'].value;

    // June - August Checker
    const jun_aug_verify = (checkInDate(month) >= 6 && checkInDate(month) <= 8);
    const jun_aug_cost = 0;
    if (jun_aug_verify) {
        jun_aug_cost = 100;
        if (roomType == queen || roomType == king) {
            jun_aug_cost = 140;
        }
    }

    // Calculate total cost
    const baseCosts = {
        queen: 150 + jun_aug_cost,
        king: 150 + jun_aug_cost,
        '2-bedroom-suite': 210 + jun_aug_cost,
    };
    const baseCost = baseCosts[roomType];
    const numberOfGuests = parseInt(numberOfAdults) + parseInt(numberOfChildren);
    const discountRates = {
        none: 0,
        aaa: 0.1,
        senior: 0.1,
        military: 0.2,
    };
    const tax = 0.12;
    const discountRate = discountRates[discounts];
    const subtotal = baseCost * numberOfNights;
    const discountAmount = subtotal * discountRate;
    const totalCost = subtotal - discountAmount;

    // Display result
    resultDiv.innerHTML = `
    <h3>Estimation for ${name} (${email})</h3>
    <p>Check-in date: ${checkInDate}</p>
    <p>Number of nights: ${numberOfNights}</p>
    <p>Room type: ${roomType}</p>
    <p>Number of guests: ${numberOfGuests}</p>
    <p>Discounts: ${discounts}</p>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Discount amount: $${discountAmount.toFixed(2)}</p>
    <p>Tax: $${totalCost.toFixed(2) * tax} </h4>
    <h4>Total cost: $${totalCost.toFixed(2) + (totalCost.toFixed(2) * tax)}</h4>
  `;
    if (((roomType == queen) && (numberOfGuests > 5)) || ((roomType == king) && (numberOfGuests > 2)) || ((roomType == '2-bedroom-suite') && (numberOfGuests > 6))) {
        resultDiv.innerHTML = '"The room you selected will not hold your party"'
    }
});

