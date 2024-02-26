import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/google-fonts',
        '@nuxt/ui',
        '@nuxt/image',
        'nuxt-swiper',
        '@vueuse/nuxt',
        'nuxt-anchorscroll',
        '@vee-validate/nuxt',
        '@stefanobartoletti/nuxt-social-share'
    ],
    hooks: {
        'pages:extend' (pages) {
            pages.push({
                name: 'categories',
                path: '/danh-muc/:slug',
                file: resolve(__dirname, 'pages/categories/[slug].vue')
            }, {
                name: 'all-categories',
                path: '/tat-ca-danh-muc',
                file: resolve(__dirname, 'pages/categories/index.vue')
            }, {
                name: 'shop',
                path: '/cua-hang',
                file: resolve(__dirname, 'pages/shop.vue')
            }, {
                name: 'product',
                path: '/san-pham/:slug',
                file: resolve(__dirname, 'pages/products/[slug].vue')
            }, {
                name: 'product-cart',
                path: '/gio-hang',
                file: resolve(__dirname, 'pages/cart.vue')
            }, {
                name: 'auth-login',
                path: '/dang-nhap',
                file: resolve(__dirname, 'pages/auth/login.vue')
            }, {
                name: 'auth-register',
                path: '/dang-ky',
                file: resolve(__dirname, 'pages/auth/register.vue')
            }, {
                name: 'user-profile',
                path: '/thong-tin-tai-khoan',
                file: resolve(__dirname, 'pages/user/index.vue')
            }, {
                name: 'user-profile-wishlist',
                path: '/thong-tin-tai-khoan/san-pham-yeu-thich',
                file: resolve(__dirname, 'pages/user/profile/wishlist.vue')
            }, {
                name: 'user-profile-manager',
                path: '/thong-tin-tai-khoan/quan-ly-tai-khoan',
                file: resolve(__dirname, 'pages/user/profile/manager.vue')
            }, {
                name: 'contact',
                path: '/lien-he',
                file: resolve(__dirname, 'pages/contact.vue')
            }, {
                name: 'product-checkout',
                path: '/thanh-toan',
                file: resolve(__dirname, 'pages/checkout/index.vue')
            }, {
                name: 'product-checkout-thanks',
                path: '/thanh-toan/cam-on',
                file: resolve(__dirname, 'pages/checkout/thanks.vue')
            })
        }
    },
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Quicksand': [400, 500, 600, 700]
        }
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    routeRules: {
        '/': { prerender: true },
        '/gio-hang': { ssr: false },
        '/thanh-toan/**': { ssr: false },
        '/thong-tin-tai-khoan/**': { ssr: false }
    },
    runtimeConfig: {
        public: {
            domainUrl: process.env.NUXT_PUBLIC_DOMAIN_URL,
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            previewCdn: process.env.NUXT_PUBLIC_BUNNY_CDN_URL
        }
    }
})
