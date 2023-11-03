import { dataContacts } from './data.js'
import { possibleResponses, getRnd } from './response.js'


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
            deleteindex: '',
        }
    },
    methods: {
        lastMessageParser(timevar) {
            timevar = String(timevar)
            if (timevar !== undefined) {
                if (timevar[15] !== ':') {
                    timevar = timevar.substring(10, 16);

                } else {
                    timevar = timevar.substring(10, 15);
                }
                return timevar
            }

        },
        selectUser(id) {

            this.userIndex = this.idToIndex(id);

        },
        idToIndex(id) {
            for (let i = 0; i < this.contacts.length; i++) {
                if (id === this.contacts[i].id) {
                    return i
                }
            }
            return -1;
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
        checkadd() {
            if (this.messageToSend) {
                this.addMessage();
            }
        },
        addMessage() {

            if (this.messageToSend.replace(/ /g, '') !== '') {
                let message = {
                    date: this.dateConstructor(),
                    message: this.messageToSend,
                    status: 'sent'
                }


                this.contacts[this.userIndex].messages.push(message)
                //resetting message
                console.log(this.contacts[this.userIndex])


                this.myTimeout = setTimeout(() => { this.addResponse() }, 1000)
            }
            this.messageToSend = '';

        },
        addResponse() {
            clearTimeout(this.myTimeout);
            // to trigger the typing display
            this.myTimeout = '';
            let message = {
                date: this.dateConstructor(),
                message: possibleResponses[getRnd(0, possibleResponses.length - 1)].rndMsg,
                status: 'response'
            }
            this.contacts[this.userIndex].messages.push(message)
            //autoscroll
            this.autoScroll()
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
                    this.contacts[index].visible = true
                } else {

                    this.contacts[index].visible = false
                }
            });



        },
        removeMessage(index) {

            //position will be index -1
            this.contacts[this.userIndex].messages.splice(index, 1);
        },
        getLastAccess(id) {
            //passed contact id
            const contact = this.contacts(this.idToIndex(id))
            return contact.messages[contact.messages.length - 1].message
        },
        getLastMessage(id) {
            let index = this.idToIndex(id);
            if (this.contacts[index].messages.length > 0) {

                return (this.contacts[index].messages[this.contacts[index].messages.length - 1].message);
            } else {
            }
        },
        lastDateId(id) {
            let index = this.idToIndex(id);
            if (this.contacts[index].messages.length > 0) {

                return this.lastMessageParser(this.contacts[index].messages[this.contacts[index].messages.length - 1].date);
            } else {
                return 'nessun messaggio'
            }
        },
        autoScroll() {
            //using $ref sintaz to select items
            const scrollContainer = this.$refs.scrollContainer;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        },
        assigndelete(msgposition) {
            this.deleteindex = msgposition;
        },
        removedelete(msgposition) {
            this.deleteindex = ''
        },
        isbintoshow(index) {
            return this.deleteindex === index
        }


    },
    computed: {
        activeContact() {
            //funziona per calcolare i metodi
            return this.contacts[this.userIndex]
        },
        lastDate() {
            if (this.activeContact.messages.length > 0) {
                return this.lastMessageParser(this.activeContact.messages[this.activeContact.messages.length - 1].date);
            } else {
                return 'nessun messaggio'
            }
        },

    },
    mounted() {

    }
}

createApp(obj).mount('#app')