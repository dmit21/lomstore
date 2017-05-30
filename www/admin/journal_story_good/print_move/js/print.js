// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      alert(html1);
      var arr = JSON.parse(html1);
      document.getElementById('MyZag').innerHTML = 'Перемещение имущества № '+arr[1][0][11]+' от '+MySqlDateToStr(arr[1][0][12]);
      var t = document.getElementById('MyGoodTab');
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6;
      var row;
      var n,i;
      var sum1;
      n = arr[1].length;
      sum1 = 0;
      for(i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.className += "td1";
        cell0.innerHTML = i+1;

        cell1 = row.insertCell(1);
        cell1.className += "td1";
        cell1.innerHTML = arr[1][i][0];

        cell2 = row.insertCell(2);
        cell2.className += "td1";
        cell2.innerHTML = arr[1][i][1];

        cell3 = row.insertCell(3);
        cell3.className += "td1";
        cell3.innerHTML = arr[1][i][2];

        cell4 = row.insertCell(4);
        cell4.className += "td1";
        cell4.innerHTML = arr[1][i][3];

        cell5 = row.insertCell(5);
        cell5.className += "td2";
        cell5.innerHTML = MyFormat(arr[1][i][4]);
        sum1 = Number(sum1)+Number(arr[1][i][4]);

        cell6 = row.insertCell(6);
        cell6.className += "td1";
        cell6.innerHTML = arr[1][i][8];

        t.appendChild(row);
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell1 = row.insertCell(0);
      cell1.setAttribute("colspan", "5");
      cell1.innerHTML = "Итого:";
      cell2 = row.insertCell(1);         
      cell2.className += "td2";
      cell2.innerHTML = MyFormat(sum1);
      t.appendChild(row);

      document.getElementById('MySigAdm').innerHTML = '___________________  '+arr[0];
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
