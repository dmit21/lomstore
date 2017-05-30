window.onload = function () {
  mb = JournalDate(10);
  me = JournalDate(0);
  document.getElementById("MyDateBeg").value = mb;
  document.getElementById("MyDateEnd").value = me;
  MySearch();
}

function MyClearTable(){
  var t = document.getElementById('MyMoveTable');
  var ntst = t.rows.length;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
}

// выбор акта

$("#MyAct").dblclick(function () {
  glnid = document.getElementById('MyAct').value;
  var si = document.getElementById('MyAct').selectedIndex;
  document.getElementById('MyActName').innerHTML = document.getElementById('MyAct').options[si].innerHTML;
  MyClearTable();
  $.ajax({
    type: "POST",
    url: "scripts/goodlist.php",
    data: {
      pnid : glnid,
    },
    success: function(html1) {
      if(html1!='null'){
        glgoods = JSON.parse(html1);
        AddTable();
      }
      else{
        alert('Нет данных.');
      }
    }
  });
});

// выбор акта

// поиск по дате

function MySearch(){
  MyClearTable();
  document.getElementById('MyActName').innerHTML = '';
  var mb = document.getElementById('MyDateBeg').value;
  var me = document.getElementById('MyDateEnd').value;
  $.ajax({
    type: "POST",
    url: "scripts/naclist.php",
    data: {
      pmb : mb,
      pme : me, 
    },
    success: function(html1) {
      if(html1!='null'){
        var stor = JSON.parse(html1);
        var nacl = stor[0];
        var ms = document.getElementById('MyAct');
        var n,i;
        n = nacl.length;
        var st;
        for(i=0;i<n;i++){
          opt = document.createElement("option");
          opt.setAttribute("value", nacl[i][0]);
          if(nacl[i][2]==1){
            st = 'Корректировка';
          }
          else{
            st = 'Переоценка';
          }
          opt.innerHTML=st+nacl[i][0]+' от '+MySqlDateToStr(nacl[i][1])+st;
          ms.appendChild(opt);
        }
      }
      else{
        alert('Нет данных.');
      }
    }
  });
}
// поиск по дате

//заполнение таблицы
function AddTable(){
  var t = document.getElementById("MyMoveTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var n = glgoods.length;
  var row, stoim;
  var jj = 1;
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0); // № по порядку
    cell1 = row.insertCell(1); // Идентификатор
    cell2 = row.insertCell(2); // наименование товара
    cell3 = row.insertCell(3); // Категория
    cell4 = row.insertCell(4); // вес товара
    cell5 = row.insertCell(5); // старая за гр товара
    cell6 = row.insertCell(6); // новая за гр товара
    cell7 = row.insertCell(7); // старая скидка
    cell8 = row.insertCell(8); // новая скидка
    cell9 = row.insertCell(9); // стоимость
    cell10 = row.insertCell(10); // себестоимость
    cell11 = row.insertCell(11); // магазин
    cell0.innerHTML = jj;
    jj = Number(jj)+1;
    cell0.className +='td3';    
    cell1.innerHTML = glgoods[i][0];
    cell1.className +='td5';    
    cell2.innerHTML = glgoods[i][1];
    cell2.className +='td5';    
    cell3.innerHTML = glgoods[i][2];
    cell3.className +='td5';    
    cell4.innerHTML = MyFormat(glgoods[i][3]);
    cell4.className +='td6';    
    cell5.innerHTML = glgoods[i][4];
    cell5.className +='td5';      
    cell6.innerHTML = glgoods[i][5];
    cell6.className +='td5';      
    cell7.innerHTML = glgoods[i][6];
    cell7.className +='td5';      
    cell8.innerHTML = glgoods[i][7];
    cell8.className +='td5';      
    stoim = Math.round(Number(glgoods[i][3])*Number(glgoods[i][5])/100)*100-Math.round(Number(glgoods[i][3])*Number(glgoods[i][5])*Number(glgoods[i][7])/10000)*100;
    cell9.innerHTML = stoim;
    cell9.className +='td5';      
    cell10.innerHTML = glgoods[i][8];
    cell10.className +='td6';      
    cell11.innerHTML = glgoods[i][9];
    cell11.className +='td5';      
    t.appendChild(row);
  } 
}
//заполнение таблицы


















// просмотр акта
function MyInfoBtn(row) {
  var table = document.getElementById("MyGoodTable");
  var RowNum = row.parentNode.parentNode.rowIndex;
  var docid = table.rows[RowNum].cells[7].innerHTML;
  var docact = table.rows[RowNum].cells[2].innerHTML;
  var docdate = table.rows[RowNum].cells[1].innerHTML;
  var docpr; // 0 - неразукомп, 1 - разукомп

  if(table.rows[RowNum].cells[3].innerHTML!=''){
    docpr = 1;
  } 
  else{
    docpr = 0;
  }
  $.ajax({
    type: "POST",
    url: "scripts/actnote.php",
    data: { 
      pdocid : docid,
      pdocact : docact,
      pdocdate : docdate,
      pdocpr : docpr,
    },
    async:false,
    success: function(html1) {
      window.open("http://lomstore/admin/journal_act_exec/view_act/");
    }
  });
}
// просмотр акта

// печать
$("#MyPrnButton").click(function () {
  $.ajax({
    type: "POST",
    url: "scripts/forprint.php",
    data: { 
      pnid : glnid,
    },
    async: false,
    success: function(html1) {
      window.open("http://lomstore/admin/journal_change_price/print/");
    }
  });
});
// печать