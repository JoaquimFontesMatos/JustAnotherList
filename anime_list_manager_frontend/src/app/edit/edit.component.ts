import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  Params,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  animeId: any;
  anime: any;

  animeForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    episode: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.animeId = this.route.snapshot.paramMap.get('id');

    this.anime = this.apiService.getAnime(this.animeId).subscribe({
      next: (data) => {
        this.anime = data;
        this.animeForm.patchValue({
          name: this.anime.name,
          status: this.anime.status,
          episode: this.anime.episode
        });
      },
      error: (err) => {
        console.error('Error fetching anime:', err);
      }
    });
  }

  updateAnime() {
    console.log(this.animeForm.value);
    this.apiService
      .updateAnime(this.animeId, this.animeForm.value)
      .subscribe(() => {});
    console.log('Anime Updated');

    this.router.navigate(['/']);
  }
}
