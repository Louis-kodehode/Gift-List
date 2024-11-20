// Reference to form element and where list will be displayed
const giftForm = document.getElementById("giftForm");
const giftList = document.getElementById("giftList");

let gifts = JSON.parse(localStorage.getItem("gifts")) || [];

//Save to local storage
function saveToLocalStorage() {
  localStorage.setItem("gifts", JSON.stringify(gifts));
}

// Render gifts to page
function renderGifts() {
  // Update list to appear when added element or disapear when delete button is clicked
  while (giftList.firstChild) {
    giftList.removeChild(giftList.firstChild);
  }

  gifts.forEach((gift, index) => {
    const giftItem = document.createElement("div");
    giftItem.classList.add("gift-item");

    const title = document.createElement("h3");
    title.textContent = `${gift.recipient} - ${gift.gift}`;
    giftItem.appendChild(title);

    const details = document.createElement("p");
    details.classList.add("details");
    details.textContent = `
            Store: ${gift.store || "N/A"} | 
            Price: $${gift.price || "N/A"} | 
            Occasion: ${gift.occasion} | 
            Status: ${gift.purchased ? "Purchased" : "Pending"}
        `;
    giftItem.appendChild(details);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      gifts.splice(index, 1);
      saveToLocalStorage();
      renderGifts();
    });
    giftItem.appendChild(deleteBtn);
    giftList.appendChild(giftItem);
  });
}

giftForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newGift = {
    recipient: giftForm.recipient.value.trim(),
    gift: giftForm.gift.value.trim(),
    store: giftForm.store.value.trim(),
    price: giftForm.price.value.trim(),
    occasion: giftForm.occasion.value,
    purchased: giftForm.purchased.checked,
  };

  gifts.push(newGift);
  saveToLocalStorage();
  renderGifts();

  giftForm.reset();
});

renderGifts();
