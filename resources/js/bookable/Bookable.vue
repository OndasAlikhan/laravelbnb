<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr />
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>Loading...</div>
                </div>
            </div>
            <review-list></review-list>

        </div>
        <div class="col-md-4 pb-4">
            <availablitiy></availablitiy>
        </div>
        <div>

        </div>
        
    </div>
</template>

<script>
import Availablitiy from './Availability'
import ReviewList from './ReviewList'
export default {
    components: {
        Availablitiy,
        ReviewList
    },
    data () {
        return {
            bookable: null,
            loading: false
        }
    },
    created () {
        console.log(this.$route.params.id)
        this.loading = true
        axios
            .get(`/api/bookables/${this.$route.params.id}`)
            .then(res => {
                this.bookable = res.data.data
                this.loading = false
            })
    }
}
</script>