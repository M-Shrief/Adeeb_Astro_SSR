export const languages = {
    en: 'English',
    ar: 'العربية',
  };
  
export const defaultLang = 'ar';

export const ui = {
    ar: {
        nav: {
            logo: "أديب",
            ordering: "طلباتك",
            history: "مراجعة الطلبات",
            about: "قصتنا",
            logout: "تسجيل الخروج",
            partnership: "كن شريكاً"
        },
        // home: {
        // },
        // about: {
        // },
    },
    en: {
        // Navbar component
        nav: {
            logo: "Adeeb",
            about: "About",
            ordering: "Ordering",
            history: "History",
            about: "About",
            logout: "Logout",
            partnership: "Partnership"
        },
        // // Home page
        // home: {
        // },
        // // About page
        // about: {
        // }
    },
} as const;