import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./layout/blog/blog.component').then((m) => m.BlogComponent),
  },

   {
  path: 'meet-kenny',
  loadComponent: () =>
    import('./layout/meet-kenny/meet-kenny.component').then(m => m.MeetKennyComponent)
}
,

   {
  path: 'books',
  loadComponent: () =>
    import('./layout/books/books.component').then(m => m.BooksComponent)
},


 {
  path: 'courses',
  loadComponent: () =>
    import('./layout/courses/courses.component').then(m => m.CoursesComponent)
},

 {
  path: 'resources',
  loadComponent: () =>
    import('./layout/resources/resources.component').then(m => m.ResourcesComponent)
},

 {
  path: 'podcast',
  loadComponent: () =>
    import('./layout/podcast/podcast.component').then(m => m.PodcastComponent)
},

{
  path: 'feelings-wheel',
  loadComponent: () =>
    import('./layout/feelings-wheel/feelings-wheel.component').then(m => m.FeelingsWheelComponent)
},

{
  path: 'worst-day-cycle',
  loadComponent: () =>
    import('./layout/worst-day-cycle/worst-day-cycle.component').then(m => m.WorstDayCycleComponent)
},

{
  path: 'contact',
  loadComponent: () =>
    import('./layout/contact/contact.component').then(m => m.ContactComponent)
},

{
  path: 'book-session',
  loadComponent: () =>
    import('./layout/book-session/book-session.component').then(m => m.BookSessionComponent)
},


{
  path: 'post/:id',
  loadComponent: () =>
    import('./layout/blog/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
} ,

 {
  path: 'childhood-trauma',
  loadComponent: () =>
    import('./layout/childhood-trauma/childhood-trauma.component').then(m => m.ChildhoodTraumaComponent)
},
{
  path: 'courses-details',
  loadComponent: () =>
    import('./layout/courses-details/courses-details/courses-details.component').then(m => m.CoursesDetailsComponent)
},



];
