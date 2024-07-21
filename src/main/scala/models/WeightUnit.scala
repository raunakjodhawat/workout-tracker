package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}

object WeightUnit extends Enumeration {
  type WeightUnit = Value
  val Lb, Kg, Other = Value

  implicit val encodeWeightUnit: Encoder[WeightUnit] =
    Encoder.encodeString.contramap[WeightUnit](_.toString)
  implicit val decideWeightUnit: Decoder[WeightUnit] =
    Decoder.decodeString.map(WeightUnit.withName)
}
