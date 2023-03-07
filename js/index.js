
var keyLocalStorageListSP = "DANHSACHSANPHAM";
var keyLocalStorageItemCart = "DANHSACHITEMCART";

var listData = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
if (listData === null) {
    var listData = [
        {
            id: 1,
            name: "Ultra adidas 1D Shoes",
            price: 8000000,
            quantity: 20,
            img: "./assets/img/792de84663994106acd1aefc017ef28c_9366.jpg"
        },
        {
            id: 2,
            name: "Ultra adidas 2D Shoes",
            price: 3000000,
            quantity: 20,
            img: "./assets/img/a01e5c15afe64158a6b5aefd011c91c6_9366.jpg"
        },
        {
            id: 3,
            name: "Ultra adidas 3D Shoes",
            price: 7000000,
            quantity: 20,
            img: "./assets/img/e01dea68cf93434bae5aac0900af99e8_9366.jpg"
        },
        {
            id: 4,
            name: "Ultra adidas 4D Shoes",
            price: 600000,
            quantity: 20,
            img: "./assets/img/cb1316406e584892bdb3a991001bd46d_9366.jpg"
        },
        {
            id: 5,
            name: "Ultra adidas 5D Shoes",
            price: 5000000,
            quantity: 20,
            img: "./assets/img/1b6992ffbb3d423fa865af49011d377a_9366.jpg"
        },
        {
            id: 6,
            name: "Ultra adidas 6D Shoes",
            price: 6500000,
            quantity: 20,
            img: "./assets/img/ef3703df2642459a8f1caed70110d556_9366.jpg"
        },
        {
            id: 7,
            name: "Ultra adidas 7D Shoes",
            price: 9000000,
            quantity: 20,
            img: "./assets/img/7ed0855435194229a525aad6009a0497_9366.jpg"
        },
        {
            id: 8,
            name: "Ultra adidas 8D Shoes",
            price: 5000000,
            quantity: 20,
            img: "./assets/img/aa3aad1deee04d669d2baf1d00158be6_9366.jpg"
        }, {
            id: 9,
            name: "Ultra adidas 9D Shoes",
            price: 8000000,
            quantity: 20,
            img: "./assets/img/792de84663994106acd1aefc017ef28c_9366.jpg"
        },
        {
            id: 10,
            name: "Ultra adidas 10D Shoes",
            price: 3000000,
            quantity: 20,
            img: "./assets/img/a01e5c15afe64158a6b5aefd011c91c6_9366.jpg"
        },
        {
            id: 11,
            name: "Ultra adidas 11D Shoes",
            price: 7000000,
            quantity: 20,
            img: "./assets/img/e01dea68cf93434bae5aac0900af99e8_9366.jpg"
        },
        {
            id: 12,
            name: "Ultra adidas 12D Shoes",
            price: 600000,
            quantity: 20,
            img: "./assets/img/cb1316406e584892bdb3a991001bd46d_9366.jpg"
        },
        {
            id: 13,
            name: "Ultra adidas 13D Shoes",
            price: 5000000,
            quantity: 20,
            img: "./assets/img/1b6992ffbb3d423fa865af49011d377a_9366.jpg"
        },
        {
            id: 14,
            name: "Ultra adidas 14D Shoes",
            price: 6500000,
            quantity: 20,
            img: "./assets/img/ef3703df2642459a8f1caed70110d556_9366.jpg"
        },
        {
            id: 15,
            name: "Ultra adidas 15D Shoes",
            price: 9000000,
            quantity: 20,
            img: "./assets/img/7ed0855435194229a525aad6009a0497_9366.jpg"
        },
        {
            id: 16,
            name: "Ultra adidas 16D Shoes",
            price: 5000000,
            quantity: 20,
            img: "./assets/img/aa3aad1deee04d669d2baf1d00158be6_9366.jpg"
        }
    ]

    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData))
}
var listItem = listData.map(item => {
    const price = item.price
    return `
    <div class="item col-lg-3"  >
        <button onclick="handleAdd(${item.id})" class="add-cart"><i class="fa-solid fa-cart-plus"></i></button>
        <img src="${item.img}" class="item-img"></img>
        <h5 class="item-name">${item.name}</h5>
        <div class="item-bot">
        <span class="item-price" >Price: ${price.toLocaleString()}đ</span>
        <span class="item-quantity">Quantity: ${item.quantity}</span>
        </div>
    </div>
    `
})
document.querySelector('.product').innerHTML = listItem.join("")
// var localStorage = localStorage.getItem()
// var listItemCart = listData.map(item => {
//     return `
//     <div class="item-product col-lg-3" key="${item.id}" > 
//         <div class="item-cart">
//         
//         </div>
//     </div>
//     `
// })
// document.querySelector('.cart-product').innerHTML = listItemCart.join("")
// var data = []
// localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]))
const handleAdd = (id) => {

    const checkGetItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))
    console.log("checkGetItem", checkGetItem);
    if (checkGetItem == null) {
        localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]))
    }
    let listItemCart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))


    const getProductDataById = (id) => {
        return listSP.find(sp => sp.id == id)
    }
    const productData = getProductDataById(id)
    const itemCart = listItemCart.find(item => item.id == id)


    console.log(productData);
    console.log(itemCart);
    console.log(listSP.find(sp => sp.id == id));
    if (itemCart && itemCart.quantity < productData.quantity) {
        itemCart.quantity++;
    }
    // else if (itemCart && itemCart.quantity > productData.quantity) {
    //     alert("het hang");
    // }
    else if (itemCart && productData.quantity !== 0) {
        alert("Quá số lượng trong kho");
    }
    else if (!itemCart && productData.quantity === 0) {
        alert("Hết hàng");
    }
    else if (!itemCart) {
        listItemCart.push({
            id: id,
            quantity: 1,

        })
    } else {
        alert("Hết hàng");
    }

    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItemCart))
    console.log("listItemCart", listItemCart);


}


