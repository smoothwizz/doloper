import React, { useState } from 'react'
import { Task, TaskActions } from '../../../../types/types'
import ButtonDark from '../../../forms/buttons/ButtonDark'
import ButtonDropdown from '../../../forms/buttons/ButtonDropdown'
import Checkbox from '../../../forms/input/Checkbox.component'
import Input from '../../../forms/input/Input.component'

type Props = {
  task: Task
  isOverview: boolean
  actions: TaskActions
}

const TaskEntry = ({ task, isOverview, actions }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editValue, setEditValue] = useState(task.value)
  const isUpdateDisabled = !editValue || editValue.length === 0
  const isTogglable = isOverview

  function handleEditValue(value: string) {
    setEditValue(value)
  }

  function handleUpdateTask(key: string, value: string) {
    setIsEditMode(false)
    setEditValue(value)

    return actions.handleEdit(key, value)
  }

  const taskWithCheckbox = (
    <span className={task.isDone ? 'line-through' : ''}>
      <Checkbox
        uuid={task.key}
        label={task.value}
        isChecked={task.isDone}
        setIsChecked={(key) => actions.handleToggle(key)}
      />
    </span>
  )

  const controlPanel = (
    <div className="ml-auto flex-end text-xs">
      <ButtonDropdown
        name={`task-${task.key}-dropdownMenu`}
        label={''}
        menuItems={[
          {
            id: task.key,
            label: 'Edit',
            action: () => setIsEditMode(!isEditMode),
          },
          {
            id: task.key,
            label: 'Remove',
            action: actions.handleDelete,
          },
        ]}
      />
    </div>
  )

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleUpdateTask(task.key, editValue)
  }

  const editForm = (
    <form onSubmit={handleSubmit} className="flex flex-row w-full">
      <span className="flex-auto">
        <Input
          id={`task-${task.key}`}
          type={'text'}
          value={editValue}
          action={handleEditValue}
          label={'Edit Task'}
        />
      </span>
      <ButtonDark
        action={() => handleUpdateTask(task.key, editValue)}
        text="Save"
        isDisabled={isUpdateDisabled}
      />
    </form>
  )

  if (isEditMode) {
    return (
      <li key={task.key} className={`${taskEditStyle}`}>
        {editForm}
      </li>
    )
  }

  return (
    <li
      key={task.key}
      className={isOverview ? taskStyleOverview : taskStylePlanning}
    >
      {isTogglable && taskWithCheckbox}
      {!isTogglable && (
        <span className="text-sm font-medium text-gray-900">{task.value}</span>
      )}
      {controlPanel}
    </li>
  )
}

const taskEditStyle = `flex align-middle p-0 my-2
                       transition-all duration-300 ease-in-out`

const taskStyleOverview = `flex align-middle p-4
                  hover:cursor-pointer
                  hover:bg-gray-100 hover:text-b-900
                  focus:cursor-pointer
                  transition-all duration-300 ease-in-out`

const taskStylePlanning = `flex align-middle p-4
                  hover:text-b-900
                  focus:cursor-pointer
                  transition-all duration-300 ease-in-out rounded-md
                  first:mt-0 my-2 bg-white border border-gray-200`

export default TaskEntry