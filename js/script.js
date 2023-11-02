import { dataContacts } from './data.js'

const { createApp } = Vue;
const obj = {
    data() {
        return {
            contacts: dataContacts,
            userIndex: 0,
            messageToSend: '',
            myTimeout: '',
            chatsearchinput: '',
            chatParsed: '',
            noplaceholder: true
        }
    },
    methods: {
        lastMessageParser(timevar) {
            if (timevar !== undefined) {
                timevar = timevar.substring(11, 16);
                return timevar
            }

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
                if (!this.noplaceholder) {
                    this.noplaceholder = true;
                    this.removeMessage(0)
                }

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
        },
        searchChat() {

            this.contacts.forEach((element, index) => {
                if (element.name.toLowerCase().includes(this.chatsearchinput.toLowerCase())) {
                    console.log('ciao');
                    this.contacts[index].visible = true
                } else {
                    console.log('addio');

                    this.contacts[index].visible = false
                }
            });
            console.log(this.contacts)



        },
        removeMessage(index) {
            //prevent problems with void chat
            if (this.contacts[this.userIndex].messages.length === 1) {
                this.contacts[this.userIndex].messages.push({
                    date: this.contacts[this.userIndex].messages[0].date,
                    message: '',
                    status: 'sent'
                })
                this.noplaceholder = false
            }
            //position will be index -1
            this.contacts[this.userIndex].messages.splice(index, 1);
        }
    },

    mounted() {

    }
}

createApp(obj).mount('#app')