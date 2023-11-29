<script setup lang="ts">

// ** Meta SEO
useHead({
    title: 'Trang chủ'
})
</script>

<template>
    <main>
        <HomePageCarousel />

        <UContainer>
            <HomePageCategory />
            <HomePageFlashSale />
            <HomePageProduct />
        </UContainer>
    </main>
</template>
