export default defineAppConfig({
    ui: {
        primary: 'blue',
        notification: {
            wrapper: 'w-64 pointer-events-auto fixed top-3 right-3'
        },
        card: {
            ring: 'hover:ring-primary'
        },
        formGroup: {
            label: {
                base: 'capitalize'
            }
        },
        accordion: {
            item: {
                padding: 'p-0'
            }
        },
        modal: {
            container: 'items-center'
        }
    }
})
