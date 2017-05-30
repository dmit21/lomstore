window.onload = function () {
  $("#MyStoreName").css({'color': 'green'});
  $("#MyActName").css({'color': 'green'});  
  mb = JournalDate(10);
  me = JournalDate(0);
  document.getElementById("MyDateBeg").value = mb;
  document.getElementById("MyDateEnd").value = me;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: {
      pmb : mb,
      pme : me, 
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glstore = store[0];
      glacts = store[1];
      glgoods = store[2];
      if (glacts !=null) {
        var ms = document.getElementById('MyAct');
        var n,i;
        n = glacts.length;
        for(i=0;i<n;i++){
          opt = document.createElement("option");
          opt.setAttribute("value", glacts[i][0]);
          opt.innerHTML=glacts[i][8]+', № акта '+glacts[i][4]+" за " +MySqlDateToStr(glacts[i][1]);
          ms.appendChild(opt);
        }
      }
      ms = document.getElementById('MyStore');
      var n,i;
      n = glstore.length;
      opt = document.createElement("option");
      opt.setAttribute("value", 0);
      opt.innerHTML='Все';

      ms.appendChild(opt);
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glstore[i][0]);
        opt.innerHTML=glstore[i][2]+', '+glstore[i][3];
        ms.appendChild(opt);
      }
      document.getElementById('MyStore').value = 0;
    }
  });
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
}

function MyClearTable(){
  var t = document.getElementById('MyMoveTable');
  var ntst = t.rows.length;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
}

// выбор магазина

$("#MyStore").dblclick(function () {
  document.getElementById('MyActName').innerHTML = '';
  var ms = document.getElementById('MyAct');
  ms.length = 0;
  var n, i;
  storeid = document.getElementById('MyStore').value;
  var si = document.getElementById('MyStore').selectedIndex;
  document.getElementById('MyStoreName').innerHTML = "Выбрана " + document.getElementById('MyStore').options[si].innerHTML;
  if (glacts != null) {
    n = glacts.length;
    for (i = 0; n>i; i++) {
      if ((glacts[i][3] == storeid) || (storeid == 0)) {
        opt = document.createElement("option");
        opt.setAttribute("value", glacts[i][0]);
        opt.innerHTML=glacts[i][8]+', № акта '+glacts[i][4]+" за " +MySqlDateToStr(glacts[i][1]);
        ms.appendChild(opt);
      }
    }
  }
  MyClearTable();
});

// выбор магазина

// выбор акта

$("#MyAct").dblclick(function () {
  actid = document.getElementById('MyAct').value;
  var si = document.getElementById('MyAct').selectedIndex;
  document.getElementById('MyActName').innerHTML = document.getElementById('MyAct').options[si].innerHTML;
  MyClearTable();
  AddTable();
});

// выбор акта

// поиск по дате

function MySearch(){
  MyClearTable();
  document.getElementById('MyActName').innerHTML = '';
  var DateBeg = document.getElementById('MyDateBeg').value;
  var DateEnd = document.getElementById('MyDateEnd').value;
  var storeid = document.getElementById('MyStore').value;
  $.ajax({
    type: "POST",
    url: "scripts/acts.php",
    data: { 
      ppoint : storeid,
      pdb : DateBeg,
      pde : DateEnd,
    },
    success: function(html1) {
      var rez = JSON.parse(html1);
      glacts = rez[0];
      glgoods = rez[1];
      if(glacts!=null){
        n = glacts.length;
        ms = document.getElementById('MyAct');
        for (i = 0; n>i; i++) {
          if ((glacts[i][3] == storeid)||(storeid==0)) {
            opt = document.createElement("option");
            opt.setAttribute("value", glacts[i][0]);
            opt.innerHTML=glacts[i][8]+', № акта '+glacts[i][4]+" за " +MySqlDateToStr(glacts[i][1]);
            ms.appendChild(opt);
          }
        }
      }
      else{
        alert('Нет данных');
      }
    }
  });
}
// поиск по дате

//заполнение таблицы
function AddTable(){
  var actid = document.getElementById("MyAct").value;
  var t = document.getElementById("MyMoveTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var n = glgoods.length;
  var j,nc,done,ic,st,jj,st1;
  var row;
  var inp, inp1, tobuy;
  jj = 1;
  for (i=0;i<n;i++){
    if(glgoods[i][0]==actid){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // № по порядку
      cell1 = row.insertCell(1); // № билета
      cell2 = row.insertCell(2); // номер товара
      cell3 = row.insertCell(3); // наименование товара
      cell4 = row.insertCell(4); // вес товара
      cell5 = row.insertCell(5); // категория магазина
      cell6 = row.insertCell(6); // стоимость за гр товара
      cell7 = row.insertCell(7); // стоимость
      cell8 = row.insertCell(8); // себестоимость
      cell9 = row.insertCell(9); // магазин откуда
      cell10 = row.insertCell(10); // магазин куда
      
      cell0.innerHTML = Number(jj); jj = jj+1;
      cell0.className +='td3';    
      cell1.innerHTML = glgoods[i][1];
      cell1.className +='td5';    
      cell2.innerHTML = glgoods[i][2];
      cell2.className +='td5';    
      cell3.innerHTML = glgoods[i][3];
      cell3.className +='td5';    
      cell4.innerHTML = MyFormat(glgoods[i][4]);
      cell4.className +='td6';    
      cell5.innerHTML = glgoods[i][5];
      cell5.className +='td5';      
      cell6.innerHTML = glgoods[i][6];
      cell6.className +='td6';      
      tobuy = Math.round(Number(glgoods[i][4])*Number(glgoods[i][6])/100)*100;
      cell7.innerHTML = tobuy;
      cell7.className +='td6';      
      cell8.innerHTML = glgoods[i][7];
      cell8.className +='td6';      
      cell9.innerHTML = glgoods[i][8];
      cell9.className +='td5';      
      cell10.innerHTML = glgoods[i][9];
      cell10.className +='td5';      
      t.appendChild(row);
    }
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
  alert(docpr);
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
