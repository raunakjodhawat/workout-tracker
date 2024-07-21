package com.raunakjodhawat
package controller

import cats.data.Kleisli
import cats.effect._
import models.{ExerciseTable, ScheduleTable}
import repositories.{ExerciseRepository, ScheduleRepository}

import cats.syntax.semigroupk._
import org.http4s.{Request, Response}
import slick.jdbc.PostgresProfile.api._

class Controller(
    db: Database,
    exercises: TableQuery[ExerciseTable],
    schedules: TableQuery[ScheduleTable]
) {
  private val er = new ExerciseRepository(db, exercises)
  private val sr = new ScheduleRepository(db, schedules)
  private val ec = new ExerciseController(er)
  private val sc = new ScheduleController(sr)

  val httpApp: Kleisli[IO, Request[IO], Response[IO]] =
    ec.httpApp <+> sc.httpApp
}
