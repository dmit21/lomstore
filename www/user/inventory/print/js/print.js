// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  
window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    success: function(html1) {
      var inv = JSON.parse(html1);
      document.getElementById('MyPrintZag').innerHTML = 'Инвентаризация от '+MySqlDateToStr(inv[0]);
      document.getElementById('MyShop').innerHTML = inv[2]+',<br>'+inv[3];
      // заполнение таблицы
      switch (inv[5]){
        case '0': // передать все
          document.getElementById('MyInv').innerHTML = 'Все товары';
        break;
        case '1': // найденные
          document.getElementById('MyInv').innerHTML = 'Найденные';
        break;
        case '2': // не найденные
          document.getElementById('MyInv').innerHTML = 'Не найденные';
        break;
      }
      var ginv = inv[6]
      var n = ginv.length;
      var i;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6;
      var row;
      for (i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        cell0.innerHTML = i+1;
        cell1.innerHTML = ginv[i][0];
        cell2.innerHTML = ginv[i][1];
        cell3.innerHTML = ginv[i][2];
        cell4.innerHTML = ginv[i][3];
        cell5.innerHTML = ginv[i][4];
        cell6.innerHTML = Math.round(ginv[i][4]*ginv[i][2]/100)*100;
        t.appendChild(row);
      }
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
