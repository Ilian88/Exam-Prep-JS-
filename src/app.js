import page from '../node_modules/page/page.mjs';
import { render} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { logout } from './api/data.js';
import { allMemesPage } from './views/allMemes.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myPage } from './views/myProfile.js';

const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click',async ()=> {
    await logout();
    setUserNav();
    page.redirect('/');
})

page('/',decorateContext,homePage);
page('/register',decorateContext,registerPage);
page('/login',decorateContext,loginPage);
page('/allMemes',decorateContext,allMemesPage);
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id',decorateContext,editPage);
page('/myPage',decorateContext,myPage);


setUserNav();
page.start();


function decorateContext(ctx,next){
    ctx.render = (content) => render(content,main);
    ctx.setUserNav = setUserNav;

    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');

    if(email != null) {
        document.getElementById('welcomeMsg').textContent = `Welcome ${email}`;

        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user').style.display = 'block';
    }else { 
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
    }

}