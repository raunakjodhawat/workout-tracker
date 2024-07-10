package com.raunakjodhawat
package models

sealed trait MajorMuscleGroup

object MajorMuscleGroup {
  case object Chest extends MajorMuscleGroup
  case object Back extends MajorMuscleGroup
  case object Legs extends MajorMuscleGroup
  case object Shoulders extends MajorMuscleGroup
  case object Arms extends MajorMuscleGroup
  case object Core extends MajorMuscleGroup
  case object Other extends MajorMuscleGroup

  val values = Seq(
    Chest,
    Back,
    Legs,
    Shoulders,
    Arms,
    Core,
    Other
  )
}
