function MySqlDateToStr(sqldate){ // преобразование даты ГГГГ-ММ-ЧЧ в ЧЧ.мм.гггг
  var year,mon,day;
  var posb,pose;
  var mystr;
  posb = 0;
  pose = sqldate.indexOf("-",posb);

  year = sqldate.substring(posb,pose);
  posb = pose+1;
  pose = sqldate.indexOf("-",posb);
  mon = sqldate.substring(posb,pose);
  posb = pose+1;
  pose = sqldate.length;
  day = sqldate.substring(posb,pose);
  mystr = day+'.'+mon+'.'+year;
  return mystr;
}

// ФУНКЦИЯ ДЛЯ ЖУРНАЛЬНЫХ ДАТ

function JournalDate(md) {
    var gdt=new Date();
    gdt.setDate(gdt.getDate() - Number(md));
    var gmonth = gdt.getMonth()+1;
    if (gmonth<10) gmonth='0'+gmonth;
    var gday = gdt.getDate();
    if (gday<10) gday='0'+gday;
    var gyear = gdt.getFullYear();
    var gMyDate = gyear+'-'+gmonth+'-'+gday;
    return gMyDate;
}

// ФУНКЦИЯ ДЛЯ ЖУРНАЛЬНЫХ ДАТ

// ВСТАВКА СИМВОЛОВ В СТРОКУ

function InSymToStr(sym, numsym) { // sym - символ, numsym - количество символов 
    var s=""; // cтрока с символами
    var i;
    for (var i = 0 ; i < numsym; i++ ) {
      s=s+sym;
      
    };
    return s; 
}

// ВСТАВКА СИМВОЛОВ В СТРОКУ
// формирование номеров билетов и пр

function TicNumToStr(tnum, pnum, vol) { 
// tnum - номер билета, акта..., pnum - номер пункта, vol - признак 1-билет или акт, 2 - штрихкод
  var ltnum = tnum.length;
  var lpnum = pnum.length;
  var lin = vol-ltnum-lpnum;
  var s=""; // cтрока с символами
  var i;
  for (var i=0;i<lin;i++){
    s=s+'0';
  };
  s = pnum + s +tnum;
  return s; 
}

// формирование номеров билетов и пр

// ДАТА + ДЕНЬ НЕДЕЛИ В СТРОКУ

function MyDateToStrDW(mdate){ // дата + день неделив строку 
  var mm;
  switch (mdate.getDay()){
    case 0 : mm = "воскресенье";
    break
    case 1 : mm = "понедельник";
    break
    case 2 : mm = "вторник";
    break
    case 3 : mm = "среда";
    break
    case 4 : mm = "четверг";
    break
    case 5 : mm = "пятница";
    break
    case 6 : mm = "суббота";
    break
  }
  mm = MyDateToStr(mdate)+" "+mm;
  return mm;
}

// ДАТА + ДЕНЬ НЕДЕЛИ В СТРОКУ

function MyDateToStrYMD(mdate){ // дата в строку гггг-мм-дд
  var mm,mt;
  switch (mdate.getMonth()){
    case 0 : mm = "-01-";
    break
    case 1 : mm = "-02-";
    break
    case 2 : mm = "-03-";
    break
    case 3 : mm = "-04-";
    break
    case 4 : mm = "-05-";
    break
    case 5 : mm = "-06-";
    break
    case 6 : mm = "-07-";
    break
    case 7 : mm = "-08-";
    break
    case 8 : mm = "-09-";
    break
    case 9 : mm = "-10-";
    break
    case 10 : mm = "-11-";
    break
    case 11 : mm = "-12-";
    break
  }
  mt = mdate.getDate();
  if(mt<10) mt = '0'+mt;
    mm = mdate.getFullYear()+mm+mt;
  return mm;
}


// ДАТА В СТРОКУ

function MyDateToStr(mdate){ // дата в строку
  var mm;
  switch (mdate.getMonth()){
    case 0 : mm = ".01.";
    break
    case 1 : mm = ".02.";
    break
    case 2 : mm = ".03.";
    break
    case 3 : mm = ".04.";
    break
    case 4 : mm = ".05.";
    break
    case 5 : mm = ".06.";
    break
    case 6 : mm = ".07.";
    break
    case 7 : mm = ".08.";
    break
    case 8 : mm = ".09.";
    break
    case 9 : mm = ".10.";
    break
    case 10 : mm = ".11.";
    break
    case 11 : mm = ".12.";
    break
  }
  mm = mdate.getDate()+mm+mdate.getFullYear();
  return mm;
}

// ДАТА В СТРОКУ

// ВОЗВРАЩАЕТ СУММУ ПРОПИСЬЮ
function plural(n, forms) {
  return forms[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
}

function MoneyToString(n){
  var s1=[['','',''],
    [['один','одна'],['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],'сто'],
    [['два','две'],'двадцать','двести'],
    ['три','тридцать','триста'],
    ['четыре','сорок','четыреста'],
    ['пять','пятьдесят','пятьсот'],
    ['шесть','шестьдесят','шестьсот'],
    ['семь','семьдесят','семьсот'],
    ['восемь','восемьдесят','восемьсот'],
    ['девять','девяносто','девятьсот']];
  var b=[['тиын','тиын','тиын'],
  ['тенге','тенге','тенге'],//['доллар','доллара','долларов'] или ['килограмм','килограмма','килограммов']
  ['тысяча','тысячи','тысяч'],
  ['миллион','миллиона','миллионов'],
  ['миллиард','миллиарда','миллиардов']//,['трилион',...],[]
  ];
 
function m999(n,b,f){
  var s='';
  if (n!=0) {
    var t=s1[Math.floor(n/100)%10][2];
    if(t)s+=t+' ';
 
    var d=Math.floor(n/10)%10;

    t=s1[d][1];
    if(t instanceof Array){
      t=t[n%10];
      if(t)s+=t+' ';
    }else{
      if(t)s+=t+' ';
      t=s1[n%10][0];
      if(t instanceof Array)t=t[f==0 || f==2?1:0];
      if(t)s+=t;
    }
    return s+' '+plural(n,b[f])+(f>1?' ':'');
  }
  else {
    return s+''+plural(n,b[f])+(f>1?' ':'');
  }
}
 
  var i = Math.floor(n + 0.005),
    f = Math.floor(((n - i) * 100) + 0.5),
    s='';
  for (var j=1; i > 0.9999; i/=1000) {
    s=m999(Math.floor(i % 1000),b,j)+s;
    j++;
  }
  if(f>0)s=s+' '+m999(f,b,0)
  return s;
}

// ВОЗВРАЩАЕТ СУММУ ПРОПИСЬЮ

// ФУНКЦИЯ ФОРМАТИРОВАНИЯ ЧИСЕЛ 

function MyFormat(val){
  val = Math.round(val*10)/10;
  var sval = String(val);
  if((sval.indexOf(',')>=0)||(sval.indexOf('.')>=0)){
    return sval
  }
  else{
    sval = sval+'.0';
    return sval;
  }
}

// ФУНКЦИЯ ФОРМАТИРОВАНИЯ ЧИСЕЛ

// ФУНКЦИЯ ДЛЯ НАПИСАНИЯ СЕГОДНЯШНЕЙ ДАТЫ

function MyCurrentDate(mcd) {
    var gdt=new Date();
    var gmonth = gdt.getMonth()+1;
    if (gmonth<10) gmonth='0'+gmonth;
    var gday = gdt.getDate();
    if (gday<10) gday='0'+gday;
    var gyear = gdt.getFullYear();
    var gMyDate = gday + '.' + gmonth + '.' + gyear;    
    return gMyDate;
}

// ФУНКЦИЯ ДЛЯ НАПИСАНИЯ СЕГОДНЯШНЕЙ ДАТЫ

// ФУНКЦИЯ ДЛЯ ИНИЦИАЛОВ

function MyIn(val) {
  var rez,i1,i2;
  var posb,p;
  posb = 0;
  rez = val;
  p = rez.indexOf(' ',posb);
  i1 = rez.substring(p+1,p+2)+'.';
  posb = rez.indexOf(' ',posb)+1;
  i2 = rez.substring(rez.indexOf(' ',posb)+1,rez.indexOf(' ',posb)+2)+'.';
  rez = rez.substring(0,rez.indexOf(' ',0))+' '+i1+i2;
  return rez;
}

function MyInit(val) {
  var s; 
  s = val.substring(0,1) + '.';
  return s;
}

// ФУНКЦИЯ ДЛЯ ИНИЦИАЛОВ