document.addEventListener('DOMContentLoaded', function () {
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