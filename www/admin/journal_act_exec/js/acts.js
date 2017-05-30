window.onload = function () {
  mb = JournalDate(10);
  me = JournalDate(0);
  document.getElementById("MyDateBeg").value = mb;
  document.getElementById("MyDateEnd").value = me;
  $("#MyStoreName").css({'color': 'green'});  
  $.ajax({
    type: "POST",
    url: "scripts/point.php",
    data: { 
    },
    success: function(html1) {
      glpoint = JSON.parse(html1);
      var ms = document.getElementById('MyStore');
      var n,i;
      n = glpoint.length;
      opt = document.createElement("option");
      opt.setAttribute("value", 0);
      opt.innerHTML='Все';
      ms.appendChild(opt);
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glpoint[i][0]);
        opt.innerHTML=glpoint[i][1]+', '+glpoint[i][2];
        ms.appendChild(opt);
      }
    }
  });
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все пункты';
}

$("#MyStore").dblclick(function () {
  glpointid = document.getElementById('MyStore').value;
  var si = document.getElementById('MyStore').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все пункты';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Пункт № '+document.getElementById('MyStore').options[si].innerHTML;
  }
  MyClearTable();
});

function MySearch(){
  DateBeg = document.getElementById('MyDateBeg').value;
  DateEnd = document.getElementById('MyDateEnd').value;
  $.ajax({
    type: "POST",
    url: "scripts/acts.php",
    data: { 
      ppoint : glpointid,
      pdb : DateBeg,
      pde : DateEnd,
    },
    success: function(html1) {
      if (html1!='null'){
        glacts = JSON.parse(html1);
        AddToTable();
      }
      else alert('Нет данных.');
    }
  });
}

function MyClearTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
}

function AddToTable(){
  MyClearTable();
  var t = document.getElementById('MyGoodTable');
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var row, i, ln, lp, raz;
  var n = glacts.length;
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);
    cell0.className +='td3';    
    cell1 = row.insertCell(1);
    cell1.className +='td3';    
    cell2 = row.insertCell(2);
    cell2.className +='td3';    
    cell3 = row.insertCell(3);
    cell3.className +='td3';    
    cell4 = row.insertCell(4);
    cell4.className +='td3';    
    cell5 = row.insertCell(5);
    cell5.className +='td3';    
    cell6 = row.insertCell(6);
    cell6.className +='td3';    
    cell7 = row.insertCell(7);
    cell0.innerHTML = i+1;
    cell0.className +='td3';
    cell1.innerHTML = MySqlDateToStr(glacts[i][3]);
    cell1.className +='td4';
    ln = glacts[i][1].length;
    lp = glacts[i][2].length;
    ln = 8-ln-lp;
    cell2.innerHTML = glacts[i][2]+InSymToStr('0',ln)+glacts[i][1];
    cell2.className +='td5';
    if(glacts[i][8]==4){
      raz = MySqlDateToStr(glacts[i][9]);
    }
    else{
      raz = '';
    }
    cell3.innerHTML = raz;
    cell3.className +='td6';
    cell4.innerHTML = glacts[i][2];
    cell4.className +='td4';
    cell5.innerHTML = glacts[i][7]+' '+glacts[i][5].substr(0,1)+'. '+glacts[i][6].substr(0,1)+'.';
    cell5.className +='td6';
    ticbtn = document.createElement("button");
    ticbtn.setAttribute("type", "button"); 
    ticbtn.setAttribute("onclick", "MyInfoBtn(this)");
    cell6.appendChild(ticbtn);
    info = document.createElement("i"); // Ввод файла
    info.className += "fa fa-info";
    ticbtn.appendChild(info);
    cell7.innerHTML = glacts[i][0];
    cell7.className +='td1';
    t.appendChild(row);
  }
}
// просмотр акта
function MyInfoBtn(row) {
  var table = document.getElementById("MyGoodTable");
  var RowNum = row.parentNode.parentNode.rowIndex;
  var docid = table.rows[RowNum].cells[7].innerHTML;
  var docact = table.rows[RowNum].cells[2].innerHTML;
  var docdate = table.rows[RowNum].cells[1].innerHTML;
  var docpr; // 0 - неразукомп, 1 - разукомп
  $.ajax({
    type: "POST",
    url: "scripts/actnote.php",
    data: { 
      pdocid : docid,
      pdocact : docact,
      pdocdate : docdate,
    },
    async:false,
    success: function(html1) {
      window.open("http://lomstore/admin/journal_act_exec/print/");
    }
  });
}
// просмотр акта
