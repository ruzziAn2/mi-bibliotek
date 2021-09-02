class Book {
    constructor(title, author, pages, read, isbn) {
        this.title = title;
        this.author = author;
        this.pages = pages + 'pgs';
        this.read = read;
        this.isbn = isbn;
    }
}

const defaultBooks = [{
        title: 'Book 1',
        author: 'Prueba',
        pages: 4,
        isbn: 123,
        read: true
    },
    {
        title: 'Book 2',
        author: 'Prueba',
        pages: 4,
        isbn: 1231,
        read: false
    }
]

class Store {
    static addBook(book){
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks()
        const newBooks = books.filter(item => {
            return item.isbn !== isbn
        })
        localStorage.setItem('books', JSON.stringify(newBooks))
        
    }
    static getBooks(){
        const books = localStorage.getItem('books')
        if(!books) return []
        return JSON.parse(books)
    }
}

class UI {

    static showAlert(msg, className) {
        const div = document.createElement('div')
        div.innerText = msg
        div.className = `alert alert-${className}`
        document.getElementById('book-form').prepend(div)

        setTimeout(() => {
            div.remove()
        }, 2000)
    }


    static deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentNode.parentNode.remove()
        }
    }

    static clearFields() {
        const title = document.getElementById('title')
        const author = document.getElementById('author')
        const pages = document.getElementById('pages')
        const isRead = document.getElementById('isRead')
        const isbn = document.getElementById('isbn')

        author.value = '';
        title.value = '';
        pages.value = '';
        isbn.value = '';
        isRead.checked = '';
    }


    static displayBooks() {
        defaultBooks.forEach(book => UI.addBookToList(book))
    }
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages} pg</td>
        <td>${book.isbn}</td>
        <td>${book.read? "read":"unread"}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }
}
UI.displayBooks()

document.querySelector('#book-form').addEventListener('submit', addBookToLibrary, false)

function addBookToLibrary(e) {
    e.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').value

    if (!author || !title || !pages) {
        UI.showAlert('Please enter correct details', 'danger')
        return
    }

    const book = new Book(title, author, pages, isRead)

    UI.addBookToList(book)
    UI.showAlert('Book Added', 'success')
    UI.clearFields()
}
document.getElementById('book-list').addEventListener('click', handleRemove);

function handleRemove(e) {
    UI.deleteBook(e.target)
    UI.showAlert('Book Removed', 'success')
}