package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}
import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object ForceType extends Enumeration {
  type ForceType = Value
  val Push, Pull, Other = Value
  implicit val forceTypeTypedType: TypedType[ForceType] =
    MappedColumnType.base[ForceType, String](
      e => e.toString,
      s => ForceType.withName(s)
    )
  implicit val encodeForceType: Encoder[ForceType] =
    Encoder.encodeString.contramap[ForceType](_.toString)
  implicit val decodeForceType: Decoder[ForceType] =
    Decoder.decodeString.map(ForceType.withName)
}
