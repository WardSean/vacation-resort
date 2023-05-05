// Wait for the document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function(event) { 
    // Get references to the radio buttons and their respective content elements
    var payAsYouGoRadio = document.getElementById("pay-as-you-go");
    var payAsYouGoContent = document.getElementById("pay-as-you-go-content");
    var allInclusiveRadio = document.getElementById("all-inclusive");
    var allInclusiveContent = document.getElementById("all-inclusive-content");
  
    // Show the pay-as-you-go content by default
    payAsYouGoContent.style.display = "block";
  
    // When the pay-as-you-go radio button is clicked, show its content and hide the all-inclusive content
    payAsYouGoRadio.addEventListener("click", function() {
      payAsYouGoContent.style.display = "block";
      allInclusiveContent.style.display = "none";
    });
  
    // When the all-inclusive radio button is clicked, show its content and hide the pay-as-you-go content
    allInclusiveRadio.addEventListener("click", function() {
      allInclusiveContent.style.display = "block";
      payAsYouGoContent.style.display = "none";
    });
  });
  function calculateDiningCost() {
    var confirmationNumber = document.getElementById("confirmation-number").value;
    var overnightCost = JSON.parse(localStorage.getItem(confirmationNumber));
    if (overnightCost) {
      var days = overnightCost.days;
      var adults = overnightCost.adults;
      var children = overnightCost.children;
      var diningCost = (days * adults * 3) + (days * children * 2);
      var totalCost = overnightCost.totalCost + diningCost;
      var message = "The all-inclusive option has been added to your reservation. The price of your stay has increased by $" + diningCost.toFixed(2) + " based on your selections here.";
      document.getElementById("dining-cost-message").innerHTML = message;
      overnightCost.totalCost = totalCost;
      localStorage.setItem(confirmationNumber, JSON.stringify(overnightCost));
    } else {
      alert("Invalid confirmation number.");
    }
  }