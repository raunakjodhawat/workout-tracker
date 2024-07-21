package com.raunakjodhawat
package repositories

import models.{DBSchedule, Schedule, ScheduleTable}

import cats.effect.IO
import slick.jdbc.PostgresProfile.api._

class ScheduleRepository(db: Database, exercises: TableQuery[ScheduleTable]) {
  def createSchedule(schedule: Schedule): IO[Unit] = {
    val dbSchedule = schedule.toDBSchedule()

    IO.fromFuture(
      IO(
        db.run(exercises += dbSchedule)
      )
    ).flatMap(x =>
      if (x == 1) IO.unit
      else IO.raiseError(new Exception("Failed to save schedule"))
    )
  }

  def getAllSchedules: IO[Seq[DBSchedule]] = {
    IO.fromFuture(
      IO(
        db.run(exercises.result)
      )
    )
  }

  def getScheduleByDate(date: String): IO[Option[DBSchedule]] = {
    IO.fromFuture(
      IO(
        db.run(exercises.filter(_.date === date).result.headOption)
      )
    )
  }

  def updateSchedule(id: Long, schedule: Schedule): IO[Unit] = {
    val dbSchedule = schedule.toDBSchedule(id)

    IO.fromFuture(
      IO(
        db.run(exercises.filter(_.id === id).update(dbSchedule))
      )
    ).flatMap(x =>
      if (x == 1) IO.unit
      else IO.raiseError(new Exception("Failed to update schedule"))
    )
  }
}
