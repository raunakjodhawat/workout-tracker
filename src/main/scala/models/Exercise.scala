package com.raunakjodhawat
package models

case class Exercise(
    name: String,
    instruments: Seq[Instruments],
    majorMuscleGroup: Seq[MajorMuscleGroup],
    minorMuscleGroup: Seq[MinorMuscleUsage]
)
