window.onload = function () {
  glstid = document.getElementById('MyStore');
  document.getElementById('DateBeg').value = JournalDate(0);
  var db = document.getElementById('DateBeg').value;
  MyVit();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});  
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: {
      pdb : db,
    },
    async: false,
    success: function(html1) {
      glstgoods = JSON.parse(html1);
      MyMakeTable(0);
    }
  });
}

function MyVit() {
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: {
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glstore = store;
      var n,i;
      n = glstore.length;
      opt = document.createElement("option");
      opt.setAttribute("value", 0);
      opt.innerHTML="Все";
      glstid.appendChild(opt);
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glstore[i][0]);
        opt.innerHTML=glstore[i][2];
        glstid.appendChild(opt);
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
  MyClearTable();
  alert(glstid.value);
  MyMakeTable(glstid.value);
});


function MyMakeTable(val){
  var n = glstgoods.length;
  var i,j=0;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7;
  var row;
  var sum1=0,sum2=0,k=1;
  var stoim;
  var vitr='';
  gltarr = [];
  for (i=0;i<n;i++){
    if (val==0){
      if(vitr!=glstgoods[i][5]){
        vitr=glstgoods[i][5];
        k=1;
      }
      else{
        k = k+1;
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.className +='td2';      
      cell1 = row.insertCell(1);
      cell1.className +='td3';      
      cell2 = row.insertCell(2);
      cell2.className +='td3';      
      cell3 = row.insertCell(3);
      cell3.className +='td4';      
      cell4 = row.insertCell(4);
      cell4.className +='td3';      
      cell5 = row.insertCell(5);
      cell5.className +='td4';      
      cell6 = row.insertCell(6);
      cell6.className +='td4';      
      cell7 = row.insertCell(7);
      cell7.className +='td3';      
      cell0.innerHTML = k;
      cell1.innerHTML = glstgoods[i][0];
      cell2.innerHTML = glstgoods[i][1];
      cell3.innerHTML = MyFormat(glstgoods[i][2]);
      sum1 = Number(sum1)+Number(glstgoods[i][2]);
      cell4.innerHTML = glstgoods[i][3];
      cell5.innerHTML = glstgoods[i][4];
      stoim = Math.round(glstgoods[i][4]*glstgoods[i][2]/100)*100;
      cell6.innerHTML = stoim;
      sum2 = Number(sum2)+Number(stoim);
      cell7.innerHTML = glstgoods[i][5];
      t.appendChild(row);
      gltarr[j] = [];
      gltarr[j][0] = glstgoods[i][0];
      gltarr[j][1] = glstgoods[i][1];
      gltarr[j][2] = glstgoods[i][2];
      gltarr[j][3] = glstgoods[i][3];
      gltarr[j][4] = glstgoods[i][4];
      gltarr[j][5] = stoim;
      gltarr[j][6] = glstgoods[i][5];
      j = j+1;
    }
    else{
      if (glstgoods[i][6]==val){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.className +='td2';        
        cell1 = row.insertCell(1);
        cell1.className +='td3';        
        cell2 = row.insertCell(2);
        cell2.className +='td3';      
        cell3 = row.insertCell(3);
        cell3.className +='td4';      
        cell4 = row.insertCell(4);
        cell4.className +='td3';      
        cell5 = row.insertCell(5);
        cell5.className +='td4';      
        cell6 = row.insertCell(6);
        cell6.className +='td4';      
        cell7 = row.insertCell(7);
        cell7.className +='td3';      
        cell0.innerHTML = k;
        k = k+1;        
        cell1.innerHTML = glstgoods[i][0];
        cell2.innerHTML = glstgoods[i][1];
        cell3.innerHTML = MyFormat(glstgoods[i][2]);
        sum1 = Number(sum1)+Number(glstgoods[i][2]);
        cell4.innerHTML = glstgoods[i][3];
        cell5.innerHTML = glstgoods[i][4];
        stoim = Math.round(glstgoods[i][4]*glstgoods[i][2]/100)*100;
        cell6.innerHTML = stoim;
        sum2 = Number(sum2)+Number(stoim);
        cell7.innerHTML = glstgoods[i][5];
        t.appendChild(row);
        gltarr[j] = [];
        gltarr[j][0] = glstgoods[i][0];
        gltarr[j][1] = glstgoods[i][1];
        gltarr[j][2] = glstgoods[i][2];
        gltarr[j][3] = glstgoods[i][3];
        gltarr[j][4] = glstgoods[i][4];
        gltarr[j][5] = stoim;
        gltarr[j][6] = glstgoods[i][5];
        j = j+1;
      }
    }
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого:";
  cell0.className +='td5';      
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sum1);
  cell1.className +='td4';  
  cell2 = row.insertCell(2);
  cell2.setAttribute("colspan", "2");
  cell3 = row.insertCell(3);
  cell3.className +='td4';  
  cell3.innerHTML = sum2;
  cell4 = row.insertCell(4);
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br> Общий вес: " + MyFormat(Number(sum1)) +  "<br> Общая стоимость: " + sum2;

}

function MyClearTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var i = 1;
  while(ntst>1){
    t.deleteRow(i);
    ntst = ntst-1;
  }
}

$("#MyPrnButton").click(function () {
  var db = document.getElementById('DateBeg').value;
  $.ajax({
    type: "POST",
    url: "scripts/forprint.php",
    data: { 
      pdb : db,
      psid : glstid.value,
    },
    async: false,
    success: function(html1) {
      //window.open("http://dm.btop.kz/lomstore/www/admin/journal_invent/print/");
      window.open("http://lomstore/admin/journal_invent/print/");
    }
  });
});

$("#DateSearch").click(function () {
  var db = document.getElementById('DateBeg').value;
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: {
      pdb : db,
    },
    async: false,
    success: function(html1) {
      if(html1!='null'){
        document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
        document.getElementById('MyStore').value = 0;
        glstgoods = JSON.parse(html1);
        MyClearTable();
        MyMakeTable(0);
      }
      else{
        alert('Нет данных');
      }
    }
  });
});
