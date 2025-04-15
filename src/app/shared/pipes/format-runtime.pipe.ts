import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRuntime'
})
export class FormatRuntimePipe implements PipeTransform {

  transform(minutes: number): string {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

}
