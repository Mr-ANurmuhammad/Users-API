// let products = [
//    {
//        name: "iPhone 13",
//        price: 1100
//    },
//    {
//        name: "MacBook Pro",
//        price: 1400
//    },
//    {
//        name: "iPad Pro",
//        price: 900
//    },
//    {
//        name: "AirPods",
//        price: 199
//    }
// ];


// let USD_TO_UZS = 11000;

// let pros = [];

// let productPrice = products.map(function (item) {
      
//    return {

//       name:item.name,
//       price: item.price * USD_TO_UZS

//    } 
   
// })

// console.log(productPrice);



// let productPro = products.filter(item => item.name.toLowerCase().includes("Pro".toLowerCase()));

// console.log(products);


// let sum = 2000

// for (let i = 0; i < products.length; i++) {
   
//     sum += products[i].price

// }
// console.log(sum);


// let sum = products.reduce(function (total, item) {
    

//     return total + item.price
// }, 0)
// console.log(sum);


// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(json => console.log(json))

// get element 

let elUserWrpper = document.querySelector(".users__wrapper");
let elUsersNumber = document.querySelector(".users__number");
let elTempUser = document.querySelector("#user__template").content;
let elPostWrpper = document.querySelector(".posts__wrapper");
let elPostNumber = document.querySelector(".posts__number");
let elTempPost = document.querySelector("#post__template").content;
let elCommentWrapper = document.querySelector(".comments__wrapper");
let elCommentNumber = document.querySelector(".comments__number");
let elTempComment = document.querySelector("#comment__template").content;


function renderUsers(array) {
    
    elUserWrpper.innerHTML = null;

    let newFragment = document.createDocumentFragment();
    elUsersNumber.textContent = array.length;

    for (const item of array) {
        
        let newLi = elTempUser.cloneNode(true)

        newLi.querySelector(".user__id").dataset.userId = item.id;
        newLi.querySelector(".user__id").textContent = item.name;
        newLi.querySelector(".user__email").textContent = item.email;
        // newLi.querySelector(".user__country").textContent = item.country;
        newLi.querySelector(".user__company").textContent = item.company.name;
        newLi.querySelector(".user__link").textContent = item.website;

        newFragment.appendChild(newLi);
        
    }
    
    elUserWrpper.appendChild(newFragment);

}

function renderPosts(array) {
    
    elPostWrpper.innerHTML = null;
    elPostNumber.textContent = array.length;

    let newFragment = document.createDocumentFragment();
    // let i = 0;
    for (const item of array) {
        
        let newLi = elTempPost.cloneNode(true)

        newLi.querySelector(".post__id").textContent = item.id;
        newLi.querySelector(".post__link").dataset.postId = item.id;
        newLi.querySelector(".post__link").textContent = item.title;
        newLi.querySelector(".post__body").textContent = item.body;

        newFragment.appendChild(newLi);
        
        // i=i+1;
    }
    // elPostNumber.textContent = i;
    elPostWrpper.appendChild(newFragment);

}

function renderComments(array) {
    
    elCommentWrapper.innerHTML = null;
    elCommentNumber.textContent = array.length;

    let newFragment = document.createDocumentFragment();
    // let i = 0;
    for (const item of array) {
        
        let newLi = elTempComment.cloneNode(true)

        newLi.querySelector(".comment__id").dataset.postId = item.id;
        newLi.querySelector(".comment__name").textContent = item.name;
        newLi.querySelector(".comment__link").textContent = item.email;
        newLi.querySelector(".comment__body").textContent = item.body;

        newFragment.appendChild(newLi);
        
        // i=i+1;
    }
    elCommentWrapper.appendChild(newFragment);

}



fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => renderUsers(json))


  elUserWrpper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.userId;

    if (datasetId) {
        
        fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(json => {

            let newArray = json.filter(function (item) {
                return item.userId ==   datasetId
            })

            renderPosts(newArray)

        })

    }

  })

  elPostWrpper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.postId;

    if (datasetId) {
        
        fetch(`https://jsonplaceholder.typicode.com/posts/${datasetId}/comments`)
        .then(response => response.json())
        .then(json => renderComments(json))
       
    }

  })