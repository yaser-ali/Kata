//Remove items
var removeItemBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeItemBtn.length; i++) {
    var button = removeItemBtn[i];
    button.addEventListener('click', removeItems);
}

//Quantity
var quantityIn = document.getElementsByClassName('quantity-input');
for (var i = 0; i < quantityIn; i++) {
    var input = quantityIn[i];
    input.addEventListener('change', quantityChanged);
}

//Items
var addToCartBtn = document.getElementsByClassName('item-add');
for (var i = 0; i < addToCartBtn.length; i++) {
    var button = addToCartBtn[i];
    button.addEventListener('click', addToCartClicked);
}

document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchase);

function purchase() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeItems(event) {
    //Event parameter for when a button has been clicked which will imediately trigger an event.
    var buttonClicked = event.target;
    //Two parent elements because it removes the title, price and quantity elements.
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

function addToCartClicked(event) {
    var btn = event.target;
    var item = btn.parentElement;
    var title = item.getElementsByClassName("title")[0].innerText;
    var price = item.getElementsByClassName("price")[0].innerText;
    AddItemToCart(title, price);
    updateCartTotal();
}

function AddItemToCart(title, price) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('row');

    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemName = cartItems.getElementsByClassName('cart-item-title');

    //Checks to see if an item name has been added to the cart already.
    for (var i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText === title) {
            alert('This item is already in the cart');
            return;
        }
    }

    var cartContent = `<div class="cart-col-Title">
        <span class="cart-item-title">${title}</span>
        </div>
        <label for="cart-price">Price:</label>
        <span class="cart-price">£${price}</span>
        <div class="cart-col-quantity">
        <label for="cart-quantity">Quantity:</label>
        <input type="number" class="quantity-input" name="quantity-input" value="1">
        <button class="remove-btn">Remove</button>
        </div>`;
    cartRow.innerHTML = cartContent;
    localStorage.setItem(cartContent, cartRow);
    localStorage.getItem(cartRow);
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItems);
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged);

}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceValue = cartRow.getElementsByClassName('cart-price')[0];
        var quantityValue = cartRow.getElementsByClassName('quantity-input')[0];
        var price = parseFloat(priceValue.innerHTML.replace('£', ''));
        var quantity = quantityValue.value;
        total = total + (price * quantity);

        var cartTitle = cartRow.getElementsByClassName('cart-item-title')[0];
    
        if (cartTitle.innerText == "A" && quantityValue.value >= 3 || quantityValue.value > 3) {
            total = total - 0.20;
        }
        else if (cartTitle.innerText == "B" && quantityValue.value >= 2 || quantityValue.value > 2) {
            total = total - 0.15;
        }
        else if (cartTitle.innerText == "A" && quantityValue.value >= 3 && cartTitle.innerText == 'B' && quantityValue.value >= 2)
        {
            total = total - 0.20;
        }
        else {
            // if the above conditional statements don't reach to the exact value.
        }
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total')[0].innerText = '£' + total;
}

