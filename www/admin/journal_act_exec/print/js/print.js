// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var tarr = JSON.parse(html1);
      var garr = tarr[2];

      document.getElementById('MyPrintZag').innerHTML = 'Акт на исполнение № '+tarr[0]+ ' от '+tarr[1];
      var sumw, sumst1, sumst2;
      var stoim, sums;
      var n = garr.length;
      var i;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
      var row;
      sumw = 0;
      sumst1 = 0;
      sumst2 = 0;
      sums = 0;
      // шапка
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.innerHTML = '№пп';
      cell1 = row.insertCell(1);
      cell1.innerHTML = 'Номер КЗБ';
      cell2 = row.insertCell(2);
      cell2.innerHTML = 'Идентификатор';
      cell3 = row.insertCell(3);
      cell3.innerHTML = 'Наименование имущества';
      cell4 = row.insertCell(4);
      cell4.innerHTML = 'Категория';
      cell5 = row.insertCell(5);
      cell5.innerHTML = 'Вес';
      cell6 = row.insertCell(6);
      cell6.innerHTML = 'Себест.';
      cell7 = row.insertCell(7);
      cell7.innerHTML = 'Эксперт-оцещик';
      t.appendChild(row);
      // шапка
      // шапка номерация
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.innerHTML = '1';
      cell1 = row.insertCell(1);
      cell1.innerHTML = '2';
      cell2 = row.insertCell(2);
      cell2.innerHTML = '3';
      cell3 = row.insertCell(3);
      cell3.innerHTML = '4';
      cell4 = row.insertCell(4);
      cell4.innerHTML = '5';
      cell5 = row.insertCell(5);
      cell5.innerHTML = '6';
      cell6 = row.insertCell(6);
      cell6.innerHTML = '7';
      cell7 = row.insertCell(7);
      cell7.innerHTML = '8';
      t.appendChild(row);
      // шапка номерация
      for (i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.innerHTML = i+1;

        cell1 = row.insertCell(1);
        cell1.innerHTML = garr[i][2];

        cell2 = row.insertCell(2);
        cell2.innerHTML = garr[i][1];

        cell3 = row.insertCell(3);
        cell3.innerHTML = garr[i][3];

        cell4 = row.insertCell(4);
        cell4.innerHTML = garr[i][4];

        cell5 = row.insertCell(5);
        cell5.innerHTML = MyFormat(garr[i][5]);
        sumw = Number(sumw)+Number(garr[i][5]);

        cell6 = row.insertCell(6);
        cell6.innerHTML = garr[i][8];
        sumst2 = Number(sumst2)+Number(garr[i][8]);
        cell7 = row.insertCell(7);
        cell7.innerHTML = garr[i][9];

        t.appendChild(row);
      }
      // заполнение таблицы
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell1 = row.insertCell(0);
      cell1.setAttribute("colspan", "5");
      cell1.innerHTML = "Вес";
      cell2 = row.insertCell(1);         
      cell2.innerHTML = MyFormat(sumw);
      cell3 = row.insertCell(2);         
      cell3.innerHTML = sumst2;

      t.appendChild(row);
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
