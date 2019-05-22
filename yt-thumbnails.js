const REPEAT = 10;
const TIMEOUT = 100;
const DELAY = 1000;

let count = 0;

function appendLinks() {
  const parent = document.querySelector('#info-contents');
  if (!parent) {
    if (count >= REPEAT) {
      console.error(`YouTube Thumbnails: ${REPEAT} times retried but the target element was not found. Aborting...`);
      return;
    }
    setTimeout(appendLinks, TIMEOUT);
    count++;
    return;
  }

  location.search.replace(/v=([^&?=]+)/, (_, id) => {
    const node = document.createElement('div');
    node.innerHTML = `Thumbnails:
<a href='https://i.ytimg.com/vi/${id}/default.jpg' target='_blank'>120x90</a>
<a href='https://i.ytimg.com/vi/${id}/mqdefault.jpg' target='_blank'>320x180</a>
<a href='https://i.ytimg.com/vi/${id}/hqdefault.jpg' target='_blank'>480x360</a>
<a href='https://i.ytimg.com/vi/${id}/sddefault.jpg' target='_blank'>640x480</a>
<a href='https://i.ytimg.com/vi/${id}/maxresdefault.jpg' target='_blank'>1280x720</a>`;
    node.style.fontSize = '12px';
    parent.appendChild(node);
  });
}

// Append a node after '#info-contents' is completely built
setTimeout(appendLinks, DELAY);
