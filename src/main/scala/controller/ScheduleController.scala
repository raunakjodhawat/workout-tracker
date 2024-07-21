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
import models.{DBSchedule, Schedule, SetType, WeightUnit}
import models.Schedule._
import models.SetType.SetType

import scala.collection.SortedSet

class ScheduleController(sr: ScheduleRepository) {

  val httpApp: HttpRoutes[IO] =
    HttpRoutes
      .of[IO] {
        case GET -> Root / "schedule" / "defaults" / "types" =>
          Ok(getAllSetTypes)
        case GET -> Root / "schedule" / "all" =>
          Ok(getAllSchedules)
        case GET -> Root / "schedule" / "date" / date =>
          Ok(getScheduleByDate(date))
        case req @ POST -> Root / "schedule" / "create" =>
          req
            .decode[Schedule] { schedule =>
              createSchedule(schedule)
              Created("Schedule created")
            }
        case req @ PUT -> Root / "schedule" / "update" / LongVar(id) =>
          req.decode[Schedule] { schedule =>
            updateSchedule(id, schedule)
            Ok("Schedule updated")
          }
      }
  def createSchedule(schedule: Schedule): Unit =
    sr.createSchedule(schedule).unsafeRunSync()

  def getAllSchedules: Seq[DBSchedule] =
    sr.getAllSchedules.unsafeRunSync()

  def getScheduleByDate(date: String): Seq[DBSchedule] =
    sr.getScheduleByDate(date).unsafeRunSync()

  def updateSchedule(id: Long, schedule: Schedule): Unit =
    sr.updateSchedule(id, schedule).unsafeRunSync()

  def getAllSetTypes: Map[String, SortedSet[String]] = Map(
    "setType" -> SetType.values.map(_.toString),
    "weightUnit" -> WeightUnit.values.map(_.toString)
  )
}
