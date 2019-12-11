import { Pipe, PipeTransform } from '@angular/core';
import { Watch } from '../interface';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(watchList: Watch[], searchStr: string): Watch[] {
        if (watchList.length === 0 || searchStr === '') {
            return watchList;
        } else {
            return watchList.filter(watch => watch.title.toLowerCase().indexOf(searchStr) !== -1 
            || watch.title.toUpperCase().indexOf(searchStr) !== -1
             || watch.model.toLowerCase().indexOf(searchStr) !== -1 
             || watch.model.toUpperCase().indexOf(searchStr) !== -1
             || watch.title.indexOf(searchStr) !== -1
             || watch.model.indexOf(searchStr) !== -1)
        }
    }
} 