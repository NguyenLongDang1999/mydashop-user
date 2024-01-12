export default defineNuxtRouteMiddleware(to => {
    const path = '/dang-nhap'
    const isLoggedIn = !!(getUserData() && getToken())

    if (!isLoggedIn && to.path !== path) {
        return navigateTo({
            path,
            query: { to: to.name !== 'index' ? to.fullPath : undefined }
        })
    }

    if (isLoggedIn && to.path === path) {
        return navigateTo('/thong-tin-tai-khoan')
    }
})
