import { useWeddingData } from './lib/useWeddingData.js'
import { useGlobalReveal } from './lib/useGlobalReveal.js'
import CustomCursor from './components/common/CustomCursor.jsx'
import Opening from './components/site/Opening.jsx'
import Hero from './components/site/Hero.jsx'
import Story from './components/site/Story.jsx'
import Ceremony from './components/site/Ceremony.jsx'
import Countdown from './components/site/Countdown.jsx'
import Dua from './components/site/Dua.jsx'
import Party from './components/site/Party.jsx'
import Guidelines from './components/site/Guidelines.jsx'
import Gallery from './components/site/Gallery.jsx'
import Location from './components/site/Location.jsx'
import Footer from './components/site/Footer.jsx'

export default function App() {
  const { data, loading } = useWeddingData()
  useGlobalReveal(data)

  if (loading || !data) {
    return <div style={{ minHeight: '100vh', background: 'var(--midnight)' }} />
  }

  const s = data.sections || {}
  const visible = (key) => s[key] !== false

  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <Hero settings={data.settings} />

      {visible('story') && <Story story={data.story} />}
      {visible('ceremony') && <Ceremony ceremony={data.ceremony} />}
      {visible('countdown') && <Countdown date={data.settings?.date} />}
      {visible('dua') && <Dua />}
      {visible('party') && <Party party={data.party} />}
      {visible('guidelines') && <Guidelines guidelines={data.guidelines} />}
      {visible('gallery') && <Gallery gallery={data.gallery} />}
      {visible('location') && <Location location={data.location} />}

      <Footer settings={data.settings} />

      <Opening />
    </>
  )
}
