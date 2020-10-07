<template>
    <div class="card w-100">
        <div class="card-body">
            <router-link :to="{name: 'bookable', params: {id: item.id}}">
                <h5 class="card-tite">{{ item.title }}</h5>
            </router-link>
            <p class="card-text">{{ item.description }} {{ item.id }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    mounted() {
    }
}
</script>