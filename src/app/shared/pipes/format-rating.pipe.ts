import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRating'
})
export class FormatRatingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
