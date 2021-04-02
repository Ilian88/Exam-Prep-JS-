import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteMeme, getMemeById } from '../api/data.js';

const template = (meme,isOwner,onDelete) => html `
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            ${isOwner ? html `
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>
            ` : ''}
            
        </div>
    </div>
</section>
`

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    const userId = sessionStorage.getItem('userId');
    let isOwner = userId == meme._ownerId;

    ctx.render(template(meme,isOwner,onDelete));

    async function onDelete(){
        let confirmed = confirm('Are you sure you want to delete this meme?');
        if(confirmed) {
            await deleteMeme(memeId);
            ctx.page.redirect('/allMemes');
        }
    }
}