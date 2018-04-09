import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-countdown',
  template: '{{ displayTime }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnDestroy {
  private _time: number;
  private _timing: number = 1000;
  private _interval: any;

  @Input()
  public set time(value: string | number) {
    this._time = parseInt(value as string, 10);
    this._startTimer();
  }

  @Input()
  public set timing(value: string | number) {
    this._timing = parseInt(value as string, 10);
    this._startTimer();
  }

  @Input()
  public format: string = '{dd} days {hh} hours {mm} minutes {ss} seconds';

  public get delta() {
    let date = new Date();
    return Math.max(0, Math.floor((this._time - date.getTime()) / 1000));
  }

  public get displayTime() {
    let days:any, hours:any, minutes:any, seconds:any, delta:any = this.delta, time:any = this.format;

    days = Math.floor(delta / 86400);
    delta -= days * 86400;
    hours = Math.floor(delta  / 3600) % 24;
    delta -= hours * 3600;
    minutes = Math.floor(delta  / 60) % 60;
    delta -= minutes * 60;
    seconds = delta % 60;

    time = time.replace('{dd}', days);
    time = time.replace('{hh}', this.pad(hours, 2));
    time = time.replace('{mm}', this.pad(minutes, 2));
    time = time.replace('{ss}', this.pad(seconds, 2));

    return time;
  }

  private pad(num:any, size:any) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngOnDestroy() {
    this._stopTimer();
  }

  private _startTimer() {
    if(this.delta <= 0) return;
    this._stopTimer();
    this._interval = setInterval(() => {
      this._changeDetector.detectChanges();
      if(this.delta <= 0) {
        this._stopTimer();
      }
    }, this._timing);
  }

  private _stopTimer() {
    clearInterval(this._interval);
    this._interval = undefined;
  }
}