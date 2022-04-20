/* eslint-disable linebreak-style */
const textWrapper = document.querySelector('.ml2');
const addLink = document.querySelector('#add');
const bkContainer = document.querySelector('#books');
const allBks = document.querySelector('#all-books');
const listLink = document.querySelector('#list');
const contLink = document.querySelector('#contact');
const titleCont = document.querySelector('.books-title-1');
let books = JSON.parse(localStorage.getItem('books'));
class Books {
  // add new books
  static addBooks = () => {
    addLink.addEventListener('click', () => {
      const result = ` 
          <div class="add-section">
          <i class="fa-solid fa-book fa-5x"></i>
            <div class="underline"></div>
            <h2>Add a new book</h2>
            <input type="text" id="title" class="input" placeholder="title">
            <input type="text" id='author' class="input" placeholder="author">
            <p class="error" id="error"></p>
            <p class="sucess" id="success"></p>
            <button type="button" class="btn-add" id="btn-add">Add Book</button>
          </div>
        `;
      bkContainer.innerHTML = result;
      const title = document.querySelector('#title');
      const author = document.querySelector('#author');
      const addBtn = document.querySelector('#btn-add');
      const error = document.querySelector('#error');

      addBtn.addEventListener('click', () => {
        const bkTitle = title.value;
        const bkAuthor = author.value;

        // check if the input value is empty
        if (bkTitle === '' || bkAuthor === '') {
          error.style.cssText = `
          display: block;
          color: red;
        `;
          error.textContent = 'all input fields are required';
          setTimeout(() => {
            error.style.display = 'none';
          }, 2000);
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
        this.addBooksLs(bks);
        this.addUi();
        title.value = '';
        author.value = '';
        error.style.cssText = `
          display: block;
          color:green;
        `;
        error.textContent = 'added successfully!';
        setTimeout(() => {
          error.style.display = 'none';
        }, 2000);
      });
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

    static getBooksLs = () => JSON.parse(localStorage.getItem('books'));

    static addBooksLs = (bks) => {
      const dataToStore = JSON.stringify(bks);
      localStorage.setItem('books', dataToStore);
      this.addUi();
    }

    static addUi = () => {
      let result = '';
      if (Books.getBooksLs() === null) {
        allBks.innerHTML = '<h3 class="empty">OOPs no Books available at the moment !</h3>';
        titleCont.style.display = 'none';
        return;
      }
      if (books.length === 0) {
        allBks.innerHTML = '<h3 class="empty">OOPs no Books available at the moment !</h3>';
        titleCont.style.display = 'none';
        return;
      }
      titleCont.style.display = 'block';
      books.forEach((book) => {
        const { id, title, author } = book;
        const singleBk = `
        <div class="single-book">
        
          <span>"${title}" Written By: ${author}</span>
          <span class="close"><i class="fa-solid fa-xmark" data-id=${id}></i></span>
        </div>
        `;
        result += singleBk;
      });
      allBks.innerHTML = result;
    };

    static contactSection = () => {
      titleCont.style.display = 'none';
      contLink.addEventListener('click', () => {
        const result = `
        <i class="fa-solid fa-phone-volume fa-5x"></i>
          <h2 class="books-title">Contact Us</h2>
          <p class="contact-text">For any questions feel free to reach us </p>
          <ul class="contact-list ">
            <li class="contact-text">our email: awesomebooks.com</li>
            <li class="contact-text">our phone number: +100007856536</li>
          </ul>
        `;
        bkContainer.innerHTML = result;
      });
    }

    static listSection = () => {
      listLink.addEventListener('click', () => {
        window.location.reload();
      });
    }
}
// call all methods
document.addEventListener('DOMContentLoaded', () => {
  Books.addUi();
  Books.addBooks();
  Books.deleteBk();
  Books.contactSection();
  Books.listSection();
  titleCont.style.display = 'block';
});

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// eslint-disable-next-line no-undef
anime.timeline({ loop: true })
  .add({
    targets: '.ml2 .letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: 'easeOutExpo',
    duration: 950,
    delay: (el, i) => 70 * i,
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1000,
  });
