package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}
import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object SetType extends Enumeration {
  type SetType = Value
  val SuperSet, NormalSet, DropSet, Other = Value
  implicit val setTypeTypedType: TypedType[SetType] =
    MappedColumnType.base[SetType, String](
      e => e.toString,
      s => SetType.withName(s)
    )
  implicit val encodeSetType: Encoder[SetType] =
    Encoder.encodeString.contramap[SetType](_.toString)
  implicit val decodeSetType: Decoder[SetType] =
    Decoder.decodeString.map(SetType.withName)

  implicit val setTypedType: TypedType[SetType] =
    MappedColumnType.base[SetType, String](
      e => e.toString,
      s => SetType.withName(s)
    )
}
