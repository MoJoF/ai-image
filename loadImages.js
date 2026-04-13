let files = []

async function getImages() {
    const r = await fetch('https://ai.omyraucy.workers.dev/', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })

    if (!r.ok) { throw new Error('Ошибка получения изображений') }

    const d = await r.json()

    if (d.status === 'success') files = d.files

    files = files.filter(f => !f.url.endsWith('ai-image/'))

    if (document.readyState === "complete") {
        files.forEach(f => {
            const img = document.createElement('img')
            img.src = f.url
            document.body.appendChild(img)
        })
    }
}

await getImages()