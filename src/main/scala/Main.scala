package com.raunakjodhawat

import controller.Controller

import cats.effect._
import com.comcast.ip4s._
import models.{ExerciseTable, ScheduleTable}

import org.http4s.ember.server._
import org.http4s.server.middleware.CORS
import slick.jdbc.PostgresProfile.api._

object Main extends IOApp {
  private val db = Database.forConfig("postgres")
  private val exercises = TableQuery[ExerciseTable]
  private val schedules = TableQuery[ScheduleTable]

  def run(args: List[String]): IO[ExitCode] = {
    IO.fromFuture(
      IO(
        db.run(DBIO.seq(exercises.schema.createIfNotExists))
      )
    ).flatMap { _ =>
      {
        EmberServerBuilder
          .default[IO]
          .withHost(ipv4"0.0.0.0")
          .withPort(port"8080")
          .withHttpApp(
            CORS.policy
              .withAllowOriginAll(
                new Controller(db, exercises, schedules).httpApp
              )
          )
          .build
          .use(_ => IO.never)
          .as(ExitCode.Success)
      }
    }

  }
}
