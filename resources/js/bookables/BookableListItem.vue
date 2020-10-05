<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-tite">{{ itemTitle }}</h5>
            <p class="card-text">{{ itemTitle }} {{ price }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        itemTitle: String,
        itemContent: String,
        price: Number,
    },
    mounted() {
    }
}
</script>