// console.log("this is library .js");
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}
function Display() {}

let sho = function () {
  tableBody = document.getElementById("tableBody");
  tableBody.innerHTML="";
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem("data"));
  } catch (error) {
    console.log(error);
  }
  // console.log(data);
  data["data"].forEach((elem) => {
    let uiString = `<tr>
                        <td>${elem.name}</td>
                        <td>${elem.author}</td>
                        <td>${elem.type}</td> 
                    </tr>`;
    tableBody.innerHTML += uiString;
  });
};
Display.prototype.addtoLocal = function (data) {
  let prevdata = JSON.parse(localStorage.getItem("data"));
  console.log(prevdata);
  if (prevdata) {
    localStorage.setItem(
      "data",
      JSON.stringify({ ct: prevdata.ct + 1, data: [...prevdata?.data, data] })
    );
  } else {
    let booData = { ct: 1, data: [{ ...data }] };
    console.log(booData);
    localStorage.setItem("data", JSON.stringify(booData));
  }
};
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");

  libraryForm.reset();
};
Display.prototype.validate = function (book) {
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
    message.innerHTML = "";
  }, 5000);
};

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
    display.addtoLocal({ name: name, author: author, type: type });
    // display.add();
    display.clear();
    display.show(
      "success",
      "Thank You your book has been successfully added in the Library"
    );
    sho()
  } else {
    display.show("Denger", "Sorry! Your book was not added in the Library");
  }

  e.preventDefault();
}

sho();

// let table = document.getElementById("table");
//    table = localStorage.getItem("table");
//   if(table == null){
//     tableObj = [];
//   }else{
//     tableObj = JSON.parse(table);
//   }
//   let myObj = {

//     name: bookName.value,
//     author: author.value

//   }
//    tableObj.push(myObj);
//    localStorage.setItem("table",JSON.stringify(tableObj))
//   bookName.value = "";
//   author.value = "";
//   console.log(tableObj);
//   showTable();

//   function showTable(){
//     if(table == null){
//       tableObj = [];
//     }else{
//       tableObj = JSON.parse(table);
//     }
//   }
