
function saveVideoID() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const url = tabs[0].url;
      if (!url ||
          ! /www\.youtube\.com\/watch/.test(url) ||
          ! /\bv=([^&?=]+)/.test(url)) {
        reject();
        return;
      }
      resolve(RegExp.$1);
    });
  });
}

function render(found, vid, quality) {
  const $c = document.querySelector('#container');
  $c.innerHTML = '';

  const node = found ? makeContent(vid, quality) : makeNotFoundContent();
  $c.appendChild(node);
}

function makeNotFoundContent() {
  const $div = document.createElement('div');
  $div.className = 'notfound';
  $div.textContent = 'No thumbnails found.';
  return $div;
}

function makeContent(vid, quality) {
  const $div = document.createElement('div');

  const $links = document.createElement('div');
  $links.className = 'links';
  [
    {quality: 'default', title: '120x90'},
    {quality: 'mqdefault', title: '320x180'},
    {quality: 'hqdefault', title: '480x360'},
    {quality: 'sddefault', title: '640x480'},
    {quality: 'maxresdefault', title: '1280x720'},
  ].forEach(link => {
    if (link.quality === quality) {
      const $span = document.createElement('span');
      $span.textContent = link.title;
      $span.className = 'link';
      $links.appendChild($span);
      return;
    }
    const $a = document.createElement('a');
    $a.innerText = link.title;
    $a.href = '#';
    $a.className = 'link';
    $a.addEventListener('click', () => {
      render(true, vid, link.quality);
    });
    $links.appendChild($a);
  });
  $div.appendChild($links);

  const $img = new Image();
  $img.src = `https://i.ytimg.com/vi/${vid}/${quality}.jpg`;
  $div.appendChild($img);

  console.log($div);
  return $div;
}

function main() {
  saveVideoID().then(
    vid => render(true, vid, 'sddefault'),
    ()  => render(false)
  );
}

main();
