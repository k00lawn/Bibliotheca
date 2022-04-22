// Book constructor
function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

var myLibrary = [];

//Add Book Button
const modal = document.getElementById("modal")
const addBookBtn = document.getElementById("plus")
const addBookForm = document.getElementById("form")

//View Books 
const canvasModal = document.getElementById("canvasModal")

function openPopUp() {
    modal.style.display = "block"
    addBookBtn.style.display = "none"
}

function closePopUp() {
    modal.style.display = "none";
    addBookBtn.style.display = "block"
}

function openCanvas() {
    canvasModal.style.display = "block"
    addBookBtn.style.display = "none"
}

function closeCanvas() {
    canvasModal.style.display = "none";
    addBookBtn.style.display = "block"
}

//closing modals
window.onclick = function(event) {
    if (event.target == modal) {
      closePopUp()
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCanvas()
    }
  })


//Add Book Form
window.addEventListener ( "load", () => {
    const form = document.getElementById( "form" );
    const error_form = document.getElementById("error-form")

    addBookBtn.addEventListener("click", () => {
        openPopUp()
        form.reset()
    })

    form.addEventListener("submit", function (event)  {
        event.preventDefault();
        

        const form_title = document.getElementById('title').value
        const form_author = document.getElementById('author').value
        var form_pages = document.getElementById('pages').value
        var form_bookread = document.getElementById('book_read').value

        //Form Validation
        if(!form_title || !form_author || !form_pages) {
            error_form.style.display = "block"
            return false
        }
        error_form.style.display = "none"

        form_pages = parseInt(form_pages)
        form_bookread = (form_bookread === "true") ? true : false

        
        addBook(form_title, form_author, parseInt(form_pages), form_bookread)
        closePopUp()
    })
})


//Load App
function loadApp () {
    
    if(load()) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
        for (let i = 0; i < myLibrary.length; i++) {
            createBook(myLibrary[i])
        }
    } 
    
}


//Remove book function
function removeBook(book) {
    myLibrary.splice(book, 1)
    save()
    load()
}


//Add book function
function addBook (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    save()
    load()
    createBook(newBook)
}

//Mark Read and Mark unread
function markRead (coverIndex, coverTitle) {
    coverIndex.style.backgroundColor = "#fff"
    coverTitle.style.color = "#777777"
    save()
}

function markUnRead (coverIndex, coverTitle) {
    coverIndex.style.backgroundColor = "#777777"
    coverTitle.style.color = "#fff"
    save()
}

//Create books by dynamic html
function createBook (book) {

    //Book info
    const bookIndex = myLibrary.indexOf(book)

    //Basic Elements
    const linebreak = document.createElement('br')
    const a = document.createElement('a')

    //Creating Book Elements
    const list = document.querySelector('#list-th')
    const bookContainer = document.createElement('div')
    const cover = document.createElement('div')
    const coverTitle = document.createElement('h1')
    const description = document.createElement('div')
    const removeBtn = document.createElement('i')

    //Book Content
    const title = document.createElement('p')
    const author = document.createElement('span')
    const pages = document.createElement('span')

    //Setting Class Name
    bookContainer.classList.add('book')
    cover.classList.add('cover')
    description.classList.add('description')

    //Setting Attributes
    bookContainer.setAttribute('id', bookIndex)
    cover.setAttribute('id', `cover${bookIndex}`)
    coverTitle.setAttribute('id', `coverTitle${bookIndex}`)
    removeBtn.setAttribute('class', 'fa fa-trash-o')
    title.setAttribute('class', 'title')
    author.setAttribute('class', 'author')
    pages.setAttribute('class', 'pages')

    //Setting values to elements
    coverTitle.innerText = book.title 
    title.innerHTML = book.title
    author.innerHTML = book.author
    pages.innerHTML = book.pages
   
    cover.appendChild(coverTitle)
    description.appendChild(title)
    a.appendChild(removeBtn)
    author.appendChild(a)
    title.appendChild(pages)
    title.appendChild(linebreak)
    title.appendChild(author)
    
    
    
    list.appendChild(bookContainer)
    bookContainer.appendChild(cover)
    bookContainer.appendChild(description)  
    
    //Remove Button
    
    removeBtn.addEventListener('click', () => {
        const bookID = document.getElementById(bookIndex)
        bookID.parentNode.removeChild(bookID)
        removeBook(book)
    })

    //Mark as read
    const coverIndexCSS = document.getElementById(`cover${bookIndex}`)
    const coverTitleCSS = document.getElementById(`coverTitle${bookIndex}`)

    book.read ? markRead(coverIndexCSS, coverTitleCSS) : markUnRead(coverIndexCSS, coverTitleCSS)

    cover.addEventListener('click', () => {
        openCanvas()
    })

    cover.addEventListener("dblclick", () => {
        book.read ? markUnRead(coverIndexCSS, coverTitleCSS) : markRead(coverIndexCSS, coverTitleCSS)
        book.read = !book.read
        save()
    })

    
 
}

//Save function to save books
function save() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

//Loading from local storage
function load() {
    if((JSON.parse(localStorage.getItem('myLibrary'))) === null) {
        save()
    }
    const localLibrary = JSON.parse(localStorage.getItem('myLibrary'))

    var err_el = document.getElementById("error-message")
    if(!localLibrary.length) {
        err_el.style.display = "block"
        return false
    } else {
        err_el.style.display = "none"
    }

    return true
}

loadApp()