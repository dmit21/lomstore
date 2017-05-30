window.onload = function () {
  document.getElementById('DateBeg').value = JournalDate(10);
  document.getElementById('DateEnd').value = JournalDate(0);
  MySearch();
}

$("#DateSearch").click(function () {
  MySearch();
});

function MySearch(){
  var db = document.getElementById('DateBeg').value;
  var de = document.getElementById('DateEnd').value;

  $.ajax({
    type: "POST",
    url: "scripts/journal.php",
    data: {
      pdb : db,
      pde : de,
    },
    success: function(html1) {
      if(html1!=null){
        glgoods = JSON.parse(html1);
        MyAddTable();
      }
      else{
        alert('За выбраный период не было изменения цен');
      }
    }
  });
}

function MyAddTable(){
  var t = document.getElementById('MyGoodTable');
  var n = t.rows.length;
  var i,j;
  while(n>1){
    t.deleteRow(1);
    n = n-1;
  }
  var cell0, cell1, cell2, cell3, cell4, cell5;
  var row;
  var n = glgoods.length;
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);// номер товара
    cell1 = row.insertCell(1);// нименование товара
    cell2 = row.insertCell(2);// дата изменения
    cell3 = row.insertCell(3);// старая цена
    cell4 = row.insertCell(4);// новая цена
    cell5 = row.insertCell(5);// администратор

    cell0.innerHTML = glgoods[i][0];
    cell0.className +='td2';
    cell1.innerHTML = glgoods[i][1];
    cell1.className +='td2';
    cell2.innerHTML = MySqlDateToStr(glgoods[i][2]);
    cell2.className +='td3';
    cell3.innerHTML = glgoods[i][3];
    cell3.className +='td4';
    cell4.innerHTML = glgoods[i][4];
    cell4.className +='td4';
    cell5.innerHTML = glgoods[i][5];
    cell5.className +='td2';
    t.appendChild(row);
  } 
}