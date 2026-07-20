// get elements

var contactfullName = document.getElementById("fullName");
var contactphoneNumber = document.getElementById("phoneNumber");
var contactemailAddress = document.getElementById("emailAddress");
var contactaddress = document.getElementById("address");
var contactgroupType = document.getElementById("groupType");
var contactnotes = document.getElementById("notes");
var isFavorite = document.getElementById("checkFavorite");
var isEmergency = document.getElementById("checkEmergency");
var saveBtn = document.getElementById("savebtn");
var updateBtn = document.getElementById("updatebtn");
var searchInput = document.getElementById("searchinput");
var totalContacts = document.getElementById("totalcontacts");
var totalFavContacts = document.getElementById("favoriteContacts");
var totalEmerContacts = document.getElementById("emergencyContacts");
var cardBodyFav = document.getElementById("cardbody");
var cardBodyEmr = document.getElementById("cardbodyemr");
var contactList = [];
if (localStorage.getItem("contactList")) {
  contactList = JSON.parse(localStorage.getItem("contactList"));
}
displayContacts();
// function addContact() {
//   var contact = {
//     fullName: contactfullName.value,
//     phoneNumber: contactphoneNumber.value,
//     emailAddress: contactemailAddress.value,
//     address: contactaddress.value,
//     groupType: contactgroupType.value,
//     notes: contactnotes.value,
//     checkFavorite: checkFavorite.checked,
//     checkEmergency: checkEmergency.checked,
//   };
//   contactList.push(contact);
//   clearDate();
//   displayContacts();
//   localStorage.setItem("contactList", JSON.stringify(contactList));
//   getCounters();
//   displayCounters();
//   displayFavoritedContact();
//   displayEmergencyContact();
// }
function addContact(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  } else if (window.event) {
    window.event.returnValue = false; 
  }
//   ----------------
  var nameValue = contactfullName.value ? contactfullName.value.trim() : "";
  var nameRegex = /^[A-Za-z\s]+$/; 
  if (nameValue.length < 2 || nameValue.length > 50) {
    alert("Error: Name must be between 2 and 50 characters long!");
    return; 
  }
  if (!nameRegex.test(nameValue)) {
    alert("Error: Name should contain only letters and spaces!");
    return; 
  }
//   -----------------
  var phoneValue = contactphoneNumber.value ? contactphoneNumber.value.trim() : "";
  var egyptPhoneRegex = /^01[0125]\d{8}$/;

  if (!egyptPhoneRegex.test(phoneValue)) {
    alert("Error: Please enter a valid Egyptian phone number!");
    return; 
  }
//   ---------------------
  var emailValue = contactemailAddress.value ? contactemailAddress.value.trim() : "";
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue !== "" && !emailRegex.test(emailValue)) {
    alert("Validation Error: Please enter a valid email address (e.g., name@example.com)!");
    return; 
  }
//   --------------------
  var contact = {
    fullName: nameValue,
    phoneNumber: contactphoneNumber.value ? contactphoneNumber.value.trim() : "",
    emailAddress: contactemailAddress.value ? contactemailAddress.value.trim() : "",
    address: contactaddress.value ? contactaddress.value.trim() : "",
    groupType: contactgroupType ? contactgroupType.value : "",
    notes: contactnotes ? contactnotes.value : "",
    checkFavorite: checkFavorite ? checkFavorite.checked : false,
    checkEmergency: checkEmergency ? checkEmergency.checked : false,
  };
  contactList.push(contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  if (typeof displayContacts === "function") displayContacts();
  if (typeof displayCounters === "function") displayCounters();
  if (typeof displayFavoritedContact === "function") displayFavoritedContact();
  if (typeof displayEmergencyContact === "function") displayEmergencyContact();
  alert("Success: Contact has been successfully added!");
  if (typeof clearData === "function") {
    clearData();
  } else if (typeof clearDate === "function") {
    clearDate();
  }
}
function clearDate() {
  contactfullName.value = "";
  contactphoneNumber.value = "";
  contactemailAddress.value = "";
  contactaddress.value = "";
  contactgroupType.value = "";
  contactnotes.value = "";
  checkFavorite.checked = false;
  checkEmergency.checked = false;
}
function displayContacts() {
  var box = "";
  for (var i = 0; i < contactList.length; i++) {
    box += `<div class="col-lg-6">
     <div class="shadow-sm border border-light-subtle rounded-4 overflow-hidden bg-white mt-2">
        <div class="p-3">
            <div class="d-flex align-items-center gap-3">
                <div class="avatar-box text-white d-flex align-items-center justify-content-center fw-bold small bg-primary rounded-3 position-relative">
                        ${
                          contactList[i].fullName
                            ? contactList[i].fullName
                                .trim()
                                .split(/\s+/)
                                .map((word) => word.charAt(0))
                                .join("")
                                .toUpperCase()
                            : ""
                        }
                        ${
                          contactList[i].checkFavorite
                            ? `<span class="position-absolute position-right-top rounded-circle bg-warning d-flex align-items-center justify-content-center p-1 micro-font"><i class="fa-solid fa-star text-white micro-font"></i></span> `
                            : ""
                        }
                        ${
                          contactList[i].checkEmergency
                            ? `<span class="position-absolute position-right-bottom rounded-circle bg-danger d-flex align-items-center justify-content-center p-1 micro-font"><i class="fa-solid fa-heart-pulse text-white micro-font"></i></span> `
                            : ""
                        }

                </div>
                <div>
                    <p class="fw-semibold text-dark fs-6 m-0">${contactList[i].fullName}</p>
                    <div class="d-flex gap-2 px-2 py-1 rounded-3">
                        <div class="bg-light-blue px-2 py-1 rounded-2">
                            <i class="fa-solid fa-phone text-primary micro-font"></i>
                        </div>
                        <span class="text-secondary small fw-normal">${contactList[i].phoneNumber}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column gap-1">
                <div class="d-flex align-items-center gap-1">
                    <div
                        class="d-flex align-items-center justify-content-center rounded-2 text-purple bg-light-purple p-2">
                        <i class="fa-solid fa-envelope micro-font"></i>
                    </div>
                    <span class="text-secondary small fw-normal">${contactList[i].emailAddress}</span>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <div
                        class="d-flex align-items-center justify-content-center rounded-2 p-2 text-success bg-light-green">
                        <i class="fa-solid fa-location-dot  micro-font"></i>
                    </div>
                    <span class="text-secondary small fw-normal">${contactList[i].address}</span>
                </div>
            </div>
            <div class="mt-1">
                <span class="p-2 rounded-2 micro-font fw-medium text-primary bg-light-blue">${contactList[i].groupType}</span>
                ${
                  contactList[i].checkEmergency
                    ? ` <span class="p-2 rounded-2 micro-font fw-medium text-danger bg-light-rose ms-1">
                    <i class="fa-solid fa-heart-pulse text-danger me-1"></i>Emergency </span> `
                    : ""
                }
                ${
                  contactList[i].checkFavorite
                    ? `<span class="p-2 rounded-2 micro-font fw-medium text-warning bg-light ms-1">
                    <i class="fa-solid fa-star text-warning me-1"></i>Favorite </span> `
                    : ""
                }
            </div>
        </div>
        <div
            class="d-flex align-items-center justify-content-between px-4 py-3 border-top border-light-subtle bg-gray-footer">
            <div class="d-flex gap-2">
                <div class="p-2 rounded-3 tel-card">
                    <a href="tel:${contactList[i].phoneNumber}"
                        class="border-0 d-flex align-items-center justify-content-center text-decoration-none text-success">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
                <div class="p-2 rounded-3 mail-card">
                    <a href="mailto:${contactList[i].emailAddress}"
                        class="text-purple border-0 d-flex align-items-center justify-content-center rounded-3 text-decoration-none">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex align-items-center gap-0">
                <button onclick="toggleFavorite(${i})" title="favorite"
                    class="favorite-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-regular fa-star text-secondary"></i></button>
                <button onclick="toggleEmergency(${i})" title="Emergency"
                    class="emergency-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-regular fa-heart text-secondary"></i></button>
                <button onclick="readyToUpdate(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  title="Edit"
                    class="edit-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-solid fa-pen text-secondary"></i></button>
                <button onclick="deleteContact(${i})" title="Delete"
                    class="delete-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-solid fa-trash-can text-secondary"></i></button>
            </div>
        </div>
    </div>
    </div>`;
  }
  document.getElementById("rowdata").innerHTML = box;
  displayCounters();
  displayCounters();
  displayFavoritedContact();
  displayEmergencyContact();
}
function deleteContact(index) {
  contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContacts();
}
var updatedIndex = 0;
function readyToUpdate(index) {
  updatedIndex = index;
  updateBtn.classList.remove("d-none");
  saveBtn.classList.add("d-none");
  contactfullName.value = contactList[index].fullName;
  contactphoneNumber.value = contactList[index].phoneNumber;
  contactemailAddress.value = contactList[index].emailAddress;
  contactaddress.value = contactList[index].address;
  contactgroupType.value = contactList[index].groupType;
  contactnotes.value = contactList[index].notes;
  checkFavorite.checked = contactList[index].checkFavorite;
  checkEmergency.checked = contactList[index].checkEmergency;
}
function updateContacts(updatedIndex) {
  var updatedContact = {
    fullName: contactfullName.value,
    phoneNumber: contactphoneNumber.value,
    emailAddress: contactemailAddress.value,
    address: contactaddress.value,
    groupType: contactgroupType.value,
    notes: contactnotes.value,
    checkFavorite: checkFavorite.checked,
    checkEmergency: checkEmergency.checked,
  };
  contactList.splice(updatedIndex, 1, updatedContact);
  displayContacts();
  clearDate();
  localStorage.setItem("contactList", JSON.stringify(contactList));
  updateBtn.classList.add("d-none");
  saveBtn.classList.remove("d-none");
}
function searchAboutContacts() {
  var userSearch = searchInput.value;
  var box = "";
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].fullName
        .toLocaleLowerCase()
        .includes(userSearch.toLocaleLowerCase()) ||
      contactList[i].phoneNumber.includes(userSearch) ||
      contactList[i].emailAddress.includes(userSearch)
    ) {
      box += `<div class="col-lg-6">
     <div class="shadow-sm border border-light-subtle rounded-4 overflow-hidden bg-white mt-2">
        <div class="p-3">
            <div class="d-flex align-items-center gap-3">
                <div
                    class="avatar-box text-white d-flex align-items-center justify-content-center fw-bold small bg-primary rounded-3">
                        ${
                          contactList[i].fullName
                            ? contactList[i].fullName
                                .trim()
                                .split(/\s+/)
                                .map((word) => word.charAt(0))
                                .join("")
                                .toUpperCase()
                            : ""
                        }

                </div>
                <div>
                    <p class="fw-semibold text-dark fs-6 m-0">${contactList[i].fullName}</p>
                    <div class="d-flex gap-2 px-2 py-1 rounded-3">
                        <div class="bg-light-blue px-2 py-1 rounded-2">
                            <i class="fa-solid fa-phone text-primary micro-font"></i>
                        </div>
                        <span class="text-secondary small fw-normal">${contactList[i].phoneNumber}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column gap-1">
                <div class="d-flex align-items-center gap-1">
                    <div
                        class="d-flex align-items-center justify-content-center rounded-2 text-purple bg-light-purple p-2">
                        <i class="fa-solid fa-envelope micro-font"></i>
                    </div>
                    <span class="text-secondary small fw-normal">${contactList[i].emailAddress}</span>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <div
                        class="d-flex align-items-center justify-content-center rounded-2 p-2 text-success bg-light-green">
                        <i class="fa-solid fa-location-dot  micro-font"></i>
                    </div>
                    <span class="text-secondary small fw-normal">${contactList[i].address}</span>
                </div>
            </div>
            <div class="mt-1">
                <span
                    class="p-2 rounded-2 micro-font fw-medium text-primary bg-light-blue">${contactList[i].groupType}</span>
            </div>
        </div>
        <div
            class="d-flex align-items-center justify-content-between px-4 py-3 border-top border-light-subtle bg-gray-footer">
            <div class="d-flex gap-2 ">
                <div class="p-2 rounded-3 tel-card">
                    <a href="tel:${contactList[i].phoneNumber}"
                        class="border-0 d-flex align-items-center justify-content-center text-decoration-none text-success">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
                <div class="p-2 rounded-3 mail-card">
                    <a href="mailto:${contactList[i].emailAddress}"
                        class="text-purple border-0 d-flex align-items-center justify-content-center rounded-3 text-decoration-none">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <button
                    class="favorite-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-regular fa-star text-secondary"></i></button>
                <button
                    class="emergency-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-regular fa-heart text-secondary"></i></button>
                <button onclick="readyToUpdate(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    class="edit-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-solid fa-pen text-secondary"></i></button>
                <button onclick="deleteContact(${i})"
                    class="delete-btn border-0 text-decoration-none bg-transparent rounded-2"><i
                        class="fa-solid fa-trash-can text-secondary"></i></button>
            </div>
        </div>
    </div>
            </div>`;
    }
  }
  document.getElementById("rowdata").innerHTML = box;
}
function toggleEmergency(index) {
  contactList[index].checkEmergency = !contactList[index].checkEmergency;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  //   contactList = JSON.parse(localStorage.getItem("contactList")) || [];
  displayContacts();
  displayCounters();
  displayEmergencyContact();
}
function toggleFavorite(index) {
  contactList[index].checkFavorite = !contactList[index].checkFavorite;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  //   contactList = JSON.parse(localStorage.getItem("contactList")) || [];
  displayContacts();
  displayCounters();
  displayFavoritedContact();
}
function getCounters() {
  var currentContacts =
    JSON.parse(localStorage.getItem("contactList")) || contactList || [];
  var numContacts = contactList.length;
  var favContacts = [];
  var emrContacts = [];
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].checkFavorite || contactList[i].isFavorite) {
      favContacts.push(contactList[i]);
    }
    if (contactList[i].checkEmergency || contactList[i].isEmergency) {
      emrContacts.push(contactList[i]);
    }
  }
  return {
    numContacts: numContacts,
    favContacts: favContacts.length,
    emrContacts: emrContacts.length,
  };
}
function displayCounters() {
  var {
    numContacts: total,
    favContacts: fav,
    emrContacts: emr,
  } = getCounters();
  totalContacts.innerHTML = total;
  totalFavContacts.innerHTML = fav;
  totalEmerContacts.innerHTML = emr;
}
function displayFavoritedContact() {
  var favContacts = [];

  if (contactList.length > 0) {
    for (var i = 0; i < contactList.length; i++) {
      if (contactList[i].checkFavorite) {
        favContacts.push(contactList[i]);
      }
    }
  }

  var box = `<div class="d-flex flex-column gap-2 w-100">`;
  for (var j = 0; j < favContacts.length; j++) {
    box += `
    <div class="d-flex justify-content-between">
        <div class="d-flex gap-2 align-items-center ">
            <div
                class="avatar-box text-white d-flex align-items-center justify-content-center fw-bold small bg-primary rounded-3">
                ${
                  favContacts[j].fullName
                    ? favContacts[j].fullName
                        .trim()
                        .split(/\s+/)
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : ""
                }
            </div>
            <div>
                <p class="fw-semibold text-dark fs-6 m-0">${favContacts[j].fullName}</p>
                <div class="d-flex gap-2 px-2 py-1 rounded-3">
                    <span class="text-secondary small fw-normal">${favContacts[j].phoneNumber}</span>
                </div>
            </div>
        </div>
        <div class="">
            <a href="tel:${favContacts[j].phoneNumber}"
                class="bg-light-blue d-flex align-items-center justify-content-center rounded-3 text-decoration-none"
                style="width: 40px; height: 40px; min-width: 40px;"><i
                    class="fa-solid fa-phone text-primary micro-font"></i></a>
        </div>
    </div>`;
  }
  if (cardBodyFav) {
    if (favContacts.length === 0) {
      cardBodyFav.innerHTML = `<div class="text-muted small p-4 text-center">No favorites yet</div>`;
    } else {
      cardBodyFav.innerHTML = box;
    }
  }
  return favContacts;
}
function displayEmergencyContact() {
  var emrContacts = [];
  if (contactList.length > 0) {
    for (var i = 0; i < contactList.length; i++) {
      if (contactList[i].checkEmergency) {
        emrContacts.push(contactList[i]);
      }
    }
  }
  var box = `<div class="d-flex flex-column gap-2 w-100 p-2">`;
  for (var j = 0; j < emrContacts.length; j++) {
    box += `
    <div class="d-flex justify-content-between">
        <div class="d-flex gap-2 align-items-center ">
            <div
                class="avatar-box text-white d-flex align-items-center justify-content-center fw-bold small bg-danger rounded-3">
                ${
                  emrContacts[j].fullName
                    ? emrContacts[j].fullName
                        .trim()
                        .split(/\s+/)
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : ""
                }
            </div>
            <div>
                <p class="fw-semibold text-dark fs-6 m-0">${emrContacts[j].fullName}</p>
                <div class="d-flex gap-2 px-2 py-1 rounded-3">
                    <span class="text-secondary small fw-normal">${emrContacts[j].phoneNumber}</span>
                </div>
            </div>
        </div>
        <div class="">
            <a href="tel:${emrContacts[j].phoneNumber}"
                class="bg-light-rose d-flex align-items-center justify-content-center rounded-3 text-decoration-none"
                style="width: 40px; height: 40px; min-width: 40px;"><i
                    class="fa-solid fa-phone text-danger micro-font"></i></a>
        </div>
    </div>`;
  }
  if (cardBodyEmr) {
    if (emrContacts.length === 0) {
      cardBodyEmr.innerHTML = `<div class="text-gray small fw-normal p-5">No emergency contact</div>`;
    } else {
      cardBodyEmr.innerHTML = box;
    }
  }
  return emrContacts;
}
