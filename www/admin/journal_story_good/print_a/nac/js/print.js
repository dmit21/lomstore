// ЗАГРУЗКА СЕССИЙ ДЛЯ ПЕЧАТНЫХ ФОРМ И ЕЕ ЗАПОЛНЕНИЕ 

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      document.getElementById("MyPoint").innerHTML = 'ТОО "Ломбардия" пункт № ' + rez[0] + '<br>' + 'Телефон: ' + rez[1] + '<br>' + 'Адрес: ' + rez[2];
      document.getElementById("MyZag").innerHTML = 'Накладная по залоговому имуществу № ' + rez[3] + ' от ' + MySqlDateToStr(rez[4]); 
      var n, i, j, sums1, sums2, tid;
      var row, cell0, cell1, cell2, cell3, cell4, cell5, cell6;
      sums1 = 0;
      sums2 = 0;
      i = 0;
      var table = document.getElementById("MyActTable");
      n = rez[7].length;
      while(i<n) {
        tid = rez[7][i][0];
        row = table.insertRow(table.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        sums1 = sums1 + Number(rez[7][i][5]);
        sums2 = sums2 + Number(rez[7][i][7]);
        cell0.innerHTML = MySqlDateToStr(rez[7][i][1]);
        cell0.className += "td2";
        cell1.innerHTML = rez[0] + InSymToStr("0", 8 - (String(rez[0]).length + String(rez[7][i][2]).length)) + rez[7][i][2];
        cell1.className += "td4";
        cell2.innerHTML = "";
        cell2.className += "td2";
        cell3.innerHTML = "";
        cell3.className += "td2";
        cell4.innerHTML = MyFormat(rez[7][i][5]);
        cell4.className += "td2";
        cell5.innerHTML = rez[7][i][7];
        cell5.className += "td2";
        cell6.innerHTML = rez[7][i][9];
        cell6.className += "td3";
        ii = i+1;
        j = 1;
        while((i<n) &&  (rez[7][i][0] == tid)) {
          row = table.insertRow(table.rows.length); // Добавляем строку
          cell0 = row.insertCell(0);
          cell1 = row.insertCell(1);
          cell2 = row.insertCell(2);
          cell3 = row.insertCell(3);
          cell4 = row.insertCell(4);
          cell5 = row.insertCell(5);
          cell6 = row.insertCell(6);
          cell0.innerHTML = j;
          cell0.className += "td2";
          cell1.innerHTML = rez[7][i][3];
          cell1.className += "td5";
          cell2.innerHTML = rez[0] + InSymToStr("0", 12 - (String(rez[0]).length + String(rez[7][i][10]).length)) + rez[7][i][10];
          cell2.className += "td2";
          cell3.innerHTML = rez[7][i][4];;
          cell3.className += "td5";
          cell4.innerHTML = MyFormat(rez[7][i][6]);
          cell4.className += "td2";
          cell5.innerHTML = rez[7][i][8];
          cell5.className += "td2";
          cell6.innerHTML = "";
          cell6.className += "td5";
          i = i+1;
          j = j+1;
        }
      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell2 = row.insertCell(2);
      cell3 = row.insertCell(3);
      cell0.innerHTML = "Итого:";
      cell0.setAttribute("colspan", "4");
      cell0.className += "td1";
      cell1.innerHTML = MyFormat(sums1);
      cell1.className += "td1";
      cell2.innerHTML = sums2;
      cell2.className += "td1";
      cell3.innerHTML = "";
      cell3.className += "td1";
      document.getElementById("MySum").innerHTML = "Сумма по документу: " +  MoneyToString(sums2);
      document.getElementById("MyUser").innerHTML = rez[6];
      //window.open("http://lombardiya/user/");
    }
  });
}
// ЗАГРУЗКА СЕССИЙ ДЛЯ ПЕЧАТНОЙ ФОРМЫ И ЕЕ ЗАПОЛНЕНИЕ