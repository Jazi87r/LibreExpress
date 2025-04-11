function generateReceipt() {
    const method = document.getElementById('paymentMethod').value;
    const name = document.getElementById('name').value.trim();
    const amount = document.getElementById('amount').value.trim();
  
    if (!name || !amount) {
      alert("Please enter all details.");
      return;
    }
  
    const receiptText = `
      <strong>Name:</strong> ${name}<br>
      <strong>Payment Method:</strong> ${method}<br>
      <strong>Amount Paid:</strong> $${parseFloat(amount).toFixed(2)}<br>
      <strong>Date:</strong> ${new Date().toLocaleString()}
    `;
  
    document.getElementById('receiptDetails').innerHTML = receiptText;
    document.getElementById('receipt').style.display = 'block';
  }
  