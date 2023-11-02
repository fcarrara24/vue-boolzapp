import { dataContacts } from './data.js'

const { createApp } = Vue;
const obj = {
    data() {
        return {
            contacts: dataContacts,
            userIndex: 0,
        }
    },
    methods: {
        lastMessageParser(time) {
            time = time.substring(11, 16);
            return time
        },
        selectUser(id) {

            this.userIndex = id - 1;

        },
        idToIndex(id) {
            for (let i = 0; i < this.contacts.length; i++) {
                if (id === this.contacts[i].id) {
                    return i
                }
            }
        },
        isSelected(id) {
            let index = this.idToIndex(id)
            if (this.userIndex === index) {
                return true
            }
            return false
        },
        returnStartEnd(variable) {
            if (variable === 'sent') {
                return 'end'
            } else {
                return 'start'
            }
        }
    },

    mounted() {

    }
}

createApp(obj).mount('#app')