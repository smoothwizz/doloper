import SectionHeading from '@/components/overview/common/SectionHeading.component'
import SubtasksList from './SubtasksList'
import { useState } from 'react'

const SubtasksSection = () => {
  const description = ` List smaller, actionable items that need to be completed to achieve the main task.`
  const subHeading =
    '* This helps in making progress on larger tasks more manageable and trackable.'
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="mt-8">
      <SectionHeading
        title="Subtasks"
        description={description}
        subHeading={subHeading}
        isExpanded={isExpanded}
        handleToggle={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && (
        <div className={`min-h-full w-full`}>
          <SubtasksList />
        </div>
      )}
    </section>
  )
}

export default SubtasksSection
