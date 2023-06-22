let pizzaData;

function saveDataToLocalStorage() {
  const products = document.querySelectorAll('.grid-container');
  const data = [];

  products.forEach((product, index) => {
    const nameElement = product.querySelector('.row1.orange-font1');
    const sizeElement = product.querySelector('.detail-value-small');
    const weightElement = product.querySelector('.detail-value-small img');
    const priceElement = product.querySelector('.price');
    const quantityElement = product.querySelector('.number');
    const imageElement = product.querySelector('.column-img');

    const name = nameElement.textContent;
    const size = sizeElement.textContent;
    const weight = weightElement.nextSibling.textContent;
    const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, '').trim());
    const quantity = quantityElement.textContent;
    const image = imageElement.getAttribute('src');

    data.push({
      name: name,
      size: size,
      weight: weight,
      price: price,
      quantity: quantity,
      image: image
    });
  });

  localStorage.setItem('productData', JSON.stringify(data));
}

window.addEventListener('beforeunload', saveDataToLocalStorage);

function retrieveDataFromLocalStorage() {
  const data = localStorage.getItem('productData');

  if (data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing product data:', error);
      return;
    }

    if (Array.isArray(parsedData)) {
      parsedData.forEach((product) => {
        const name = product.name;
        const size = product.size;
        const weight = product.weight;
        const price = product.price;
        const quantity = product.quantity;
        const image = product.image;

        console.log(`Назва: ${name}`);
        console.log(`Розмір: ${size}`);
        console.log(`Вага: ${weight}`);
        console.log(`Ціна: ${price}`);
        console.log(`Кількість: ${quantity}`);
        console.log(`Зображення: ${image}`);
        addToSidebarLoad(name, size, weight, price, quantity, image);
      });
    } else {
      console.error('Invalid product data format.');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  retrieveDataFromLocalStorage();
});

function loadPizzaInfo() {
  const scriptElement = document.createElement('script');
  scriptElement.src = 'Pizza_List.js';

  scriptElement.onload = function () {
    displayPizzaInfo(pizza_info);
    pizzaData = pizza_info;
  };

  document.body.appendChild(scriptElement);
}

function displayPizzaInfo(pizzaInfo) {
  let i = 0;

  pizzaInfo.forEach((pizza) => {
    console.log(`ID: ${pizza.id}`);
    console.log(`Назва: ${pizza.title}`);
    console.log(`Тип: ${pizza.type}`);

    let ingredients = Object.values(pizza.content)
      .flat()
      .map((ingredient, index) => (index === 0 ? ingredient : ingredient.toLowerCase()))
      .join(', ');

    ingredients = ingredients.charAt(0).toUpperCase() + ingredients.slice(1);

    console.log(`Інгридієнти: ${ingredients}`);

    if (pizza.small_size) {
      console.log(`Маленький розмір:`);
      console.log(`- Діаметр: ${pizza.small_size.size} см`);
      console.log(`- Вага: ${pizza.small_size.weight} г`);
      console.log(`- Ціна: ${pizza.small_size.price} грн`);
    }

    if (pizza.big_size) {
      console.log(`Великий розмір:`);
      console.log(`- Діаметр: ${pizza.big_size.size} см`);
      console.log(`- Вага: ${pizza.big_size.weight} г`);
      console.log(`- Ціна: ${pizza.big_size.price} грн`);
    }

    addPizzaToWrapperFiltered(pizza, "");

    i++;

    console.log('-----------------------');
  });

  const quantity = document.querySelector('.quantity');

  quantity.textContent = i;

  return i;
}

document.addEventListener('DOMContentLoaded', loadPizzaInfo);

document.addEventListener('DOMContentLoaded', function() {
  const clearButton = document.querySelector('.small-text');

  clearButton.addEventListener('click', function() {
    console.log('Work');
    const gridContainers = document.querySelectorAll('.grid-container');
    gridContainers.forEach(function(gridContainer) {
      gridContainer.parentNode.removeChild(gridContainer);
    });
    totalPrice = 0;
    totalQuantity = 0;
    const totalQuantityElement = document.querySelector('.circle');
    const totalPriceElement = document.querySelector('.header-right');
    totalQuantityElement.textContent = '0';
    totalPriceElement.textContent = '0 грн.';
  });
});

function displayPizzaInfoFiltered(pizzaData, filter, pizzaTypeFilter) {
  let i = 0;

  pizzaData.forEach((pizza) => {
    console.log(`ID: ${pizza.id}`);
    console.log(`Название: ${pizza.title}`);
    console.log(`Тип: ${pizza.type}`);

    if (!(filter in pizza.content) && (pizza.type !== pizzaTypeFilter)) {
      console.log("REJECTED!!!");
      return;
    }

    let ingredients = Object.values(pizza.content)
      .flat()
      .map((ingredient, index) => (index === 0 ? ingredient : ingredient.toLowerCase()))
      .join(', ');

    ingredients = ingredients.charAt(0).toUpperCase() + ingredients.slice(1);

    console.log(`Ингредиенты: ${ingredients}`);

    if (pizza.small_size) {
      console.log(`Маленький размер:`);
      console.log(`- Диаметр: ${pizza.small_size.size} см`);
      console.log(`- Вес: ${pizza.small_size.weight} г`);
      console.log(`- Цена: ${pizza.small_size.price} грн`);
    }

    if (pizza.big_size) {
      console.log(`Большой размер:`);
      console.log(`- Диаметр: ${pizza.big_size.size} см`);
      console.log(`- Вес: ${pizza.big_size.weight} г`);
      console.log(`- Цена: ${pizza.big_size.price} грн`);
    }

    addPizzaToWrapper(pizza);

    i++;

    console.log('-----------------------');
  });

  const quantity = document.querySelector('.quantity');

  quantity.textContent = i;

  return i;
}

document.addEventListener('DOMContentLoaded', loadPizzaInfo);

  ////////////////////////////////////////////////////////////////

  function addPizzaToWrapper(pizza) {
    const pizzaContainer = document.createElement('section');
    pizzaContainer.className = 'pizza-container';
  
    if (pizza.is_new) {
      const newBadge = document.createElement('div');
      newBadge.className = 'new-badge';
      pizzaContainer.appendChild(newBadge);
    } else if (pizza.is_popular) {
      const newBadge = document.createElement('div');
      newBadge.className = 'popular-badge';
      pizzaContainer.appendChild(newBadge);
    }
  
    const pizzaImage = document.createElement('div');
    pizzaImage.className = 'pizza-image';
    pizzaImage.style.backgroundImage = "url('" + pizza.icon + "')";
    pizzaContainer.appendChild(pizzaImage);
  
    const pizzaName = document.createElement('div');
    pizzaName.className = 'pizza-name';
    pizzaName.textContent = pizza.title;
    pizzaContainer.appendChild(pizzaName);
  
    const pizzaType = document.createElement('div');
    pizzaType.className = 'pizza-type';
    pizzaType.textContent = pizza.type;
    pizzaContainer.appendChild(pizzaType);
  
    const pizzaDescription = document.createElement('div');
    pizzaDescription.className = 'pizza-description';
    const contentArray = Object.values(pizza.content);
    let flattenedContent = [].concat(...contentArray);
    flattenedContent = flattenedContent.join(', ');
    pizzaDescription.textContent = flattenedContent.charAt(0).toUpperCase() + flattenedContent.slice(1);
    pizzaContainer.appendChild(pizzaDescription);
  
    const pizzaDetails = document.createElement('section');
    pizzaDetails.className = 'pizza-details';
  
    if (!pizza.big_size || !pizza.small_size) {
      pizzaDetails.style.gridTemplateColumns = 'repeat(1, 1fr)';
      pizzaDetails.style.justifySelf = 'center';
      pizzaDetails.style.marginLeft = '25%';
      pizzaDetails.style.marginRight = '25%';
    }
  
    if (pizza.small_size) {
      const smallSizeColumn = document.createElement('div');
      smallSizeColumn.className = 'detail-column';
  
      const smallSizeGrid = document.createElement('div');
      smallSizeGrid.className = 'detail-grid';
  
      const smallSizeDiameter = document.createElement('div');
      smallSizeDiameter.className = 'detail-row detail-row-grid';
      smallSizeDiameter.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizza.small_size.size + '</div>';
      smallSizeGrid.appendChild(smallSizeDiameter);
  
      const smallSizeWeight = document.createElement('div');
      smallSizeWeight.className = 'detail-row detail-row-grid';
      smallSizeWeight.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizza.small_size.weight + '</div>';
      smallSizeGrid.appendChild(smallSizeWeight);
  
      const smallSizePrice = document.createElement('div');
      smallSizePrice.className = 'detail-row detail-row-grid';
      smallSizePrice.innerHTML = '<div class="detail-price"><strong>' + pizza.small_size.price + '</strong><span>грн.</span></div>';
      smallSizeGrid.appendChild(smallSizePrice);
  
      const smallSizeBuyButton = document.createElement('div');
      smallSizeBuyButton.className = 'detail-row detail-row-grid';
      const smallSizeBuyButton1 = document.createElement('button');
      smallSizeBuyButton1.className = 'buy-button';
      smallSizeBuyButton1.textContent = 'Купити';
      smallSizeBuyButton.appendChild(smallSizeBuyButton1);
      smallSizeGrid.appendChild(smallSizeBuyButton);
  
      smallSizeBuyButton1.addEventListener('click', function () {
        const pizzaName = pizza.title;
        console.log("Купити маленький розмір " + pizzaName);
        addToSidebar(pizza.title + " (Мала)", "30", pizza.small_size.weight, pizza.small_size.price, pizza.icon);
      });
  
      smallSizeColumn.appendChild(smallSizeGrid);
      pizzaDetails.appendChild(smallSizeColumn);
    }
  
    if (pizza.big_size) {
      const bigSizeColumn = document.createElement('div');
      bigSizeColumn.className = 'detail-column';
  
      const bigSizeGrid = document.createElement('div');
      bigSizeGrid.className = 'detail-grid';
  
      const bigSizeDiameter = document.createElement('div');
      bigSizeDiameter.className = 'detail-row detail-row-grid';
      bigSizeDiameter.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizza.big_size.size + '</div>';
      bigSizeGrid.appendChild(bigSizeDiameter);
  
      const bigSizeWeight = document.createElement('div');
      bigSizeWeight.className = 'detail-row detail-row-grid';
      bigSizeWeight.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizza.big_size.weight + '</div>';
      bigSizeGrid.appendChild(bigSizeWeight);
  
      const bigSizePrice = document.createElement('div');
      bigSizePrice.className = 'detail-row detail-row-grid';
      bigSizePrice.innerHTML = '<div class="detail-price"><strong>' + pizza.big_size.price + '</strong><span>грн.</span></div>';
      bigSizeGrid.appendChild(bigSizePrice);
  
      const bigSizeBuyButton = document.createElement('div');
      bigSizeBuyButton.className = 'detail-row detail-row-grid';
      const bigSizeBuyButton1 = document.createElement('button');
      bigSizeBuyButton1.className = 'buy-button';
      bigSizeBuyButton1.textContent = 'Купити';
      bigSizeBuyButton.appendChild(bigSizeBuyButton1);
      bigSizeGrid.appendChild(bigSizeBuyButton);
  
      bigSizeBuyButton1.addEventListener('click', function () {
        const pizzaName = pizza.title;
        console.log("Купити великий розмір " + pizzaName);
        addToSidebar(pizza.title + " (Велика)", "40", pizza.big_size.weight, pizza.big_size.price, pizza.icon);
      });
  
      bigSizeColumn.appendChild(bigSizeGrid);
      pizzaDetails.appendChild(bigSizeColumn);
    }
  
    pizzaContainer.appendChild(pizzaDetails);
  
    const pizzasWrapper = document.querySelector('.pizzas-wrapper');
    pizzasWrapper.appendChild(pizzaContainer);
  }  

  ////////////////////////////////////////////////////////////////////

  function addPizzaToWrapperFiltered(pizza, pizzaTypeFilter) {
    if (!pizza.type.includes(pizzaTypeFilter)) {
      console.log("REJECT!!!");
      return;
    }
  
    const pizzaContainer = document.createElement('section');
    pizzaContainer.className = 'pizza-container';
  
    if (pizza.is_new) {
      const newBadge = document.createElement('div');
      newBadge.className = 'new-badge';
      pizzaContainer.appendChild(newBadge);
    } else if (pizza.is_popular) {
      const newBadge = document.createElement('div');
      newBadge.className = 'popular-badge';
      pizzaContainer.appendChild(newBadge);
    }
  
    const pizzaImage = document.createElement('div');
    pizzaImage.className = 'pizza-image';
    pizzaImage.style.backgroundImage = "url('" + pizza.icon + "')";
    pizzaContainer.appendChild(pizzaImage);
  
    const pizzaName = document.createElement('div');
    pizzaName.className = 'pizza-name';
    pizzaName.textContent = pizza.title;
    pizzaContainer.appendChild(pizzaName);
  
    const pizzaType = document.createElement('div');
    pizzaType.className = 'pizza-type';
    pizzaType.textContent = pizza.type;
    pizzaContainer.appendChild(pizzaType);
  
    const pizzaDescription = document.createElement('div');
    pizzaDescription.className = 'pizza-description';
    const contentArray = Object.values(pizza.content);
    let flattenedContent = [].concat(...contentArray);
    flattenedContent = flattenedContent.join(', ');
    pizzaDescription.textContent = flattenedContent.charAt(0).toUpperCase() + flattenedContent.slice(1);
    pizzaContainer.appendChild(pizzaDescription);
  
    const pizzaDetails = document.createElement('section');
    pizzaDetails.className = 'pizza-details';
  
    if (!pizza.big_size || !pizza.small_size) {
      pizzaDetails.style.gridTemplateColumns = 'repeat(1, 1fr)';
      pizzaDetails.style.justifySelf = 'center';
      pizzaDetails.style.marginLeft = '25%';
      pizzaDetails.style.marginRight = '25%';
    }
  
    if (pizza.small_size) {
      const smallSizeColumn = document.createElement('div');
      smallSizeColumn.className = 'detail-column';
  
      const smallSizeGrid = document.createElement('div');
      smallSizeGrid.className = 'detail-grid';
  
      const smallSizeDiameter = document.createElement('div');
      smallSizeDiameter.className = 'detail-row detail-row-grid';
      smallSizeDiameter.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizza.small_size.size + '</div>';
      smallSizeGrid.appendChild(smallSizeDiameter);
  
      const smallSizeWeight = document.createElement('div');
      smallSizeWeight.className = 'detail-row detail-row-grid';
      smallSizeWeight.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizza.small_size.weight + '</div>';
      smallSizeGrid.appendChild(smallSizeWeight);
  
      const smallSizePrice = document.createElement('div');
      smallSizePrice.className = 'detail-row detail-row-grid';
      smallSizePrice.innerHTML = '<div class="detail-price"><strong>' + pizza.small_size.price + '</strong><span>грн.</span></div>';
      smallSizeGrid.appendChild(smallSizePrice);
  
      const smallSizeBuyButton = document.createElement('div');
      smallSizeBuyButton.className = 'detail-row detail-row-grid';
      const smallSizeBuyButton1 = document.createElement('button');
      smallSizeBuyButton1.className = 'buy-button';
      smallSizeBuyButton1.textContent = 'Купити';
      smallSizeBuyButton.appendChild(smallSizeBuyButton1);
      smallSizeGrid.appendChild(smallSizeBuyButton);
  
      smallSizeBuyButton1.addEventListener('click', function () {
        const pizzaName = pizza.title;
        console.log("Купити маленький розмір " + pizzaName);
        addToSidebar(pizza.title + " (Мала)", "30", pizza.small_size.weight, pizza.small_size.price, pizza.icon);
      });
  
      smallSizeColumn.appendChild(smallSizeGrid);
      pizzaDetails.appendChild(smallSizeColumn);
    }
  
    if (pizza.big_size) {
      const bigSizeColumn = document.createElement('div');
      bigSizeColumn.className = 'detail-column';
  
      const bigSizeGrid = document.createElement('div');
      bigSizeGrid.className = 'detail-grid';
  
      const bigSizeDiameter = document.createElement('div');
      bigSizeDiameter.className = 'detail-row detail-row-grid';
      bigSizeDiameter.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizza.big_size.size + '</div>';
      bigSizeGrid.appendChild(bigSizeDiameter);
  
      const bigSizeWeight = document.createElement('div');
      bigSizeWeight.className = 'detail-row detail-row-grid';
      bigSizeWeight.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizza.big_size.weight + '</div>';
      bigSizeGrid.appendChild(bigSizeWeight);
  
      const bigSizePrice = document.createElement('div');
      bigSizePrice.className = 'detail-row detail-row-grid';
      bigSizePrice.innerHTML = '<div class="detail-price"><strong>' + pizza.big_size.price + '</strong><span>грн.</span></div>';
      bigSizeGrid.appendChild(bigSizePrice);
  
      const bigSizeBuyButton = document.createElement('div');
      bigSizeBuyButton.className = 'detail-row detail-row-grid';
  
      const bigSizeBuyButton1 = document.createElement('button');
      bigSizeBuyButton1.className = 'buy-button';
      bigSizeBuyButton1.textContent = 'Купити';
      bigSizeBuyButton.appendChild(bigSizeBuyButton1);
  
      bigSizeGrid.appendChild(bigSizeBuyButton);
  
      bigSizeBuyButton1.addEventListener('click', function () {
        const pizzaName = pizza.title;
        console.log("Купити великий розмір " + pizzaName);
        addToSidebar(pizza.title + " (Велика)", "40", pizza.big_size.weight, pizza.big_size.price, pizza.icon);
      });
  
      bigSizeColumn.appendChild(bigSizeGrid);
      pizzaDetails.appendChild(bigSizeColumn);
    }
  
    pizzaContainer.appendChild(pizzaDetails);
  
    const pizzasWrapper = document.querySelector('.pizzas-wrapper');
    pizzasWrapper.appendChild(pizzaContainer);
  }
  
  function selectButton(button) {
    if (button.classList.contains("buy-button-select")) {
      return;
    }
  
    const buttons = document.getElementsByClassName("buy-button-select");
  
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = "buy-button-deselect";
    }
    button.className = "buy-button-select";
  
    const buttonText = button.innerHTML;
  
    const pizzasWrapper = document.querySelector('.pizzas-wrapper');
  
    const header = document.querySelector('.orange-font');
    const quantity = document.querySelector('.quantity');
  
    pizzasWrapper.innerHTML = "";
  
    if (buttonText === "Усі") {
      const q = displayPizzaInfo(pizzaData);
      header.textContent = "Усі";
      quantity.textContent = q;
    } else if (buttonText === "М'ясні") {
      const q = displayPizzaInfoFiltered(pizzaData, "meat", "М'ясні");
      header.textContent = "М'ясні";
      quantity.textContent = q;
    } else if (buttonText === "З морепродуктами") {
      const q = displayPizzaInfoFiltered(pizzaData, "ocean", "З морепродуктами");
      header.textContent = "З морепродуктами";
      quantity.textContent = q;
    } else if (buttonText === "Вега") {
      const q = displayPizzaInfoFiltered(pizzaData, "", "Вега піца");
      header.textContent = "Вега";
      quantity.textContent = q;
    } else if (buttonText === "З грибами") {
      const q = displayPizzaInfoFiltered(pizzaData, "mushroom", "");
      header.textContent = "З грибами";
      quantity.textContent = q;
    } else if (buttonText === "З ананасами") {
      const q = displayPizzaInfoFiltered(pizzaData, "pineapple", "");
      header.textContent = "З ананасами";
      quantity.textContent = q;
    }
  
    console.log("Selected button: " + buttonText);
  }
  
  


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////





let totalQuantity = 0;

let totalPrice = 0;

function addToSidebar(pizzaName, pizzaSize, pizzaWeight, pizzaPrice, pizzaImage) {
const totalQuantityElement = document.querySelector('.circle');
const sidebar = document.querySelector('.sidebar');
const totalPriceElement = document.querySelector('.header-right');
const existingElements = sidebar.querySelectorAll('.grid-container');

for (let i = 0; i < existingElements.length; i++) {
const existingElement = existingElements[i];
const nameElement = existingElement.querySelector('.row1.orange-font1');
const sizeElement = existingElement.querySelector('.detail-value-small');

if (nameElement.textContent === pizzaName && sizeElement.textContent === pizzaSize) {
  const numberElement = existingElement.querySelector('.number');
  const quantity = parseInt(numberElement.textContent);

  numberElement.textContent = quantity + 1;

  totalPrice += pizzaPrice;
  totalPriceElement.textContent = totalPrice + ' грн.';

  return;
}

}

const gridContainer = document.createElement('section');
gridContainer.className = 'grid-container';

const column1 = document.createElement('div');
column1.className = 'column-1';

const row1 = document.createElement('div');
row1.className = 'row1 orange-font1';
row1.textContent = pizzaName;
column1.appendChild(row1);

const row2 = document.createElement('div');
row2.className = 'row2';

const detailRow1 = document.createElement('div');
detailRow1.className = 'detail-row detail-row-grid';
detailRow1.style.marginRight = '10px';
detailRow1.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizzaSize + '</div>';
row2.appendChild(detailRow1);

const detailRow2 = document.createElement('div');
detailRow2.className = 'detail-row detail-row-grid';
detailRow2.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizzaWeight + '</div>';
row2.appendChild(detailRow2);

column1.appendChild(row2);

const row3 = document.createElement('div');
row3.className = 'row3';

const price = document.createElement('div');
price.className = 'price';
price.textContent = pizzaPrice + ' грн.';
row3.appendChild(price);

const decreaseButton = document.createElement('button');
decreaseButton.className = 'red-button';
decreaseButton.textContent = '-';
row3.appendChild(decreaseButton);

const number = document.createElement('div');
number.className = 'number';
number.textContent = '1';
row3.appendChild(number);

const increaseButton = document.createElement('button');
increaseButton.className = 'green-button';
increaseButton.textContent = '+';
row3.appendChild(increaseButton);

const closeButton = document.createElement('button');
closeButton.className = 'gradient-button';
const cross = document.createElement('span');
cross.className = 'cross';
cross.textContent = '✕';
closeButton.appendChild(cross);
row3.appendChild(closeButton);

column1.appendChild(row3);

const image = document.createElement('img');
image.src = pizzaImage;
image.className = 'column-img';

gridContainer.appendChild(column1);
gridContainer.appendChild(image);

const targetElement = sidebar.querySelector('.block-container');

sidebar.insertBefore(gridContainer, targetElement);

totalQuantity++;
totalQuantityElement.textContent = totalQuantity.toString();

totalPrice += pizzaPrice;
totalPriceElement.textContent = totalPrice + ' грн.';

decreaseButton.addEventListener('click', function () {
const quantity = parseInt(number.textContent);
if (quantity > 1) {
number.textContent = quantity - 1;

  totalPrice -= pizzaPrice;
  totalPriceElement.textContent = totalPrice + ' грн.';
} else {
  sidebar.removeChild(gridContainer);
  totalQuantity--;
  totalQuantityElement.textContent = totalQuantity.toString();

  totalPrice -= pizzaPrice;
  totalPriceElement.textContent = totalPrice + ' грн.';
}

});

increaseButton.addEventListener('click', function () {
const quantity = parseInt(number.textContent);
number.textContent = quantity + 1;

totalPrice += pizzaPrice;
totalPriceElement.textContent = totalPrice + ' грн.';

});

closeButton.addEventListener('click', function () {
sidebar.removeChild(gridContainer);
totalQuantity--;
totalQuantityElement.textContent = totalQuantity.toString();
const quantity = parseInt(number.textContent);
totalPrice -= pizzaPrice * quantity;
totalPriceElement.textContent = totalPrice + ' грн.';
});
}







//////////////////////////////////////////////////////////////////////////////////////////////////////









function addToSidebarLoad(pizzaName, pizzaSize, pizzaWeight, pizzaPrice, quantityStart, pizzaImage) {
  const totalQuantityElement = document.querySelector('.circle');
  const totalPriceElement = document.querySelector('.header-right');
  const sidebar = document.querySelector('.sidebar');
  const existingElements = sidebar.querySelectorAll('.grid-container');
  
  for (let i = 0; i < existingElements.length; i++) {
  const existingElement = existingElements[i];
  const nameElement = existingElement.querySelector('.row1.orange-font1');
  const sizeElement = existingElement.querySelector('.detail-value-small');
    
  if (nameElement.textContent === pizzaName && sizeElement.textContent === pizzaSize) {
    const numberElement = existingElement.querySelector('.number');
    const quantity = parseInt(numberElement.textContent);
  
    numberElement.textContent = quantity + 1;
  
    totalPrice += pizzaPrice;
    totalPriceElement.textContent = totalPrice + ' грн.';
  
    return;
  }
  
  }
  
  const gridContainer = document.createElement('section');
  gridContainer.className = 'grid-container';
  
  const column1 = document.createElement('div');
  column1.className = 'column-1';
  
  const row1 = document.createElement('div');
  row1.className = 'row1 orange-font1';
  row1.textContent = pizzaName;
  column1.appendChild(row1);
  
  const row2 = document.createElement('div');
  row2.className = 'row2';
  
  const detailRow1 = document.createElement('div');
  detailRow1.className = 'detail-row detail-row-grid';
  detailRow1.style.marginRight = '10px';
  detailRow1.innerHTML = '<div class="detail-label">∅</div><div class="detail-value-small">' + pizzaSize + '</div>';
  row2.appendChild(detailRow1);
  
  const detailRow2 = document.createElement('div');
  detailRow2.className = 'detail-row detail-row-grid';
  detailRow2.innerHTML = '<div class="detail-value-small"><img src="weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">' + pizzaWeight + '</div>';
  row2.appendChild(detailRow2);
  
  column1.appendChild(row2);
  
  const row3 = document.createElement('div');
  row3.className = 'row3';
  
  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = pizzaPrice + ' грн.';
  row3.appendChild(price);
  
  const decreaseButton = document.createElement('button');
  decreaseButton.className = 'red-button';
  decreaseButton.textContent = '-';
  row3.appendChild(decreaseButton);
  
  const number = document.createElement('div');
  number.className = 'number';
  number.textContent = quantityStart;
  row3.appendChild(number);
  
  const increaseButton = document.createElement('button');
  increaseButton.className = 'green-button';
  increaseButton.textContent = '+';
  row3.appendChild(increaseButton);
  
  const closeButton = document.createElement('button');
  closeButton.className = 'gradient-button';
  const cross = document.createElement('span');
  cross.className = 'cross';
  cross.textContent = '✕';
  closeButton.appendChild(cross);
  row3.appendChild(closeButton);
  
  column1.appendChild(row3);
  
  const image = document.createElement('img');
  image.src = pizzaImage;
  image.className = 'column-img';
  
  gridContainer.appendChild(column1);
  gridContainer.appendChild(image);
  
  const targetElement = sidebar.querySelector('.block-container');
  
  sidebar.insertBefore(gridContainer, targetElement);
  
  let totalQuantity = parseInt(totalQuantityElement.textContent);
  totalQuantity++;
  totalQuantityElement.textContent = totalQuantity.toString();
  
  totalPrice += pizzaPrice * quantityStart;
  totalPriceElement.textContent = totalPrice + ' грн.';
  
  decreaseButton.addEventListener('click', function () {
  const quantity = parseInt(number.textContent);
  if (quantity > 1) {
  number.textContent = quantity - 1;
    
    totalPrice -= pizzaPrice;
    totalPriceElement.textContent = totalPrice + ' грн.';
  } else {
    sidebar.removeChild(gridContainer);
    totalQuantity--;
    totalQuantityElement.textContent = totalQuantity.toString();
  
    totalPrice -= pizzaPrice;
    totalPriceElement.textContent = totalPrice + ' грн.';
  }
  
  });
  
  increaseButton.addEventListener('click', function () {
  const quantity = parseInt(number.textContent);
  number.textContent = quantity + 1;
    
  totalPrice += pizzaPrice;
  totalPriceElement.textContent = totalPrice + ' грн.';
  
  });
  
  closeButton.addEventListener('click', function () {
  sidebar.removeChild(gridContainer);
  totalQuantity--;
  totalQuantityElement.textContent = totalQuantity.toString();
  const quantity = parseInt(number.textContent);
  totalPrice -= pizzaPrice * quantity;
  totalPriceElement.textContent = totalPrice + ' грн.';
  });
  }
  



  
  