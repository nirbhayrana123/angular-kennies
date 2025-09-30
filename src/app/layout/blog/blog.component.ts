import { Component, OnInit, Inject, PLATFORM_ID, TransferState, makeStateKey, StateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { WpService } from '../../services/wp.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { CanonicalService } from '../../services/canonical.service';


const POSTS_KEY: StateKey<any> = makeStateKey<any>('blog-posts');

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'] // ✅ Correct
})

export class BlogComponent implements OnInit {
  posts: any[] = [];
  acfData: any;
  bannerHeading = '';
  loading = true;

  page = 1;
  itemsPerPage = 10;
  isBrowser: boolean;
  isServer: boolean;

  constructor(
    private wp: WpService,
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private canonical: CanonicalService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
  }

  ngOnInit() {
    this.titleService.setTitle('Best Day Blog - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kenny Weiss&#039;s best day blog is packed with useful information to help you move out of the Worst Day Cycle and into better days ahead.',
    });

    // Check if data already exists in TransferState (client-side)
    const storedPosts = this.transferState.get(POSTS_KEY, null);
    if (storedPosts) {
      this.posts = storedPosts;
      this.loading = false;
    } else {
      // Fetch data from WP API
      this.wp.getAllPosts().subscribe((data: any) => {
        const formattedPosts = data.map((post: any) => ({
          ...post,
          courseImage: post.acf?.postimage || '',
          featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        }));
        this.posts = formattedPosts;
        this.loading = false;

        // Only set TransferState when running on server
        if (this.isServer) {
          this.transferState.set(POSTS_KEY, formattedPosts);
        }
      });
    }
     this.canonical.setCanonical('https://kennyweiss.net/best-day-blog/');
  }
}
