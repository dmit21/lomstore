window.onload = function () {
/*  var md = new Date();
  mb = MyDateToStrYMD(md);
  document.getElementById("MyDateSale").value = mb;
  */
  document.getElementById('DateBeg').value = JournalDate(10);
  document.getElementById('DateEnd').value = JournalDate(0);
  MyVit();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  $("#MyStoreName").css({'color': 'green'});  
}

$("#DateSearch").click(function () {
  MySearch();
});

function MyVit() {
  var ms = document.getElementById('MyStore');
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: {
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glstore = store;
      var ms = document.getElementById('MyStore');
      var n,i;
      n = glstore.length;
      opt = document.createElement("option");
      opt.setAttribute("value", 0);
      opt.innerHTML="Все";
      ms.appendChild(opt);
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glstore[i][0]);
        opt.innerHTML=glstore[i][2];
        ms.appendChild(opt);
      }
    }
  });
  ms.value = 0;

}

function MySearch() {
  var db = document.getElementById('DateBeg').value;
  var de = document.getElementById('DateEnd').value;
  var nstore = document.getElementById('MyStore').value;
  $.ajax({
    type: "POST",
    url: "scripts/search.php",
    data: {
      pstore : nstore,
      pdb : db,
      pde : de,
    },
    success: function(html1) {
      if (html1!='null') {
        glgoods = JSON.parse(html1);
        ClearTab();  
        CreateTab();
      }
      else {
        alert('Нет данных!');
      }
    }
  });
}

$("#MyStore").dblclick(function () {// выбор витрины
  var si = document.getElementById('MyStore').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Выбрана витрина: '+document.getElementById('MyStore').options[si].innerHTML;
  }
  MySearch(); 
 
});

// CОЗДАНИЕ ТАБЛИЦЫ

function CreateTab(){
  var store;
  var t = document.getElementById('MyGoodTable');
  var cell0, cell1, cell2, cell3, cell4;
  var row;
  var n, i, j, k;
  var sumw, sums, sump, sumd;
  n = glgoods.length;
  i = 0;
  j = 0;
  k = 1;
  while (i<n) {
    store = glgoods[i][0];
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);// наименование магазина
    cell0.className +='td5';      
    cell1 = row.insertCell(1);// дата
    cell1.className +='td3';      
    cell2 = row.insertCell(2);// вес
    cell2.className +='td6';      
    cell3 = row.insertCell(3);// себестоимость
    cell3.className +='td6';      
    cell4 = row.insertCell(4);// цена
    cell4.className +='td6';      
    cell5 = row.insertCell(5);// доход
    cell5.className +='td6';      
    j = i+k;
    k = k+1;
    cell0.innerHTML = store;
    sumw = 0;
    sums = 0;
    sump = 0;
    sumd = 0;
    while ((i<n) && (store == glgoods[i][0])) {
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);// наименование магазина
      cell1 = row.insertCell(1);// дата
      cell2 = row.insertCell(2);// вес
      cell3 = row.insertCell(3);// себестоимость
      cell4 = row.insertCell(4);// цена
      cell5 = row.insertCell(5);// доход
      cell5.className +='td6';      
      cell0.innerHTML = glgoods[i][1];
      cell0.className +='td3';      
      cell1.innerHTML = MySqlDateToStr(glgoods[i][2]);
      cell1.className +='td3';      
      cell2.innerHTML = glgoods[i][3];
      cell2.className +='td6';      
      cell3.innerHTML = glgoods[i][4];
      cell3.className +='td6';      
      cell4.innerHTML = glgoods[i][5];
      cell4.className +='td6';      
      cell5.innerHTML = Number(glgoods[i][5])-Number(glgoods[i][4]);
      cell5.className +='td6';      
      sumw = Number(glgoods[i][3]) +Number(sumw);
      sums = Number(glgoods[i][4]) +Number(sums);
      sump = Number(glgoods[i][5]) +Number(sump);
      sumd = Number(glgoods[i][5]) - Number(glgoods[i][4]) +Number(sumd);
      i = i+1; 
    }
    t.rows[j].cells[2].innerHTML = sumw;
    t.rows[j].cells[3].innerHTML = sums;
    t.rows[j].cells[4].innerHTML = sump;
    t.rows[j].cells[5].innerHTML = sumd;
  }
}

// CОЗДАНИЕ ТАБЛИЦЫ

// ОЧИСТКА ТАБЛИЦЫ

function ClearTab(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
}

// ОЧИСТКА ТАБЛИЦЫ
$("#MyPrintButton").click(function () {
  var si = document.getElementById('MyStore').selectedIndex;
  var vname;
  if (si == 0) {
    vname = 'Все витрины';
  }
  else {
    vname = document.getElementById('MyStore').options[si].innerHTML;
  }
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: {
      pgoods : glgoods,
      pvname : vname,
    },
    async : false,
    success: function(html1) {
      window.open("http://lomstore/admin/journal_good_sale/print/");
    }
  });
});

