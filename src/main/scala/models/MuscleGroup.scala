package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}
import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object MuscleGroup extends Enumeration {
  type MuscleGroup = Value
  val Biceps, Triceps, Forearms, Shoulders, Trapezius, Back, Abs, Chest, Glutes,
      Hamstrings, Calves, Quadriceps = Value

  def isArm(muscle: MuscleGroup): Boolean = muscle match {
    case Biceps | Triceps | Forearms => true
    case _                           => false
  }

  def isLeg(muscle: MuscleGroup): Boolean = muscle match {
    case Glutes | Hamstrings | Calves | Quadriceps => true
    case _                                         => false
  }

  def isShoulder(muscle: MuscleGroup): Boolean = muscle match {
    case Shoulders | Trapezius => true
    case _                     => false
  }

  def isChest(muscle: MuscleGroup): Boolean = muscle == Chest
  def isBack(muscle: MuscleGroup): Boolean = muscle == Back
  def isAbs(muscle: MuscleGroup): Boolean = muscle == Abs

  def isUncategorized(muscle: MuscleGroup): Boolean =
    !isArm(muscle) && !isLeg(muscle) && !isShoulder(muscle) && !isChest(
      muscle
    ) && !isBack(muscle) && !isAbs(muscle)

  implicit val muscleGroupTypedType: TypedType[MuscleGroup] =
    MappedColumnType.base[MuscleGroup, String](
      e => e.toString,
      s => MuscleGroup.withName(s)
    )

  implicit val encodeMuscleGroup: Encoder[MuscleGroup] =
    Encoder.encodeString.contramap[MuscleGroup](_.toString)
  implicit val decodeMuscleGroup: Decoder[MuscleGroup] =
    Decoder.decodeString.map(MuscleGroup.withName)
}
