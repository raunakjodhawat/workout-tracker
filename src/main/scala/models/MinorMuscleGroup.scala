package com.raunakjodhawat
package models

sealed trait MinorMuscleGroupUsageFrequency

object MinorMuscleGroupUsageFrequency {
  case object MostUsed extends MinorMuscleGroupUsageFrequency
  case object ModeratelyUsed extends MinorMuscleGroupUsageFrequency
  case object LeastUsed extends MinorMuscleGroupUsageFrequency

  val values = Seq(
    MostUsed,
    ModeratelyUsed,
    LeastUsed
  )
}
sealed trait MinorMuscleGroup

object MinorMuscleGroup {
  case object Triceps extends MinorMuscleGroup
  case object HipFlexors extends MinorMuscleGroup
  case object Biceps extends MinorMuscleGroup
  case object Forearms extends MinorMuscleGroup
  case object Calves extends MinorMuscleGroup
  case object Hamstrings extends MinorMuscleGroup
  case object Quadriceps extends MinorMuscleGroup
  case object Glutes extends MinorMuscleGroup
  case object HipAbductors extends MinorMuscleGroup
  case object HipAdductors extends MinorMuscleGroup
  case object Obliques extends MinorMuscleGroup
  case object LowerBack extends MinorMuscleGroup
  case object UpperBack extends MinorMuscleGroup
  case object Trapezius extends MinorMuscleGroup
  case object Lats extends MinorMuscleGroup
  case object Rhomboids extends MinorMuscleGroup
  case object Deltoids extends MinorMuscleGroup
  case object RotatorCuffs extends MinorMuscleGroup
  case object Pecs extends MinorMuscleGroup
  case object Abs extends MinorMuscleGroup
  case object Neck extends MinorMuscleGroup
  case object Traps extends MinorMuscleGroup
  case object Serratus extends MinorMuscleGroup
  case object GluteMedius extends MinorMuscleGroup
  case object GluteMinimus extends MinorMuscleGroup
  case object GluteMaximus extends MinorMuscleGroup
  case object Soleus extends MinorMuscleGroup
  case object TibialisAnterior extends MinorMuscleGroup
  case object Gastrocnemius extends MinorMuscleGroup
  case object Adductors extends MinorMuscleGroup
  case object ErectorSpinae extends MinorMuscleGroup
  case object TransverseAbdominis extends MinorMuscleGroup
  case object InternalObliques extends MinorMuscleGroup
  case object ExternalObliques extends MinorMuscleGroup
  case object RectusAbdominis extends MinorMuscleGroup
  case object PectoralisMinor extends MinorMuscleGroup
  case object SerratusAnterior extends MinorMuscleGroup
  case object LevatorScapulae extends MinorMuscleGroup
  case object RhomboidMajor extends MinorMuscleGroup
  case object RhomboidMinor extends MinorMuscleGroup
  case object Infraspinatus extends MinorMuscleGroup
  case object TeresMinor extends MinorMuscleGroup
  case object TeresMajor extends MinorMuscleGroup
  case object Subscapularis extends MinorMuscleGroup
  case object Supraspinatus extends MinorMuscleGroup
  case object AnteriorDeltoid extends MinorMuscleGroup
  case object LateralDeltoid extends MinorMuscleGroup
  case object PosteriorDeltoid extends MinorMuscleGroup
  case object MiddleDeltoid extends MinorMuscleGroup

  val values = Seq(
    Triceps,
    Biceps,
    Forearms,
    Calves,
    Hamstrings,
    Quadriceps,
    Glutes,
    HipAbductors,
    HipAdductors,
    Obliques,
    LowerBack,
    UpperBack,
    Trapezius,
    Lats,
    Rhomboids,
    Deltoids,
    RotatorCuffs,
    Pecs,
    Abs,
    Neck,
    Traps,
    Serratus,
    GluteMedius,
    GluteMinimus,
    GluteMaximus,
    Soleus,
    TibialisAnterior,
    Gastrocnemius,
    Adductors,
    ErectorSpinae,
    TransverseAbdominis,
    InternalObliques,
    ExternalObliques,
    RectusAbdominis,
    PectoralisMinor,
    SerratusAnterior,
    LevatorScapulae,
    RhomboidMajor,
    RhomboidMinor,
    Infraspinatus,
    TeresMinor,
    TeresMajor,
    Subscapularis,
    Supraspinatus,
    AnteriorDeltoid,
    LateralDeltoid,
    PosteriorDeltoid,
    MiddleDeltoid,
    Supraspinatus,
    Infraspinatus,
    TeresMinor,
    TeresMajor,
    Subscapularis,
    HipFlexors
  )
}

case class MinorMuscleUsage(
    muscleGroup: MinorMuscleGroup,
    usageFrequency: MinorMuscleGroupUsageFrequency
)
