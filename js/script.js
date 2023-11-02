import { dataContacts } from './data.js'

const { createApp } = Vue;
const obj = {
    data() {
        return {
            contacts: dataContacts,
        }
    },
    methods: {
        lastMessageGetter(id) {
            //getting real id
            for (let i = 0; i < this.contacts.length; i++) {
                if (id === this.contacts[i].id) {
                    let time = this.contacts[i].messages[this.contacts[i].messages.length - 1].date;
                    time = time.substring(11, 16)

                    return time
                }
            }

        },

    },

    mounted() {

    }
}

createApp(obj).mount('#app')