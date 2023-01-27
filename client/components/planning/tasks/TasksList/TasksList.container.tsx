import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import service from '../../../../services/service'
import { Task, TaskArea } from '../../../../types/types'
import ButtonDark from '../../../forms/buttons/ButtonDark'
import Input from '../../../forms/input/Input.component'
import TasksListComponent from './TasksList.component'

interface Props {
  area: TaskArea
}

const TasksList = ({ area }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<string>('')
  const showHeading = area === 'overview'
  const showNoTasksInfo = area === 'overview'
  const taskAddLabel =
    area === 'overview' ? 'Add another subtask' : 'Define your subtask'
  const resetTask = () => {
    setTask('')
  }

  useEffect(() => {
    service.getTasks().then((results) => {
      if (!results) {
        return
      }

      setTasks(results)
    })
  }, [])

  const handleAdd = (taskMessage: string) => {
    const updatedTasks = [
      ...tasks,
      {
        key: uuid(),
        value: taskMessage,
        isDone: false,
      },
    ]

    setTasks(updatedTasks)
    service.setTasks(updatedTasks)
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
    service.setTasks(nextTasks)
  }
  const handleDelete = (taskUUID: string) => {
    const arr = tasks.filter((item) => item.key !== taskUUID)

    setTasks(arr)
    service.setTasks(arr)
  }

  function handleToggle(key: string) {
    const nextTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, isDone: !task.isDone }
      }

      return task
    })

    setTasks(nextTasks)
    service.setTasks(nextTasks)
  }

  const isDisabled = task.length === 0
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleAdd(task)
  }

  const AddTaskForm = (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-auto">
          <Input
            id="task"
            type={'text'}
            value={task}
            action={setTask}
            label={taskAddLabel}
          />
        </div>
        <ButtonDark
          action={() => handleAdd(task)}
          text="Add"
          isDisabled={isDisabled}
        />
      </div>
    </form>
  )

  return (
    <div className="w-full">
      <TasksListComponent
        tasks={tasks}
        actions={{
          handleEdit,
          handleDelete,
          handleToggle,
        }}
        showHeading={showHeading}
        showNoTasksInfo={showNoTasksInfo}
        area={area}
      />
      {AddTaskForm}
    </div>
  )
}

export default TasksList