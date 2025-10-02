import { Routes, UrlSegment } from '@angular/router';

// Blog slug matcher
export function blogSlugMatcher(segments: UrlSegment[]) {
  if (segments.length === 1) {
    const slug = segments[0].path.toLowerCase();

    const reservedRoutes = [
      '', 'page-not-found', 'about-kenny-weiss', 'books-by-kenny-weiss',
      'courses', 'resources', 'podcast', 'feelings-wheel',
      'worst-day-cycle', 'thank-you', 'contact',
      'book-a-session-with-kenny-weiss', 'coaching',
      'healing-services'
    ];

    // reservedRoutes me hai to blog ke liye consume mat karo
    if (reservedRoutes.includes(slug)) {
      return null; 
    }

    // ✅ agar slug sirf 1 word hai aur reserved nahi hai tabhi blog treat karo
    return { consumed: segments, posParams: { slug: segments[0] } };
  }

  // ✅ aur koi case ho → NotFoundComponent
  return null;
}


// Coaching slug matcher
export function coachingSlugMatcher(segments: UrlSegment[]) {
  if (segments.length === 2 && segments[0].path.toLowerCase() === 'coaching') {
    return {
      consumed: segments, 
      posParams: { 
        parent: segments[0], 
        slug: segments[1]   
      }
    };
  }
  return null;
}


// Courses slug matcher 
export function coursesSlugMatcher(segments: UrlSegment[]) {
  if (segments.length === 2 && segments[0].path.toLowerCase() === 'courses') {
    return {
      consumed: segments,
      posParams: { parent: segments[0], slug: segments[1] }
    };
  }
  return null; // agar 2 segments nahi → 404
}

export function wdcSlugMatcher(segments: UrlSegment[]) {
  if (segments.length === 2 && segments[0].path.toLowerCase() === 'worst-day-cycle') {
    return {
      consumed: segments,
      posParams: { parent: segments[0], slug: segments[1] }
    };
  }
  return null;
}


export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/home/home.component').then(m => m.HomeComponent) },
  { path: 'best-day-blog', loadComponent: () => import('./layout/blog/blog.component').then(m => m.BlogComponent) },
  { path: 'about-kenny-weiss', loadComponent: () => import('./layout/meet-kenny/meet-kenny.component').then(m => m.MeetKennyComponent) },
  { path: 'books-by-kenny-weiss', loadComponent: () => import('./layout/books/books.component').then(m => m.BooksComponent) },
  { path: 'courses', loadComponent: () => import('./layout/courses/courses.component').then(m => m.CoursesComponent) },
  { path: 'resources', loadComponent: () => import('./layout/resources/resources.component').then(m => m.ResourcesComponent) },
  { path: 'podcast', loadComponent: () => import('./layout/podcast/podcast.component').then(m => m.PodcastComponent) },
  { path: 'feelings-wheel', loadComponent: () => import('./layout/feelings-wheel/feelings-wheel.component').then(m => m.FeelingsWheelComponent) },
  { path: 'worst-day-cycle', loadComponent: () => import('./layout/worst-day-cycle/worst-day-cycle.component').then(m => m.WorstDayCycleComponent) },
  { path: 'thank-you', loadComponent: () => import('./layout/thank-you/thank-you.component').then(m => m.ThankYouComponent) },
  { path: 'contact', loadComponent: () => import('./layout/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'book-a-session-with-kenny-weiss', loadComponent: () => import('./layout/book-session/book-session.component').then(m => m.BookSessionComponent) },
  { path: 'healing-services', loadComponent: () => import('./layout/healing-services/healing-services.component').then(m => m.HealingServicesComponent) },
  // { matcher: coachingSlugMatcher, loadComponent: () => import('./layout/healing-services/services-details/childhood-trauma.component').then(m => m.ChildhoodTraumaComponent) },
  { path: 'coaching/:slug', loadComponent: () => import('./layout/healing-services/services-details/childhood-trauma.component').then(m => m.ChildhoodTraumaComponent) },
  { matcher: coursesSlugMatcher, loadComponent: () => import('./layout/courses/courses-details/courses-details.component').then(m => m.CoursesDetailsComponent) },
  { matcher: wdcSlugMatcher, loadComponent: () => import('./layout/worst-day-cycle/wdc-details/wdc-details.component').then(m => m.WdcDetailsComponent) },
  { matcher: blogSlugMatcher, loadComponent: () => import('./layout/blog/blog-details/blog-details.component').then(m => m.BlogDetailsComponent) },
  { path: '**', loadComponent: () => import('./layout/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
