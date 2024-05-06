let data = new FormData();
data.append('url', window.location.pathname);

fetch('/_dev.php', {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    method: "POST",
    body: data
})