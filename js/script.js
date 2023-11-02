import { dataContacts } from './data.js'

const { createApp } = Vue;
const obj = {
    data() {
        return {
            contacts: dataContacts,
            userIndex: 0,
            messageToSend: '',
            myTimeout: '',
        }
    },
    methods: {
        lastMessageParser(timevar) {
            timevar = timevar.substring(11, 16);
            return timevar
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
        },
        addMessage() {

            if (this.messageToSend !== '') {
                let message = {
                    date: this.dateConstructor(),
                    message: this.messageToSend,
                    status: 'sent'
                }

                this.contacts[this.userIndex].messages.push(message)
                //resetting message
                console.log(this.contacts[this.userIndex])
                this.messageToSend = '';
                this.myTimeout = setTimeout(() => { this.addResponse() }, 1000)
            }
        },
        addResponse() {
            clearTimeout(this.myTimeout);
            let message = {
                date: this.dateConstructor(),
                message: 'ok',
                status: 'response'
            }
            this.contacts[this.userIndex].messages.push(message)
            return
        },
        dateConstructor() {
            const date = new Date()

            let formattedDate = date.toLocaleDateString() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return formattedDate
        }
    },

    mounted() {

    }
}

createApp(obj).mount('#app')