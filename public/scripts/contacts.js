// Sample contact data
/*const contacts = [
    {
      name: "John Doe",
      jobTitle: "Software Developer",
      email: "john.doe@example.com",
      image: "john-doe.jpg"
    },
    {
      name: "Jane Smith",
      jobTitle: "Web Designer",
      email: "jane.smith@example.com",
      image: "jane-smith.jpg"
    },
    // Add more contacts as needed
  ];
  
  // Render contacts
  function renderContacts() {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
  
    contacts.forEach(contact => {
      const { name, jobTitle, email, image } = contact;
      const listItem = document.createElement("li");
      listItem.className = "contact-item";
  
      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = name;
  
      const detailsContainer = document.createElement("div");
      const nameElement = document.createElement("h3");
      nameElement.textContent = name;
      const jobTitleElement = document.createElement("p");
      jobTitleElement.textContent = jobTitle;
      const emailElement = document.createElement("p");
      emailElement.textContent = email;
  
      detailsContainer.appendChild(nameElement);
      detailsContainer.appendChild(jobTitleElement);
      detailsContainer.appendChild(emailElement);
  
      listItem.appendChild(imageElement);
      listItem.appendChild(detailsContainer);
  
      contactList.appendChild(listItem);
    });
  }
  
  // Search functionality
  function searchContacts() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      const { name, jobTitle, email } = contact;
      return (
        name.toLowerCase().includes(searchTerm) ||
        jobTitle.toLowerCase().includes(searchTerm) ||
        email.toLowerCase().includes(searchTerm)
      );
    });
  
    // Update the contact list with filtered contacts
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
    if (filteredContacts.length > 0) {
      filteredContacts.forEach(contact => {
        const { name, jobTitle, email, image } = contact;
        const listItem = document.createElement("li");
        listItem.className = "contact-item";
  
        const imageElement = document.createElement("img");
        imageElement.src = image;
        imageElement.alt = name;
  
        const detailsContainer = document.createElement("div");
        const nameElement = document.createElement("h3");
        nameElement.textContent = name;
        const jobTitleElement = document.createElement("p");
        jobTitleElement.textContent = jobTitle;
        const emailElement = document.createElement("p");
        emailElement.textContent = email;
  
        detailsContainer.appendChild(nameElement);
        detailsContainer.appendChild(jobTitleElement);
        detailsContainer.appendChild(emailElement);
  
        listItem.appendChild(imageElement);
        listItem.appendChild(detailsContainer);
  
        contactList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement("li");
      listItem.textContent = "No contacts found";
      contactList.appendChild(listItem);
    }
  }
  
  // Event listener for search input
  document.getElementById("searchInput").addEventListener("input", searchContacts);
  
  // Initial rendering of contacts
  renderContacts();*/