package com.raunakjodhawat
package models

case class Exercise(
    name: String,
    targetMuscleGroup: MuscleGroup,
    equipment: Equipment,
    forceType: ForceType,
    mechanics: Mechanics
)
