package com.raunakjodhawat
package models

import models.Equipment.Equipment
import models.ForceType.ForceType
import models.MuscleGroup.MuscleGroup
import models.Mechanics.Mechanics

import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, Rep, Tag}

case class Exercise(
    exerciseName: String,
    targetMuscleGroup: MuscleGroup,
    equipment: Equipment,
    forceType: ForceType,
    mechanics: Mechanics
)

case class DBExercise(
    id: Long,
    exerciseName: String,
    targetMuscleGroup: String,
    equipment: String,
    forceType: String,
    mechanics: String
)

class ExerciseTable(tag: Tag) extends Table[DBExercise](tag, "Exercise") {
  def id: Rep[Long] =
    column[Long]("ID", O.PrimaryKey, O.AutoInc)

  def exerciseName: Rep[String] =
    column[String]("EXERCISE_NAME")

  def targetMuscleGroup: Rep[String] =
    column[String]("TARGET_MUSCLE_GROUP")

  def equipment: Rep[String] =
    column[String]("EQUIPMENT")

  def forceType: Rep[String] =
    column[String]("FORCE_TYPE")

  def mechanics: Rep[String] =
    column[String]("MECHANICS")
  override def * : ProvenShape[DBExercise] = {
    (id, exerciseName, targetMuscleGroup, equipment, forceType, mechanics)
      .mapTo[DBExercise]
  }
}
