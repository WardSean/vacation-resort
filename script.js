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

  // Calculate total cost
  const baseCosts = {
    queen: 100,
    king: 120,
    '2-bedroom-suite': 200,
  };
  const baseCost = baseCosts[roomType];
  const numberOfGuests = parseInt(numberOfAdults) + parseInt(numberOfChildren);
  const discountRates = {
    none: 0,
    aaa: 0.1,
    senior: 0.15,
    military: 0.2,
  };
  const discountRate = discountRates[discounts];
  const subtotal = baseCost * numberOfNights * numberOfGuests;
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
    <h4>Total cost: $${totalCost.toFixed(2)}</h4>
  `;
});
