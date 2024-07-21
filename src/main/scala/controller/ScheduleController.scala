package com.raunakjodhawat
package controller

import cats.data.Kleisli
import cats.effect.IO
import cats.effect.unsafe.implicits.global
import org.http4s.{HttpRoutes, Request, Response}
import org.http4s.dsl.io.{->, /, GET, Ok, Root}

import org.http4s.dsl.io._
import io.circe.generic.auto._
import org.http4s.circe.CirceEntityCodec._
import repositories.ScheduleRepository
import models.{DBSchedule, Schedule}
import models.Schedule._

class ScheduleController(sr: ScheduleRepository) {

  val httpApp: Kleisli[IO, Request[IO], Response[IO]] =
    HttpRoutes
      .of[IO] {
        case GET -> Root / "schedule" / "all" =>
          Ok(getAllSchedules)
        case GET -> Root / "schedule" / "date" / date =>
          getScheduleByDate(date) match {
            case Some(schedule) =>
              Ok(schedule)
            case None =>
              NotFound("Schedule not found")
          }
        case req @ POST -> Root / "schedule" / "create" =>
          req.decode[Schedule] { schedule =>
            createSchedule(schedule)
            Created("Schedule created")
          }
        case req @ PUT -> Root / "schedule" / "update" / LongVar(id) =>
          req.decode[Schedule] { schedule =>
            updateSchedule(id, schedule)
            Ok("Schedule updated")
          }
      }
      .orNotFound
  def createSchedule(schedule: Schedule): Unit =
    sr.createSchedule(schedule).unsafeRunSync()

  def getAllSchedules: Seq[DBSchedule] =
    sr.getAllSchedules.unsafeRunSync()

  def getScheduleByDate(date: String): Option[DBSchedule] =
    sr.getScheduleByDate(date).unsafeRunSync()

  def updateSchedule(id: Long, schedule: Schedule): Unit =
    sr.updateSchedule(id, schedule).unsafeRunSync()
}
