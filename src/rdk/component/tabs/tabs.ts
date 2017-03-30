/**
 * Created by 10177553 on 2017/3/29.
 */
import {
    Component, OnInit, ContentChildren, QueryList, Directive, Input, ElementRef, ViewChildren,
    AfterViewInit, Output, EventEmitter
} from '@angular/core';
import {TabPane} from "./tab-pane";
import {RdkLabel} from "./tab-label";
import {addExportToModule} from "@angular/cli/lib/ast-tools";

@Component({
    selector: 'rdk-tabs',
    templateUrl: 'tabs.html',
    styleUrls: ['./tabs.scss']
})
export class RdkTabs implements AfterViewInit {
    @ContentChildren(TabPane) _tabPanes: QueryList<TabPane>;

    @ViewChildren(RdkLabel) _tabLabel: QueryList<RdkLabel>;

    @Output()
    public selectChange = new EventEmitter<TabPane>();

    // tab页点击
    private _tabClick(index) {
        if(this.selectedIndex === index) return;

        // 设置当前的selectedIndex
        this._setSelectIndex(index);

        // 发出事件, 返回相应
        this.selectChange.emit(this._getTabPaneByIndex(index));
    }

    public selectedIndex: number = 0;

    private _setSelectIndex(index):void {
        this.selectedIndex = index;

        this._setInkBarStyle(index);
    }

    _inkBarStyle: {}

    private _setInkBarStyle(index: number) {
        let labelPos = this._getLabelOffsetByKey(index);
        this._inkBarStyle = {
            'display': 'block',
            'transform': 'translate3d('+ labelPos.offSet +'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        }
    }

    // 将有纵向切换的封装.
    private _getLabelOffsetByKey(key: number): any {
        // todo 非法key的校验
        let currentLabel = this._tabLabel.find(item => {
            if (item.key == key) return true
            else
                return false;
        });

        // 非法的 key// 有可能getTop 等扩展Tab页时再重构.
        return {
            offSet: currentLabel.getOffsetLeft(),
            width: currentLabel.getOffsetWidth()
        }
    }

    private _getTabPaneByIndex(key):TabPane {

        let tabPane = this._tabPanes.find((item,index) => {
            if(index === key) return true;
            else
                return false;
        })

        return tabPane;
    }

    ngAfterViewInit() {
        // 默认选中的值.
        this._setSelectIndex(0);

        this._tabPanes.forEach(item => {
            console.info(item.icon);
        })
    }

}
