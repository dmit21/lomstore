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
//      document.getElementById('MyShop').innerHTML = inv[1];
      var ginv = inv[3]
      var n = ginv.length;
      var i;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7;
      var row;
      var sum1=0, sum2=0;
      var sum1c=0, sum2c=0;
      var virt='';
      var stoim;
      var virt1 = '';
      for (i=0;i<n;i++){
        if(virt!=ginv[i][5]){
          k=1;
          virt1 = virt;
          virt = ginv[i][5];
          if (sum1 == 0){
            row = t.insertRow(t.rows.length); // Добавляем строку
            cell0 = row.insertCell(0);
            cell0.setAttribute("colspan", "9");
            cell0.className += "td1";
            cell0.innerHTML = virt;
            t.appendChild(row);
          }
          else{
            row = t.insertRow(t.rows.length); // Добавляем строку
            cell0 = row.insertCell(0);
            cell0.setAttribute("colspan", "3");
            cell0.innerHTML = "ИТОГО по "+virt1;
            cell0.className += "td1";
            cell1 = row.insertCell(1);         
            cell1.innerHTML = MyFormat(sum1);
            cell2 = row.insertCell(2);         
            cell2.innerHTML = '';
            cell3 = row.insertCell(3);         
            cell4 = row.insertCell(4);         
            cell4.innerHTML = sum2;
            cell5 = row.insertCell(5);         
            t.appendChild(row);
            sum1c = Number(sum1c)+Number(sum1);
            sum2c = Number(sum2c)+Number(sum2);
            sum1 = 0;
            sum2 = 0;
            row = t.insertRow(t.rows.length); // Добавляем строку
            cell0 = row.insertCell(0);
            cell0.setAttribute("colspan", "9");
            cell0.className += "td1";
            cell0.innerHTML = virt;
            t.appendChild(row);
          }
        }
        else{
          k=k+1;
        }
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        cell7 = row.insertCell(7);
        cell0.innerHTML = k;
        cell1.innerHTML = ginv[i][0];
        cell2.innerHTML = ginv[i][1];
        cell3.innerHTML = MyFormat(ginv[i][2]);
        sum1 = Number(sum1)+Number(ginv[i][2]);
        cell4.innerHTML = ginv[i][3];
        cell5.innerHTML = ginv[i][4];
        stoim = Math.round(ginv[i][2]*ginv[i][4]/100)*100;  
        cell6.innerHTML = stoim;
        sum2 = Number(sum2)+Number(stoim);
        cell7.innerHTML = ginv[i][5];
        t.appendChild(row);
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "3");
      cell0.innerHTML = "ИТОГО по "+virt;
      cell0.className += "td1";
      cell1 = row.insertCell(1);         
      cell1.innerHTML = MyFormat(sum1);
      cell2 = row.insertCell(2);         
      cell2.innerHTML = '';
      cell3 = row.insertCell(3);         
      cell4 = row.insertCell(4);         
      cell4.innerHTML = sum2;
      cell5 = row.insertCell(5);         
      t.appendChild(row);
      sum1c = Number(sum1c)+Number(sum1);
      sum2c = Number(sum2c)+Number(sum2);
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "3");
      cell0.innerHTML = "Итого";
      cell1 = row.insertCell(1);
      cell1.innerHTML = MyFormat(sum1c);
      cell2 = row.insertCell(2);
      cell2.setAttribute("colspan", "2");
      cell3 = row.insertCell(3);
      cell3.innerHTML = sum2c;
      t.appendChild(row);
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
