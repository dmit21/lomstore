window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      document.getElementById('MyZag').innerHTML = "Продажа товара с " + rez[0] + " за " + MySqlDateToStr(rez[2]);
      var table = document.getElementById("MyGoodTable");
      var goods = rez[1];
      var n = goods.length;
      var i;
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, row;
      var sum1, sum2, sum3;
      sum1 = 0;
      sum2 = 0;
      sum3 = 0;
      for (i=0;i<n;i++){
        row = table.insertRow(table.rows.length);
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        cell0.innerHTML = i+1;
        cell1.innerHTML = goods[i][0];
        cell2.innerHTML = goods[i][1];
        cell3.innerHTML = goods[i][2];
        cell4.innerHTML = MyFormat(goods[i][3]);
        cell5.innerHTML = goods[i][4];
        cell6.innerHTML = goods[i][5];
        table.appendChild(row);
        sum1 = Number(sum1) + Number(goods[i][2]);
        sum2 = Number(sum2) + Number(goods[i][3]);
        sum3 = Number(sum3) + Number(goods[i][5]);
      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.className += "cell0";
      cell0.setAttribute("colspan", "3");
      cell0.innerHTML = "Итого";
      cell1 = row.insertCell(1);
      cell1.innerHTML = sum1;
      cell2 = row.insertCell(2);
      cell2.innerHTML = MyFormat(sum2);
      cell3 = row.insertCell(3);
      cell4 = row.insertCell(4);
      cell4.className += "cell0";
      cell4.innerHTML = sum3;
      cell5 = row.insertCell(5);
      table.appendChild(row);
    }
  });
}
