import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteration',
})
export class FilterationPipe implements PipeTransform {
  transform(arr: any[], searchTerm: string): any[] {
    return arr.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    //item {} object atl3 mno title bs
  }
}
