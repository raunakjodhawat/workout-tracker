package com.raunakjodhawat
package data

import models.Exercise

object api {
  val deadlift: Exercise = Exercise(
    exerciseName = "Deadlift",
    targetMuscleGroup = models.MuscleGroup.Back,
    equipment = models.Equipment.Barbell,
    forceType = models.ForceType.Pull,
    mechanics = models.Mechanics.Compound
  )
  def getExercises: Seq[Exercise] = Seq(
    deadlift
  )
}
