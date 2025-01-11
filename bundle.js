/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://train-webpack/./src/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ \"./src/main.scss\");\n\r\nconst name = document.querySelector('.inputs__name')\r\nconst vacancy = document.querySelector('.inputs__vacancy')\r\nconst phone = document.querySelector('.inputs__phone')\r\nlet globalArrContacts = JSON.parse(localStorage.getItem('contactsArray')) || []\r\nlet deleteBtn\r\nlet editBtn\r\nlet isErrors\r\nlet globalContact\r\nlet globalElement\r\nlet globalCard\r\n\r\nconst savedContactsArray = JSON.parse(localStorage.getItem('contactsArray'))\r\nconsole.log(savedContactsArray)\r\n\r\nfunction toggleEditPopUp() {\r\n    document.querySelector('.js-edit-popup').classList.toggle('edit-popup__text_active')\r\n    document.querySelector('.js-edit-popup-bg').classList.toggle('edit-popup__bg_active')\r\n}\r\n\r\nconst toggleSearchPopUp = () => {\r\n    const contactsContainerDom = document.querySelector('.contactsContainer')\r\n    const searchInput = document.querySelector('.search-popup__input')\r\n\r\n    if (contactsContainerDom && searchInput) {\r\n        removeItemAndCounter(contactsContainerDom, searchInput, true)\r\n    }\r\n\r\n    document.querySelector('.js-search-popup').classList.toggle('search-popup__text_active')\r\n    document.querySelector('.js-search-popup-bg').classList.toggle('search-popup__bg_active')\r\n}\r\n\r\ndocument.querySelector('.js-popup-close').addEventListener('click', toggleSearchPopUp)\r\ndocument.querySelector('.js-search-popup-bg').addEventListener('click', toggleSearchPopUp)\r\ndocument.querySelector('.js-edit-popup-bg').addEventListener('click', toggleEditPopUp)\r\ndocument.querySelector('.search-popup__input').addEventListener('input', findContact)\r\n\r\nconst removeItemAndCounter = (prevBox, prevCounter, deleteOnlyValue) => {\r\n    if (prevBox) {\r\n        prevBox.remove()\r\n    }\r\n\r\n    if (prevCounter && !deleteOnlyValue) {\r\n        prevCounter.remove(prevBox, prevCounter)\r\n    }\r\n    if (deleteOnlyValue) {\r\n        prevCounter.value = ''\r\n    }\r\n}\r\n\r\n//POPUP\r\ndocument.querySelector('.js-search-btn').addEventListener('click', function () {\r\n    toggleSearchPopUp()\r\n})\r\n\r\nconst editModalBtn = document.querySelector('.js-submit-edit-btn')\r\n\r\nconst validateValues = (nameField, vacancyField, phoneField) => {\r\n    let errors = {}\r\n    const contacts = {}\r\n    const nameValue = nameField?.value?.trim().toLowerCase()\r\n    const vacancyValue = vacancyField?.value?.trim().toLowerCase()\r\n    // валидация на количесвто символов и правильный ввод телефона\r\n    const phoneValue = phoneField?.value\r\n        ?.trim()\r\n        ?.replace(/[^0-9+]/g, '')\r\n        .toLowerCase()\r\n\r\n    if (!nameValue) {\r\n        errors.name = 'Field is Empty'\r\n    } else if (nameValue?.length < 3) {\r\n        errors.name = 'Field is less than 3 symbols'\r\n    } else {\r\n        contacts.name = nameValue\r\n        errors.name = null\r\n    }\r\n\r\n    if (!vacancyValue) {\r\n        errors.vacancy = 'Field is Empty'\r\n    } else if (vacancyValue?.length < 3) {\r\n        errors.vacancy = 'Field is less than 3 symbols'\r\n    } else {\r\n        contacts.vacancy = vacancyValue\r\n        errors.vacancy = null\r\n    }\r\n\r\n    if (!phoneValue) {\r\n        errors.phone = 'Field is Empty'\r\n    } else if (phoneValue?.length < 3) {\r\n        errors.phone = 'Field is less than 3 symbols'\r\n    } else if (phoneValue.slice(0, 1) !== '+') {\r\n        errors.phone = 'Field must begin from +'\r\n    } else if (phoneValue.slice(0, 1) !== '+') {\r\n        errors.phone = 'Field must begin from +'\r\n    } else if (phoneValue?.length !== 12) {\r\n        errors.phone = 'Field must contain 11 symbols and +'\r\n    } else {\r\n        contacts.phone = phoneValue\r\n        errors.phone = null\r\n    }\r\n\r\n    // валидация на одинаковые контакты при введении\r\n    globalArrContacts.forEach((item) => {\r\n        const isEqual = JSON.stringify(item) === JSON.stringify(contacts)\r\n        if (isEqual) {\r\n            errors.name = 'You write equal contacts'\r\n            errors.vacancy = 'You write equal contacts'\r\n            errors.phone = 'You write equal contacts'\r\n        }\r\n    })\r\n    return { errors, contacts }\r\n}\r\n\r\nconst deleteChoosenContact = (contactElement, arrayContacts, filteredArrItem) => {\r\n    contactElement.remove()\r\n    const index = arrayContacts.findIndex((el) => {\r\n        return el.name === filteredArrItem.name && el.vacancy === filteredArrItem.vacancy && el.phone === filteredArrItem.phone\r\n    })\r\n    arrayContacts.splice(index, 1)\r\n    globalArrContacts = arrayContacts\r\n    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))\r\n    createContainerForContactsOnTable(filteredArrItem, arrayContacts)\r\n}\r\n\r\nconst editChoosenContact = (contactElement, card, arrayContactsBeforeEdition, editedContacts, contactsInModal) => {\r\n    // make ContactsArray where edited Contact was\r\n    const newContactsArray = arrayContactsBeforeEdition.filter((el) => JSON.stringify(el) !== JSON.stringify(editedContacts))\r\n    globalArrContacts = newContactsArray\r\n    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))\r\n    createContainerForContactsOnTable(editedContacts, newContactsArray)\r\n    const editedContactsIndex = arrayContactsBeforeEdition.findIndex((el) => {\r\n        return el.name === editedContacts.name && el.vacancy === editedContacts.vacancy && el.phone === editedContacts.phone\r\n    })\r\n\r\n    // make ContactsArray where  contactsInModal will be\r\n    const arrWithContactsInModal = arrayContactsBeforeEdition.map((item, index) => {\r\n        if (index === editedContactsIndex) {\r\n            item = contactsInModal\r\n        }\r\n        return item\r\n    })\r\n    globalArrContacts = arrWithContactsInModal\r\n    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))\r\n    createContainerForContactsOnTable(contactsInModal, globalArrContacts)\r\n}\r\n// меняем название Контакта\r\n\r\neditModalBtn.addEventListener('click', function () {\r\n    const name = document.querySelector('.js-edit-name-input')\r\n    const vacancy = document.querySelector('.js-edit-vacancy-input')\r\n    const phone = document.querySelector('.js-edit-phone-input')\r\n\r\n    const errorsAndContactArr = validateValues(name, vacancy, phone)\r\n    console.log(errorsAndContactArr)\r\n    console.log(Object.values(errorsAndContactArr?.errors).filter((item) => item)?.length)\r\n    const isErrors = Object.values(errorsAndContactArr?.errors).filter((item) => item)?.length > 0\r\n    console.log(isErrors)\r\n    const contacts = {\r\n        name: name?.value,\r\n        vacancy: vacancy?.value,\r\n        phone: phone?.value,\r\n    }\r\n    if (!isErrors) {\r\n        removeMistakesSpans()\r\n        setTimeout(toggleEditPopUp, 500)\r\n        editChoosenContact(globalElement, globalCard, globalArrContacts, globalContact, contacts)\r\n    } else {\r\n        console.log('addErrorsToPage')\r\n        addErrorsToPage(errorsAndContactArr?.errors, name, vacancy, phone)\r\n    }\r\n})\r\n\r\nconst createListEl = (filteredContact, boxForContacts, card) => {\r\n    globalCard = card\r\n    const element = document.createElement('li')\r\n    element.innerHTML = `${filteredContact.name} ${filteredContact.vacancy} ${filteredContact.phone}`\r\n    boxForContacts?.appendChild(element)\r\n    createDeleteBtn(element, filteredContact)\r\n    createEditBtn(element, filteredContact)\r\n    deleteBtn.addEventListener('click', function () {\r\n        deleteChoosenContact(element, globalArrContacts, filteredContact)\r\n        if (card) {\r\n            card.innerHTML = globalArrContacts?.filter((el) => el?.name?.slice(0, 1) === filteredContact?.name?.slice(0, 1))?.length.toString()\r\n        }\r\n    })\r\n    editBtn.addEventListener('click', function () {\r\n        globalElement = element\r\n        globalCard = card\r\n        globalContact = filteredContact\r\n        console.log(isErrors)\r\n        toggleEditPopUp()\r\n    })\r\n}\r\n\r\nconst clearDom = () => {\r\n    globalArrContacts.length = 0\r\n    window.localStorage.removeItem('contactsArray')\r\n    const box = document.querySelectorAll('.box')\r\n    const letterCounter = document.querySelectorAll('.letter__counter')\r\n    box.forEach((item) => (item.innerHTML = ''))\r\n    letterCounter.forEach((item) => (item.innerHTML = ''))\r\n}\r\n\r\nconst createContainer = (contactsItem, card, box, ul) => {\r\n    const mainPersonContainer = document.querySelector(`[data-id=\"${contactsItem?.name?.slice(0, 1)}\"]`)\r\n    mainPersonContainer?.appendChild(card)\r\n    box?.appendChild(ul)\r\n    mainPersonContainer?.appendChild(box)\r\n}\r\n\r\nconst createContainerForContactsOnTable = (choosenContactItem, arrayContacts) => {\r\n    console.log(choosenContactItem)\r\n    console.log(arrayContacts)\r\n    const card = document.createElement('span')\r\n    card.setAttribute('id', `card-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)\r\n    card.classList.add('letter__counter_active')\r\n    card.classList.add('letter__counter')\r\n    const ul = document.createElement('ul')\r\n    const box = document.createElement('div')\r\n    box.setAttribute('id', `box-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)\r\n    box.classList.add('box')\r\n\r\n    const prevBox = document.getElementById(`box-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)\r\n    const prevCounter = document.getElementById(`card-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)\r\n\r\n    removeItemAndCounter(prevBox, prevCounter)\r\n\r\n    const filteredByLetterArr = arrayContacts.filter((item) => item.name.slice(0, 1) === choosenContactItem?.name?.slice(0, 1))\r\n    card.innerHTML = filteredByLetterArr?.length.toString()\r\n    filteredByLetterArr.forEach((item) => {\r\n        createListEl(item, ul, card)\r\n    })\r\n\r\n    createContainer(choosenContactItem, card, box, ul)\r\n}\r\n\r\nfunction findContact() {\r\n    const contactsContainerDom = document.querySelector('.contactsContainer')\r\n    if (contactsContainerDom) {\r\n        contactsContainerDom.remove()\r\n    }\r\n    const filteredArr = globalArrContacts.filter((item) => item.name.includes(this.value))\r\n    let contactsContainer = document.createElement('div')\r\n    contactsContainer.setAttribute('class', `contactsContainer`)\r\n    document.querySelector('.search-popup__output').appendChild(contactsContainer)\r\n    filteredArr.forEach((item) => createListEl(item, contactsContainer, globalCard))\r\n}\r\n\r\nconst createDeleteBtn = (listElement, contacts) => {\r\n    deleteBtn = document.createElement('button')\r\n    deleteBtn.setAttribute('id', `btn-${contacts?.name?.slice(0, 1)}`)\r\n    deleteBtn.classList.add('delete__btn')\r\n    deleteBtn.innerHTML = 'Delete'\r\n    listElement?.appendChild(deleteBtn)\r\n}\r\n\r\nconst createEditBtn = (listElement, contacts) => {\r\n    editBtn = document.createElement('button')\r\n    editBtn.setAttribute('id', `editBtn-${contacts?.name?.slice(0, 1)}`)\r\n    editBtn.classList.add('edit__btn')\r\n    editBtn.innerHTML = 'Edit'\r\n    listElement?.appendChild(editBtn)\r\n}\r\n\r\nconst addToTable = (contacts) => {\r\n    globalArrContacts.push(contacts)\r\n    console.log(globalArrContacts)\r\n    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))\r\n    createContainerForContactsOnTable(contacts, globalArrContacts)\r\n}\r\n\r\nconst removeMistakesSpans = () => {\r\n    const spans = document.querySelectorAll('.mistake')\r\n    if (spans) {\r\n        spans.forEach((item) => {\r\n            if (item) {\r\n                item.remove()\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\nconst addErrorsToPage = (errors, name, vacancy, phone) => {\r\n    removeMistakesSpans()\r\n    const spanName = document.createElement('span')\r\n    spanName.classList.add('mistake')\r\n    spanName.style.color = 'red'\r\n    spanName.innerText = errors?.name\r\n\r\n    const spanVacancy = document.createElement('span')\r\n    spanVacancy.classList.add('mistake')\r\n    spanVacancy.style.color = 'red'\r\n    spanVacancy.innerText = errors?.vacancy\r\n\r\n    const spanPhone = document.createElement('span')\r\n    spanPhone.classList.add('mistake')\r\n    spanPhone.style.color = 'red'\r\n    spanPhone.innerText = errors?.phone\r\n\r\n    if (errors?.name) {\r\n        name.insertAdjacentElement('afterend', spanName)\r\n    }\r\n    if (errors?.vacancy) {\r\n        vacancy.insertAdjacentElement('afterend', spanVacancy)\r\n    }\r\n    if (errors?.phone) {\r\n        phone.insertAdjacentElement('afterend', spanPhone)\r\n    }\r\n}\r\n\r\nwindow.onload = function () {\r\n    const clearBtn = document.querySelector('.inputs__clear')\r\n    let globalArrContacts = JSON.parse(localStorage.getItem('contactsArray'))\r\n    const savedArrayContacts = globalArrContacts || []\r\n    const arr = []\r\n    savedArrayContacts.map((item) => {\r\n        console.log(item)\r\n        arr.push(item.name.slice(0, 1))\r\n    })\r\n    console.log(new Set(arr))\r\n\r\n    new Set(arr).forEach((value) => {\r\n        console.log(value)\r\n        console.log(savedArrayContacts.find((item) => item.name.slice(0, 1) === value)) // 5\r\n        const neededContact = savedArrayContacts.find((item) => item.name.slice(0, 1) === value)\r\n        createContainerForContactsOnTable(neededContact, savedArrayContacts)\r\n    })\r\n\r\n    //Press on submit button: getting input's values and creating object with fields name, vacancy, phone\r\n    document.querySelector('.js-submit-btn').addEventListener('click', () => {\r\n        const errorsAndContactsObj = validateValues(name, vacancy, phone)\r\n        console.log(Object.values(errorsAndContactsObj?.errors).filter((item) => item))\r\n        const isErrors = Object.values(errorsAndContactsObj?.errors).filter((item) => item).length > 0\r\n\r\n        if (!isErrors) {\r\n            removeMistakesSpans()\r\n            addToTable(errorsAndContactsObj?.contacts)\r\n        } else {\r\n            addErrorsToPage(errorsAndContactsObj?.errors, name, vacancy, phone)\r\n        }\r\n    })\r\n\r\n    clearBtn.addEventListener('click', () => {\r\n        clearDom()\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://train-webpack/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;