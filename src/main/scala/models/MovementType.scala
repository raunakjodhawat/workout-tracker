package com.raunakjodhawat
package models

sealed trait MovementType

object MovementType {
  case object Compound extends MovementType
  case object Isolation extends MovementType
  case object Cardio extends MovementType
  case object Flexibility extends MovementType
  case object Mobility extends MovementType
  case object Other extends MovementType

  val values = Seq(
    Compound,
    Isolation,
    Cardio,
    Flexibility,
    Mobility,
    Other
  )
}
