// click view details button and jumps to the main section
function scrollToSection() {
    document.getElementById("main-section").scrollIntoView({ behavior: 'smooth' });
  }

// Global variable for sort
let globalVariable = []


//*************All fetch start********************** */

// 1.0) fetch all pets during startup
const loadAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then (res => res.json())
    .then(data =>displayPetCards(data.pets))
    .catch (error => console.log(error))  
}

// 2.0) fetch individual pet details for modal operation
const loadPetDetails= async (petID)=>{
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petID}`
    const res = await fetch(url)
    const data = await res.json()
    petDetailsModal(data.petData)
}

// 3.0) fetch create loadCategories (button)
const loadPetCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then (res => res.json())
    .then(data =>displayBtnCategories(data.categories))
    .catch (error => console.log(error))
}

// 4.0) fetch onclick dog/cat/rabbit/bird using async-await
const loadPetOnclick= async (id)=>{
    const url = `https://openapi.programming-hero.com/api/peddy/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPetCards(data.data)

    //actived the button
    removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("border-red-700")
}
//**************fetch end************************** */



//5.0) Create Display Categories btn
const displayBtnCategories = (catagories) => {
    const categoryContainer = document.getElementById("category-btn-container")
    catagories.forEach (item => {
    const buttonContainer = document.createElement("div")
    buttonContainer.innerHTML = `
    <button onclick="spinner('${item.category}')" id="btn-${item.category}" class="btn border border-slate-300 w-[180px] category-btn">
    <span><img class="w-5" src="${item.category_icon}"/></span>
    ${item.category}
    </button>
    `
    categoryContainer.append(buttonContainer)
    })
}


// 6.0) Display the pet cards
const displayPetCards = (data) => {
    const petCard = document.getElementById("pet-card")
    petCard.innerHTML = ""
    //show nothing img when empty
    if (data.length === 0){
        petCard.classList.remove("grid")
        petCard.innerHTML = `
        <div class= "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="./images/error.webp" />
        <h2 class="text-center text-xl font-bold">No content Here</h2>
        </div>
        `
        return;
    }
    else{petCard.classList.add("grid")}

    globalVariable=[]
    data.forEach (data => {
      const dataPush = globalVariable.push(data)
    
        //create a card for pets
    const card=document.createElement("div")
    card.classList="card border border border-gray-200"
    card.innerHTML = `
     <figure class="h-[200px] px-3 pt-3">
    <img
      src=${data.image}
      class= "h-full w-full object-cover rounded-md"
      alt="" />

    </figure>
    <div class="px-3 pt-3 pb-3 space-y-1">
        <div>
            <h2 class="font-bold">${data.pet_name}</h2>
            <div class="text-sm text-slate-600">
            <p>🔰 Breed: ${typeof data.breed?.length == "number" ? `${data.breed}` : "No info found"}</p> 
            <p>📆Birth: ${typeof data.date_of_birth?.length == "number" ? `${data.date_of_birth}` : "No info found"}</p> 
            <p>↘️Gender: ${typeof data.gender?.length == "number" ? `${data.gender}` : "No info found"}</p>
            <p> 💲  Price: ${data.price === null ? "No info found" : `${data.price}$`} </p> 
            </div>
        </div>

        <div class="flex flex-row justify-between items-center">

          <button onclick="like('${data.image}')"
          class="bg-white border border-gray-400 text-xs px-3 py-1 rounded-md hover:bg-slate-300"><img class="w-4" src="./images/icons8-like-24.png" alt=""></button>


          <button onclick="countDownModal(this)";
          class=" bg-white text-btnBg border border-gray-400 text-xs px-3 py-1 rounded-md  hover:bg-slate-300">Adopt</button>


          <button onclick="loadPetDetails('${data.petId}')"
          class=" bg-white text-btnBg border border-gray-400 text-xs px-3 py-1 rounded-md  hover:bg-slate-300">Details</button>

         </div>
    </div>
    `
    petCard.append(card)
    })
}


// 7.0) Show the spinner when clicked
const spinner = (clickedPet) => {
    document.getElementById("spinner").classList.remove("hidden");
    const petCard = document.getElementById("pet-card")
    petCard.innerHTML = "";
    setTimeout(() => {
        loadPetOnclick(clickedPet);
        document.getElementById("spinner").classList.add("hidden");
    }, 2000);
};


// 8.0) button active remove
const removeActiveClass= () =>{
    const buttons = document.getElementsByClassName ("category-btn")
    for(let btn of buttons){
        btn.classList.remove("border-red-700")
    }
}


// 9.0) like button clicked 
const like = (img) =>{
    const likeCard=document.getElementById("like-card")
    const myLike=document.createElement("div")
    myLike.innerHTML = `
    <img
      src=${img}
      class= "md:h-16 lg:h-16 object-cover rounded-md p-0 ml-8 md:ml-0 lg:ml-0"
      alt="pet image" />
      `
    likeCard.append(myLike)
}


//10.0) Modal show Function for Details info
const petDetailsModal = (value) => {
    //destructuring
    const {image, pet_name, breed, gender, vaccinated_status, date_of_birth, price, pet_details} = value;

    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML= `
        <dialog id="my_modal" class="modal lg:overscroll-none">
          <div class="modal-box">
            <div class="h-64 pb-3">
              <img class="w-full h-full object-cover rounded-md" src="${image}" alt="">
            </div>

            <div>
              <h2 class="font-bold text-base">${pet_name}</h2>
            </div>

            <div class="text-gray-500 text-xs grid md:grid-cols-2 lg:grid-cols-2 pb-3">
              <div>
                <p>🔰 Breed: ${typeof breed?.length == "number" ? `${breed}` : "No info found"}</p>
                <p>↘️Gender: ${typeof gender?.length == "number" ? `${gender}` : "No info found"}</p>
                <p>📆Birth: ${typeof date_of_birth?.length == "number" ? `${date_of_birth}` : "No info found"}</p>
              </div>
             
              <div>
                <p>💉   Vaccinated Status:  ${typeof vaccinated_status?.length == "number" ? `${vaccinated_status}` : "No info found"}</p>
                <p> 💲  Price: ${price === null ? "No info found" : `${price}$`}</p>
              </div>
            </div>

            <div>
            <hr>
              <h2 class="font-semibold text-sm pt-2">Details Information</h2>
              <p class="text-xs text-gray-500">${pet_details}</p>
            </div>

            <div class="text-center pt-3">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn w-full py-0 bg-lime-100">Close</button>
              </form>
            </div>
          </div>
        </dialog>
    `
    my_modal.showModal();
}


//11.0) Modal show Function for Count Down
const countDownModal = (button) => {
  //Adopt button disable
  button.disabled = true
  button.classList.add ("bg-gray-400")
  button.innerText = `Adopted`

  //Showing count down
    let count = 3;
    const showContDown = document.getElementById("show-count-down");
    const countdown = setInterval(() => {
        showContDown.innerText = count;
        count--;
    
        if (count < 0) {
            clearInterval(countdown);
            document.getElementById("close-button").click()
        }
    }, 800);
  
    my_modal_1.showModal();
}


// 12.0) Sort functionality
const sortFunction = () =>{
  globalVariable.sort((a, b) => b.price - a.price);
  displayPetCards(globalVariable)
}
  

//call category button for dog cat rabbit bird
loadPetCategories();

//call All pet cards
loadAllPets();