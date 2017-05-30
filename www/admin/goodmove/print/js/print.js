// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var arr = JSON.parse(html1);
      var goods = arr[3];
      var nacname = arr[0];
      document.getElementById('MyZag').innerHTML = 'Перемещение имущества № '+nacname+' от '+MySqlDateToStr(arr[2]);
      var t = document.getElementById('MyGoodTab');
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6;
      var row;
      var n,i;
      var sum1;
      n = goods.length;
      sum1 = 0;
      for(i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.className += "td1";
        cell0.innerHTML = i+1;

        cell1 = row.insertCell(1);
        cell1.className += "td1";
        cell1.innerHTML = goods[i][4];

        cell2 = row.insertCell(2);
        cell2.className += "td1";
        cell2.innerHTML = goods[i][0];

        cell3 = row.insertCell(3);
        cell3.className += "td1";
        cell3.innerHTML = goods[i][1];

        cell4 = row.insertCell(4);
        cell4.className += "td1";
        cell4.innerHTML = goods[i][3];

        cell5 = row.insertCell(5);
        cell5.className += "td2";
        cell5.innerHTML = MyFormat(goods[i][2]);
        sum1 = Number(sum1)+Number(goods[i][2]);

        cell6 = row.insertCell(6);
        cell6.className += "td1";
        cell6.innerHTML = goods[i][6];

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

      document.getElementById('MySigAdm').innerHTML = '___________________  '+arr[1];
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
