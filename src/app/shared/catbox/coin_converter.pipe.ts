import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'satoshi'})
export class SatoshiPipe implements PipeTransform {
  transform(satoshi: number): number {

   	if (isNaN(satoshi)) return NaN;
    if (satoshi === 0) return 0;
    let satoshi_str:string = parseInt(satoshi.toString(), 10).toString();
    let sign:any = (satoshi_str.indexOf('-') === 0) ? "-" : "";
    satoshi_str = satoshi_str.replace(/^-/, '');
    let lengthTester = (/[0-9]{8}/);
    while (!lengthTester.test(satoshi_str)) {
        satoshi_str = "0" + satoshi_str;
    }
    satoshi_str = satoshi_str.slice(0, satoshi_str.length - 8) + "." + satoshi_str.slice(satoshi_str.length - 8);
    if (satoshi_str[0] === '.') satoshi_str = '0' + satoshi_str;
    return parseFloat(sign + satoshi_str);
  }
}

@Pipe({name: 'droplets'})
export class DropletsPipe implements PipeTransform {
  transform(droplets: number): number {
   	if (isNaN(droplets)) return NaN;
    if (droplets === 0) return 0;
    let sky_calc:number = droplets / Math.pow(10, 6);
    return parseFloat(sky_calc.toString());
  }
}