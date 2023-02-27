const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");

  phonesContainer.textContent = "";
  // if display 10 phone then show all btn
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  // display no phone found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("hidden");
  } else {
    noPhone.classList.add("hidden");
  }

  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
    phoneDiv.innerHTML = `
        <figure class="px-10 pt-10">
          <img
            src="${phone.image}"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose. If a dog chews shoes whose shoes does he choose. If a dog chews shoes whose</p>
          <div class="card-actions">
            <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal-6" class="btn btn-primary">Phone Details</label>
          </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  //   stop loader
  toggleSpinner(false);
};

// search operation part function
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const inputField = document.getElementById("input-field").value;
  loadPhones(inputField, dataLimit);
};

// search operation part
document.getElementById("btn-search").addEventListener("click", () => {
  // start loader
  processSearch(10);
});

// search input field enter key handler
document.getElementById("input-field").addEventListener("keypress", (e) => {
  //   console.log(e.key);
  if (e.key === "Enter") {
    processSearch(10);
  }
});

// loading site spinner functionality
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};

// not the best way to load show all
document.getElementById("btn-show-all").addEventListener("click", () => {
  processSearch();
});

// load phone Details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  document.getElementById("title").innerText = phone.name;
  const divElement = document.getElementById("phone-details");
  divElement.innerHTML = `
      <h3>Release Date: ${
        phone.releaseDate ? phone.releaseDate : "no release date found"
      }</h3>
      <h3>Storage: ${
        phone.mainFeatures
          ? phone.mainFeatures.storage
          : "no storage information"
      }</h3>
      <h3>Others: ${
        phone.others ? phone.others.Bluetooth : "no bluetooth information"
      }</h3>
  `;
};
// loadPhones();
