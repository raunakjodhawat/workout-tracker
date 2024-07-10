package com.raunakjodhawat
package models

sealed trait MuscleGroup {
  def isArm: Boolean =
    this == MuscleGroup.Biceps || this == MuscleGroup.Triceps || this == MuscleGroup.Forearms

  def isLeg: Boolean =
    this == MuscleGroup.Glutes || this == MuscleGroup.Hamstrings || this == MuscleGroup.Calves || this == MuscleGroup.Quadriceps

  def isShoulder: Boolean =
    this == MuscleGroup.Shoulders || this == MuscleGroup.Trapezius

  def isChest: Boolean = this == MuscleGroup.Chest

  def isBack: Boolean = this == MuscleGroup.Back

  def isAbs: Boolean = this == MuscleGroup.Abs

  def isUncategorized: Boolean =
    !isArm && !isLeg && !isShoulder && !isChest && !isBack && !isAbs
}

object MuscleGroup {
  // arms
  case object Biceps extends MuscleGroup
  case object Triceps extends MuscleGroup
  case object Forearms extends MuscleGroup
  // Shoulder
  case object Shoulders extends MuscleGroup
  case object Trapezius extends MuscleGroup
  // Back
  case object Back extends MuscleGroup
  // Core
  case object Abs extends MuscleGroup
  // Chest
  case object Chest extends MuscleGroup
  // Legs
  case object Glutes extends MuscleGroup
  case object Hamstrings extends MuscleGroup
  case object Calves extends MuscleGroup
  case object Quadriceps extends MuscleGroup

  val values: Seq[MuscleGroup] = Seq(
    Biceps,
    Triceps,
    Forearms,
    Shoulders,
    Trapezius,
    Back,
    Abs,
    Chest,
    Glutes,
    Hamstrings,
    Calves,
    Quadriceps
  )
}
