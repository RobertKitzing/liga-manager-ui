import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'roundpipe'
})

export class RoundPipe implements PipeTransform {

	transform(value: any, ...args: any[]): any {
		return value;
	}
}
