package com.raunakjodhawat
package models

sealed trait Mechanics

object Mechanics {
  case object Compound extends Mechanics
  case object Isolation extends Mechanics

  val values = Seq(
    Compound,
    Isolation
  )
}
