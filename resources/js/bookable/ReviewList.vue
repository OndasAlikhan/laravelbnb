<template>
    <div style="padding: 1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">Review List</h6>

        <!-- <star-rating :rating="4.0"></star-rating>
        <star-rating :rating="4.4"></star-rating>
        <star-rating :rating="4.4"></star-rating>
        <star-rating :rating="4.6"></star-rating>
        <star-rating :rating="0.9"></star-rating>
        <star-rating :rating="3.2"></star-rating>
        <star-rating :rating="3.5"></star-rating>
        <star-rating :rating="3.7"></star-rating> -->

        <div v-if="loading">Loading...</div>
        <div v-else>
            <div class="border-bottom d-none d-md-block" v-for="(review, index) in reviews" :key="'review' + index">
                <div class="row pt-4">
                    <div class="col-md-6">Alikhan Ondas</div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-rating :value="review.rating" class="fa-lg"></star-rating>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        {{ review.created_at | fromNow }}
                    </div>
                </div>
                <div class="row pt-4 pb-4">
                    <div class="col-md-12">
                        {{ review.content }}
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script>
// import moment from 'moment'

export default {
    data() {
        return {
            loading: false,
            reviews: null
        }
    },
    props: {
        bookableId: [String, Number]
    },
    created() {
        this.loading = true
        axios.get(`/api/bookables/${this.bookableId}/reviews`)
            .then(res => {
                this.reviews = res.data.data
                this.loading = false
            })
    },
    // filters: {
    //     fromNow(value) {
    //         return moment(value).fromNow()
    //     }
    // }
}
</script>