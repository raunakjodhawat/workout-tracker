package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}

import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object Mechanics extends Enumeration {
  type Mechanics = Value
  val Compound, Isolation = Value
  implicit val mechanicsTypedType: TypedType[Mechanics] =
    MappedColumnType.base[Mechanics, String](
      e => e.toString,
      s => Mechanics.withName(s)
    )

  implicit val encodeMechanics: Encoder[Mechanics] =
    Encoder.encodeString.contramap[Mechanics](_.toString)
  implicit val decodeMechanics: Decoder[Mechanics] =
    Decoder.decodeString.map(Mechanics.withName)
}
