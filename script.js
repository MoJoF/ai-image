document.addEventListener('DOMContentLoaded', function() {
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

        const blob = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        
        reader.onloadend = () => {
            const base64data = reader.result
            document.querySelector('img').src = base64data
            status.textContent = 'Success'
        }

    }
})