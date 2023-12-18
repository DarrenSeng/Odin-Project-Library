
const myLibrary = [];
const libraryArray = document.querySelector('#library-array');
const inputLabel = document.querySelector('#inputLabel');
const inputField = document.querySelector('#inputField');

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.isRead ? 'already read' : 'not read yet'}`;
    };
    this.toggleReadStatus = function() { 
      if(this.isRead === true) {
        console.log('status is read, changing to false')
        this.isRead = false
      } else {
        console.log('status is unread, changing to read')
        this.isRead = true
      }
    };

}

let currentStep = 0;
const prompts = ["Enter a book title:", "Enter the book's author:", "Enter the number of pages:", "Enter the book's read status (t/f):"];

function addBookToLibrary() {
  if (currentStep < prompts.length - 1) {
      // Get user input based on the current step
      let userInput = inputField.value;

      // Store user input in the corresponding variable based on the step
      switch (currentStep) {
          case 0:
              userTitle = userInput;
              break;
          case 1:
              userAuthor = userInput;
              break;
          case 2:
              userNumPages = userInput;
              break;
      }

      // Clear the input field
      inputField.value = '';

      // Move to the next step
      currentStep++;
      console.log(currentStep)
      // Update the inputLabel only if it's not the final step
      if (currentStep < prompts.length) {
          inputLabel.textContent = prompts[currentStep];
      }

  } else {
      // Add the book to the library array
      userIsRead = inputField.value.toLowerCase() === 't';
      myLibrary.push(new Book(userTitle, userAuthor, userNumPages, userIsRead));

      // Reset for the next book entry
      inputField.value = '';
      currentStep = 0;
      inputLabel.textContent = prompts[currentStep];

      displayLibrary();
  }
}


function displayLibrary() {
  // Clear the existing content in the library array div
  libraryArray.innerHTML = '';

  // Display header row
  const headerRow = document.createElement('div');
  headerRow.classList.add('library-row', 'header-row');
  headerRow.innerHTML = '<div>Title</div><div>Author</div><div>Pages</div><div>Read Status</div><div>Actions</div>';
  libraryArray.appendChild(headerRow);

  // Display each book's information in the library array
  myLibrary.forEach((book, index) => {
      const bookRow = document.createElement('div');
      bookRow.classList.add('library-row');
      bookRow.innerHTML = `<div>${book.title}</div><div>${book.author}</div><div>${book.numPages}</div><div>${book.isRead ? 'Read' : 'Not Read'}</div>
      <div><button onclick="toggleReadStatus(${index})">Toggle Status</button></div>
      <div><button onclick="removeBook(${index})">Remove</button></div>`;
      libraryArray.appendChild(bookRow);
  });
}

function toggleReadStatus(index) {
  // Toggle the read status of the book at the specified index
  myLibrary[index].toggleReadStatus();
  // Update the display after toggling the read status
  displayLibrary();
}

function removeBook(index) {
  // Remove the book from the library array based on the index
  myLibrary.splice(index, 1);
  // Update the display after removing the book
  displayLibrary();
}

