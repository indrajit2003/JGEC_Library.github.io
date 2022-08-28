'use strict';

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
  function Display(){}
  Display.prototype.add = function (book) { 
    tableBody = document.getElementById("tableBody");
    let uiString = `<tr>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                          <td>${book.type}</td> 
                      </tr>`;
    tableBody.innerHTML += uiString;
  };

  Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
  
    libraryForm.reset();
  };
  Display.prototype.validate = function (book){
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  };


  Display.prototype.show = function (type, displaymessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong>${displaymessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
         </div>`;
    setTimeout(function () {
      message.innerHTML = '';
    }, 5000);
  }



let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("Author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let labclass = document.getElementById("labclass");
    if (fiction.checked) {
      type = fiction.value;
    } else if (programming.checked) {
      type = programming.value;
    } else if (labclass.checked) {
      type = labclass.value;
    }
    let book = new Book(name, author, type);

    let display = new Display();
    if (display.validate(book)) {
      display.add(book);
      display.clear();
      display.show( "Success!!!",
      "Thank You your book has been successfully added in the Library");
      console.log('Success')
      
    } else {
      display.show("Oops!!!", "Sorry! Your book was not added in the Library");
    }
    e.preventDefault();

}


