window.onload = function () {
}

function MyClearTable(){
  var t = document.getElementById('MyMoveTable');
  var ntst = t.rows.length;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
}

// поиск товара

function MySearch(){
  MyClearTable();  
  var goodnum = document.getElementById('MyGoodNum').value;
  if((goodnum.trim()!='')&&(goodnum.length == 12)){
    $.ajax({
      type: "POST",
      url: "scripts/findmove.php",
      data: { 
        pgoodnum : goodnum,
      },
      success: function(html1) {
        if(html1=='0'){
          alert('Товар не найден.');
        }
        else{
          glarr = JSON.parse(html1);
          AddTable();
        }
      }
    });
  }
  else{
    alert('Введен неверный штрих код');
  }
}
// поиск товара

//заполнение таблицы
function AddTable(){
  var t = document.getElementById("MyMoveTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13;
  var i,n, k;
  var row;
  
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0); // № по порядку
  cell1 = row.insertCell(1); // наименование док
  cell2 = row.insertCell(2); // № док
  cell2.className += "td6";
  cell3 = row.insertCell(3); // дата док
  cell4 = row.insertCell(4); // кнопка
  cell5 = row.insertCell(5); // id doc
  cell0.innerHTML = 1;
  cell1.innerHTML = 'Залоговый билет'
  cell2.innerHTML = glarr[0][1];
  cell3.innerHTML = MySqlDateToStr(glarr[0][2]);
  ibtn = document.createElement("button");
  ibtn.setAttribute("type", "button"); 
  ibtn.setAttribute("onclick", "MyInfoBtn(this)");
  cell4.appendChild(ibtn);
  cell4.className += "td3";
  info = document.createElement("i"); // Ввод файла
  info.className += "fa fa-info";
  ibtn.appendChild(info);
  cell5.innerHTML = glarr[0][0];
  cell5.className += "tid";

  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0); // № по порядку
  cell1 = row.insertCell(1); // наименование док
  cell2 = row.insertCell(2); // № док
  cell2.className += "td6";
  cell3 = row.insertCell(3); // дата док
  cell4 = row.insertCell(4); // кнопка
  cell5 = row.insertCell(5); // id doc

  cell0.innerHTML = 2;
  cell1.innerHTML = 'Акт исполнения'
  cell2.innerHTML = TicNumToStr(glarr[1][1], glarr[1][2], 8);
  cell3.innerHTML = MySqlDateToStr(glarr[1][3]);
  ibtn = document.createElement("button");
  ibtn.setAttribute("type", "button"); 
  ibtn.setAttribute("onclick", "MyInfoBtn(this)");
  cell4.appendChild(ibtn);
  info = document.createElement("i"); // Ввод файла
  info.className += "fa fa-info";
  ibtn.appendChild(info);
  cell4.className += "td3";
  cell5.innerHTML = glarr[1][0];
  cell5.className += "tid";

  if(glarr[2]!=null){
    n = glarr[2].length;
    i = 0;
    k = 3;
    while(i<n){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // № по порядку
      cell1 = row.insertCell(1); // наименование док
      cell2 = row.insertCell(2); // № док
      cell2.className += "td6";

      cell3 = row.insertCell(3); // дата док
      cell4 = row.insertCell(4); // кнопка
      cell5 = row.insertCell(5); // id doc

      k = 3+i;
      switch (glarr[2][i][5]){
        case '0':
          cell0.innerHTML = k;
          cell1.innerHTML = 'Разукомплектация';
          cell2.innerHTML = 'Накл. № '+glarr[2][i][6];
          cell3.innerHTML = MySqlDateToStr(glarr[2][i][1]);
          ibtn = document.createElement("button");
          ibtn.setAttribute("type", "button"); 
          ibtn.setAttribute("onclick", "MyInfoBtn(this)");
          cell4.appendChild(ibtn);
          info = document.createElement("i"); // Ввод файла
          info.className += "fa fa-info";
          ibtn.appendChild(info);
          cell4.className += "td3";
          cell5.innerHTML = glarr[2][i][4];
          cell5.className += "tid";
        break;

        case '1':
          cell0.innerHTML = k;
          cell1.innerHTML = 'Перемещение';
          cell2.innerHTML = 'Накл. № '+glarr[2][i][6];
          cell3.innerHTML = MySqlDateToStr(glarr[2][i][1]);
          ibtn = document.createElement("button");
          ibtn.setAttribute("type", "button"); 
          ibtn.setAttribute("onclick", "MyInfoBtn(this)");
          cell4.appendChild(ibtn);
          info = document.createElement("i"); // Ввод файла
          info.className += "fa fa-info";
          ibtn.appendChild(info);
          cell4.className += "td3";
          cell5.innerHTML = glarr[2][i][4];
          cell5.className += "tid";
        break;

        case '2':
          cell0.innerHTML = k;
          cell1.innerHTML = 'Реализация';
          cell2.innerHTML = 'Накл. № '+glarr[2][i][6];
          cell3.innerHTML = MySqlDateToStr(glarr[2][i][1]);
          ibtn = document.createElement("button");
          ibtn.setAttribute("type", "button"); 
          ibtn.setAttribute("onclick", "MyInfoBtn(this)");
          cell4.appendChild(ibtn);
          info = document.createElement("i"); // Ввод файла
          info.className += "fa fa-info";
          ibtn.appendChild(info);
          cell4.className += "td3";
          cell5.innerHTML = glarr[2][i][4];
          cell5.className += "tid";
        break;

        case '3':
          cell0.innerHTML = k;
          cell1.innerHTML = 'Возврат';
          cell2.innerHTML = 'Накл. № '+glarr[2][i][4];
          cell3.innerHTML = MySqlDateToStr(glarr[2][i][1]);
          ibtn = document.createElement("button");
          ibtn.setAttribute("type", "button"); 
          ibtn.setAttribute("onclick", "MyInfoBtn(this)");
          cell4.appendChild(ibtn);
          info = document.createElement("i"); // Ввод файла
          info.className += "fa fa-info";
          ibtn.appendChild(info);
          cell4.className += "td3";
          cell5.innerHTML = glarr[2][i][4];
          cell5.className += "tid";
        break;
      }
        i = i+1;
    }
  }
}
//заполнение таблицы

// КНОПКА ПРОСМОТР

function MyInfoBtn(row) {
  var table = document.getElementById("MyMoveTable");
  var RowNum = row.parentNode.parentNode.rowIndex;
  var tid;
  tid = table.rows[RowNum].cells[5].innerHTML;
  switch (RowNum) {
    case 1:
      $.ajax({
        type: "POST",
        url: "scripts/print_v.php",
        data: { 
          ptid:tid,
        },
        async:false,
        success: function(html1) {
          window.open("http://lomstore/admin/journal_story_good/print_v/");
        }
      });
    break;
    case 2:
      $.ajax({
        type: "POST",
        url: "scripts/print_a.php",
        data: { 
          paid:tid,
        },
        async:false,
        success: function(html1) {
          window.open("http://lomstore/admin/journal_story_good/print_a/");
        }
      });
    break;
    default:
      $.ajax({
        type: "POST",
        url: "scripts/print_raz.php",
        data: { 
          paid:tid,
        },
        async:false,
        success: function(html1) {
          switch (html1){
            case '0':
              window.open("http://lomstore/admin/journal_story_good/print_raz/");
            break;
            case '1':
              window.open("http://lomstore/admin/journal_story_good/print_move/");
            break;
            case '2':
              window.open("http://lomstore/admin/journal_story_good/print_sale/");
            break;
            case '3':
              window.open("http://lomstore/admin/journal_story_good/print_ret/");
            break;
          }
        }
      });
    break;
  }
}

// КНОПКА ПРОСМОТР