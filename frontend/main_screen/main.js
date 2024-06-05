document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  const money = document.getElementById("money").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const expense = {
    money: money,
    description: description,
    category: category,
  };

  const token = localStorage.getItem("token");

  axios
    .post("http://localhost:3000/add-expense", expense, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/get-expense", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      response.data.expenses.forEach((expense) => {
        showExpense(expense);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function showExpense(expense) {
  const expenseList = document.getElementById("Expense");
  const listItem = document.createElement("li");
  const deleteBtn = document.createElement("button");

  listItem.id = `${expense.id}`;
  deleteBtn.innerText = "Delete";
  listItem.textContent = `${expense.money} - ${expense.description} - ${expense.category} `;
  expenseList.appendChild(listItem);
  listItem.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function () {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/delete-expense/${listItem.id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
