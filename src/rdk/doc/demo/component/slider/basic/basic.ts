/**
 * Created by 10177553 on 2017/4/13.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <h4>1. 基本滑动条,滑动事件变化. </h4>
        <rdk-switch [(checked)]="disabled" size="small"></rdk-switch>
        <rdk-slider [value]="value1" [disabled]="disabled" (change)="sliderChange($event)"></rdk-slider>
        <hr>
        <br>
        <h4>2. 设置了min和max的滑动条</h4>
        <rdk-slider [value]="value" [min]="min" [max]="max" (change)="sliderChange2($event)"></rdk-slider> <span>取值: {{value2}}</span>
        <hr>
        <br>
        <h4>3. 改变step</h4>
        <rdk-slider [value]="valueStep" min="0" max="2" step="0.01" (change)="sliderChange3($event)"></rdk-slider> <span>取值: {{value3}}</span>
        
        <hr>
        <br>
        <h4>4. 双触点滑动条(TODO)</h4>
        <rdk-slider [(value)]="rangeValue" range="true"></rdk-slider>
        
        <hr>
        <br>
        <h4>5. mark 节点.</h4>
        <rdk-slider [marks]="marks" value="50"></rdk-slider>
    `,
    styleUrls:['./basic.scss']
})
export class RdkSliderDemoBasic implements OnInit {
    constructor() { }

    value1: number = 30;

    value: number = 10;
    disabled: boolean = false;

    min = 1;
    max = 20;

    valueStep = 1;

    rangeValue = [30, 60]

    marks = [{value: 20, label: '20oC'},
    {value: 40, label: '40oC'},
    {value: 60, label: '60oC', class: "markStyle-3"}]


    sliderChange(value) {
        console.info("当前值: " + value);
    }

    value2
    private sliderChange2(value) {
        this.value2 = value;
    }

    value3
    public sliderChange3(value) {
        this.value3 = value;
    }
    ngOnInit() { }

}
