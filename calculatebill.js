function calculateBill(bill) {
    let totalBillAmount = 0;
    let billItems = [];
  
    bill.billItems.forEach(billItem => {
      const menuItem = menu.find(item => item.id === billItem.id);
  
      if (menuItem) {
        let basePrice = Math.round(menuItem.rate);
        const quantity = billItem.quantity;
        const discount = billItem.discount;
  
        let discountedPrice = discount.isInPercent 
          ? basePrice - (basePrice * (discount.rate / 100)) 
          : basePrice - discount.rate;
  
        let finalPricePerItem = discountedPrice;
        menuItem.taxes.forEach(tax => {
          finalPricePerItem += tax.isInPercent 
            ? discountedPrice * (tax.rate / 100) 
            : tax.rate;
        });
  
        finalPricePerItem = parseFloat(finalPricePerItem.toFixed(2));
        const itemTotal = parseFloat((finalPricePerItem * quantity).toFixed(2));
        totalBillAmount += itemTotal;
  
        const itemInfo = `${menuItem.itemName}@${basePrice} x ${quantity} = ${itemTotal.toFixed(2)}`;
        billItems.push(itemInfo);
      }
    });
  
    totalBillAmount = totalBillAmount.toFixed(2);
    return [totalBillAmount, billItems];
  }
  