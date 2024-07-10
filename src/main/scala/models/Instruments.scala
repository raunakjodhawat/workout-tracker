package com.raunakjodhawat
package models

sealed trait Instruments
object Instruments {
  case object Dumbbell extends Instruments
  case object Barbell extends Instruments
  case object Kettlebell extends Instruments
  case object Bodyweight extends Instruments
  case object Machine extends Instruments
  case object Cable extends Instruments
  case object Band extends Instruments
  case object MedicineBall extends Instruments
  case object StabilityBall extends Instruments
  case object Other extends Instruments

  val values = Seq(
    Dumbbell,
    Barbell,
    Kettlebell,
    Bodyweight,
    Machine,
    Cable,
    Band,
    MedicineBall,
    StabilityBall,
    Other
  )
}
