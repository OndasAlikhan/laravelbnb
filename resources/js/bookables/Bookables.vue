<template>
    <div>
        Row:{{ rows }}
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row'+row" >
                {{row}}
                <div class="col" 
                    v-for="(bookable, column) in bookablesInRow(row)" 
                    :key="'row' + row + column">
                    <bookable-list-item 
                        :key="'listitem' + row + column"
                        :item-title="bookable.title"
                        :item-content="bookable.content"
                        :price="bookable.price"
                    ></bookable-list-item>
                </div>
                <div class="col" v-for="p in placeholdersInRow(row)" :key="'p'+row+p"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import BookableListItem from './BookableListItem'
export default {
    components: {
        BookableListItem
    },
    data() {
        return {
            bookables: [],
            loading: false,
            columns: 3
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns)
        },
        placeholdersInRow(row) {
            return this.columns - this.bookablesInRow(row).length;
        }
    },
    computed: {
        rows() {
            return this.bookables === null 
                ? 0
                : Math.ceil(this.bookables.length / this.columns)
             
        }
    },
    created() {
        console.log('Bookables created')
        console.log(this.bookable1)
        console.log(this.bookable2)

        this.loading = true
        setTimeout(() => {
            this.bookables = [
                {
                    price: 1500,
                    title: "Cheap villaaaaa",
                    content: "A very cheap villa"
                },
                {
                    price: 12323,
                    title: "Cheap villa 2",
                    content: 'A very chea pvilla 2'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
                {
                    price: 490,
                    title: 'Villa 3',
                    content: 'asdasdasdasdsad'
                },
            ]
            this.loading = false
        }, 2000)
    }
}
</script>