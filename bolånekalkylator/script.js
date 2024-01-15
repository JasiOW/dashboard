// calculate the monthly payment using the formula
function calculateMonthlyPayment(loan, interestRate, repaymentPeriod) {
    var numerator = loan * interestRate * Math.pow(1 + interestRate, repaymentPeriod);
    var denominator = Math.pow(1 + interestRate, repaymentPeriod) - 1;
    var monthlyPayment = numerator / denominator;
    return monthlyPayment;
}
// To calculate the total interest paid in the long term
function calculateTotalInterest(mortgage, monthlyFee) {
    var timesOfPayments = mortgage.repaymentPeriod * 12;
    return (monthlyFee * timesOfPayments) - mortgage.loan;
}
// generate the amortization schedule!
function generateSchedule(mortgage, monthlyFee) {
    var time = '<tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>';
    var balance = mortgage.loan;
    for (var month = 1; month <= mortgage.repaymentPeriod; month++) {
        var Interest = balance * mortgage.interestRate / 100 / 12;
        var principal = monthlyFee - Interest;
        balance -= principal;
        time += "<tr><td>".concat(month, "</td><td>").concat(principal.toFixed(2), "</td><td>").concat(Interest.toFixed(2), "</td><td>").concat(balance.toFixed(2), "</td></tr>");
    }
    return time;
}
// defining elements for functions
function calculateMortgage() {
    var loanInput = document.getElementById('loan');
    var interestInput = document.getElementById('interestRate');
    var repaymentInput = document.getElementById('repaymentPeriod');
    var loan = parseFloat(loanInput.value);
    var interestRate = parseFloat(interestInput.value);
    var repaymentPeriod = parseFloat(repaymentInput.value);
    console.log("after parsing");
    // to validate inputs
    if (isNaN(loan) || isNaN(interestRate) || isNaN(repaymentPeriod) || loan <= 0 || interestRate <= 0 || repaymentPeriod <= 0) {
        alert('Please enter valid numbers');
        return;
    }
    console.log("valid numbers");
    var mortgage = { loan: loan, interestRate: interestRate, repaymentPeriod: repaymentPeriod };
    var monthlyPayment = calculateMonthlyPayment(loan, interestRate, repaymentPeriod);
    var totalInterest = calculateTotalInterest(mortgage, monthlyPayment);
    var schedule = generateSchedule(mortgage, monthlyPayment);
    console.log("calculate finished");
    // displaying the results
    document.getElementById('monthlyFee').innerText = "Your monthly payment: $".concat(monthlyPayment.toFixed(2));
    document.getElementById('totalInterest').innerText = "Your total interest: $".concat(totalInterest.toFixed(2));
    document.getElementById('amortization').innerHTML = schedule;
    // showing the result
    document.getElementById('result').style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('clickButton');
    if (myButton) {
        myButton.addEventListener('click', function (event) {
            event.preventDefault();
            console.log("sista steget");
            calculateMortgage();
        });
    }
    else {
        console.error('Button element not found');
    }
});
