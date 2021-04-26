import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Video from './pages/Video';

export const getRoutes = () => [
  {
    path: `/video-:slug-:id`,
    component: Video,
    key: 'video'
  },
  {
    path: `/playlist-:slug-:id`,
    component: Playlist,
    key: 'playlist'
  },
  {
    path: `/`,
    component: Home,
    key: 'home'
  }
];
