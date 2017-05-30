// ПРОГРУЗКА СТРАНИЧКИ

window.onload = function () {
  document.getElementById('DateChan').value = JournalDate(0);
  document.getElementById("MyZag").innerHTML = "Ввод цен и скидок по категориям. Сегодня " + MySqlDateToStr(JournalDate(0));
  StoreSearch();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});
}

// ПРОГРУЗКА СТРАНИЧКИ

// ОЧИСТКА ТАБЛИЦЫ

function MyClearTable(){
  var mtst = document.getElementById("MyChangeTable");
  var ntst = mtst.rows.length;
  while(ntst>0){
    mtst.deleteRow(0);
    ntst = ntst-1;
  }
}

// ОЧИСТКА ТАБЛИЦЫ

// ФУНКЦИЯ ЗАПОЛНЕНИЯ ТАБЛИЦЫ

function MyTable() {
  MyClearTable()
  var tab = document.getElementById('MyChangeTable');
  var cell0,cell1,cell2,cell3,cell4;
  var row;
  var price, discont;

  if (glstid == 0) { // выбраны все пункты, редактируем цены и скидки для всех пунктов
    var n = glcat.length;
    var i;
    row = tab.insertRow(tab.rows.length); // Добавляем строку
    cell0 = row.insertCell(0); // номер п/п
    cell0.className +='th2'; // наименование категории
    cell0.innerHTML = '№';
    cell1 = row.insertCell(1);
    cell1.innerHTML = 'Наименование категории';
    cell1.className +='th3';      
    cell2 = row.insertCell(2); // цена за г
    cell2.innerHTML = 'Цена за грамм';
    cell2.className +='th4';      
    cell3 = row.insertCell(3); 
    cell3.innerHTML = 'Скидка';
    cell3.className +='th4';      
    cell4 = row.insertCell(4); // идентификатор категории
    cell4.className +='th1';
    for (i=0;i<n;i++){
      row = tab.insertRow(tab.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // номер п/п
      cell0.className +='td1'; // наименование категории
      cell1 = row.insertCell(1);
      cell1.className +='td2';      
      cell2 = row.insertCell(2); // цена за г
      cell2.className +='td3';      
      cell3 = row.insertCell(3); // цена за г
      cell3.className +='td3';      
      cell4 = row.insertCell(4); // идентификатор категории
      cell4.className +='th1';
      cell0.innerHTML = i+1;
      cell1.innerHTML = glcat[i][1];
      price = document.createElement("input"); // цена за грамм
      price.className +='input1';
      price.setAttribute("type", "number");
      price.setAttribute("step", "100");
      price.value = glcat[i][2]
      cell2.appendChild(price);
      discont = document.createElement("input"); // скидка
      discont.className +='input1';
      discont.setAttribute("type", "number");
      discont.setAttribute("step", "1");
      discont.value = glcat[i][3]
      cell3.appendChild(discont);
      cell4.innerHTML = glcat[i][0];
    }
  }
  else {// выбран определенный пункт корректируем скидки
    var n = gldiscont.length;
    var i, k;
    row = tab.insertRow(tab.rows.length); // Добавляем строку
    cell0 = row.insertCell(0); // номер п/п
    cell0.className +='th2'; // наименование категории
    cell0.innerHTML = '№';
    cell1 = row.insertCell(1);
    cell1.innerHTML = 'Наименование категории';
    cell1.className +='th3';      
    cell2 = row.insertCell(2); // цена за г
    cell2.innerHTML = 'Цена за грамм на пункте';
    cell2.className +='th4';      
    cell3 = row.insertCell(3); // цена за г
    cell3.innerHTML = 'Скидка на пункте';
    cell3.className +='th4';      
    cell4 = row.insertCell(4); // идентификатор категории
    cell4.className +='th1';
    k = 1
    for (i=0;i<n;i++){
      if (glstid == gldiscont[i][0]) {
        row = tab.insertRow(tab.rows.length); // Добавляем строку
        cell0 = row.insertCell(0); // номер п/п
        cell0.className +='td1'; // наименование категории
        cell1 = row.insertCell(1);
        cell1.className +='td2';      
        cell2 = row.insertCell(2); // скидка
        cell2.className +='td3';      
        cell3 = row.insertCell(3); // скидка
        cell3.className +='td3';      
        cell4 = row.insertCell(4); // идентификатор категории
        cell4.className +='th1';
        cell0.innerHTML = k;
        k = k+1;
        cell1.innerHTML = gldiscont[i][3];
        price = document.createElement("input"); // цена за грамм
        price.className +='input1';
        price.setAttribute("type", "number");
        price.setAttribute("step", "100");
        price.value = gldiscont[i][4]
        cell2.appendChild(price);
        discont = document.createElement("input"); // цена за грамм
        discont.className +='input1';
        discont.setAttribute("type", "number");
        discont.setAttribute("step", "1");
        discont.value = gldiscont[i][2]
        cell3.appendChild(discont);
        cell4.innerHTML = gldiscont[i][1];
      }
    }
  }
}

// ФУНКЦИЯ ЗАПОЛНЕНИЯ ТАБЛИЦЫ

// ФУНКЦИЯ ЗАПОЛНЕНИЯ СПИСКА ВИТРИН И ВЫБОРА ВИТРИНЫ

function StoreSearch(){
  var sel = document.getElementById("MyGoodSel");
  var stid;
  var rez;
  sel.length=0;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      rez = JSON.parse(html1);
      glstore = rez[0];
      glcat = rez[1];
      gldiscont = rez[2];
    }
  });
  var n = glstore.length;
  var i;
  opt = document.createElement("option");
  opt.setAttribute("value", 0);
  opt.innerHTML="Все";
  sel.appendChild(opt);
  for (i = 0;i<n;i++){
    opt = document.createElement("option");
    opt.setAttribute("value", glstore[i][0]);
    opt.innerHTML=glstore[i][2];
    sel.appendChild(opt);
  }
  document.getElementById("MyGoodSel").value = 0;
  glstid = document.getElementById("MyGoodSel").value;
  MyTable();
}

// выбор витрины

$("#MyGoodSel").dblclick(function () {
  var si = document.getElementById('MyGoodSel').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = document.getElementById('MyGoodSel').options[si].innerHTML;
  }
  glstid = document.getElementById("MyGoodSel").value;
  MyTable();
});

// выбор витрины

// ФУНКЦИЯ ЗАПОЛНЕНИЯ СПИСКА ВИТРИН И ВЫБОРА ВИТРИНЫ

// КНОПКА ПРИНЯТЬ

$("#MakeBut").click(function () {
  var mydate = document.getElementById('DateChan').value;
  if (glstid == 0) { // редактируем цены для категорий 
    var t = document.getElementById("MyChangeTable");
    var nt = t.rows.length;
    var i;
    var rez = [];
    var k = 0;
    for(i=1;i<nt;i++){
      rez[k] = [];
      rez[k][0] = t.rows[i].cells[4].innerHTML; // идентификатор категории
      rez[k][1] = t.rows[i].cells[2].childNodes[0].value; // цена за грамм
      rez[k][2] = t.rows[i].cells[3].childNodes[0].value; // скидка
      k = k+1;
    }
    $.ajax({
      type: "POST",
      url: "scripts/mychange.php",
      data: { 
        prez : rez,
        pdatech : mydate,
        pglstid : glstid,
      },
      async: false,
      success: function(html1) {
        alert('Готово');
        if(html1!=null){
          rez = JSON.parse(html1);
          glcat = rez[0];
          gldiscont = rez[1];
        }
      }
    });
  }
  else {
    var t = document.getElementById("MyChangeTable");
    var nt = t.rows.length;
    var i;
    var rez = [];
    var k = 0;
    for(i=1;i<nt;i++){
      rez[k] = [];
      rez[k][0] = t.rows[i].cells[4].innerHTML; // идентификатор категории
      rez[k][1] = t.rows[i].cells[2].childNodes[0].value; // цена за грамм
      rez[k][2] = t.rows[i].cells[3].childNodes[0].value; // скидка
      k = k+1;
    }
    $.ajax({
      type: "POST",
      url: "scripts/mychange.php",
      data: { 
        prez : rez,
        pdatech : mydate,
        pglstid : glstid,
      },
      async: false,
      success: function(html1) {
        alert('Готово');
        if(html1!=null){
          rez = JSON.parse(html1);
          gldiscont = rez[1];
        }
      }
    });
  }
});

// КНОПКА ПРИНЯТЬ

