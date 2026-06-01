const products = [
{
id:1,
name:"iPhone 16",
price:25990000,
category:"phone",
image:"https://placehold.co/300x200",
rating:4.5,
inStock:true
},
{
id:2,
name:"Samsung S24",
price:22990000,
category:"phone",
image:"https://placehold.co/300x200",
rating:4.4,
inStock:true
},
{
id:3,
name:"Pixel 9",
price:19990000,
category:"phone",
image:"https://placehold.co/300x200",
rating:4.6,
inStock:true
},
{
id:4,
name:"MacBook Pro",
price:45990000,
category:"laptop",
image:"https://placehold.co/300x200",
rating:4.8,
inStock:true
},
{
id:5,
name:"Dell XPS",
price:35990000,
category:"laptop",
image:"https://placehold.co/300x200",
rating:4.7,
inStock:true
},
{
id:6,
name:"ThinkPad X1",
price:32990000,
category:"laptop",
image:"https://placehold.co/300x200",
rating:4.5,
inStock:true
},
{
id:7,
name:"iPad Air",
price:16990000,
category:"tablet",
image:"https://placehold.co/300x200",
rating:4.6,
inStock:true
},
{
id:8,
name:"Xiaomi Pad 6",
price:7990000,
category:"tablet",
image:"https://placehold.co/300x200",
rating:4.2,
inStock:true
},
{
id:9,
name:"Galaxy Tab",
price:9990000,
category:"tablet",
image:"https://placehold.co/300x200",
rating:4.3,
inStock:true
},
{
id:10,
name:"AirPods Pro",
price:6990000,
category:"accessory",
image:"https://placehold.co/300x200",
rating:4.4,
inStock:true
},
{
id:11,
name:"Galaxy Buds",
price:3490000,
category:"accessory",
image:"https://placehold.co/300x200",
rating:4.1,
inStock:true
},
{
id:12,
name:"Magic Mouse",
price:2490000,
category:"accessory",
image:"https://placehold.co/300x200",
rating:4.0,
inStock:true
}
];

const container =
document.querySelector("#productContainer");

const searchInput =
document.querySelector("#searchInput");

const sortSelect =
document.querySelector("#sortSelect");

const modal =
document.querySelector("#modal");

const modalBody =
document.querySelector("#modalBody");

const cartCount =
document.querySelector("#cartCount");

let currentProducts=[...products];
let cart=0;

renderProducts(currentProducts);

function renderProducts(data){

container.innerHTML="";

data.forEach(product=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${product.image}">
<div class="card-body">
<h3>${product.name}</h3>
<p class="price">
${product.price.toLocaleString()}đ
</p>
<p>⭐ ${product.rating}</p>
<button class="detail-btn">
Chi tiết
</button>
<button class="cart-btn">
Thêm giỏ
</button>
</div>
`;

card.querySelector(".detail-btn")
.addEventListener("click",()=>{

modal.classList.remove("hidden");

modalBody.innerHTML=`
<h2>${product.name}</h2>
<p>Giá:
${product.price.toLocaleString()}đ</p>
<p>Danh mục:
${product.category}</p>
<p>Rating:
${product.rating}</p>
`;
});

card.querySelector(".cart-btn")
.addEventListener("click",()=>{

cart++;

cartCount.textContent=cart;
});

container.appendChild(card);
});
}

document.querySelector("#closeModal")
.addEventListener("click",()=>{

modal.classList.add("hidden");
});

searchInput.addEventListener("input",()=>{

const keyword=
searchInput.value.toLowerCase();

const result=
currentProducts.filter(product=>
product.name.toLowerCase()
.includes(keyword)
);

renderProducts(result);
});

document.querySelectorAll(".category-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

const category=
btn.dataset.category;

if(category==="all"){
currentProducts=[...products];
}
else{
currentProducts=
products.filter(product=>
product.category===category
);
}

renderProducts(currentProducts);
});
});

sortSelect.addEventListener("change",()=>{

const value=sortSelect.value;

if(value==="priceAsc"){
currentProducts.sort(
(a,b)=>a.price-b.price
);
}

if(value==="priceDesc"){
currentProducts.sort(
(a,b)=>b.price-a.price
);
}

if(value==="name"){
currentProducts.sort(
(a,b)=>a.name.localeCompare(b.name)
);
}

if(value==="rating"){
currentProducts.sort(
(a,b)=>b.rating-a.rating
);
}

renderProducts(currentProducts);
});

document.querySelector("#darkModeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle(
"dark-mode"
);
});