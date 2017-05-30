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
      document.getElementById("MyPoint").innerHTML = 'ТОО "Ломбардия" пункт № ' + rez[0];
      document.getElementById("MyPhone").innerHTML = 'Телефон: ' + rez[1];
      document.getElementById("MyAdres").innerHTML = 'Адрес: ' + rez[2];
      document.getElementById("MyZag").innerHTML = 'Акт на исполнение № ' + rez[3] +  ' от ' + MySqlDateToStr(rez[4]);
      var n, i, k, sums1, sums2;
      var row, cell0, cell1, cell2, cell3, cell4, cell5, cell6;
      sums1 = 0;
      sums2 = 0;
      var table = document.getElementById("MyActTable");
      n = rez[5].length;
      for(i = 0; i<n; i++) {
        row = table.insertRow(table.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        sums1 = sums1 + Number(rez[5][i][7]);
        sums2 = sums2 + Number(rez[5][i][4]);
        k = i+1;
        cell0.innerHTML = k;
        cell0.className += "td2";
        cell1.innerHTML = MySqlDateToStr(rez[5][i][5]);
        cell1.className += "td2";
        cell2.innerHTML = rez[0] + InSymToStr("0", 8 - (String(rez[0]).length + String(rez[5][i][2]).length)) + rez[5][i][2];
        cell2.className += "td2";
        cell3.innerHTML = MyFormat(rez[5][i][7]);
        cell3.className += "td2";
        cell4.innerHTML = rez[5][i][4];
        cell4.className += "td2";
        cell5.innerHTML = rez[5][i][8];
        cell5.className += "td2";
        cell6.innerHTML = rez[5][i][1];
        cell6.className += "td3";
      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell2 = row.insertCell(2);
      cell3 = row.insertCell(3);
      cell4 = row.insertCell(4);
      cell0.innerHTML = "Итого:";
      cell0.setAttribute("colspan", "3");
      cell0.className += "td1";
      cell1.innerHTML = MyFormat(sums1);
      cell1.className += "td1";
      cell2.innerHTML = sums2;
      cell2.className += "td1";
      cell3.innerHTML = "";
      cell3.className += "td1";
      cell4.innerHTML = "";
      cell4.className += "td1";
      document.getElementById("MySum").innerHTML = "Сумма по документу: " +  MoneyToString(sums2);
      document.getElementById("MyUser").innerHTML = rez[6];
      window.open("http://lomstore/admin/journal_story_good/print_a/nac/");
    }
  });
}
// ЗАГРУЗКА СЕССИЙ ДЛЯ ПЕЧАТНОЙ ФОРМЫ И ЕЕ ЗАПОЛНЕНИЕ