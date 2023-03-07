var keyLocalStorageListSP = "DANHSACHSANPHAM";
var keyLocalStorageItemCart = "DANHSACHITEMCART";


async function getUserAsync(name) {
    let response = await fetch('http://localhost:5000/listorderdata', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let data = await response.json()
    return data
}
async function deleteUserAsync(id) {
    let response = await fetch('http://localhost:5000/listorderdata/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let data = await response.json()
    return data
}
const listSP = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
const getProductDataById = (id) => {
    return listSP.find(sp => sp.id == id)
}

const getOrder = async (id) => {
    const data = await getUserAsync()
    // console.log(data);
    let renderOrder = document.getElementById('t-body-order')
    let renderOrderCart = ""
    let totalProduct = 0

    data.map(item => {
        totalProduct += item.quantity
    })

    await data.map(item => {
        let listtt = item.mapListData.map(item1 => {

            const productData = getProductDataById(item1.id)
            let totalProduct = item1.quantity * productData.price
            // console.log("productData", productData);
            // console.log("item", item);
            // console.log("item1", item1);
            return `<div >
            <span>${productData.name} </span>
            <span><img class="img-detail" src="${productData.img}"/></span>
            <span>${item1.quantity}</span>
           <span> ${productData.price.toLocaleString()}đ </span>
            <span>${totalProduct.toLocaleString()}đ </span>
            </div>`
        })
        // console.log(listtt);

        return renderOrderCart += `<tr>
            <td>
            ${item.id}</td>
             <td>${item.firstname + ' ' + item.lastname}</td>
             <td>${new Date(item.date).toLocaleDateString()}</td>
             <td>${item.mapListData.length}</td>
             <td>${item.totalQuantity}</td>
             <td>${item.totalFinal.toLocaleString()}đ</td>
             <td class="return-product-cart">
             <span class="icon-return" onclick="returncart(${item.id})"><i class="fa-solid fa-x"></i></span>
             </td>
             <div>
             Chi tiết đơn hàng <i class="fa-solid fa-eye" onclick="detailCart(event)"></i>
             <div class="detailProduct">${listtt.join('')}</div>
             </div>
             </div>
             </tr>
            
             `
    }

    )
    renderOrder.innerHTML = renderOrderCart
}
const detailCart = (event) => {
    // console.log(event.target.parentElement.childNodes[3]);
    event.target.parentElement.childNodes[3].classList.toggle("detail");
    // let element = document.querySelector(".detailProduct");
    // element.classList.toggle("detail");
}
const returncart = async (id) => {
    let quantityProductKho = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
    const data = await getUserAsync()
    data.map(item => {
        if (item.id === id) {
            console.log("111", item.mapListData);
            console.log("222", quantityProductKho);
            quantityProductKho.map(kho => {
                item.mapListData.map(mua => {
                    if (mua.id == kho.id) {
                        kho.quantity += mua.quantity
                    }

                })

            })
            console.log(quantityProductKho);
            localStorage.setItem(keyLocalStorageListSP, JSON.stringify(quantityProductKho))
        }
    })
    await deleteUserAsync(id)
}
getOrder()
