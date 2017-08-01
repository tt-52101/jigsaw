import {AfterViewInit, Component, ElementRef, Renderer2} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";
import {DragInfo} from "jigsaw/directive/dragdrop/draggable";
import {CommonUtils} from "jigsaw/core/utils/common-utils";

/*
 * 换行
 * */
@Component({
    template: `
        <div class="option-box"
             jigsaw-draggable jigsaw-droppable
             (dragStart)="dragStartHandle($event)"
             (dragEnd)="dragEndHandle($event)"
             (dragEnter)="dragEnterHandle($event)"
             (dragOver)="dragOverHandle($event)"
             (dragLeave)="dragLeaveHandle($event)"
             (dropped)="droppedHandle($event)">
            <span class="fa fa-arrows-alt"></span>
        </div>`,
    styles: [`.option-box {
        color: #108ee9;
        cursor: move
    }`]
})
export class TableReplaceRow extends TableCellRenderer implements AfterViewInit {

    private allRows: any;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    resetSelectedRow() {
        for (var i = 0; i < this.allRows.length; ++i) {
            this._renderer.setStyle(this.allRows[i], 'border-top', '1px solid #d9d9d9')
        }
    }

    dragStartHandle(dragInfo: DragInfo) {
        console.log('drag start');
        dragInfo.event.dataTransfer.setData('text', this.row + '');
        dragInfo.event.dataTransfer.effectAllowed = 'link';
        dragInfo.event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'), 600, 10);
    }

    dragEndHandle(dragInfo: DragInfo) {
        console.log('drag end');
        this.resetSelectedRow();
    }

    dragEnterHandle(dragInfo: DragInfo) {
        console.log('drag enter');
        dragInfo.event.dataTransfer.dropEffect = 'link';
        this.resetSelectedRow();

        this._renderer.setStyle(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'),
            'border-top', '4px solid #d9d9d9')
    }

    dragOverHandle(dragInfo: DragInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'link';
    }

    dragLeaveHandle(dragInfo: DragInfo) {
        console.log('drag leave');
    }

    droppedHandle(dragInfo: DragInfo) {
        console.log('drop');
        const insertRowIndex = parseInt(dragInfo.event.dataTransfer.getData('text'));
        if (insertRowIndex >= 0 && this.row != insertRowIndex) {
            const thisRow = this.tableData.data[this.row];
            const insertRow = this.tableData.data.splice(insertRowIndex, 1)[0];
            const thisRowIndex = this.tableData.data.indexOf(thisRow);
            this.tableData.data.splice(thisRowIndex, 0, insertRow);
            this.tableData.refresh();
        }
    }

    ngAfterViewInit() {
        this.allRows = CommonUtils
            .getParentNodeBySelector(this._elementRef.nativeElement, 'table')
            .querySelectorAll('tr');
    }
}

/*
 * 删除
 * */
@Component({
    template: `
        <div class="option-box"
             jigsaw-draggable
             (dragStart)="dragStartHandle($event)">
            <span class="fa fa-trash"></span>
        </div>`,
    styles: [`.option-box {
        color: #108ee9;
        cursor: move
    }`]
})
export class TableDelRow extends TableCellRenderer {
    dragStartHandle(dragInfo: DragInfo) {
        console.log('drag start');
        dragInfo.event.dataTransfer.setData('text', this.row + '');
        dragInfo.event.dataTransfer.effectAllowed = 'copy';
        dragInfo.event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'), 600, 10);
    }
}
