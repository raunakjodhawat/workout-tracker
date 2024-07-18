package com.raunakjodhawat
package models
import io.circe.{Decoder, Encoder}
import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object Equipment extends Enumeration {
  type Equipment = Value
  val Dumbbell, Barbell, Kettlebell, Bodyweight, Machine, Cable, Other = Value

  implicit val equipmentTypedType: TypedType[Equipment] =
    MappedColumnType.base[Equipment, String](
      e => e.toString,
      s => Equipment.withName(s)
    )
  implicit val encodeEquipment: Encoder[Equipment] =
    Encoder.encodeString.contramap[Equipment](_.toString)
  implicit val decodeEquipment: Decoder[Equipment] =
    Decoder.decodeString.map(Equipment.withName)
}
