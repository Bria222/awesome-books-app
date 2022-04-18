/* eslint-disable linebreak-style */
const addBtn = document.querySelector('#btn-add');
const allBks = document.querySelector('#all-books');
const title = document.getElementById('title');
const author = document.getElementById('author');
const error = document.querySelector('#error');
let books = JSON.parse(localStorage.getItem('books'));
const fetchData = () => {
  let result = '';
  if (localStorage.getItem('books') === null) {
    allBks.innerHTML = '<h1 class="empty">OOPs no books available !</h1>';
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

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

// store books
function storeBksToLs(bks) {
  const dataToStore = JSON.stringify(bks);
  localStorage.setItem('books', dataToStore);
  fetchData();
}

// add books
addBtn.addEventListener('click', () => {
  const bkTitle = title.value;
  const bkAuthor = author.value;

  // display error by promise if the input value is empty
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
  if (localStorage.getItem('books') === null) {
    bks = [];
  } else {
    bks = JSON.parse(localStorage.getItem('books'));
  }
  bks.push(newBook);

  books = bks;
  // store books to local storage
  storeBksToLs(bks);
  // update DOM
  fetchData();
  title.value = '';
  author.value = '';
});

// delete books
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const id = parseInt(e.target.dataset.id, 10);
    const bks = books.filter((book) => book.id !== id);
    books = bks;
    fetchData();
    storeBksToLs(bks);
  }
});
