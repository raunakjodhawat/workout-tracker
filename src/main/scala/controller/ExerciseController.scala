package com.raunakjodhawat
package controller

import models.{
  DBExercise,
  Equipment,
  Exercise,
  ForceType,
  Mechanics,
  MuscleGroup
}
import models.Equipment.Equipment
import models.ForceType.ForceType
import models.Mechanics.Mechanics
import models.MuscleGroup.MuscleGroup
import repositories.ExerciseRepository

import cats.data.Kleisli
import cats.effect.IO
import cats.effect.unsafe.implicits.global
import org.http4s.{Header, HttpRoutes, Request, Response}
import org.http4s.dsl.io.{->, /, GET, Ok, Root}
import org.typelevel.ci.CIString
import org.http4s.dsl.io._
import io.circe.generic.auto._
import org.http4s.circe.CirceEntityCodec._

import scala.collection.SortedSet
class ExerciseController(er: ExerciseRepository) {

  val httpApp: Kleisli[IO, Request[IO], Response[IO]] = HttpRoutes
    .of[IO] {
      case GET -> Root / "exercise" / "defaults" =>
        Ok(getExerciseConstants)
      case GET -> Root / "exercise" / "defaults" / "name" =>
        Ok(getAllExerciseNames)
      case GET -> Root / "exercise" / "all" =>
        Ok(getExercises)
      case GET -> Root / "exercise" / "id" / LongVar(id) =>
        getExerciseById(id) match {
          case Some(exercise) =>
            Ok(exercise)
          case None =>
            NotFound("Exercise not found")
        }
      case req @ POST -> Root / "exercise" / "create" =>
        req.decode[Exercise] { exercise =>
          createExercise(
            exercise.exerciseName,
            exercise.targetMuscleGroup,
            exercise.equipment,
            exercise.forceType,
            exercise.mechanics
          )
          Ok("Exercise created")
        }
      case req @ POST -> Root / "exercise" / "edit" / LongVar(id) =>
        req.decode[Exercise] { exercise =>
          editExercise(
            id,
            exercise.exerciseName,
            exercise.targetMuscleGroup,
            exercise.equipment,
            exercise.forceType,
            exercise.mechanics
          )
          Ok("Exercise updated")
        }
      case DELETE -> Root / "exercise" / "delete" / LongVar(id) =>
        deleteExercise(id)
        Ok("Exercise deleted")
    }
    .orNotFound
  def getExercises: Seq[DBExercise] = {
    er.getAllExercises.unsafeRunSync()
  }

  def getExerciseById(id: Long): Option[DBExercise] = {
    er.getExerciseById(id).unsafeRunSync()
  }

  def createExercise(
      exerciseName: String,
      targetMuscleGroup: MuscleGroup,
      equipment: Equipment,
      forceType: ForceType,
      mechanics: Mechanics
  ): Unit = er
    .createExercise(
      Exercise(
        exerciseName,
        targetMuscleGroup,
        equipment,
        forceType,
        mechanics
      )
    )
    .unsafeRunSync()

  def editExercise(
      id: Long,
      exerciseName: String,
      targetMuscleGroup: MuscleGroup,
      equipment: Equipment,
      forceType: ForceType,
      mechanics: Mechanics
  ): Unit = er
    .editExercise(
      id,
      Exercise(
        exerciseName,
        targetMuscleGroup,
        equipment,
        forceType,
        mechanics
      )
    )
    .unsafeRunSync()

  def deleteExercise(id: Long): Unit = er.deleteExercise(id).unsafeRunSync()

  def getAllExerciseNames: Seq[String] = er.getAllExerciseNames.unsafeRunSync()
  def getExerciseConstants: Map[String, SortedSet[String]] = {
    Map(
      "MuscleGroup" -> MuscleGroup.values.map(_.toString),
      "Equipment" -> Equipment.values.map(_.toString),
      "ForceType" -> ForceType.values.map(_.toString),
      "Mechanics" -> Mechanics.values.map(_.toString)
    )
  }
}
