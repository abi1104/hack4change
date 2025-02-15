document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const storefrontDisplay = document.getElementById('storefrontDisplay');
    const storePage = document.getElementById('storePage');
    const entrepreneurProfilePage = document.getElementById('entrepreneurProfilePage');
    const addProductPage = document.getElementById('addProductPage');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const profileButton = document.getElementById('profileButton');
    const addProductButton = document.getElementById('addProductButton');
    const backToStorefront = document.getElementById('backToStorefront');
  
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const addProductForm = document.getElementById('addProductForm');
  
    let currentUser = null;
    let stores = [
      {
        name: 'Handy Products',
        products: [
          { name: 'Teddy Bear', description: 'Soft and cuddly teddy bear', price: 10, image: 'teddy.jpg' },
          
          { name: 'Toy Car', description: 'Miniature car model', price: 15, image: 'car.jpg' },
        { name: 'Doll House', description: 'Beautiful doll house', price: 20, image: 'dollhouse.jpg' }
      ]
    },
    {
      name: 'Gadget World',
      products: [
        { name: 'Smartphone', description: 'Latest model smartphone', price: 300, image: 'smartphone.jpg' },
        { name: 'Headphones', description: 'Noise-cancelling headphones', price: 50, image: 'headphones.jpg' },
        { name: 'Smartwatch', description: 'Multifunctional smartwatch', price: 100, image: 'smartwatch.jpg' }
      ]
    },
    {
      name: 'Fashion Hub',
      products: [
        { name: 'T-shirt', description: 'Comfortable cotton T-shirt', price: 20, image: 'tshirt.jpg' },
        { name: 'Jeans', description: 'Stylish denim jeans', price: 40, image: 'jeans.jpg' },
        { name: 'Sneakers', description: 'Trendy sneakers', price: 60, image: 'sneakers.jpg' }
      ]
    }
  ];

  showRegister.addEventListener('click', () => {
    loginPage.classList.add('hidden');
    registerPage.classList.remove('hidden');
  });

  showLogin.addEventListener('click', () => {
    registerPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('userRole').value;
    currentUser = { role };
    if (role === 'customer') {
      displayStores();
    } else if (role === 'entrepreneur') {
      displayEntrepreneurProfile();
    }
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('registerUserRole').value;
    currentUser = { role };
    if (role === 'customer') {
      displayStores();
    } else if (role === 'entrepreneur') {
      displayEntrepreneurProfile();
    }
  });

  function displayStores() {
    loginPage.classList.add('hidden');
    registerPage.classList.add('hidden');
    storefrontDisplay.classList.remove('hidden');
    profileButton.classList.add('hidden');
    const storeList = document.getElementById('storeList');
    storeList.innerHTML = '';
    stores.forEach((store, index) => {
      const storeCard = document.createElement('div');
      storeCard.className = 'store-card';
      storeCard.innerHTML = `<h3>${store.name}</h3>`;
      storeCard.addEventListener('click', () => {
        displayStore(index);
      });
      storeList.appendChild(storeCard);
    });
  }

  function displayStore(storeIndex) {
    storefrontDisplay.classList.add('hidden');
    storePage.classList.remove('hidden');
    const store = stores[storeIndex];
    document.getElementById('storeTitle').innerText = store.name;
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    store.products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>Price: $${product.price}</p>
        <button class="purchase-button">Purchase</button>
      `;
      productList.appendChild(productCard);
    });
  }

  backToStorefront.addEventListener('click', () => {
    storePage.classList.add('hidden');
    storefrontDisplay.classList.remove('hidden');
  });

  addProductButton.addEventListener('click', () => {
    entrepreneurProfilePage.classList.add('hidden');
    addProductPage.classList.remove('hidden');
  });

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: event.target.result
      };
      stores[0].products.push(newProduct); // For demonstration, add the product to the first store
      addProductPage.classList.add('hidden');
      displayEntrepreneurProfile();
    };
    reader.readAsDataURL(productImage);
  });

  function displayEntrepreneurProfile() {
    loginPage.classList.add('hidden');
    registerPage.classList.add('hidden');
    storefrontDisplay.classList.add('hidden');
    storePage.classList.add('hidden');
    entrepreneurProfilePage.classList.remove('hidden');
    profileButton.classList.remove('hidden');
    const myProductList = document.getElementById('myProductList');
    myProductList.innerHTML = '';
    stores[0].products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      myProductList.appendChild(productCard);
    });
  }
});
