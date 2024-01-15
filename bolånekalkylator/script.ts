interface Mortgage {
    loan: number;
    interestRate: number;
    repaymentPeriod: number;
}




// calculate the monthly payment using the formula
function calculateMonthlyPayment(loan: number, interestRate: number, repaymentPeriod: number): number {
    const numerator = loan * interestRate * Math.pow(1 + interestRate, repaymentPeriod);
    const denominator = Math.pow(1 + interestRate, repaymentPeriod) - 1;
    const monthlyPayment = numerator / denominator;

    return monthlyPayment;
}

// To calculate the total interest paid in the long term
function calculateTotalInterest(mortgage: Mortgage, monthlyFee: number): number {
    const timesOfPayments = mortgage.repaymentPeriod * 12;
    return (monthlyFee * timesOfPayments) - mortgage.loan;
}


// generate the amortization schedule!
function generateSchedule(mortgage: Mortgage, monthlyFee: number): string {
    let time = '<tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>';
    let balance = mortgage.loan;

    for (let month = 1; month <= mortgage.repaymentPeriod ; month++) {
        const Interest = balance * mortgage.interestRate / 100 / 12;
        const principal = monthlyFee - Interest;
        balance -= principal;

        time += `<tr><td>${month}</td><td>${principal.toFixed(2)}</td><td>${Interest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`;
    }

    return time;
}

// defining elements for functions
function calculateMortgage() {
    const loanInput = <HTMLInputElement>document.getElementById('loan');
    const interestInput = <HTMLInputElement>document.getElementById('interestRate');
    const repaymentInput = <HTMLInputElement>document.getElementById('repaymentPeriod');
    

    const loan = parseFloat(loanInput.value); 
    const interestRate = parseFloat(interestInput.value);
    const repaymentPeriod = parseFloat(repaymentInput.value);
console.log("after parsing");

// to validate inputs
    if (isNaN(loan) || isNaN(interestRate) || isNaN(repaymentPeriod) || loan <= 0 || interestRate <= 0 || repaymentPeriod <= 0) {
        alert('Please enter valid numbers');
        return;
    }
    console.log("valid numbers");
    const mortgage: Mortgage = {loan, interestRate, repaymentPeriod};
    const monthlyPayment = calculateMonthlyPayment( loan, interestRate, repaymentPeriod);
    const totalInterest = calculateTotalInterest(mortgage, monthlyPayment);
    const schedule = generateSchedule(mortgage, monthlyPayment);
    console.log("calculate finished")
// displaying the results
    document.getElementById('monthlyFee')!.innerText = `Your monthly payment: $${monthlyPayment.toFixed(2)}`;
    document.getElementById('totalInterest')!.innerText = `Your total interest: $${totalInterest.toFixed(2)}`;
    document.getElementById('amortization')!.innerHTML = schedule;

// showing the result
    document.getElementById('result')!.style.display = 'block';

}

document.addEventListener('DOMContentLoaded', function() {
    var myButton = document.getElementById('clickButton');
    if (myButton) {
        myButton.addEventListener('click', function(event) {
            event.preventDefault()
            console.log("sista steget")
        calculateMortgage();
        });
    } else {
        console.error('Button element not found');
    }
});