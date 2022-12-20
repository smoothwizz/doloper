import type { NextPage } from 'next'
import PublicLayout from '../components/layouts/PublicLayout'
import LandingSection from '../components/landing/LandingSection.component'
import Seo from '../components/Seo'

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <PublicLayout>
        <LandingSection />
      </PublicLayout>
    </>
  )
}

export default Home