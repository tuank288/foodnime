import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() title!: string;

  @Input() margin? = '0 0 0 0';

  @Input() fontSize? = '1.5rem';

  @Input() padding? = '1rem 0 1rem 1rem';

}
