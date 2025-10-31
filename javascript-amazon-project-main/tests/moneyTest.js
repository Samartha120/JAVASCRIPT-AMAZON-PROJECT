import{formatCurrency} from '../scripts/utils/money.js';

if (formatCurrency(12345) === '123.45'){
  console.log('Test passed');
}else{
  console.log('Test failed');
}

if(formatCurrency(0) === '0.00'){
  console.log('Test passed');
}else{
  console.log('Test failed');
}