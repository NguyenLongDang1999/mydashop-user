import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/google-fonts',
        '@nuxt/ui',
        '@nuxt/image',
        'nuxt-swiper',
        '@vee-validate/nuxt'
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
                file: resolve(__dirname, 'pages/user/profile.vue')
            }, {
                name: 'contact',
                path: '/lien-he',
                file: resolve(__dirname, 'pages/contact.vue')
            }, {
                name: 'product-checkout',
                path: '/thanh-toan',
                file: resolve(__dirname, 'pages/checkout.vue')
            })
        }
    },
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Bai Jamjuree': [400, 500, 600, 700]
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
        '/san-pham/**': { swr: true }
    },
    runtimeConfig: {
        public: {
            domainUrl: process.env.NUXT_PUBLIC_DOMAIN_URL,
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            previewCdn: process.env.NUXT_PUBLIC_BUNNY_CDN_URL
        }
    }
})
