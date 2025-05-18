import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-success',
  imports: [],
  templateUrl: './auth-success.component.html',
  styleUrl: './auth-success.component.scss'
})
export class AuthSuccessComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {

      const params = new URLSearchParams(window.location.search);
      const uuid = params.get('uuid');

      if (uuid && window.opener) {
        window.opener.postMessage(
          { type: 'uuid_exchange', uuid },
          'http://localhost:4200'
        );
        window.close();
      }
    }
  }

}
