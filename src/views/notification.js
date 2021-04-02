export async function notify(message) {
    const notification = document.getElementById('errorBox');
    notification.style.display = 'block';
    notification.querySelector('span').textContent = message;

    setTimeout(() => notification.style.display = 'none',3000);
}