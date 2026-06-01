function createCart() {
    let items = [];
    let discount = 0;
    let freeShip = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(
                item => item.id === product.id
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(
                item => item.id === productId
            );

            if (!item) return;

            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const total = items.reduce(
                (sum, item) =>
                    sum +
                    item.price * item.quantity,
                0
            );

            return total * (1 - discount) - freeShip;
        },

        applyDiscount(code) {
            switch (code) {
                case "SALE10":
                    discount = 0.1;
                    break;

                case "SALE20":
                    discount = 0.2;
                    break;

                case "FREESHIP":
                    freeShip = 30000;
                    break;

                default:
                    console.log(
                        "Mã giảm giá không hợp lệ"
                    );
            }
        },

        getItemCount() {
            return items.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );
        },

        clearCart() {
            items = [];
            discount = 0;
            freeShip = 0;
        },

        printCart() {
            console.log(
                "\n================ GIỎ HÀNG ================"
            );

            items.forEach((item, index) => {
                const total =
                    item.price * item.quantity;

                console.log(
                    `${index + 1}. ${item.name} | SL: ${
                        item.quantity
                    } | Đơn giá: ${item.price.toLocaleString(
                        "vi-VN"
                    )}đ | Tổng: ${total.toLocaleString(
                        "vi-VN"
                    )}đ`
                );
            });

            console.log("-----------------------------------");
            console.log(
                "Tổng tiền:",
                this.getTotal().toLocaleString(
                    "vi-VN"
                ) + "đ"
            );
            console.log(
                "===================================\n"
            );
        }
    };
}

// TEST

const cart = createCart();

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

cart.addItem(
    {
        id: 3,
        name: "AirPods Pro",
        price: 6990000
    },
    2
);

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log(
    "Số lượng sản phẩm:",
    cart.getItemCount()
);

cart.removeItem(3);

console.log(
    "Sau khi xóa AirPods:"
);

cart.printCart();