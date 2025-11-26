  // // ==============================
  // // Supabase Setup
  // // ==============================
  // const SUPABASE_URL = "https://otwtgurjhkvxxfrlqkpa.supabase.co";
  // const SUPABASE_KEY =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d3RndXJqaGt2eHhmcmxxa3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzU3MTgsImV4cCI6MjA3Nzg1MTcxOH0.stGDecJa0djPRN-32r1yryGlpjnehXkoUnt3qZQcvA8";
  // const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // console.log("Script Start");

  // // ==============================
  // // Event Bus Setup
  // // ==============================
  // const EventBus = new EventTarget();

  // // Emit helper
  // function emit(event, detail = {}) {
  //   EventBus.dispatchEvent(new CustomEvent(event, { detail }));
  // }

  // // Listen helper
  // function on(event, handler) {
  //   EventBus.addEventListener(event, handler);
  // }

  // // ==============================
  // // Form Switching
  // // ==============================
  // const loginContainer = document.getElementById("loginFormContainer");
  // const signUpContainer = document.getElementById("signUpFormContainer");
  // const showSignUp = document.getElementById("showSignUp");
  // const showLogin = document.getElementById("showLogin");

  // showSignUp.addEventListener("click", () => {
  //   loginContainer.classList.add("hidden");
  //   signUpContainer.classList.remove("hidden");
  // });

  // showLogin.addEventListener("click", () => {
  //   signUpContainer.classList.add("hidden");
  //   loginContainer.classList.remove("hidden");
  // });

  // // ==============================
  // // Password Toggle
  // // ==============================
  // document.querySelectorAll(".toggle-password").forEach((toggle) => {
  //   toggle.addEventListener("click", () => {
  //     const inputId = toggle.getAttribute("data-target");
  //     const input = document.getElementById(inputId);
  //     if (input.type === "password") {
  //       input.type = "text";
  //       toggle.textContent = "Hide";
  //     } else {
  //       input.type = "password";
  //       toggle.textContent = "Show";
  //     }
  //   });
  // });

  // // ==============================
  // // Login Form (EDA Version)
  // // ==============================
  // const loginForm = document.getElementById("loginForm");

  // // When the user submits the login form
  // loginForm.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   const username = document.getElementById("username").value.trim();
  //   const password = document.getElementById("password").value.trim();

  //   emit("login:attempt", { username, password });
  // });

  // // Handle login attempt
  // on("login:attempt", async (event) => {
  //   const { username, password } = event.detail;
  //   console.log("Logging in:", username);

  //   const { data, error } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("username", username)
  //     .eq("password", password)
  //     .single();

  //   if (error || !data) {
  //     emit("login:failed", { error });
  //     return;
  //   }

  //   emit("login:success", { user: data });
  // });

  // // Response events
  // on("login:failed", () => {
  //   alert("❌ Invalid username or password");
  // });

  // on("login:success", (event) => {
  //   const { user } = event.detail;
  //   console.log("✅ User logged in:", user);
  //   alert("✅ Login successful!");

  //   // ✅ Redirect to main page
  //   window.location.href = "index.html"; // adjust the path if needed
  // });

  // // ==============================
  // // Sign Up Form
  // // ==============================
  // document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  //   e.preventDefault();

  //   const username = document.getElementById("newUsername").value.trim();
  //   const password = document.getElementById("newPassword").value.trim();
  //   const confirm = document.getElementById("confirmPassword").value.trim();

  //   if (password !== confirm) {
  //     alert("❌ Passwords do not match!");
  //     return;
  //   }

  //   // Check if username exists
  //   const { data: existing } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("username", username)
  //     .single();

  //   if (existing) {
  //     alert("⚠️ Username already taken!");
  //     return;
  //   }

  //   // Insert new user
  //   const { error } = await supabase.from("user").insert([{ username, password }]);

  //   if (error) {
  //     console.error("Error creating user:", error);
  //     alert("❌ Failed to create account");
  //     return;
  //   }

  //   alert("✅ Account created successfully! You can now log in.");
  //   signUpContainer.classList.add("hidden");
  //   loginContainer.classList.remove("hidden");
  // });

  // console.log("Script End");

  
 
const SUPABASE_URL = "https://otwtgurjhkvxxfrlqkpa.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d3RndXJqaGt2eHhmcmxxa3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzU3MTgsImV4cCI6MjA3Nzg1MTcxOH0.stGDecJa0djPRN-32r1yryGlpjnehXkoUnt3qZQcvA8";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("✅ Auth script loaded");


const loginContainer = document.getElementById("loginFormContainer");
const signUpContainer = document.getElementById("signUpFormContainer");
document.getElementById("showSignUp").addEventListener("click", () => {
  loginContainer.classList.add("hidden");
  signUpContainer.classList.remove("hidden");
});
document.getElementById("showLogin").addEventListener("click", () => {
  signUpContainer.classList.add("hidden");
  loginContainer.classList.remove("hidden");
});

document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const target = document.getElementById(toggle.dataset.target);
    if (target.type === "password") {
      target.type = "text";
      toggle.textContent = "Hide";
    } else {
      target.type = "password";
      toggle.textContent = "Show";
    }
  });
});


document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const confirm = document.getElementById("confirmPassword").value.trim();

  if (password !== confirm) {
    alert("❌ Passwords do not match!");
    return;
  }

  
  const { data: existing } = await supabase
    .from("user")
    .select("id")
    .eq("username", username)
    .single();

  if (existing) {
    alert("⚠️ Username already taken!");
    return;
  }

 
  const { error } = await supabase.from("user").insert([{ username, password }]);

  if (error) {
    alert("❌ Failed to create account: " + error.message);
    return;
  }

  alert("✅ Account created! You can now log in.");
  signUpContainer.classList.add("hidden");
  loginContainer.classList.remove("hidden");
});


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("❌ Invalid username or password!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(data));

  alert("✅ Login successful!");
  window.location.href = "index.html";
});

