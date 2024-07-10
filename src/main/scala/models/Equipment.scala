package com.raunakjodhawat
package models

sealed trait Equipment
object Equipment {
  case object Dumbbell extends Equipment
  case object Barbell extends Equipment
  case object Kettlebell extends Equipment
  case object Bodyweight extends Equipment
  case object Machine extends Equipment
  case object Cable extends Equipment
  case object Other extends Equipment

  val values: Seq[Equipment] = Seq(
    Dumbbell,
    Barbell,
    Kettlebell,
    Bodyweight,
    Machine,
    Cable,
    Other
  )
}
