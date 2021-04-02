import {
    html
} from '../../node_modules/lit-html/lit-html.js';
import {
    getMemeById,
    updateMeme
} from '../api/data.js';
import {
    notify
} from './notification.js';

const template = (meme, onSubmit) => html `
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                    Programming is often touted as a smart and lucrative career path.
                    It's a job that (sometimes) offers flexibility and great benefits.
                    But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                    The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                    These memes cover most of the frustration (and funny moments) of programming.
                    At least we can laugh through the pain. 
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value = ${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export async function editPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    console.log(meme);
    ctx.render(template(meme, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title');
        const imageUrl = formData.get('imageUrl');
        const description = formData.get('description');

        const inputs = {
            title,
            description,
            imageUrl
        }
        try {
            if (Object.values(inputs).includes('')) {
                throw new Error('All fields are required!');
            }

            await updateMeme(memeId, inputs);
            ctx.page.redirect('/details/' + memeId);
        } catch (err) {
            notify(err.message);
        }
    }
}