import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import ButtonSecondary from '../../../forms/buttons/ButtonSecondary'
import SubtasksListComponent from './SubtasksList.component'
import { useAtom } from 'jotai'
import { atom_subTasks } from 'jotai/atoms'
import Input from '@/components/forms/input/Input'
import { FaTrash } from 'react-icons/fa'

const SubtasksList = () => {
  const [tasks, setTasks] = useAtom(atom_subTasks)
  const [task, setTask] = useState<string>('')
  const taskAddLabel = 'Describe your subtask'

  const resetTask = () => {
    setTask('')
  }

  const handleAdd = (taskMessage: string) => {
    const updatedTasks = [
      ...tasks,
      {
        key: nanoid(),
        value: taskMessage,
        isDone: false,
      },
    ]

    setTasks(updatedTasks)
    resetTask()
  }

  const handleEdit = (taskUUID: string, newValue: string) => {
    const nextTasks = tasks.map((task) => {
      if (task.key === taskUUID) {
        return { ...task, value: newValue }
      }

      return task
    })

    setTasks(nextTasks)
  }

  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(sourceIndex, 1)
    result.splice(destinationIndex, 0, removed)

    setTasks(result)
  }

  const handleDeleteAll = () => {
    setTasks([])
  }

  const handleDelete = (taskUUID: string) => {
    const arr = tasks.filter((item) => item.key !== taskUUID)

    setTasks(arr)
  }

  function handleToggle(key: string) {
    const nextTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, isDone: !task.isDone }
      }

      return task
    })

    setTasks(nextTasks)
  }

  const isDisabled = task.length === 0
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleAdd(task)
  }

  return (
    <div className="w-full flex flex-col">
      <SubtasksListComponent
        tasks={tasks}
        actions={{
          handleEdit,
          handleDelete,
          handleToggle,
          handleReorder,
        }}
      />
      {renderAddTask()}

      {tasks.length > 1 && (
        <div className="ml-auto mt-4">
          <ButtonSecondary action={() => handleDeleteAll()}>
            <FaTrash /> Clear All
          </ButtonSecondary>
        </div>
      )}
    </div>
  )

  function renderAddTask() {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex-auto">
            <Input
              id="task"
              value={task}
              handleChange={setTask}
              label={taskAddLabel}
            />
          </div>
          <ButtonSecondary
            action={() => handleAdd(task)}
            isDisabled={isDisabled}
          >
            Add
          </ButtonSecondary>
        </div>
      </form>
    )
  }
}

export default SubtasksList
