package com.raunakjodhawat
package models

sealed trait ForceType

object ForceType {
  case object Push extends ForceType
  case object Pull extends ForceType
  case object Other extends ForceType

  val values: Seq[ForceType] = Seq(
    Push,
    Pull,
    Other
  )
}
