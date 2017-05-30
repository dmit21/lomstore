window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      alert(html1);
      var rez = JSON.parse(html1);
      document.getElementById('MyZag').innerHTML = "Продажа товара с " + rez[0] + " за " + MySqlDateToStr(rez[2]);
      var table = document.getElementById("MyGoodTable");
      var goods = rez[1];
      var n = goods.length;
      var i;
      var stoim;
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, row;
      var sum1, sum2, sum3;
      sum1 = 0;
      sum2 = 0;
      sum3 = 0;
      for (i=0;i<n;i++){
        row = table.insertRow(table.rows.length);
        cell0 = row.insertCell(0);// № по порядку
        cell1 = row.insertCell(1);// штрих код
        cell2 = row.insertCell(2);// наименование
        cell3 = row.insertCell(3);// вес
        cell4 = row.insertCell(4);// за г
        cell5 = row.insertCell(5);// стоимость
        cell6 = row.insertCell(6);// скидка
        cell7 = row.insertCell(7);// продажная стоимость
        cell0.innerHTML = i+1;
        cell1.innerHTML = goods[i][0];
        cell2.innerHTML = goods[i][1];
        cell3.innerHTML = MyFormat(goods[i][2]);
        cell4.innerHTML = goods[i][3];
        stoim = Math.round(Number(goods[i][2])*Number(goods[i][3])/100)*100;
        cell5.innerHTML = stoim
        cell6.innerHTML = goods[i][4];
        cell7.innerHTML = goods[i][5];
        table.appendChild(row);
        sum1 = Number(sum1) + Number(goods[i][2]);
        sum2 = Number(sum2) + Number(stoim);
        sum3 = Number(sum3) + Number(goods[i][5]);
      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.className += "cell0";
      cell0.setAttribute("colspan", "3");
      cell0.innerHTML = "Итого";
      cell1 = row.insertCell(1);
      cell1.innerHTML = MyFormat(sum1);
      cell2 = row.insertCell(2);
      cell3 = row.insertCell(3);
      cell3.className += "cell0";
      cell3.innerHTML = sum2;
      cell4 = row.insertCell(4);
      cell5 = row.insertCell(5);
      cell5.className += "cell0";
      cell5.innerHTML = sum3;
      table.appendChild(row);
    }
  });
}
