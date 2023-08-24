import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string | null, format: string): string {
    if (value) {
      return this.datePipe.transform(value, format) || '';
    } else {
      return 'in corso';
    }
  }

  transformTimeElapsed(startDate: string | null, endDate: string | null): string {
    if (!startDate) {
      return '';
    }

    const startDateObj = new Date(startDate);
    const endDateObj = endDate ? new Date(endDate) : new Date();

    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    const months = Math.floor(timeDiff / (1000 * 3600 * 24 * 30));
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (years > 0) {
      const remainderMonths = months % 12;
      return `${years} ${years === 1 ? 'anno' : 'anni'} ${remainderMonths} ${remainderMonths === 1 ? 'mese' : 'mesi'}`;
    } else if (months > 0) {
      const remainderDays = days % 30;
      return `${months} ${months === 1 ? 'mese' : 'mesi'} ${remainderDays} ${remainderDays === 1 ? 'giorno' : 'giorni'}`;
    } else {
      return `${days} ${days === 1 ? 'giorno' : 'giorni'}`;
    }
  }
}


