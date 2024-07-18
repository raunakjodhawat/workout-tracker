package com.raunakjodhawat
package repositories

import models.{DBExercise, Exercise, ExerciseTable}

import cats.effect.IO
import slick.jdbc.PostgresProfile.api._

class ExerciseRepository(db: Database, exercises: TableQuery[ExerciseTable]) {
  def createExercise(exercise: Exercise): IO[Unit] = {
    val dbExercise = DBExercise(
      id = 0,
      exerciseName = exercise.exerciseName,
      targetMuscleGroup = exercise.targetMuscleGroup.toString,
      equipment = exercise.equipment.toString,
      forceType = exercise.forceType.toString,
      mechanics = exercise.mechanics.toString
    )

    IO.fromFuture(
      IO(
        db.run(exercises += dbExercise)
      )
    ).flatMap(x =>
      if (x == 1) IO.unit
      else IO.raiseError(new Exception("Failed to save exercise"))
    )
  }

  def getAllExercises: IO[Seq[DBExercise]] = {
    IO.fromFuture(
      IO(
        db.run(exercises.result)
      )
    )
  }

  def getExerciseById(id: Long): IO[Option[DBExercise]] = {
    IO.fromFuture(
      IO(
        db.run(exercises.filter(_.id === id).result.headOption)
      )
    )
  }

  def editExercise(id: Long, exercise: Exercise): IO[Unit] = {
    val dbExercise = DBExercise(
      id = id,
      exerciseName = exercise.exerciseName,
      targetMuscleGroup = exercise.targetMuscleGroup.toString,
      equipment = exercise.equipment.toString,
      forceType = exercise.forceType.toString,
      mechanics = exercise.mechanics.toString
    )

    IO.fromFuture(
      IO(
        db.run(exercises.filter(_.id === id).update(dbExercise))
      )
    ).flatMap(x =>
      if (x == 1) IO.unit
      else IO.raiseError(new Exception("Failed to update exercise"))
    )
  }

  def deleteExercise(id: Long): IO[Unit] = {
    IO.fromFuture(
      IO(
        db.run(exercises.filter(_.id === id).delete)
      )
    ).flatMap(x =>
      if (x == 1) IO.unit
      else IO.raiseError(new Exception("Failed to delete exercise"))
    )
  }
}
