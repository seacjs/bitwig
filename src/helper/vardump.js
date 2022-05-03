function println(data) {
   console.log(data);
 }
 const host = {
   println: println
 }
 
 window.host = host;
 
 function vardump(data, level = 0, name = '') {
   if(level === 0) {
      host.println('Dump '+name+' start');
   }
   
   level++;
    switch (typeof data) {
       case 'object': {
         if (Array.isArray(data, level)) {
           vardumpArray(data, level);
         } else {
           vardumpObject(data, level);
         }
       }
       case 'string': {
         vardumpString(data, level);
       }
       case 'number': {
        vardumpNumber(data, level);
       }
       default: {
         vardumpString(data, level);
       }
     }
   
   if(level === 0) {
      host.println('Dump '+name+' end');
   }
 }
 
 function vardumpArray(data, level = 0) {
   for(var i = 0; i < data.length; i++) {
     vardump(data[i], level);
   }
 }
 
 function vardumpObject(data, level = 0) {
    for(var item in data) {
      vardump(data[item], level);
    }
    host.println(data);
 }
 
 function vardumpString(data, level = 0) {
    host.println(tab(level) + data);
 }
 
 function vardumpNumber(data, level = 0) {
    host.println(tab(level) + data);
 }

 function tab(count) {
   var tab = '';
   for(var i = 0; i < count; i++ ) {
     tab += '  ';
   }
   return tab;
 }

// -- -- -- - - -- - - 

 vardump({test: [1,2,'3123']})