class Book {
    constructor(title, author, pages, read, isbn) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.isbn = isbn;
    }
}


class Store {
    static getBooks() {
        let books;
        if (books === null) return []
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))

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
        isRead.checked = false;
    }


    static displayBooks() {
        const books = Store.getBooks()
        books.forEach(book => {
            UI.addBookToList(book)
        })
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
        <td><a id="delete" href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', addBookToLibrary, false)

function addBookToLibrary(e) {
    e.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isbn = document.getElementById('isbn').value
    const isRead = document.getElementById('isRead').value

    if (!author || !title || !pages || !isbn) {
        UI.showAlert('Please enter correct details', 'danger')
        return
    }

    const book = new Book(title, author, pages, isbn, isRead)

    UI.addBookToList(book)
    UI.showAlert('Book Added', 'success')
    UI.clearFields()
    Store.addBook(book)
}
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book Removed', 'success')
});