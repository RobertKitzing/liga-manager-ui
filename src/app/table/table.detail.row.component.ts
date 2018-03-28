import { Ranking, Ranking_position } from './../api/openapi';
import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'app-inline-message',
    templateUrl: 'table.detail.row.component.html',
    styles: [`
        :host {
        display: block;
        padding: 24px;
        background: rgba(0,0,0,0.03);
        }
    `]
})
export class DetailRowComponent implements OnInit {
    @Input() ranking: Ranking_position;
    ngOnInit() {
        
    }
}
