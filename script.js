// Get DOM elements
const form = document.getElementById('cost-estimator-form');
const resultDiv = document.getElementById('cost-estimation-result');

// Listen for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get user inputs
  var name = form.elements['name'].value;
  var email = form.elements['email'].value;
  var checkInDate = new Date(form.elements['check-in-date'].value);
  var numberOfNights = parseInt(form.elements['number-of-nights'].value);
  var roomType = form.elements['room-type'].value;
  var numberOfAdults = parseInt(form.elements['number-of-adults'].value);
  var numberOfChildren = parseInt(form.elements['number-of-children'].value);
  var discountType = form.elements['discounts'].value;
  var birthdate = new Date(form.elements['birthdate'].value);
  const taxRate = 0.12;

  // Validate birthdate if senior discount or military discount selected
  if (discountType === 'senior' || discountType === 'aaa' || discountType === 'military') {
    if (!birthdate || isNaN(birthdate.getTime())) {
      showError('You must enter your birthdate to select a discount.');
      return;
    }
    const ageInYears = getAgeInYears(birthdate, checkInDate);
    if (discountType === 'senior' && ageInYears < 65) {
      showError('You must be at least 65 years old to select the Senior Discount.');
      return;
    } else if (discountType === 'aaa' && ageInYears < 18) {
      showError('You must be at least 18 years old to select the AAA Discount.');
      return;
    } else if (discountType === 'military' && ageInYears < 17) {
      showError('You must be at least 17 years old to select the Military Discount.');
      return;
    }
  }
  
  var discountRate = getDiscountRate(discountType);

  // Calculate cost per night
  const baseCosts = {
    queen: 150,
    king: 150,
    '2-bedroom-suite': 210,
  };
  const baseCost = baseCosts[roomType];
  const numberOfGuests = numberOfAdults + numberOfChildren;
  var costPerNight = baseCost;
  if (roomType === 'queen' && numberOfGuests > 5 ||
      roomType === 'king' && numberOfGuests > 2 ||
      roomType === '2-bedroom-suite' && numberOfGuests > 6) {
    showError('The room you selected will not hold your party.');
    return;
  }

  // Calculate total cost
  var isJuneJulyAugust = checkInDate.getMonth() >= 6 && checkInDate.getMonth() <= 8;
  var summerCost = 0;
  if (isJuneJulyAugust) {
      summerCost = 40;
      if (roomType === 'queen' || roomType === 'king') {
          summerCost = 55;
      }
  }
  var totalWithoutTax = (costPerNight + summerCost) * numberOfNights;
  var subtotal = totalWithoutTax * (1 - discountRate);
  var discountAmount = totalWithoutTax * discountRate;
  var taxAmount = subtotal * taxRate;
  var totalCost = subtotal + taxAmount;

  // Display result
  var discountText = (discountRate * 100).toFixed(0) + '%';
  var taxText = (taxRate * 100).toFixed(0) + '%';
  var confirmationNumber = generateConfirmationNumber();
  resultDiv.innerHTML = `
    <p>Thank you for choosing our hotel, ${name}!</p>
    <p>Your reservation for ${numberOfNights} nights in a ${roomType} room for ${numberOfAdults} adult(s) and ${numberOfChildren} child(ren) will cost:</p>
    <ul>
      <li>Base cost per night: $${baseCost.toFixed(2)}</li>
      ${summerCost ? `<li>Summer surcharge: $${summerCost.toFixed(2)}</li>` : ''}
      <li>Number of nights: ${numberOfNights}</li>
      <li>Subtotal: $${subtotal.toFixed(2)}</li>
      <li>Discount (${discountText}): -$${discountAmount.toFixed(2)}</li>
      <li>Tax (${taxText}): $${taxAmount.toFixed(2)}</li>
      <li><strong>Total: $${totalCost.toFixed(2)}</strong></li>
      <li>Confirmation number: ${confirmationNumber}</li>;
    </ul>
    <p>We will send your reservation confirmation to ${email}. Thank you for your business!</p>
  `;
});

// Helper functions
function getAgeInYears(birthdate, checkInDate) {
  var ageInMilliseconds = checkInDate.getTime() - birthdate.getTime();
  var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  return Math.floor(ageInMilliseconds / millisecondsInYear);
}

function getDiscountRate(discountType) {
  var discountRates = {
    none: 0,
    aaa: 0.1,
    senior: 0.1,
    military: 0.2,
  };
  return discountRates[discountType];
}

function showError(errorMessage) {
  resultDiv.innerHTML = `<p class="error">${errorMessage}</p>`;
}

function generateConfirmationNumber() {
    let name = document.getElementById("name").value.substr(0, 3);
    let checkInDate = document.getElementById("check-in-date").value;
    let numberOfNights = document.getElementById("number-of-nights").value;
    let numberOfAdults = document.getElementById("number-of-adults").value;
    let numberOfChildren = document.getElementById("number-of-children").value;
    let checkInDateFormatted = checkInDate.substr(0, 7);
    let checkInMonth = checkInDateFormatted.substr(5, 2);
    let checkInYear = checkInDateFormatted.substr(0, 4);
    let confirmationNumber = name + "-" + checkInMonth + checkInYear + "-" + numberOfNights + ":" + numberOfAdults + ":" + numberOfChildren;
    return confirmationNumber;
}