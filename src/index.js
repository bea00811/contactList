import './main.scss'
const name = document.querySelector('.inputs__name')
const vacancy = document.querySelector('.inputs__vacancy')
const phone = document.querySelector('.inputs__phone')
let globalArrContacts = JSON.parse(localStorage.getItem('contactsArray')) || []
let deleteBtn
let editBtn
let isErrors
let globalContact
let globalElement
let globalCard

const savedContactsArray = JSON.parse(localStorage.getItem('contactsArray'))
console.log(savedContactsArray)

function toggleEditPopUp() {
    document.querySelector('.js-edit-popup').classList.toggle('edit-popup__text_active')
    document.querySelector('.js-edit-popup-bg').classList.toggle('edit-popup__bg_active')
}

const toggleSearchPopUp = () => {
    const contactsContainerDom = document.querySelector('.contactsContainer')
    const searchInput = document.querySelector('.search-popup__input')

    if (contactsContainerDom && searchInput) {
        removeItemAndCounter(contactsContainerDom, searchInput, true)
    }

    document.querySelector('.js-search-popup').classList.toggle('search-popup__text_active')
    document.querySelector('.js-search-popup-bg').classList.toggle('search-popup__bg_active')
}

document.querySelector('.js-popup-close').addEventListener('click', toggleSearchPopUp)
document.querySelector('.js-search-popup-bg').addEventListener('click', toggleSearchPopUp)
document.querySelector('.js-edit-popup-bg').addEventListener('click', toggleEditPopUp)
document.querySelector('.search-popup__input').addEventListener('input', findContact)


document.querySelectorAll('.element').forEach(
    el=>{
        el.addEventListener('click', function(){
            console.log(this.querySelector('.box'))

            this.querySelector('.box')?.classList?.toggle('box_active')
        })
    }
)




const removeItemAndCounter = (prevBox, prevCounter, deleteOnlyValue) => {
    if (prevBox) {
        prevBox.remove()
    }

    if (prevCounter && !deleteOnlyValue) {
        prevCounter.remove(prevBox, prevCounter)
    }
    if (deleteOnlyValue) {
        prevCounter.value = ''
    }
}

//POPUP
document.querySelector('.js-search-btn').addEventListener('click', function () {
    toggleSearchPopUp()
})

const editModalBtn = document.querySelector('.js-submit-edit-btn')

const validateValues = (nameField, vacancyField, phoneField) => {
    let errors = {}
    const contacts = {}
    const nameValue = nameField?.value?.trim().toLowerCase()
    const vacancyValue = vacancyField?.value?.trim().toLowerCase()
    // валидация на количесвто символов и правильный ввод телефона
    const phoneValue = phoneField?.value
        ?.trim()
        ?.replace(/[^0-9+]/g, '')
        .toLowerCase()

    if (!nameValue) {
        errors.name = 'Field is Empty'
    } else if (nameValue?.length < 3) {
        errors.name = 'Field is less than 3 symbols'
    } else {
        contacts.name = nameValue
        errors.name = null
    }

    if (!vacancyValue) {
        errors.vacancy = 'Field is Empty'
    } else if (vacancyValue?.length < 3) {
        errors.vacancy = 'Field is less than 3 symbols'
    } else {
        contacts.vacancy = vacancyValue
        errors.vacancy = null
    }

    if (!phoneValue) {
        errors.phone = 'Field is Empty'
    } else if (phoneValue?.length < 3) {
        errors.phone = 'Field is less than 3 symbols'
    } else if (phoneValue.slice(0, 1) !== '+') {
        errors.phone = 'Field must begin from +'
    } else if (phoneValue.slice(0, 1) !== '+') {
        errors.phone = 'Field must begin from +'
    } else if (phoneValue?.length !== 12) {
        errors.phone = 'Field must contain 11 symbols and +'
    } else {
        contacts.phone = phoneValue
        errors.phone = null
    }

    // валидация на одинаковые контакты при введении
    globalArrContacts.forEach((item) => {
        const isEqual = JSON.stringify(item) === JSON.stringify(contacts)
        if (isEqual) {
            errors.name = 'You write equal contacts'
            errors.vacancy = 'You write equal contacts'
            errors.phone = 'You write equal contacts'
        }
    })
    return { errors, contacts }
}

const deleteChoosenContact = (contactElement, arrayContacts, filteredArrItem) => {
    contactElement.remove()
    const index = arrayContacts.findIndex((el) => {
        return el.name === filteredArrItem.name && el.vacancy === filteredArrItem.vacancy && el.phone === filteredArrItem.phone
    })
    arrayContacts.splice(index, 1)
    globalArrContacts = arrayContacts
    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))
    createContainerForContactsOnTable(filteredArrItem, arrayContacts)
}

const editChoosenContact = (arrayContactsBeforeEdition, editedContacts, contactsInModal) => {
    // make ContactsArray where edited Contact was
    const newContactsArray = arrayContactsBeforeEdition.filter((el) => JSON.stringify(el) !== JSON.stringify(editedContacts))
    globalArrContacts = newContactsArray
    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))
    createContainerForContactsOnTable(editedContacts, newContactsArray)
    const editedContactsIndex = arrayContactsBeforeEdition.findIndex((el) => {
        return el.name === editedContacts.name && el.vacancy === editedContacts.vacancy && el.phone === editedContacts.phone
    })

    // make ContactsArray where  contactsInModal will be
    const arrWithContactsInModal = arrayContactsBeforeEdition.map((item, index) => {
        if (index === editedContactsIndex) {
            item = contactsInModal
        }
        return item
    })
    globalArrContacts = arrWithContactsInModal
    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))
    createContainerForContactsOnTable(contactsInModal, globalArrContacts)
}
// меняем название Контакта

editModalBtn.addEventListener('click', function () {
    const name = document.querySelector('.js-edit-name-input')
    const vacancy = document.querySelector('.js-edit-vacancy-input')
    const phone = document.querySelector('.js-edit-phone-input')

    const errorsAndContactArr = validateValues(name, vacancy, phone)
    const isErrors = Object.values(errorsAndContactArr?.errors).filter((item) => item)?.length > 0
    console.log(isErrors)
    const contacts = {
        name: name?.value,
        vacancy: vacancy?.value,
        phone: phone?.value,
    }
    if (!isErrors) {
        removeMistakesSpans()
        setTimeout(toggleEditPopUp, 500)
        editChoosenContact(globalArrContacts, globalContact, contacts)
    } else {
        console.log('addErrorsToPage')
        addErrorsToPage(errorsAndContactArr?.errors, name, vacancy, phone)
    }
})

const createListEl = (filteredContact, boxForContacts, card) => {
    globalCard = card
    const element = document.createElement('li')
    const p1 = document.createElement('p')
    p1.innerHTML = filteredContact.name
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    p1.innerHTML = `-${filteredContact.name}`
    p2.innerHTML = `-${filteredContact.vacancy}`
    p3.innerHTML = `${filteredContact.phone}`
    element?.appendChild(p1)
    element?.appendChild(p2)
    element?.appendChild(p3)
    // element.innerHTML = `${filteredContact.name} ${filteredContact.vacancy} ${filteredContact.phone}`
    boxForContacts?.appendChild(element)
    createDeleteBtn(element, filteredContact)
    createEditBtn(element, filteredContact)
    deleteBtn.addEventListener('click', function () {
        deleteChoosenContact(element, globalArrContacts, filteredContact)
        if (card) {
            card.innerHTML = globalArrContacts?.filter((el) => el?.name?.slice(0, 1) === filteredContact?.name?.slice(0, 1))?.length.toString()
        }
    })
    editBtn.addEventListener('click', function () {
        globalElement = element
        globalCard = card
        globalContact = filteredContact
        console.log(isErrors)
        toggleEditPopUp()
    })
}

const clearDom = () => {
    globalArrContacts.length = 0
    window.localStorage.removeItem('contactsArray')
    const box = document.querySelectorAll('.box')
    const letterCounter = document.querySelectorAll('.letter__counter')
    box.forEach((item) => (item.innerHTML = ''))
    letterCounter.forEach((item) => (item.innerHTML = ''))
}

const createContainer = (contactsItem, card, box, ul) => {
    const mainPersonContainer = document.querySelector(`[data-id="${contactsItem?.name?.slice(0, 1)}"]`)
    mainPersonContainer?.appendChild(card)
    box?.appendChild(ul)
    mainPersonContainer?.appendChild(box)
}

const createContainerForContactsOnTable = (choosenContactItem, arrayContacts) => {
    console.log(choosenContactItem)
    console.log(arrayContacts)
    const card = document.createElement('span')
    card.setAttribute('id', `card-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)
    card.classList.add('letter__counter_active')
    card.classList.add('letter__counter')
    const ul = document.createElement('ul')
    const box = document.createElement('div')
    box.setAttribute('id', `box-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)
    box.classList.add('box')

    const prevBox = document.getElementById(`box-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)
    const prevCounter = document.getElementById(`card-${choosenContactItem?.name?.slice(0, 1) || choosenContactItem}`)

    removeItemAndCounter(prevBox, prevCounter)

    const filteredByLetterArr = arrayContacts.filter((item) => item.name.slice(0, 1) === choosenContactItem?.name?.slice(0, 1))
    card.innerHTML = filteredByLetterArr?.length.toString()
    filteredByLetterArr.forEach((item) => {
        createListEl(item, ul, card)
    })

    createContainer(choosenContactItem, card, box, ul)
}

function findContact() {
    const contactsContainerDom = document.querySelector('.contactsContainer')
    if (contactsContainerDom) {
        contactsContainerDom.remove()
    }
    const filteredArr = globalArrContacts.filter((item) => item.name.includes(this.value))
    let contactsContainer = document.createElement('div')
    contactsContainer.setAttribute('class', `contactsContainer`)
    document.querySelector('.search-popup__output').appendChild(contactsContainer)
    filteredArr.forEach((item) => createListEl(item, contactsContainer, globalCard))
}

const createDeleteBtn = (listElement, contacts) => {
    deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', `btn-${contacts?.name?.slice(0, 1)}`)
    deleteBtn.classList.add('delete__btn')
    deleteBtn.innerHTML = 'Delete'
    listElement?.appendChild(deleteBtn)
}

const createEditBtn = (listElement, contacts) => {
    editBtn = document.createElement('button')
    editBtn.setAttribute('id', `editBtn-${contacts?.name?.slice(0, 1)}`)
    editBtn.classList.add('edit__btn')
    editBtn.innerHTML = 'Edit'
    listElement?.appendChild(editBtn)
}

const addToTable = (contacts) => {
    globalArrContacts.push(contacts)
    console.log(globalArrContacts)
    window.localStorage.setItem('contactsArray', JSON.stringify(globalArrContacts))
    createContainerForContactsOnTable(contacts, globalArrContacts)
}

const removeMistakesSpans = () => {
    const spans = document.querySelectorAll('.mistake')
    if (spans) {
        spans.forEach((item) => {
            if (item) {
                item.remove()
            }
        })
    }
}

const addErrorsToPage = (errors, name, vacancy, phone) => {
    removeMistakesSpans()
    const spanName = document.createElement('span')
    spanName.classList.add('mistake')
    spanName.style.color = 'red'
    spanName.innerText = errors?.name

    const spanVacancy = document.createElement('span')
    spanVacancy.classList.add('mistake')
    spanVacancy.style.color = 'red'
    spanVacancy.innerText = errors?.vacancy

    const spanPhone = document.createElement('span')
    spanPhone.classList.add('mistake')
    spanPhone.style.color = 'red'
    spanPhone.innerText = errors?.phone

    if (errors?.name) {
        name.insertAdjacentElement('afterend', spanName)
    }
    if (errors?.vacancy) {
        vacancy.insertAdjacentElement('afterend', spanVacancy)
    }
    if (errors?.phone) {
        phone.insertAdjacentElement('afterend', spanPhone)
    }
}

window.onload = function () {
    const clearBtn = document.querySelector('.inputs__clear')
    let globalArrContacts = JSON.parse(localStorage.getItem('contactsArray'))
    const savedArrayContacts = globalArrContacts || []
    const arr = []
    savedArrayContacts.map((item) => {
        console.log(item)
        arr.push(item.name.slice(0, 1))
    })
    console.log(new Set(arr))

    new Set(arr).forEach((value) => {
        console.log(value)
        console.log(savedArrayContacts.find((item) => item.name.slice(0, 1) === value)) // 5
        const neededContact = savedArrayContacts.find((item) => item.name.slice(0, 1) === value)
        createContainerForContactsOnTable(neededContact, savedArrayContacts)
    })

    //Press on submit button: getting input's values and creating object with fields name, vacancy, phone
    document.querySelector('.js-submit-btn').addEventListener('click', () => {
        const errorsAndContactsObj = validateValues(name, vacancy, phone)
        console.log(Object.values(errorsAndContactsObj?.errors).filter((item) => item))
        const isErrors = Object.values(errorsAndContactsObj?.errors).filter((item) => item).length > 0

        if (!isErrors) {
            removeMistakesSpans()
            addToTable(errorsAndContactsObj?.contacts)
        } else {
            addErrorsToPage(errorsAndContactsObj?.errors, name, vacancy, phone)
        }
    })

    clearBtn.addEventListener('click', () => {
        clearDom()
    })
}
