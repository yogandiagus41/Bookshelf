$.getJSON('Data/Books.json', function(data){
     let book = data.Book;
    
        $.each(book, function(i, data){
            var title=data.title;
            var lt = title.length;
            if (lt > 25) {
                title = title.substring(0, 25);
                title = title + "...";
            }
         
            $('#daftar-buku').append('<div class="col-md-4"><div class="card mb-3 p-2 shadow" style="max-width: 540px;"><div class="row"><div class="col-xl-4"><img src="assets/img/book/'+ data.img +'" class="card-img-top" alt="..."></div><div class="col-xl-8"><div class="card-body"><h5 class="card-title">'+ title +'</h5><p> Author : '+ data.author +'<br>Tahun Terbit : '+ data.years +'<br></div> </div></div></div></div>');
            $('#listBuku').append('  <option value="'+data.title+'">'+ data.title +'</option>');
        });
    });

const formJudul = document.querySelector("#form-judul");
formJudul.addEventListener("submit", tampilkanFormBuku);

function tampilkanFormBuku(e){
    e.preventDefault();
    let namaBuku = document.getElementById("listBuku").value;
    $.getJSON('Data/Books.json', function(data){
     let daftarBuku = data.Book;
     $.each(daftarBuku, function(i, data){
        if (data.title == namaBuku) {
           $('#buku-pilihan').html('<form id="form-book"><div class="form-group mb-2 mt-4"><input type="hidden" class="form-control" placeholder="'+data.id+'" id="id" value="'+data.id+'"></div><div class="form-group mb-2"><label for="title">Judul:</label><input type="text" class="form-control" disabled placeholder="'+data.title+'" id="title" value="'+data.title+'"></div><div class="form-group mb-2"><label for="author">Athor:</label><input type="text" class="form-control" disabled placeholder="'+data.author+'" id="author" value="'+data.author+'"></div><div class="form-group mb-2"><label for="years">Tahun Terbit:</label><input type="text" class="form-control" disabled placeholder="'+data.years+'" id="years" value="'+data.years+'"></div><div class="form-group mb-2"><input type="hidden" class="form-control" placeholder="'+data.img+'" id="img" value="'+data.img+'"></div><div class="form-group mb-2"><input type="hidden" class="form-control" placeholder="'+data.isComplete+'" id="isComplete" value="'+data.isComplete+'"></div><div class="d-grid"><button type="submit" class="btn btn-primary mt-2 btn-block">Masukan Ke daftar bacaan</button> </div></form>');
         }
        
     });
     const formbook = document.querySelector("#form-book");
     let nomer = document.querySelector("#id");
     let judul = document.querySelector("#title");
     let penulis = document.querySelector("#author");
     let tahun = document.querySelector("#years");
     let gambar = document.querySelector("#img");
     let status = document.querySelector("#isComplete");
     formbook.addEventListener("submit", buatBuku); 
     function buatBuku(e){
         e.preventDefault();
         var id = nomer.value;
         var title = judul.value;
         var author= penulis.value;
         var years = tahun.value;
         var img =  gambar.value;
         var isComplete = status.value;
     toLocalStorage(id, title, author, years, img, isComplete);
     AutoRefresh(0);
     }
});
}

formManual = document.querySelector("#form-book-manual");
let nomerm = document.querySelector("#idm");
let judulm = document.querySelector("#titlem");
let penulism = document.querySelector("#authorm");
let tahunm = document.querySelector("#yearsm");
let gambarm = document.querySelector("#imgm");
let statusm = document.querySelector("#isCompletem");
if(formManual){
  formManual.addEventListener("submit", buatBukuManual);
}

function buatBukuManual(e){
e.preventDefault();
var id = nomerm.value;
var title = judulm.value;
var author= penulism.value;
var years = tahunm.value;
var img =  gambarm.value;
var isComplete = statusm.value;

toLocalStorage(id, title, author, years, img, isComplete);
AutoRefresh(0);
}














function getList(){
    let buku;
    if(localStorage.getItem("buku") == null){
        buku = [];
    } else {
        buku = JSON.parse(localStorage.getItem("buku"));
    }
    return buku;
}
function toLocalStorage(id, title, author, years, img, isComplete){

  var hasilcek = [];
  const ceks = JSON.parse(localStorage.getItem("buku"));
  $.each(ceks, function(i, data){
    if (data.title == title) {
     hasilcek = true}
     
  });
  if(hasilcek == true){
    alert("Buku sudah ada");
  }else{
    const buku = getList();

        buku.push({
          id, title, author, years, img, isComplete
        });
  localStorage.setItem("buku", JSON.stringify(buku))}

 
}
function showBook(){
    const buku = JSON.parse(localStorage.getItem("buku"));
    $.each(buku, function(i, data){
        if(data.isComplete == "false"){
            let tampilkandataF = document.querySelector("#false");
            tampilkandataF.innerHTML += `<div class="card mb-4 mt-4 item-book" id="list-buku">
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <center>
                    <img
                      src="assets/img/book/${data.img}"
                      style="width: 40%"
                      alt=""
                    />
                  </center>
                 
                </div>
                <div class="col-8 bg-white p-2">
                
                  <h4 class="card-title">${data.title}</h4>
                  <form>
                  
                  </form>
                 
                  <div class="d-grid">
                    <div class="btn-group btn-block">
                      <button type="button" class="btn btn-outline-secondary aksi">
                        Selesai membaca
                      </button>
                      <button type="button" class="btn btn-outline-danger hapus">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        }else if(data.isComplete == "true"){
            let tampilkandataT = document.querySelector("#true");
            tampilkandataT.innerHTML += ` <div class="card mb-4 mt-4 item-book" id="list-buku2">
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <center>
                    <img
                      src="assets/img/book/${data.img}"
                      style="width: 40%"
                      alt=""
                    />
                  </center>
               
                </div>
                <div class="col-8">
                
                  <h4 class="card-title">${data.title}</h4>
                  <div class="d-grid">
                    <div class="btn-group btn-block">
                      <button type="button" class="btn btn-outline-secondary aksi2">
                        Belum selesai membaca
                      </button>
                      <button type="button" class="btn btn-outline-danger hapus2">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
           
        }
        
     });
}
showBook();

const hapusSemuaBuku = document.querySelector("#hapus-semua-buku");
hapusSemuaBuku.addEventListener("click", deleteAll);
function deleteAll(){
  if(confirm("Apakah anda yakin ingin menghapus semua buku?")){
    localStorage.clear();
    AutoRefresh(0);
  }
    
}
function deleteBook(element){

  const buku = getList();
  var element1 = element.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].firstElementChild.innerHTML;
 



  buku.forEach((data, index)=>{
    if(element1 == data.title){
      buku.splice(index, 1);
    }
  });
  localStorage.setItem("buku", JSON.stringify(buku));
   AutoRefresh(0);
}
function editBook(element){

  const buku = getList();
  var element1 = element.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].firstElementChild.innerHTML;
  

  buku.forEach((data, index)=>{
    if(element1 == data.title){
      var id = data.id;
      var title = data.title;
      var author= data.author;
      var years = data.years;
      var img =  data.img;
     

      buku.splice(index, 1, {
        id: id,
        title: title,
        author: author,
        years: years,
        img: img,
        isComplete: "true"
      });

    }
  });
  localStorage.setItem("buku", JSON.stringify(buku));
  AutoRefresh(0);
}
function editBook2(element){

  const buku = getList();
  var element1 = element.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].firstElementChild.innerHTML;


  buku.forEach((data, index)=>{
    if(element1 == data.title){
      var id = data.id;
      var title = data.title;
      var author= data.author;
      var years = data.years;
      var img =  data.img;
     

      buku.splice(index, 1, {
        id: id,
        title: title,
        author: author,
        years: years,
        img: img,
        isComplete: "false"
      });

    }
  });
  localStorage.setItem("buku", JSON.stringify(buku));
  AutoRefresh(0);
}



let listBuku = document.querySelector("#list-buku");
  if(listBuku != null){
    listBuku.addEventListener("click", ubahBuku);
  }
let listBuku2 = document.querySelector("#list-buku2");
  if(listBuku2 != null){
      listBuku2.addEventListener("click", ubahBuku2);
  }
function ubahBuku(e){
  e.preventDefault();
  const element = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  const elementList = element.parentElement;

  if(e.target.classList.contains("hapus")){

    deleteBook(elementList);
    
  } 
  else if(e.target.classList.contains("aksi")){

    editBook(elementList);

  }
}
function ubahBuku2(e){
  e.preventDefault();
  const element = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  const elementList = element.parentElement;

  if(e.target.classList.contains("hapus2")){

    deleteBook(elementList);
    
  } 
  else if(e.target.classList.contains("aksi2")){

    editBook2(elementList);

  }
}

const cariBuku = document.querySelector("#cari-buku");
cariBuku.addEventListener("keyup", caribuku);
function caribuku(e){
  const cariBuku = e.target.value.toLowerCase();
  let itemBook = document.querySelectorAll(".item-book");

  itemBook.forEach((item)=>{
    const isiItem = item.children[0].innerText.toLowerCase();
    if(isiItem.indexOf(cariBuku) != -1){
      item.setAttribute("style", "display: block");
    }else{
      item.setAttribute("style", "display: none !important;");
    }
  });
}


function AutoRefresh(t) {
  setTimeout("location.reload(true);", t);
}
