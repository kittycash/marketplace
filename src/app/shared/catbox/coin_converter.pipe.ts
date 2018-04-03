import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'satoshi'})
export class SatoshiPipe implements PipeTransform {
  transform(satoshi: number): number {

   	if (isNaN(satoshi)) return NaN;
    if (satoshi === 0) return 0;
    var str = parseInt(satoshi, 10).toString();
    var sign = (str.indexOf('-') === 0) ? "-" : "";
    str = str.replace(/^-/, '');
    var lengthTester = (/[0-9]{8}/);
    while (!lengthTester.test(str)) {
        str = "0" + str;
    }
    str = str.slice(0, str.length - 8) + "." + str.slice(str.length - 8);
    if (str[0] === '.') str = '0' + str;
    return parseFloat(sign + str);
  }
}

@Pipe({name: 'droplets'})
export class DropletsPipe implements PipeTransform {
  transform(droplets: number): number {
   	if (isNaN(droplets)) return NaN;
    if (droplets === 0) return 0;
    return parseFloat(droplets / Math.pow(10, 6));
  }
}