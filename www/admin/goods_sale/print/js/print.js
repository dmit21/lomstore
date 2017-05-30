// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var arr = JSON.parse(html1);
      var goods = arr[1];
      var storname = goods[0][10];
      var nacname = goods[0][9];
      document.getElementById('StNum').innerHTML = storname+'<br> Организация ТОО "Ломбардия"';
      document.getElementById('MyPrintZag').innerHTML = 'Реализация залогового имущества c ' + goods[0][10] + ' по накладной № ' + nacname +' от '+MySqlDateToStr(arr[3]);
      var t = document.getElementById('MyGoodTab');
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11;
      var row;
      var n,i;
      var sum1,sum2,sum3,sum4,sum5;
      var stoim, doh;
      n = goods.length;
      sum1 = 0;
      sum2 = 0;
      sum3 = 0;
      sum4 = 0;
      sum5 = 0;
      for(i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.innerHTML = i+1;

        cell1 = row.insertCell(1);
        cell1.innerHTML = goods[i][0];

        cell2 = row.insertCell(2);
        cell2.innerHTML = goods[i][1];

        cell3 = row.insertCell(3);
        cell3.innerHTML = goods[i][2];

        cell4 = row.insertCell(4);
        cell4.innerHTML = goods[i][3];
        sum1 = Number(sum1)+Number(goods[i][3]);

        cell5 = row.insertCell(5);
        cell5.innerHTML = goods[i][4];
        sum2 = Number(sum2)+Number(goods[i][4]);

        cell6 = row.insertCell(6);
        cell6.innerHTML = goods[i][5];

        stoim = Math.round(goods[i][3]*goods[i][5]/100)*100;
        cell7 = row.insertCell(7);
        cell7.innerHTML = stoim;
        sum3 = Number(sum3)+Number(stoim);

        cell8 = row.insertCell(8);
        cell8.innerHTML = goods[i][6];
 
        cell9 = row.insertCell(9);
        cell9.innerHTML = goods[i][7];
        sum4 = Number(sum4)+Number(goods[i][7]);

        cell10 = row.insertCell(10);
        doh = Number(goods[i][7])-Number(goods[i][4]);
        cell10.innerHTML = doh;
        sum5 = Number(sum5)+Number(doh);

        cell11 = row.insertCell(11);
        cell11.innerHTML = goods[i][8];
        t.appendChild(row);
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell1 = row.insertCell(0);
      cell1.setAttribute("colspan", "4");
      cell1.innerHTML = "Итого:";
      cell2 = row.insertCell(1);         
      cell2.innerHTML = MyFormat(sum1);
      cell3 = row.insertCell(2);         
      cell3.innerHTML = sum2;
      cell4 = row.insertCell(3);         
      cell4.setAttribute("colspan", "2");
      cell4.innerHTML = sum3;
      cell5 = row.insertCell(4);         
      cell5.setAttribute("colspan", "2");
      cell5.innerHTML = sum4;
      cell6 = row.insertCell(5);         
      cell6.innerHTML = sum5;
      t.appendChild(row);

      document.getElementById('MySum').innerHTML = 'Сумма по документу: '+MoneyToString(sum4);
      document.getElementById('MyRuc').innerHTML = arr[2];
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
