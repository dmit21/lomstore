window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Продажи. Сегодня " + MySqlDateToStr(JournalDate(0));
  $("#MyPrintButton").attr('disabled',true);
  $("#MyPrintButton").css({'color': 'gray'});
/*  var md = new Date();
  mb = MyDateToStrYMD(md);
  document.getElementById("MyDateSale").value = mb;
  */
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glstore = store[0];
      glact = store[1];
      glgoods = store[2];
      var ms = document.getElementById('MyStore');
      ms.value = 1;
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
      if (glact!=null) {
        n = glact.length;
        var acts = document.getElementById('MyAct');
        for(i=0;i<n;i++){
          opt = document.createElement("option");
          opt.setAttribute("value", glact[i][0]);
          opt.innerHTML=glact[i][5] + ' акт № ' + glact[i][4] + ' от ' + MySqlDateToStr(glact[i][1]);
          acts.appendChild(opt);
        }
      }
      else {
        alert("Нет непроведенных чеков.");
        $("#MakeBut").attr('disabled',true);
        $("#MakeBut").css({'color': 'gray'});

      }
    }
  });
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});
}

$("#MyStore").dblclick(function () {// выбор витрины
  ActSelectAdd();
  $("#MakeBut").removeAttr('disabled');
  $("#MakeBut").css({'color': 'black'});
});

function ActSelectAdd(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var stornum = document.getElementById('MyStore').value;
  var n,i, j, done;
  var acts = document.getElementById('MyAct');
  var done;
  var si = document.getElementById('MyStore').selectedIndex;
  if (stornum==0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
    $("#MyStoreName").css({'color': 'green'});
    while(ntst>1){
      t.deleteRow(1);
      ntst = ntst-1;
    }
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Выбрана витрина: '+document.getElementById('MyStore').options[si].innerHTML;
    $("#MyStoreName").css({'color': 'green'});
      while(ntst>1){
        t.deleteRow(1);
        ntst = ntst-1;
      }
  } 
  acts.length = 0;
  if (glact!=null) {
    n = glact.length;
    $("#MakeBut").removeAttr('disabled');
    $("#MakeBut").css({'color': 'black'});
    if(stornum==0){
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glact[i][0]);
        opt.innerHTML=glact[i][5] + ' акт № ' + glact[i][4] + ' от '+MySqlDateToStr(glact[i][1]);
        acts.appendChild(opt);
        if (glact[i][6] == 1) {
          $(opt).css({'color': 'red'});
        }
        else {
          $(opt).css({'color': 'black'});
        }
      }
    }
    else{
      done = false;
      for(i=0;i<n;i++){
        if(glact[i][3]==stornum){
          done = true;
          opt = document.createElement("option");
          opt.setAttribute("value", glact[i][0]);
          opt.innerHTML=glact[i][5]+' от '+MySqlDateToStr(glact[i][1]);
          acts.appendChild(opt);
          if (glact[i][6] == 1) {
            $(opt).css({'color': 'red'});
          }
          else {
            $(opt).css({'color': 'black'});
          }
        }
      }
      if (done == true) {
        $("#MakeBut").removeAttr('disabled');
        $("#MakeBut").css({'color': 'black'});
      }
      else {
        alert('Нет актов по витрине');
        $("#MakeBut").attr('disabled',true);
        $("#MakeBut").css({'color': 'gray'});
      }
    }
  }
  else{
    alert('Нет актов');
    $("#MakeBut").attr('disabled',true);
    $("#MakeBut").css({'color': 'gray'});
  }
}

$("#MyAct").dblclick(function () {
  var anum = document.getElementById('MyAct').value;
  var n,i,done;

  $("#MakeBut").removeAttr('disabled');
  $("#MakeBut").css({'color': 'black'});
  done = false;
  if(glgoods!=null){
    n = glgoods.length;
    for (i=0;i<n;i++) glgoods[i][11] = 0;
    for(i=0;i<n;i++){
      if((glgoods[i][10]==anum)){
        glgoods[i][11] = 1;
        done = true;
      }
    }
  }
  else{
    alert('Нет товаров');
    var t = document.getElementById('MyGoodTable');
    var ntst = t.rows.length;
    var i;
    while(ntst>1){
      t.deleteRow(1);
      ntst = ntst-1;
    }
  }
  if (done == true){
    AddToTable();
    TotSum();
  }
  else{
    alert('Нет товаров совсем');
    var t = document.getElementById('MyGoodTable');
    var ntst = t.rows.length;
    var i;
    while(ntst>1){
      t.deleteRow(1);
      ntst = ntst-1;
    }
  }

});


function AddToTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var i,j;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var row;
  var n = glgoods.length;
  var  stoim, tobuy;
  var inp;
  j = 1;
  for (i=0;i<n;i++){
    if(glgoods[i][11]==1){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);// номер по порядку
      cell1 = row.insertCell(1);// номер товара
      cell2 = row.insertCell(2);// нименование товара
      cell3 = row.insertCell(3);// себестоимость
      cell4 = row.insertCell(4);// вес
      cell5 = row.insertCell(5);// стоимость за гр
      cell6 = row.insertCell(6);// цена
      cell7 = row.insertCell(7);// скидка
      cell8 = row.insertCell(8);// продажная цена
      cell9 = row.insertCell(9);// Продано за
      cell10 = row.insertCell(10);// id товара

      cell0.innerHTML = j;
      j = j+1;
      cell0.className +='td3';
      cell1.innerHTML = glgoods[i][2];
      cell1.className +='td5';
      cell2.innerHTML = glgoods[i][1];
      cell2.className +='td5';
      cell3.innerHTML = glgoods[i][7];
      cell3.className +='td6';
      cell4.innerHTML = MyFormat(glgoods[i][4]);
      cell4.className +='td4';
      cell5.innerHTML = glgoods[i][5];
      stoim = Math.round(glgoods[i][4]*glgoods[i][5]/100)*100;
      cell5.className +='td6';
      cell6.innerHTML = stoim;
      cell6.className +='td6';
      cell7.innerHTML = glgoods[i][6];
      cell7.className +='td4';
      tobuy = Math.round((stoim-stoim*glgoods[i][6]/100)/100)*100;
      cell8.innerHTML = tobuy;
      cell8.className +='td6';
      inp = document.createElement("input"); 
      inp.setAttribute("type", "number");
      inp.className +='input1';
      inp.setAttribute("onChange", "MySum(this)");
      inp.setAttribute("step", "100");
      inp.value = glgoods[i][8];
      cell9.appendChild(inp);
      cell9.className +='td6';
      if (tobuy!=glgoods[i][8]){
        inp.setAttribute("class", "input2");
      }  
      cell10.innerHTML = glgoods[i][0];
      cell10.className +='td1';
      t.appendChild(row);
    }
  } 
}

function TotSum(){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sw,sst,sseb;
  var row,cell0, cell1,cell2,cell3,cell4;
  sw = 0;
  sseb = 0;
  sst = 0;
  n = glgoods.length;
  for (i=0;i<n;i++){
    if(glgoods[i][11]==1){
      sw = Number(sw)+Number(glgoods[i][4]);
      sst = Number(sst)+Number(glgoods[i][8]);
      sseb = Number(sseb)+Number(glgoods[i][7]);
    }
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого:";
  cell0.className +='td7';
  cell1 = row.insertCell(1);
  cell1.innerHTML = sseb;
  cell1.className +='td8';
  cell2 = row.insertCell(2);
  cell2.innerHTML = MyFormat(Number(sw));
  cell2.className +='td8';
  cell3 = row.insertCell(3);
  cell3.setAttribute("colspan", "4");
  cell4 = row.insertCell(4);
  cell4.innerHTML = sst;
  cell4.className +='td7';
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br> Себестоимость: " + sseb +  "<br> Общий вес: " + MyFormat(Number(sw)) +  "<br> Общая стоимость: " + sst;
}

function MySum(val){
  var r = val.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById('MyGoodTable');
  var gid = t.rows[r].cells[10].innerHTML;
  var sum = t.rows[r].cells[9].childNodes[0].value;
  sum = Math.round(Number(sum)/100)*100;
  t.rows[r].cells[9].childNodes[0].value = sum;
  // запись в lzaloggood  в  gsumsaleadm, для выбранного товара
  $.ajax({
    type: "POST",
    url: "scripts/uppriceadm.php",
    data: { 
      pgoodid : gid,
      psum : sum,
    },
    async : false,
    success: function(html1) {
    },
  });
  // запись в lzaloggood  в  gsumsaleadm, для выбранного товара

  n = t.rows.length;
  t.deleteRow(n-1);
  TotSum();
}

$("#MyPrintButton").click(function () {
  window.open("http://lomstore/admin/goods_sale/print/");
});

// провести
$("#MakeBut").click(function () {
  $("#MyPrintButton").removeAttr('disabled');
  $("#MyPrintButton").css({'color': 'black'});
  var aid = document.getElementById('MyAct').value;
  if(aid!=''){
    $.ajax({
      type: "POST",
      url: "scripts/actmake.php",
      data: { 
        paid : aid,
      },
      async : false,
      success: function(html1) {
        alert(html1);
        n = glact.length;
        for(i=0; i<n; i++) {
          if (glact[i][0] == aid) {
            glact[i][6] = 1;
          }
        }
        ActSelectAdd();
        $("#MakeBut").attr('disabled',true);
        $("#MakeBut").css({'color': 'gray'});
      },
    });
  }
  else{
    alert('Не выбран чек.');
    $("#MyPrintButton").attr('disabled',true);
    $("#MyPrintButton").css({'color': 'gray'});
  }
});
// провести
