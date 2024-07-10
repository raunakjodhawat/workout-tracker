package com.raunakjodhawat
package data

import models.Exercise

object api {
  val deadlift: Exercise = Exercise(
    name = "Deadlift",
    targetMuscleGroup = models.MuscleGroup.Back,
    equipment = models.Equipment.Barbell,
    forceType = models.ForceType.Pull,
    mechanics = models.Mechanics.Compound
  )
  def getExercises: Seq[Exercise] = Seq(
    deadlift
  )
  def getArmsExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isArm)

  def getLegsExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isLeg)

  def getShouldersExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isShoulder)

  def getChestExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isChest)

  def getAbsExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isAbs)

  def getBackExercises: Seq[Exercise] =
    getExercises.filter(_.targetMuscleGroup.isBack)
}
