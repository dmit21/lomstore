// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  
window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    success: function(html1) {
      var inv = JSON.parse(html1);
      document.getElementById('MyPrintZag').innerHTML = 'Корректировка цен по накладной № '+inv[2]+' от '+MySqlDateToStr(inv[3]);
      // заполнение таблицы
      var ginv = inv[0]
      var n = ginv.length;
      var i,stoim;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6,cell7;
      var row;
      for (i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0  = row.insertCell(0); // № п/п
        cell1  = row.insertCell(1); // № товара
        cell2  = row.insertCell(2); // Наименование
        cell3  = row.insertCell(3); // Категория ломбарда
        cell4  = row.insertCell(4); // Вес
        cell5  = row.insertCell(5); // Стар. цена
        cell6  = row.insertCell(6); // Нов. цена
        cell7  = row.insertCell(7); // Стар. скидка
        cell8  = row.insertCell(8); // Нов. скидка
        cell9  = row.insertCell(9); // Стоимость
        cell10 = row.insertCell(10); // Витрина
            
        cell0.innerHTML = i+1;
        cell1.innerHTML = ginv[i][0];
        cell2.innerHTML = ginv[i][1];
        cell3.innerHTML = ginv[i][2];
        cell4.innerHTML = ginv[i][3];
        cell5.innerHTML = ginv[i][4];
        cell6.innerHTML = ginv[i][5];
        cell7.innerHTML = ginv[i][6];
        cell8.innerHTML = ginv[i][7];
        stoim = Math.round(ginv[i][3]*ginv[i][5]/100)*100-Math.round(ginv[i][3]*ginv[i][5]*ginv[i][7]/10000)*100;
        cell9.innerHTML = stoim;
        cell10.innerHTML = ginv[i][8];
        t.appendChild(row);
      }
      document.getElementById('MyRuc').innerHTML = 'цены изменил '+inv[1];
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
