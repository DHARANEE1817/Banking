document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const transactionType = document.getElementById('transactionType').value;
    let balance = 1000; // Example balance

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('message').innerHTML = 'Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one alphanumeric character.';
        return;
    }

    if (!/^[A-Za-z0-9]{16}$/.test(accountNumber)) {
        document.getElementById('message').innerHTML = 'Please enter a valid 16-character alphanumeric account number.';
        return;
    }

    const maskedAccountNumber = accountNumber.slice(0, 4) + '********' + accountNumber.slice(-4);
    let message = '';

    if (transactionType === 'deposit') {
        balance += amount;
        message = `Deposited Rs${amount.toFixed(2)} to account ${maskedAccountNumber}.<br>New balance: Rs${balance.toFixed(2)}.`;
    } else if (transactionType === 'withdrawal') {
        if (amount > balance) {
            message = "Can't proceed, insufficient balance.";
        } else {
            balance -= amount;
            message = `Withdrew Rs${amount.toFixed(2)} from account ${maskedAccountNumber}.<br>New balance: $${balance.toFixed(2)}.`;
        }
    }

    document.getElementById('message').innerHTML = message;
});
