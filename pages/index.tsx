import moment from 'moment'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import lastDateJson from '../lastDate.json'

const Reset = () => {
  const [password, setPassword] = useState('')

  const onReset = () => {
    if (password === 'suso123') {
      // POST /api/lastDate send todays date to server
      fetch('/api/lastDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      })
    } else {
      alert('wrong password')
    }
  }

  return (
    <div className="mt-40 flex ">
      <input
        type="text"
        placeholder="Password"
        className="border-2 border-green-500 p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // on Enter press call onReset
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onReset()
          }
        }}
      />
      <button
        className="rounded-sm rounded-l-none bg-green-500 p-2 text-white focus:outline-none focus:ring focus:ring-green-300 active:bg-green-400"
        onClick={onReset}
      >
        Reset Timer
      </button>
    </div>
  )
}

const Home: NextPage = () => {
  const { lastDate } = lastDateJson

  const humanizeTimeSince = (lastDate: string) => {
    const timeSince = moment
      .duration(moment().diff(lastDate))
      .humanize()
      .toLocaleUpperCase()
    return timeSince
  }

  const [timeSince, setTimeSince] = useState(() => humanizeTimeSince(lastDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSince(humanizeTimeSince(lastDate))
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Days since Sergio mentioned lillevisdad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl md:text-6xl">It's been:</h1>
        <p className=" my-5 text-6xl font-bold sm:text-7xl md:text-9xl">
          {timeSince}
        </p>
        <h1 className="text-4xl md:text-6xl">
          since Sergio last mentioned{' '}
          <a
            href="https://instagram.com/lillevisdad?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noopener"
            className="text-green-600 hover:underline"
          >
            lillevisdad
          </a>
        </h1>
        <Reset />
      </main>
    </div>
  )
}

export default Home
