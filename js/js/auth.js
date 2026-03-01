// 🔹 Verbinding met Supabase
const supabaseUrl = 'https://eu-rp-webapp-1ah1i7lr2-europese-roleplays-projects.supabase.co';
const supabaseKey = 'sb_publishable_h6cp0ZsmA8kD73yCp2flQA_zA9dg04L';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 🔹 Login formulier
const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 🔹 Check gebruiker in database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    errorMsg.textContent = 'Gebruiker niet gevonden';
    return;
  }

  // 🔹 Wachtwoord controleren (voor nu plaintext)
  if (user.password_hash !== password) {
    errorMsg.textContent = 'Verkeerd wachtwoord';
    return;
  }

  // 🔹 Account actief checken
  if (!user.active) {
    errorMsg.textContent = 'Account niet actief';
    return;
  }

  // 🔹 Redirect op basis van rol
  switch(user.role) {
    case 'VAB_Theorie':
      window.location.href = 'dashboard-theorie.html';
      break;
    case 'VAB_Praktijk':
      window.location.href = 'dashboard-praktijk.html';
      break;
    case 'Admin':
      window.location.href = 'dashboard-admin.html';
      break;
    case 'Co-owner':
    case 'Owner':
      window.location.href = 'dashboard-owner.html';
      break;
    default:
      errorMsg.textContent = 'Onbekende rol';
  }
});
