// const { default: axios } = require("axios");

console.log("index.js ishga tushdi");
function itemTemlate(item) {
  return ` <li class="list-group-item list-group-item-info d-flex align-items-between">
    <span class="item-text">${item.reja}</span>

    <div class="ml-auto">
      <button
        data-id="${item._id}"
        class="edit-me btn btn-secondary btn-sm mr-1"
      >
        O'zgartirish
      </button>

      <button
        data-id= ${item._id}
        class="delete-btn btn btn-danger btn-sm"
      >
        O'chirish
      </button>
    </div>
  </li>`;
}
const createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemlate(response.data));
    })
    .catch((err) => {});
  createField.value = "";
  createField.focus();
});

document.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq uchirmoqchimisiz?")) {
      axios
        .post("/delete.items", { _id: e.target.getAttribute("data_id") })
        .then((respons) => {
          console.log(respons.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Yana qaytadan urinib kuring!");
        });
    }
  }
});
