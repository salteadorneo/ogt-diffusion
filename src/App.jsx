import { useEffect, useRef, useState } from 'react'
import OgtRender from './components/OgtRender'
import Github from './components/Github'

export default function App () {
  const inputPrompt = useRef(null)

  const [loading, setLoading] = useState(false)

  const [prompt, setPrompt] = useState(window.localStorage.getItem('prompt') || '')
  const [answer, setAnswer] = useState(window.localStorage.getItem('content') || '')

  useEffect(() => {
    if (inputPrompt.current && !prompt) {
      inputPrompt.current.focus()
    }
  }, [inputPrompt])

  async function handleSubmit (ev) {
    ev.preventDefault()
    setLoading(true)

    if (!prompt) {
      setLoading(false)
      return
    }

    const content = await fetch(`/api/generate?prompt=${prompt}`).then(res => res.text())

    if (!content) {
      setLoading(false)
      return
    }

    const contentTrim = content.trim()

    window.localStorage.setItem('prompt', prompt)
    window.localStorage.setItem('content', contentTrim)

    setAnswer(contentTrim)
    setLoading(false)
  }

  function handleDownload () {
    const element = document.createElement('a')
    const file = new window.Blob([answer], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'imagen.ogt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <main>
      <div className='relative px-6 lg:px-8 text-center mx-auto max-w-2xl py-16'>

        <p className='mb-2 text-md sm:text-lg'>
          Stable OGT diffusion
        </p>

        <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
          Genera un <span className='text-orange-500'>OGT</span>
          <br />con tu imaginación
        </h1>

        <form id='input-form' className='my-8' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              ref={inputPrompt}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              type='search'
              className='block w-full p-4 md:pr-28 text-black rounded-full bg-white'
              placeholder='un corazón rojo de 10x10'
              readOnly={loading}
              required
            />
            <button
              type='submit'
              className='hidden md:block text-white bg-orange-500 hover:bg-orange-400 absolute right-2.5 bottom-2.5 transition-all focus:outline-none font-medium rounded-full text-sm px-4 py-2'
            >
              Generar
            </button>
          </div>
        </form>

        {loading && <img src='/loader.svg' alt='' className='mx-auto' />}

        {!loading && answer && (
          <>
            <section className='flex justify-center'>
              <OgtRender>
                {answer}
              </OgtRender>
            </section>

            <pre className='bg-white/10 text-xs text-left p-2 mt-2 rounded overflow-auto'>
              {answer}
            </pre>

            <button
              className='text-white bg-orange-500 hover:bg-orange-400 transition-all focus:outline-none font-medium rounded-full text-sm px-4 py-2 mt-2'
              onClick={handleDownload}
            >
              Descargar OGT
            </button>
          </>
        )}

      </div>

      <Github />

      <section className='fixed bottom-4 right-4 text-xs text-white/80 text-center'>
        OGT es un formato de imagen creado por <a href='https://github.com/rafalagoon/ogt'>@rafalagoon</a>
      </section>
    </main>
  )
}
