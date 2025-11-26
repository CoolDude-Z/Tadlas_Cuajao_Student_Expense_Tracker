
// const EventBus = new EventTarget();

// const SUPABASE_URL = "https://otwtgurjhkvxxfrlqkpa.supabase.co";
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI...";
// const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// // ----------------------------------
// // UTILITIES
// // ----------------------------------

// function emit(event, detail = {}) {
//   EventBus.dispatchEvent(new CustomEvent(event, { detail }));
// }
// function on(event, handler) {
//   EventBus.addEventListener(event, handler);
// }

// const form = document.getElementById("expense-form");
// const tableBody = document.getElementById("expense-table");
// const totalEl = document.getElementById("total");
// const monthTotalEl = document.getElementById("month-total");
// const countEl = document.getElementById("count");
// const filterMonth = document.getElementById("filter-month");
// const filterCat = document.getElementById("filter-cat");
// const searchInput = document.getElementById("search");
// const sortBy = document.getElementById("sort-by");

// let expenses = [];
// let userBudget = Number(localStorage.getItem("userBudget")) || 5000;

// const budgetLeftEl = document.getElementById("budget-left");

// // ----------------------------------
// // LOAD FROM SUPABASE
// // ----------------------------------

// async function loadExpenses() {
//   const { data, error } = await supabase.from("expenses").select("*").order("date", { ascending: false });
//   if (error) {
//     console.error("Error loading from Supabase:", error);
//     return;
//   }
//   expenses = data || [];
//   emit("expenses:updated");
// }

// // ----------------------------------
// // ADD TO SUPABASE
// // ----------------------------------

// async function addExpenseToSupabase(expense) {
//   const { error } = await supabase.from("expenses").insert([expense]);
//   if (error) console.error("Error adding expense:", error);
// }

// async function deleteExpenseFromSupabase(id) {
//   const { error } = await supabase.from("expenses").delete().eq("id", id);
//   if (error) console.error("Error deleting:", error);
// }

// // ----------------------------------
// // FORMAT CURRENCY
// // ----------------------------------

// const formatCurrency = n => "₱" + (n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

// // ----------------------------------
// // RENDER TABLE
// // ----------------------------------

// on("expenses:updated", renderTable);
// on("filters:changed", renderTable);

// function renderTable() {
//   const month = filterMonth.value;
//   const cat = filterCat.value;
//   const search = searchInput.value.toLowerCase();
//   const sort = sortBy.value;

//   let filtered = expenses.filter(e => {
//     const matchMonth = month ? e.date.startsWith(month) : true;
//     const matchCat = cat ? e.category === cat : true;
//     const matchSearch = e.description.toLowerCase().includes(search);
//     return matchMonth && matchCat && matchSearch;
//   });

//   filtered.sort((a, b) => {
//     switch (sort) {
//       case "date_asc": return new Date(a.date) - new Date(b.date);
//       case "date_desc": return new Date(b.date) - new Date(a.date);
//       case "amount_asc": return a.amount - b.amount;
//       case "amount_desc": return b.amount - a.amount;
//     }
//   });

//   tableBody.innerHTML = filtered.length
//     ? filtered.map(e => `
//       <tr>
//         <td>${e.date}</td>
//         <td>${e.description}</td>
//         <td>${e.category}</td>
//         <td class="amount">${formatCurrency(e.amount)}</td>
//         <td>
//           <button class="btn btn-muted tiny" data-id="${e.id}" data-action="edit">✏️</button>
//           <button class="btn btn-danger tiny" data-id="${e.id}" data-action="delete">🗑️</button>
//         </td>
//       </tr>
//     `).join("")
//     : '<tr><td colspan="5" class="no-data">No matching expenses found</td></tr>';

//   updateSummary();
// }

// // ----------------------------------
// // SUMMARY
// // ----------------------------------

// function updateSummary() {
//   const total = expenses.reduce((a, e) => a + e.amount, 0);
//   totalEl.textContent = formatCurrency(total);
//   countEl.textContent = expenses.length;

//   const currentMonth = new Date().toISOString().slice(0, 7);
//   const monthTotal = expenses
//     .filter(e => e.date.startsWith(currentMonth))
//     .reduce((a, b) => a + b.amount, 0);
//   monthTotalEl.textContent = formatCurrency(monthTotal);

//   const budgetLeft = userBudget - total;
//   budgetLeftEl.textContent = formatCurrency(Math.max(budgetLeft, 0));
//   budgetLeftEl.style.color = budgetLeft <= 0 ? "red" : "green";
// }

// // ----------------------------------
// // FORM SUBMIT
// // ----------------------------------

// form.addEventListener("submit", async e => {
//   e.preventDefault();

//   const expense = {
//     id: Date.now().toString(),
//     date: document.getElementById("date").value,
//     description: document.getElementById("description").value.trim(),
//     category: document.getElementById("category").value,
//     amount: parseFloat(document.getElementById("amount").value)
//   };

//   if (!expense.description || isNaN(expense.amount)) return;

//   expenses.push(expense);
//   emit("expenses:updated");
//   await addExpenseToSupabase(expense);

//   form.reset();
// });

// // ----------------------------------
// // DELETE & EDIT
// // ----------------------------------

// tableBody.addEventListener("click", async e => {
//   if (!e.target.dataset.action) return;
//   const id = e.target.dataset.id;

//   if (e.target.dataset.action === "edit") {
//     const ex = expenses.find(x => x.id === id);
//     if (!ex) return;

//     document.getElementById("date").value = ex.date;
//     document.getElementById("description").value = ex.description;
//     document.getElementById("category").value = ex.category;
//     document.getElementById("amount").value = ex.amount;

//     expenses = expenses.filter(x => x.id !== id);
//     await deleteExpenseFromSupabase(id);

//     emit("expenses:updated");
//   }

//   if (e.target.dataset.action === "delete") {
//     if (!confirm("Delete this expense?")) return;
//     expenses = expenses.filter(e => e.id !== id);
//     await deleteExpenseFromSupabase(id);
//     emit("expenses:updated");
//   }
// });

// // ----------------------------------
// // FILTERS
// // ----------------------------------

// [filterMonth, filterCat, searchInput, sortBy].forEach(el =>
//   el.addEventListener("input", () => emit("filters:changed"))
// );

// // ----------------------------------
// // CLEAR
// // ----------------------------------

// document.getElementById("clear-form").onclick = () => form.reset();

// // ----------------------------------
// // RESET ALL
// // ----------------------------------

// document.getElementById("reset-all").onclick = async () => {
//   if (confirm("Clear all expenses?")) {
//     expenses = [];
//     await supabase.from("expenses").delete().neq("id", "");
//     emit("expenses:updated");
//   }
// };

// // ----------------------------------
// // LOGOUT
// // ----------------------------------

// document.getElementById("logoutBtn").addEventListener("click", () => {
//   if (confirm("Are you sure you want to logout?")) {
//     localStorage.removeItem("loggedIn");
//     window.location.href = "login.html";
//   }
// });

// // ----------------------------------
// // USER PROFILE CLICK
// // ----------------------------------

// document.querySelector('.user-profile').addEventListener('click', () => {
//   window.location.href = "./user_profile.html";
// });

// // ----------------------------------
// // CHANGE BUDGET (PROMPT ONLY)
// // ----------------------------------

// document.getElementById("change-budget").onclick = () => {
//   const newBudget = Number(prompt("Enter new budget (PHP):", userBudget));

//   if (!newBudget || isNaN(newBudget) || newBudget <= 0) {
//     alert("Invalid amount. Budget unchanged.");
//     return;
//   }

//   userBudget = newBudget;
//   localStorage.setItem("userBudget", newBudget);
//   updateSummary();
// };

// // ----------------------------------
// // LOAD INITIAL DATA
// // ----------------------------------

// loadExpenses();

const EventBus = new EventTarget();

const SUPABASE_URL = "https://otwtgurjhkvxxfrlqkpa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI...";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------
// UTILITIES
// ----------------------------------

function emit(event, detail = {}) {
  EventBus.dispatchEvent(new CustomEvent(event, { detail }));
}
function on(event, handler) {
  EventBus.addEventListener(event, handler);
}

const form = document.getElementById("expense-form");
const tableBody = document.getElementById("expense-table");
const totalEl = document.getElementById("total");
const monthTotalEl = document.getElementById("month-total");
const countEl = document.getElementById("count");
const filterMonth = document.getElementById("filter-month");
const filterCat = document.getElementById("filter-cat");
const searchInput = document.getElementById("search");
const sortBy = document.getElementById("sort-by");

let expenses = [];
let userBudget = Number(localStorage.getItem("userBudget")) || 5000;

const budgetLeftEl = document.getElementById("budget-left");

// ----------------------------------
// LOAD FROM SUPABASE
// ----------------------------------

async function loadExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error loading from Supabase:", error);
    return;
  }
  expenses = data || [];
  emit("expenses:updated");
}

// ----------------------------------
// ADD TO SUPABASE
// ----------------------------------

async function addExpenseToSupabase(expense) {
  const { error } = await supabase.from("expenses").insert([expense]);
  if (error) console.error("Error adding expense:", error);
}

async function deleteExpenseFromSupabase(id) {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) console.error("Error deleting:", error);
}

// ----------------------------------
// FORMAT CURRENCY
// ----------------------------------

const formatCurrency = n =>
  "₱" + (n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

// ----------------------------------
// RENDER TABLE
// ----------------------------------

on("expenses:updated", renderTable);
on("filters:changed", renderTable);

function renderTable() {
  const month = filterMonth.value;
  const cat = filterCat.value;
  const search = searchInput.value.toLowerCase();
  const sort = sortBy.value;

  let filtered = expenses.filter(e => {
    const matchMonth = month ? e.date.startsWith(month) : true;
    const matchCat = cat ? e.category === cat : true;
    const matchSearch = e.description.toLowerCase().includes(search);
    return matchMonth && matchCat && matchSearch;
  });

  filtered.sort((a, b) => {
    switch (sort) {
      case "date_asc":
        return new Date(a.date) - new Date(b.date);
      case "date_desc":
        return new Date(b.date) - new Date(a.date);
      case "amount_asc":
        return a.amount - b.amount;
      case "amount_desc":
        return b.amount - a.amount;
    }
  });

  tableBody.innerHTML = filtered.length
    ? filtered
        .map(
          e => `
      <tr>
        <td>${e.date}</td>
        <td>${e.description}</td>
        <td>${e.category}</td>
        <td class="amount">${formatCurrency(e.amount)}</td>
        <td>
          <button class="btn btn-muted tiny" data-id="${e.id}" data-action="edit">✏️</button>
          <button class="btn btn-danger tiny" data-id="${e.id}" data-action="delete">🗑️</button>
        </td>
      </tr>
    `
        )
        .join("")
    : '<tr><td colspan="5" class="no-data">No matching expenses found</td></tr>';

  updateSummary();
}

// ----------------------------------
// SUMMARY
// ----------------------------------

function updateSummary() {
  const total = expenses.reduce((a, e) => a + e.amount, 0);
  totalEl.textContent = formatCurrency(total);
  countEl.textContent = expenses.length;

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = expenses
    .filter(e => e.date.startsWith(currentMonth))
    .reduce((a, b) => a + b.amount, 0);
  monthTotalEl.textContent = formatCurrency(monthTotal);

  const budgetLeft = userBudget - total;
  budgetLeftEl.textContent = formatCurrency(Math.max(budgetLeft, 0));
  budgetLeftEl.style.color = budgetLeft <= 0 ? "red" : "green";
}

// ----------------------------------
// FORM SUBMIT
// ----------------------------------

form.addEventListener("submit", async e => {
  e.preventDefault();

  const expense = {
    id: Date.now().toString(),
    date: document.getElementById("date").value,
    description: document.getElementById("description").value.trim(),
    category: document.getElementById("category").value,
    amount: parseFloat(document.getElementById("amount").value)
  };

  if (!expense.description || isNaN(expense.amount)) return;

  // ----------------------
  // BUDGET LIMIT VALIDATION
  // ----------------------
  const budgetLeftText = budgetLeftEl.textContent.replace(/[₱,]/g, "");
  const budgetLeft = parseFloat(budgetLeftText);

  if (expense.amount > budgetLeft) {
    alert("You cannot add this expense because it exceeds your remaining budget.");
    return; // STOP — do not continue
  }

  expenses.push(expense);
  emit("expenses:updated");
  await addExpenseToSupabase(expense);

  form.reset();
});

// ----------------------------------
// DELETE & EDIT
// ----------------------------------

tableBody.addEventListener("click", async e => {
  if (!e.target.dataset.action) return;
  const id = e.target.dataset.id;

  if (e.target.dataset.action === "edit") {
    const ex = expenses.find(x => x.id === id);
    if (!ex) return;

    document.getElementById("date").value = ex.date;
    document.getElementById("description").value = ex.description;
    document.getElementById("category").value = ex.category;
    document.getElementById("amount").value = ex.amount;

    expenses = expenses.filter(x => x.id !== id);
    await deleteExpenseFromSupabase(id);

    emit("expenses:updated");
  }

  if (e.target.dataset.action === "delete") {
    if (!confirm("Delete this expense?")) return;
    expenses = expenses.filter(e => e.id !== id);
    await deleteExpenseFromSupabase(id);
    emit("expenses:updated");
  }
});

// ----------------------------------
// FILTERS
// ----------------------------------

[filterMonth, filterCat, searchInput, sortBy].forEach(el =>
  el.addEventListener("input", () => emit("filters:changed"))
);

// CLEAR FORM
document.getElementById("clear-form").onclick = () => form.reset();

// RESET ALL
document.getElementById("reset-all").onclick = async () => {
  if (confirm("Clear all expenses?")) {
    expenses = [];
    await supabase.from("expenses").delete().neq("id", "");
    emit("expenses:updated");
  }
};

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  }
});

// USER PROFILE
document.querySelector(".user-profile").addEventListener("click", () => {
  window.location.href = "./user_profile.html";
});

// CHANGE BUDGET
document.getElementById("change-budget").onclick = () => {
  const newBudget = Number(prompt("Enter new budget (PHP):", userBudget));

  if (!newBudget || isNaN(newBudget) || newBudget <= 0) {
    alert("Invalid amount. Budget unchanged.");
    return;
  }

  userBudget = newBudget;
  localStorage.setItem("userBudget", newBudget);
  updateSummary();
};

// LOAD INITIAL DATA
loadExpenses();
