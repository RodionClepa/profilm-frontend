import { Component } from '@angular/core';
import { footerNavigation } from '../../shared/constants/footer.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  navigation = footerNavigation;
}
