import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-admin-retry-cancel-select-state',
	templateUrl: './admin-retry-cancel-select-state.component.html',
	styleUrls: ['./admin-retry-cancel-select-state.component.scss']
})
export class AdminRetryCancelSelectStateComponent implements OnInit {

	@Output()
	public change = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onChange(event){
		this.change.emit(event.value);
	}
}
