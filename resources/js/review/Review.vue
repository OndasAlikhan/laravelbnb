<template>
    <div >
        <div class="row" v-if="error">
            Unknown error has occured, please try later
        </div>
        <success v-if="success">
            You've left a review, thank you!
        </success>
        <fatal-error v-if="error"></fatal-error>
        <div v-if="!success && !error" class="row">
            <div :class="[{'col-md-4': twoColumns}, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">Loading...</div>
                        <div v-if="hasBooking">
                            <p>
                                Stayed at 
                                <router-link :to="{name: 'bookable', params: { id: booking.bookable.id }}">{{ booking.bookable.title }}</router-link>
                            </p>
                            <p>
                                From {{ booking.from }} to {{ booking.to }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'col-md-8': twoColumns}, {'col-md-12': oneColumn}]">
                <div v-if="!loading">
                    <div v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking!</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                            <star-rating 
                                class="fa-3x" 
                                v-model="review.rating"
                            ></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted">Describe your experience with</label>
                            <textarea 
                                name="content" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                class='form-control' 
                                v-model="review.content"
                                :class="[{'is-invalid': errorFor('content')}]"
                            ></textarea>
                            <v-errors :errors="errorFor('content')"></v-errors>
                            <!-- <div 
                                class="invalid-feedback" 
                                v-for="(error, index) in errorFor('content')" 
                                :key="'content' + index"
                            >{{ error }}</div> -->

                            <button 
                                class="btn btn-lg btn-primary btn-block mt-4" 
                                @click.prevent="submit" 
                                :disabled="sending"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Loading...
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { is404, is422 } from '../shared/utils/response'
import validationErrors from './../shared/mixins/validationErrors'

export default {
    mixins: [validationErrors],
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
            // errors: null,
            sending: false,
            success: false
        }
    },
    methods: {
        onRatingChanged(rating) {
            console.log(rating)
        }
    },
    async created() {
        this.review.id = this.$route.params.id
        this.loading = true

        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data.data
        } catch (err) {
            if (is404(err)) {
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data.data
                } catch (err) {
                    this.error = !is404(err)
                }
            } else {
                this.error = true
            }
        } finally {
            this.loading = false
        }
        // // 1. If review already exists (in reviews table by id)
        // axios.get(`/api/reviews/${this.review.id}`)
        //     .then(res => this.existingReview = res.data.data)
        //     .catch(err => {
        //         if (is404(err)) {
        // // 2. Fetch a booking by a review key

        //             return axios.get(`/api/booking-by-review/${this.review.id}`)
        //                 .then(res => {
        //                     this.booking = res.data.data
        //                 })
        //                 .catch(err => {
        //                     this.error = !is404(err)
        //                 })
        //         }

        //         this.error = true
        //     })
        //     .then((some) => {
        //         console.log(some)
        //         this.loading = false
        //     })
        
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking
        },
        hasReview() {
            return this.existingReview !== null
        },
        hasBooking() {
            return this.booking !== null
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed
        },
        twoColumns() {
            return this.loading || !this.alreadyReviewed
        }
    },
    methods: {
        submit() {
            // 3. Store the review
            this.errors = null
            this.sending = true
            this.success = false

            axios.post('/api/reviews', this.review)
                .then(res => {
                    this.success = 201 === res.status
                })
                .catch(err => {
                    if (is422(err)) {
                        const errors = err.response.data.errors

                        if (errors['content'] && 1 === _.size(errors)) {
                            this.errors = errors
                            return
                        }

                        return
                    }

                    this.error = true
                })
                .then(() => (this.sending = false))
        },
        // errorFor(field) {
        //     return null !== this.errors && this.errors[field] 
        //         ? this.errors[field] 
        //         : null
        // }
    }
}
</script>