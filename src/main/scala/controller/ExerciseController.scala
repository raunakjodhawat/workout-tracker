package com.raunakjodhawat
package controller

import models.{Equipment, Exercise, ForceType, Mechanics, MuscleGroup}
import io.circe.syntax._
class ExerciseController {
  def createExercise(
      name: String,
      targetMuscleGroup: MuscleGroup,
      equipment: Equipment,
      forceType: ForceType,
      mechanics: Mechanics
  ): Exercise = {
    Exercise(name, targetMuscleGroup, equipment, forceType, mechanics)
  }

  def updateExercise(
      exercise: Exercise,
      name: String,
      targetMuscleGroup: MuscleGroup,
      equipment: Equipment,
      forceType: ForceType,
      mechanics: Mechanics
  ): Exercise = {
    exercise.copy(
      name = name,
      targetMuscleGroup = targetMuscleGroup,
      equipment = equipment,
      forceType = forceType,
      mechanics = mechanics
    )
  }

  def getExerciseConstants: String = {
    Map(
      "MuscleGroup" -> MuscleGroup.values.map(_.toString),
      "Equipment" -> Equipment.values.map(_.toString),
      "ForceType" -> ForceType.values.map(_.toString),
      "Mechanics" -> Mechanics.values.map(_.toString)
    ).asJson.noSpaces
  }
}
