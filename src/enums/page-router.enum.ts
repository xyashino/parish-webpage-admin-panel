export const enum PageRouter {
    Main = "/",
    Everything = "*",
    Login = "/login/",
    Contact = "/contact/",
    Announcement = "/announcements/",
    OneAnnouncement = "/announcements/:id/",
    AnnouncementCreate = "/announcements/create/",
    AnnouncementPreview = "/announcements/:id/preview/",
    AnnouncementEdit = "/announcements/edit/",

    Intentions = "/intentions/",
    IntentionsEdit = "/intentions/edit/",
    IntentionsPreview = "/intentions/preview/",

    Users = "/users/",
    UserCurrent = "/users/current/",
    Article = "/articles/",
    ArticlePreview = "/articles/preview/",
    ArticleEdit = "/article/edit/",
    ArticleCreate = "/article/create/",

    Albums= '/albums/',
    OneAlbum= '/albums/:id',
    AlbumTypes= '/albums/types/',
    Gallery = "/gallery/",
    GalleryTypes =  "/gallery/types/",
    GalleryAlbums = "/gallery/albums/",
}
