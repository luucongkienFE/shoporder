var keyLocalStorageListSP = "DANHSACHSANPHAM";
var keyLocalStorageItemCart = "DANHSACHITEMCART";


const cart = () => {
    let mapListData = []
    let renderProduct = document.getElementById('t-body')
    let listTotal = []
    let renderCart = ""
    let renderNoCart = ""
   

    const listCartProduct = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))

    const listSP = JSON.parse(localStorage.getItem(keyLocalStorageListSP))

    
    listSP.map(item => {
        listCartProduct.map(item1 => {
            if (item1.id === item.id) {
                mapListData.push({
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    price: item.price,
                    quantity: item1.quantity,
                })
            }
        })

    })

    const totalFinal = (totalProduct) => {
        return totalProduct.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
    }
    mapListData.map((item) => {
        const reduce = item.price * item.quantity
        listTotal.push(reduce)
        return renderCart += `<tr>
             <td><img class="img-product" src="${item.img}"></img>${item.name}</td>
             <td><span><button class="crement" onclick="decrement(${item.id},${item.quantity})">-</button></span>${item.quantity}<span><button class="crement" onclick="increment(${item.id},${item.quantity})">+</button></span></td>
             <td>${item.price.toLocaleString()}đ</td>
             <td>${reduce.toLocaleString()}đ</td>
             <td class="delete-product-cart">
             <span class="icon-delete" onclick="deletecart(${item.id})"><i class="fa-solid fa-x"></i></span>
             </td>
             
     </tr>
     `})
    renderProduct.innerHTML = renderCart

    document.getElementById("total").innerHTML = "Total : " + totalFinal(listTotal).toLocaleString() + "đ"
    
    if (mapListData <= 0) {

        document.querySelector(".cart-product").style.display = "none"
        document.getElementById("total").innerHTML = ""
        document.querySelector(".btn-buynow").style.display = "none"
        renderNoPro = document.getElementById('no-product')
        renderNoCart = `<img src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png"></img>
        <div class="no-product">Chưa có sản phẩm</div>`
        return renderNoPro.innerHTML = renderNoCart
    }
    else {
    }

    console.log("mapListData", mapListData);

}
const decrement = (id) => {
    const listCartProduct = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))
    listCartProduct.map(item => {
        if (item.id == id) {
            if (item.quantity == 1) {
                alert("csds")
                // item.quantity -= 1
                deletecart(item.id)
            } else {
                item.quantity -= 1
                saveCart(listCartProduct)
            }
        }

    })
    // console.log("tru", listCartProduct);
}
const listSP = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
const getProductDataById = (id) => {
    return listSP.find(sp => sp.id == id)
}
const increment = (id) => {
    const productQuantity = getProductDataById(id).quantity
    console.log("productQuantity", productQuantity);
    const listCartProduct = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))
    listCartProduct.map(item => {
        if (item.id === id && item.quantity == productQuantity)
            alert("Sản phẩm quá số lượng trong kho")
        if (item.id === id && item.quantity !== productQuantity) {
            item.quantity += 1
        }


    })
    saveCart(listCartProduct)
}
const saveCart = (listCartProduct) => {
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCartProduct))
    cart()
}
const deletecart = (id) => {

    const listCartProduct = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))
    let newArr = [];
    listCartProduct.map(item => {
        if (item.id !== id) {
            newArr.push(item)
        }
    })
    saveCart(newArr)
}

let firstname = document.querySelector('#firstname')
let lastname = document.querySelector('#lastname')
let email = document.querySelector('#email')
let phone = document.querySelector('#phone')
let province = document.querySelector('.province')
let district = document.querySelector('.district')
let ward = document.querySelector('.ward')
let address = document.querySelector('#address')

const validate = () => {
    if (firstname.value == null || firstname.value == '' || lastname.value == null || lastname.value == ''
        || email.value == '' || email.value == null || phone.value == '' || phone.value == null
        || province.value == 0 || district.value == 0 || ward.value == 0
        || address.value == null || address.value == ''
    ) {
        checkNull()
    }
    else {
        checkForm()
    }
}

function checkForm() {
    let listTotal = []
    let mapListData = []

    const listCartProduct = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))

    const listSP = JSON.parse(localStorage.getItem(keyLocalStorageListSP))


    listSP.map(item => {
        listCartProduct.map(item1 => {
            if (item1.id === item.id) {
                mapListData.push({
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    price: item.price,
                    quantity: item1.quantity,

                })
            }
        })

    })
    mapListData.map((item) => {
        const reduce = item.price * item.quantity

        listTotal.push(reduce)
    })
    const totalFinal = (totalProduct) => {
        return totalProduct.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
    }

    const totalQuantity = (totalProduct) => {
        return totalProduct.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0
        );
    }
    if (mapListData.length <= 0) {

        alert("Chưa có sản phẩm")
    } else {
        const orderData = {
            mapListData: JSON.parse(localStorage.getItem(keyLocalStorageItemCart)),
            id: randomId(),
            date: new Date(),
            totalFinal: totalFinal(listTotal),
            totalQuantity: totalQuantity(mapListData)

        }

        const form = document.querySelector(".modal-body")
        const formData = new FormData(form)
        for (const [key, value] of formData) {
            orderData[key] = value
        }

        alert("Mua hàng thành công")
        let quantityProductKho = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
        let listItemCart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))

        quantityProductKho.map(item => {
            listItemCart.map(item1 => {
                if (item.id === item1.id) {
                    item.quantity -= item1.quantity
                }
            })
        }
        )
        console.log("quantityProductKho", quantityProductKho[0]);

        localStorage.setItem(keyLocalStorageListSP, JSON.stringify(quantityProductKho))
        setTimeout(
            fetch('http://localhost:5000/listorderdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
                .then((response) => response.json())
                .then((orderData) => console.log(orderData))

            , 3000)
        mapListData = localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]))
    }
}

function checkNull() {
    // regexInput
    const regex = /^[\p{L}\s]+$/u;
    const isValidName = regex.test(firstname.value);
    const isValidLast = regex.test(lastname.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email.value);

    const phoneNumberRegex = /^(?:\+84|0)(?:\d){9,10}$/;
    const isValidPhoneNumber = phoneNumberRegex.test(phone.value);

    // regexInput
    if (firstname.value == null || firstname.value == '' || !isValidName) {
        document.querySelector(".isErrorFirstName").innerHTML = "Vui lòng điền Họ và Tên đệm"
        document.querySelector(".isErrorFirstName").style.color = "red"

    } else {
        document.querySelector(".isErrorFirstName").innerHTML = ""
    }

    if (lastname.value == null || lastname.value == '' || !isValidLast) {
        document.querySelector('.isErrorLastName').innerHTML = "Vui lòng điền Tên"
        document.querySelector(".isErrorLastName").style.color = "red"
    } else {
        document.querySelector('.isErrorLastName').innerHTML = ""
    }

    if (email.value == '' || email.value == null || !isValidEmail) {
        document.querySelector('.isErrorEmail').innerHTML = "Vui lòng điền email"
        document.querySelector(".isErrorEmail").style.color = "red"
    } else {
        document.querySelector('.isErrorEmail').innerHTML = ""
    }


    if (phone.value == '' || phone.value == null || !isValidPhoneNumber) {
        document.querySelector('.isErrorPhone').innerHTML = "Vui lòng điền số điện thoại"
        document.querySelector(".isErrorPhone").style.color = "red"
    }
    else {
        document.querySelector('.isErrorPhone').innerHTML = ""
    }

    if (province.value == 0) {
        document.querySelector('.isErrorProvince').innerHTML = "Chọn Tỉnh / Thành phố "
        document.querySelector(".isErrorProvince").style.color = "red"
    } else {
        document.querySelector('.isErrorProvince').innerHTML = ""
    }
    if (district.value == 0) {
        document.querySelector('.isErrorDistrict').innerHTML = "Chọn Quận / Huyện"
        document.querySelector(".isErrorDistrict").style.color = "red"
    } else {
        document.querySelector('.isErrorDistrict').innerHTML = ""
    }
    if (ward.value == 0) {
        document.querySelector('.isErrorWard').innerHTML = "Chọn Xã / Phường"
        document.querySelector(".isErrorWard").style.color = "red"
    } else {
        document.querySelector('.isErrorWard').innerHTML = ""
    }
    if (address.value == null || address.value == '') {
        document.querySelector('.isErrorAddress').innerHTML = "Vui lòng điền địa chỉ nhà"
        document.querySelector(".isErrorAddress").style.color = "red"
    } else {
        document.querySelector('.isErrorAddress').innerHTML = ""
    }

}
const buy = async (event) => {
    event.preventDefault();
    validate()
}


const getProvince = async () => {
    let res = await fetch(`https://provinces.open-api.vn/api/p/`)
    let data = await res.json()
    return data;
}
const getDistrict = async (code) => {
    let res = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
    let data = await res.json()
    return data.districts;
}
const getWard = async (code) => {
    let res = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
    let data = await res.json()
    return data.wards;
}
// const onChangeProvince = (event) => {
getProvince().then(data => {
    let renderListProvince = `<option value='0' selected>--Tỉnh / Thành Phố--</option>`
    const listProvince = document.querySelector(".province")
    renderListProvince += data.map(item => {
        
        return `<option class="select-province" value='${item.code}'>${item.name}</option>`
    });
    listProvince.innerHTML = renderListProvince
    
})
// }
const onChangeProvince = (event) => {
    getDistrict(event.target.value).then(data => {
        let renderListDistrict = `<option value='0' selected>--Quận / Huyện--</option>`
        const listDistrict = document.querySelector(".district")
        renderListDistrict += data.map(item => {

            return `<option  value="${item.code}" >${item.name}</option>`
        })
        listDistrict.innerHTML = renderListDistrict
        console.log(document.querySelector('.select-province').value);

    })
}

const onChangeDistrict = (event) => {
    getWard(event.target.value).then(data => {
        let renderListWard = `<option value='0' selected>--Phường / Xã--</option>`
        const listWard = document.querySelector(".ward")
        renderListWard += data.map(item => {
            return `<option value="${item.code}" >${item.name}</option>`
        })
        listWard.innerHTML = renderListWard

    })
}
const onChangeWard = (event) => {
    console.log(event.target);
}



const getDistrictsByProvinceID = (event) => {

}
const randomId = () => {
    return Math.floor(Math.random() * 100000000 + 1)
}
cart()

