package com.raunakjodhawat
package controller

import models.{Equipment, Exercise, ForceType, Mechanics, MuscleGroup}

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

}
