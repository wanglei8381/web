var xlsx = require('node-xlsx');

var obj = xlsx.parse('a.xlsx');
console.log(JSON.stringify(obj));