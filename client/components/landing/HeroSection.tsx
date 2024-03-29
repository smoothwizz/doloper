import { useRouter } from 'next/router'
import React from 'react'
import ButtonPrimary from '../forms/buttons/ButtonPrimary'
import HeroImage from './HeroImage'

const HeroSection = () => {
  const router = useRouter()

  const goToPlanning = () => {
    router.push('/planning')
  }

  return (
    <section className="flex flex-col sm:flex-row justify-between mt-2 sm:mt-8 md:mt-16">
      <div className="relative px-4 sm:px-0 py-16 pr-4 flex-1">
        <h1 className="font-bold text-4xl sm:text-5xl leading-tight mb-6">
          Streamline Your Work <span className="text-blue-500">One Task</span>{' '}
          at a Time
        </h1>
        <h2 className="text-xl leading-relaxed mt-3">
          Dolooper revolutionizes your workday by focusing on one task at a
          time. Break down your tasks, utilize a customizable timer, and achieve
          optimal productivity.
        </h2>
        <div className="mt-4 sm:mt-8 md:mt-10">
          <ButtonPrimary action={goToPlanning}>
            Get started now{' '}
            <span className="text-xs align-super rotate-45">for free</span>
          </ButtonPrimary>
        </div>
      </div>

      <div className="flex-1">
        <HeroImage />
      </div>
    </section>
  )
}

export default HeroSection
