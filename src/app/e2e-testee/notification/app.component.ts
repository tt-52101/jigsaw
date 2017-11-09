import {Component, Renderer2} from '@angular/core';
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawNotification,NotificationPosition} from "jigsaw/component/notification/notification";

@Component({
    templateUrl: './app.component.html'
})
export class NotificationDemo {
    constructor(public renderer: Renderer2,
                private popupService: PopupService) {
    }

    popNotification1() {
        JigsawNotification.show('21<b>31</b>21<i>sss</i>111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111113','Hello','question')
    }

    popNotification2() {
        JigsawNotification.show('21<b>31</b>21<i>sss</i>111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111113','我很长我很长我很长我很长我很长我很长我很长我很长我很长','question')
    }

    popNotification3() {
        JigsawNotification.show('21<b>31</b>21<i>sss</i>1111','我不会自动关闭','question', NotificationPosition.rightTop,0)
    }
}
