import { dataContacts } from './data.js'
import { generateAIResponse } from './response.js'


const { createApp } = Vue;
const obj = {
    data() {
        return {
            loading: true,
            contacts: dataContacts,
            userIndex: 0,
            messageToSend: '',
            myTimeout: '',
            chatsearchinput: '',
            chatParsed: '',
            deleteindex: '',
            newUserName: '',
            deletePopup: false,
            contactsEmpity: false,
            contactInterface: false,
            darkcolor: false,
            showChat: false,
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

            if (this.messageToSend.replaceAll(' ', '') !== '') {
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
        async addResponse() {
            clearTimeout(this.myTimeout);
            // Show typing indicator
            this.myTimeout = '';
            
            // Get the last user message for context
            const lastUserMessage = this.contacts[this.userIndex].messages
                .filter(msg => msg.status === 'sent')
                .pop()?.message || 'Hello!';
            
            try {
                // Get AI response
                const aiResponse = await generateAIResponse(lastUserMessage);
                
                const message = {
                    date: this.dateConstructor(),
                    message: aiResponse.rndMsg,
                    status: 'response'
                };
                
                this.contacts[this.userIndex].messages.push(message);
            } catch (error) {
                console.error('Error getting AI response:', error);
                // Fallback response in case of error
                const message = {
                    date: this.dateConstructor(),
                    message: 'I had trouble thinking of a response. Could you rephrase that?',
                    status: 'response'
                };
                this.contacts[this.userIndex].messages.push(message);
            }
            
            // Auto-scroll to show the new message
            this.autoScroll();
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
        },
        popupDelete() {
            this.deletePopup = !this.deletePopup;
        },
        deleteChat() {
            if (this.contacts.length == 1) {
                this.contactsEmpity = true
            }
            this.contacts.splice((this.userIndex), 1)
            this.userIndex = 0

        },
        addChat() {
            if (this.newUserName.replace(/ /g, '') !== '') {
                const newchat = {
                    id: this.contacts.length + 1,
                    name: this.newUserName,
                    avatar: 'img/avatar_5.jpg',
                    visible: true,
                    messages: [

                    ],
                }

                console.log(newchat)
                this.contacts.push(newchat)
                //fine
                this.contactsEmpity = false;
                this.contactInterface = false;
                this.newUserName = '';
            }

        },
        deleteAllMessages() {
            this.activeContact.messages = []
        },

        isDarkMode() {
            this.darkcolor = !this.darkcolor;
            if (!this.darkcolor) {
                document.documentElement.style.setProperty('--font-color', 'black');
                document.documentElement.style.setProperty('--my-white', 'white');
                document.documentElement.style.setProperty('--user-bg-color', '#e3e4e8');
                document.documentElement.style.setProperty('--my-chat-color', '#d9fdd3');
                document.documentElement.style.setProperty('--main-bg', 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)');
                document.documentElement.style.setProperty('--icons-grey-filler', '#b1b1b1');
                document.documentElement.style.setProperty('--contact-clicked', '#e1e1e1');



            } else {
                document.documentElement.style.setProperty('--font-color', 'white');
                document.documentElement.style.setProperty('--my-white', '#6c6764');
                document.documentElement.style.setProperty('--user-bg-color', 'black');
                document.documentElement.style.setProperty('--my-chat-color', 'green');
                document.documentElement.style.setProperty('--icons-grey-filler', 'black');
                document.documentElement.style.setProperty('--main-bg', 'grey');
                document.documentElement.style.setProperty('--contact-clicked', 'black');




            }
        },






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
        setTimeout(() => {

            this.loading = false
        }, 2000)
    },

}

createApp(obj).mount('#app')