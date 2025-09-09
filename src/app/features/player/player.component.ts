import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  standalone: true,
})
export class PlayerComponent implements OnInit {
  playerLink = input.required<string>();
  safePlayerLink: SafeResourceUrl | null = null; // Allow null initially

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.safePlayerLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.playerLink());
  }
}