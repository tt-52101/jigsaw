import {Component} from "@angular/core";
import {IDynamicInstantiatable} from "jigsaw/component/common";

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['./tabContent.css']
})
export class TabContentComponent{
    initData: any;
}

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['./tabContent.css']
})
export class TabContentDefine implements IDynamicInstantiatable {
    initData: Object = 'zte'
}
