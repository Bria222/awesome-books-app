/* eslint-disable linebreak-style */
const addBtn = document.querySelector('#btn-add');
const allBks = document.querySelector('#all-books');
const title = document.getElementById('title');
const author = document.getElementById('author');
const error = document.querySelector('#error');
let books = JSON.parse(localStorage.getItem('books'));

// books class
class Books {
  // add  books
  static addBooks = () => {
    addBtn.addEventListener('click', () => {
      const bkTitle = title.value;
      const bkAuthor = author.value;
      // condition to check if user filled all the required fields
      if (bkTitle === '' || bkAuthor === '') {
        error.style.display = 'block';
        error.textContent = 'fill all the fields please';
        setTimeout(() => {
          error.style.display = 'none';
        }, 3000);
        return;
      }
      const newBook = {
        id: Math.floor(Math.random() * 1000 + 1),
        title: bkTitle,
        author: bkAuthor,
      };

      let bks;
      if (this.getBooksLs() === null) {
        bks = [];
      } else {
        bks = this.getBooksLs();
      }
      bks.push(newBook);

      books = bks;
      // store books to local storage
      this.addBooksLs(bks);
      this.addUi();
      // clear the input fields after books entry
      title.value = '';
      author.value = '';
    });
  }

  static deleteBk = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-xmark')) {
        const id = parseInt(e.target.dataset.id, 10);
        const bks = books.filter((book) => book.id !== id);
        books = bks;

        this.addUi();
        this.addBooksLs(bks);
      }
    });
  }

    // get books from the local storage and perse them to json format
    static getBooksLs = () => JSON.parse(localStorage.getItem('books'));

    static addBooksLs = (bks) => {
      const dataToStore = JSON.stringify(bks);
      localStorage.setItem('books', dataToStore);
      this.addUi();
    }

    // append books from local storage to html
    static addUi = () => {
      let result = '';
      if (Books.getBooksLs() === null) {
        allBks.innerHTML = '<h3 class="empty">OOPs no books available !</h3>';
        return;
      }
      if (books.length === 0) {
        allBks.innerHTML = '<h3 class="empty">OOPs no books available !</h3>';
        return;
      }
      books.forEach((book) => {
        const { id, title, author } = book;
        const singleBk = `
        <div class="single-book">
      <span>" Book Title: ${title}" Written by: ${author}</span>
      <span class="close"><i class="fa-solid fa-xmark" data-id=${id}></i></span>
    </div>
        `;
        result += singleBk;
      });
      allBks.innerHTML = result;
    };
}

document.addEventListener('DOMContentLoaded', () => {
  Books.addUi();
  Books.addBooks();
  Books.deleteBk();
});