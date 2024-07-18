package com.raunakjodhawat
package controller

import cats.data.Kleisli
import cats.effect._
import models.ExerciseTable
import repositories.ExerciseRepository
import org.http4s.{Request, Response}
import slick.jdbc.PostgresProfile.api._

class Controller(db: Database, exercises: TableQuery[ExerciseTable]) {
  private val er = new ExerciseRepository(db, exercises)
  private val ec = new ExerciseController(er)
  val httpApp: Kleisli[IO, Request[IO], Response[IO]] = ec.httpApp
}
