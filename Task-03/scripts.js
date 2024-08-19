document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const showContactsButton = document.getElementById('showContactsButton');

    contactForm.addEventListener('submit', handleFormSubmit);
    showContactsButton.addEventListener('click', toggleContactList);

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (name && phone && email) {
            const contact = { name, phone, email };
            const contacts = getContacts();
            contacts.push(contact);
            saveContacts(contacts);
            contactForm.reset();
            if (!contactList.classList.contains('hidden')) {
                renderContacts();
            }
        }
    }

    function getContacts() {
        const contacts = localStorage.getItem('contacts');
        return contacts ? JSON.parse(contacts) : [];
    }

    function saveContacts(contacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function renderContacts() {
        const contacts = getContacts();
        const searchTerm = document.getElementById('name').value.toLowerCase();
        contactList.innerHTML = '';

        contacts
            .filter(contact => contact.name.toLowerCase().includes(searchTerm))
            .forEach((contact, index) => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.innerHTML = `
                    <div>
                        <strong>${contact.name}</strong><br>
                        ${contact.phone}<br>
                        ${contact.email}
                    </div>
                    <div>
                        <button onclick="editContact(${index})">Edit</button>
                        <button onclick="deleteContact(${index})">Delete</button>
                    </div>
                `;
                contactList.appendChild(contactItem);
            });
    }

    function toggleContactList() {
        contactList.classList.toggle('hidden');
        if (!contactList.classList.contains('hidden')) {
            renderContacts();
        }
    }

    window.editContact = function(index) {
        const contacts = getContacts();
        const contact = contacts[index];
        
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;

        deleteContact(index);
    }

    window.deleteContact = function(index) {
        const contacts = getContacts();
        contacts.splice(index, 1);
        saveContacts(contacts);
        if (!contactList.classList.contains('hidden')) {
            renderContacts();
        }
    }
});
