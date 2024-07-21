package com.raunakjodhawat
package models

import models.SetType.SetType

import com.raunakjodhawat.models.WeightUnit.WeightUnit
import io.circe.generic.auto._
import io.circe._
import io.circe.parser._
import io.circe.syntax._
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, Rep, Tag}

case class WeightAndReps(
    weight: Option[Double],
    unit: WeightUnit,
    reps: Option[Int]
)

case class ExerciseSet(
    exerciseName: String,
    sets: Seq[WeightAndReps]
)

object Schedule {
  val simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd")

  implicit val encodeWeightUnit: Encoder[WeightUnit] =
    Encoder.encodeString.contramap[WeightUnit](_.toString)
  implicit val decideWeightUnit: Decoder[WeightUnit] =
    Decoder.decodeString.map(WeightUnit.withName)
  implicit val encodeWeightAndReps: Encoder[WeightAndReps] =
    Encoder.forProduct3("weight", "unit", "reps")(wr =>
      (wr.weight, wr.unit, wr.reps)
    )

  implicit val decodeWeightAndReps: Decoder[WeightAndReps] =
    Decoder.forProduct3("weight", "unit", "reps")(WeightAndReps.apply)

  implicit val encodeExerciseSet: Encoder[ExerciseSet] =
    Encoder.forProduct2("exerciseName", "sets")(es =>
      (es.exerciseName, es.sets)
    )

  implicit val decodeExerciseSet: Decoder[ExerciseSet] =
    Decoder.forProduct2("exerciseName", "sets")(ExerciseSet.apply)

  implicit val exercisesPerformedEncoder: Encoder[Seq[ExerciseSet]] =
    Encoder.encodeSeq[ExerciseSet]

  implicit val exercisesPerformedDecoder: Decoder[Seq[ExerciseSet]] =
    Decoder.decodeSeq[ExerciseSet]

  implicit val encodeSchedule: Encoder[Schedule] =
    Encoder.forProduct3("setType", "exercisesPerformed", "date")(s =>
      (s.setType, s.exercisesPerformed, s.date)
    )

  implicit val dateEncoder: Encoder[java.util.Date] =
    Encoder.encodeString.contramap[java.util.Date](simpleDateFormat.format)

  implicit val dateDecoder: Decoder[java.util.Date] =
    Decoder.decodeString.emap { str =>
      simpleDateFormat.parse(str) match {
        case null => Left("Date could not be parsed")
        case date => Right(date)
      }
    }

  implicit val decodeSchedule: Decoder[Schedule] =
    Decoder.forProduct3("setType", "exercisesPerformed", "date")(Schedule.apply)
}
case class Schedule(
    setType: SetType,
    exercisesPerformed: Seq[ExerciseSet],
    date: java.util.Date
) {
  import Schedule.simpleDateFormat
  def toDBSchedule(id: Long = 0): DBSchedule = DBSchedule(
    id = id,
    setType = setType.asJson.noSpaces,
    exercisesPerformed = exercisesPerformed.asJson.noSpaces,
    date = simpleDateFormat.format(date)
  )
}

case class DBSchedule(
    id: Long,
    setType: String,
    exercisesPerformed: String,
    date: String
) {
  import Schedule.simpleDateFormat
  def toSchedule: Schedule = Schedule(
    setType = decode[SetType](setType).getOrElse(SetType.NormalSet),
    exercisesPerformed = decode[Seq[ExerciseSet]](exercisesPerformed)
      .getOrElse(Seq.empty[ExerciseSet]),
    date = simpleDateFormat.parse(date)
  )
}

class ScheduleTable(tag: Tag) extends Table[DBSchedule](tag, "Schedule") {
  def id: Rep[Long] =
    column[Long]("ID", O.PrimaryKey, O.AutoInc)

  def setType: Rep[String] =
    column[String]("SET_TYPE")

  def exercisesPerformed: Rep[String] =
    column[String]("EXERCISES_PERFORMED")

  def date: Rep[String] =
    column[String]("DATE")

  override def * : ProvenShape[DBSchedule] = {
    (
      id,
      setType,
      exercisesPerformed,
      date
    ).mapTo[DBSchedule]
  }
}
