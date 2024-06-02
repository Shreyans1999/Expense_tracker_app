const btn = document.getElementById("submit");

btn.addEventListener("click", function (event) {
  event.preventDefault();
  const money = document.getElementById("money").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const expense = { money, description, category };

  axios.post("http://localhost:3000/add-expense", expense)
    .then(response => {
      console.log(response);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/get-expense")
    .then(response => {
      response.data.expenses.forEach(expense => showExpense(expense));
    })
    .catch(err => {
      console.log(err);
    });
});

function showExpense(expense) {
  const Expense = document.getElementById("Expense");
  const list = document.createElement("li");
  const delBtn = document.createElement("button");
  list.id = `${expense.id}`;
  delBtn.innerText = "Delete";
  list.textContent = `${expense.money} - ${expense.category} - ${expense.description} `;
  Expense.appendChild(list);
  list.appendChild(delBtn);

  delBtn.addEventListener("click", function () {
    axios.delete(`http://localhost:3000/delete-expense/${list.id}`)
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  });
}
