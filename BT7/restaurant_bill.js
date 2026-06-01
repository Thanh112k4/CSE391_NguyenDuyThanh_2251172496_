const menu = [
    {
        name: "Phở bò",
        price: 65000,
        quantity: 2
    },
    {
        name: "Trà đá",
        price: 5000,
        quantity: 3
    },
    {
        name: "Bún chả",
        price: 55000,
        quantity: 1
    }
];

const isWednesday = true;
const hasTip = true;

let subtotal = 0;

console.log("===== HÓA ĐƠN NHÀ HÀNG =====");

menu.forEach((item, index) => {

    let itemTotal =
        item.price * item.quantity;

    subtotal += itemTotal;

    console.log(
        `${index + 1}. ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()}đ`
    );
});

let discountRate = 0;

if (subtotal > 1000000) {
    discountRate = 15;
}
else if (subtotal > 500000) {
    discountRate = 10;
}

if (isWednesday) {
    discountRate += 5;
}

let discount = subtotal * discountRate / 100;

let afterDiscount =
    subtotal - discount;

let vat = afterDiscount * 0.08;

let tip = hasTip
    ? afterDiscount * 0.05
    : 0;

let total =
    afterDiscount +
    vat +
    tip;

console.log("\n===== TỔNG KẾT =====");

console.log(
    "Tổng cộng:",
    subtotal.toLocaleString() + "đ"
);

console.log(
    `Giảm giá (${discountRate}%):`,
    discount.toLocaleString() + "đ"
);

console.log(
    "VAT (8%):",
    vat.toLocaleString() + "đ"
);

console.log(
    "Tip (5%):",
    tip.toLocaleString() + "đ"
);

console.log(
    "THANH TOÁN:",
    total.toLocaleString() + "đ"
);