// src/app/posts/posts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpService } from '../../services/wp.service';
import { RouterModule } from '@angular/router'; //
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  posts: any[] = [];

    
  
  constructor(
    private wp: WpService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle('Best Day Blog - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kenny Weiss&#039;s best day blog is packed with useful information to help you move out of the Worst Day Cycle and into better days ahead.',
    });
  }

  ngOnInit() {
    this.wp.getPosts().subscribe((data: any) => {
      this.posts = data; 
    });
   
  }
}
