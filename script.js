let files = []

const r = await fetch('https://ai.omyraucy.workers.dev/', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
})

if (!r.ok) { throw new Error('Ошибка получения изображений') }

const d = await r.json()

if (d.status === 'success') files = d.files


document.addEventListener('DOMContentLoaded', function () {
    // Получение сгенерированных изображений
    files.forEach(f => {
        const img = document.createElement('img')
        img.src = f
        document.body.appendChild(img)
    })

    const generateBtn = document.querySelector('#generate')
    generateBtn.onclick = async () => {
        const status = document.querySelector('#status')
        const prompt = document.querySelector('#prompt').value

        status.textContent = 'Loading...'

        const response = await fetch('https://ai.omyraucy.workers.dev/', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ prompt })
        })

        if (!response.ok) {
            throw new Error('Ошибка генерации')
        }

        const data = await response.json()

        if (data.status === "success") {
            document.querySelector('img').src = data.publicUrl
            status.textContent = 'Success'
        }
        else if (data.status === "error") {
            alert(data.message)
        }
    }
})