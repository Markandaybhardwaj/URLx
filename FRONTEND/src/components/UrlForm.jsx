import React, { useState, useEffect } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'
import { useNavigate } from '@tanstack/react-router'

const UrlForm = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const [urlValid, setUrlValid] = useState(true)
  const navigate = useNavigate()

  // On mount, check if there's a saved URL from before login
  useEffect(() => {
    const savedUrl = localStorage.getItem('pendingShortenUrl')
    if (savedUrl) {
      setUrl(savedUrl)
      localStorage.removeItem('pendingShortenUrl')
    }
  }, [])

  const validateUrl = (value) => {
    // Simple URL validation
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateUrl(url)) {
      setUrlValid(false)
      setError('Please enter a valid URL.')
      return
    }
    setUrlValid(true)
    setError(null)

    if (!isAuthenticated) {
      // Save the URL and redirect to login
      localStorage.setItem('pendingShortenUrl', url)
      navigate({ to: '/auth', search: { redirect: '/' } })
      return
    }

    setLoading(true)
    try {
      const shortUrl = await createShortUrl(url, customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
    if (error) setError(null)
    setUrlValid(true)
  }

  return (
    <div className="w-full flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl px-8 py-10 flex flex-col items-center gap-6 animate-fade-in"
        style={{ borderRadius: '2.5rem' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-0 text-blue-900">Shorten a long link</h1>
        <p className="text-base md:text-lg text-gray-500 text-center -mt-2 mb-2">No Fee required.</p>
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/my-long-url"
            required
            className={`flex-1 text-lg px-6 py-4 rounded-full border focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 shadow-sm ${
              urlValid
                ? 'border-gray-300 focus:ring-blue-400'
                : 'border-red-400 focus:ring-red-400'
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : (
              <>
                Get your link for free
                <svg className="ml-1 w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="w-full mt-2 p-3 bg-red-100 text-red-700 rounded-md animate-shake text-center">
            {error}
          </div>
        )}
        {isAuthenticated && (
          <div className="w-full">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
        {shortUrl && (
          <div className="w-full mt-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-2 text-center">Your shortened URL:</h2>
            <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-3 border border-gray-300 rounded-l-full bg-gray-50 text-center text-blue-700 font-semibold text-lg shadow-sm"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-6 py-3 rounded-r-full transition-colors duration-200 text-lg font-bold ${
                  copied
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </form>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.36,.07,.19,.97) both;
        }
        .animate-shake {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}

export default UrlForm