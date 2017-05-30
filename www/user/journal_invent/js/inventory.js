window.onload = function () {
  document.getElementById("MyDate").value = JournalDate(0);
  var db = document.getElementById("MyDate").value;
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: {
      pdb : db,
    },
    async: false,
    success: function(html1) {
      if(html1!='null'){
        glstgoods = JSON.parse(html1);
        MyMakeTable();
      }
      else{
        alert('Нет данных');
      }
    }
  });
}

$("#MySearch").click(function () {
  var db = document.getElementById("MyDate").value; 
  MyClearTable();
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: {
      pdb : db,
    },
    async: false,
    success: function(html1) {
      if(html1!='null'){
        glstgoods = JSON.parse(html1);
        MyMakeTable();
      }
      else{
        alert('Нет данных');
      }
    }
  });
});

function MyMakeTable(){
  var n = glstgoods.length;
  var i;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6;
  var row;
  var sum1 = 0, sum2 = 0;
  for (i=0;i<n;i++){
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
    cell0.innerHTML = i+1;
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
    cell7.className +='td1'
    t.appendChild(row);
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого:";
  cell0.className +='td5';
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sum1);
  cell1.className +='td6';
  cell2 = row.insertCell(2);
  cell2.setAttribute("colspan", "2");
  cell3 = row.insertCell(3);
  cell3.innerHTML = sum2;
  cell3.className +='td6';
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br>Общий вес: " + MyFormat(Number(sum1)) +  "<br> Общая стоимость: " + sum2;
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
  var db = document.getElementById("MyDate").value; 
  $.ajax({
    type: "POST",
    url: "scripts/forprint.php",
    data: { 
      pdb : db,
      parr : glstgoods,
    },
    async: false,
    success: function(html1) {
      window.open("http://lomstore/user/journal_invent/print/");
    }
  });
});
