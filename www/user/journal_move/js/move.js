// 

window.onload = function () {
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
      glacts = store[0];
      glgoods = store[1];
      if (glacts!=null) {
        var ms = document.getElementById('MyAct');
        var n,i;
        n = glacts.length;
        for(i=0;i<n;i++){
          opt = document.createElement("option");
          opt.setAttribute("value", glacts[i][0]);
          opt.innerHTML='Накладная № '+glacts[i][2]+" за " +MySqlDateToStr(glacts[i][1]);
          ms.appendChild(opt);
        }
      }
      else {
        alert("Нет данных за указанный период!");
      }
    }
  });
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
  var mb = document.getElementById('MyDateBeg').value;
  var me = document.getElementById('MyDateEnd').value;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
      pmb : mb,
      pme : me, 
    },
    success: function(html1) {
      var rez = JSON.parse(html1);
      glacts = rez[0];
      glgoods = rez[1];
      if(glacts!=null){
        n = glacts.length;
        ms = document.getElementById('MyAct');
        for (i = 0; n>i; i++) {
          opt = document.createElement("option");
          opt.setAttribute("value", glacts[i][0]);
          opt.innerHTML='Накладная № '+glacts[i][2]+" за " +MySqlDateToStr(glacts[i][1]);
          ms.appendChild(opt);
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
  var sumv, sums;
  sumv = 0;
  sums = 0;
  jj = 1;
  for (i=0;i<n;i++){
    if(glgoods[i][0]==actid){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // № по порядку
      cell1 = row.insertCell(1); // № билета
      cell2 = row.insertCell(2); // номер товара
      cell3 = row.insertCell(3); // наименование товара
      cell4 = row.insertCell(4); // вес товара
      cell5 = row.insertCell(5); // стоимость за гр товара
      cell6 = row.insertCell(6); // стоимость

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
      cell5.className +='td6';      
      tobuy = Math.round(Number(glgoods[i][4])*Number(glgoods[i][5])/100)*100;
      cell6.innerHTML = tobuy;
      cell6.className +='td6';      
      t.appendChild(row);
      sumv = Number(sumv) + Number(glgoods[i][4]);
      sums = Number(sums) + Number(tobuy);
    }
  }
  document.getElementById('MyItog').innerHTML = "Итого:<br>" + "Общий вес: "  + MyFormat(sumv) + "<br>" + "Общая стоимость: " + sums;   
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
