package com.raunakjodhawat
package models

import io.circe.{Decoder, Encoder}
import slick.ast.TypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.PostgresProfile.api._

object SetType extends Enumeration {
  type SetType = Value

  /** SuperSet - Two exercises performed back to back with no rest in between
    * PyramidSet - Increase weight and decrease reps with each set
    * SameWeightAndRepsSet - Same weight and same reps for all sets
    * SameWeightVariableRepsSet - Same weight and variable reps for all sets
    * DropSet - Decrease weight with each set
    * TriSet - Three exercises performed back to back with no rest in between
    * GiantSet - Four or more exercises performed back to back with no rest in between
    */
  val SuperSet, PyramidSet, SameWeightAndRepsSet, SameWeightVariableRepsSet,
      DropSet, TriSet, GiantSet = Value
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
