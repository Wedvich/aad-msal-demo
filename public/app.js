const html = `
  <br><br>
  <h1 class="header center pink-text">Hello stranger</h1>
  <div class="row center">
    <h5 class="header col s12 light">Please log in to read cool stuff</h5>
  </div>
  <div class="row center">
    <a href="#" id="login-button" class="btn-large waves-effect waves-light pink">Log in</a>
  </div>
  <br><br>
`;

const authHtml = (user) => `
  <br><br>
  <h1 class="header center cyan-text">Hello ${user}</h1>
  <div class="row center">
    <h5 class="header col s12 light">You're all signed in!</h5>
  </div>
  <div class="row center">
  <a href="#" id="stuff-button" class="btn-large waves-effect waves-light cyan">Get stuff</a>
    <a href="#" id="logout-button" class="btn-large waves-effect waves-light cyan">Log out</a>
  </div>
  <br><br>
`;

const clientId = '<app client id>';
const authority = 'https://login.microsoftonline.com/<aad tenant id>';
const apiUrl = 'https://<url to the api>';
const apiScope = 'api://<api client id>/Stuff.Read';

const auth = new Msal.UserAgentApplication(clientId, authority);

const user = auth.getUser();
if (!user) {
  document.getElementById('main').innerHTML = html;
  document.getElementById('login-button').addEventListener('click', async () => { await auth.loginPopup([apiScope]); location.reload(); });
} else {
  document.getElementById('main').innerHTML = authHtml(user.name);
  document.getElementById('logout-button').addEventListener('click', () => { sessionStorage.clear(); location.reload(); });
  document.getElementById('stuff-button').addEventListener('click', async () => {
    const token = await auth.acquireTokenSilent([apiScope]);
    const response = await fetch(apiUrl, { headers: { 'authorization': `Bearer ${token}`}});
    const stuff = await response.json();
    console.log(stuff);
  });
}
