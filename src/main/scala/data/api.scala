package com.raunakjodhawat
package data

import models.{Exercise, MinorMuscleUsage}

object api {
  val deadlift: Exercise = Exercise(
    name = "Deadlift",
    instruments = Seq(models.Instruments.Barbell),
    majorMuscleGroup = Seq(models.MajorMuscleGroup.Back),
    minorMuscleGroup = Seq(
      MinorMuscleUsage(
        models.MinorMuscleGroup.Abs,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.HipFlexors,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Quadriceps,
        models.MinorMuscleGroupUsageFrequency.ModeratelyUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Forearms,
        models.MinorMuscleGroupUsageFrequency.LeastUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Trapezius,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.PosteriorDeltoid,
        models.MinorMuscleGroupUsageFrequency.ModeratelyUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Infraspinatus,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.TeresMajor,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.TeresMinor,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Lats,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.ErectorSpinae,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Glutes,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Hamstrings,
        models.MinorMuscleGroupUsageFrequency.MostUsed
      ),
      MinorMuscleUsage(
        models.MinorMuscleGroup.Gastrocnemius,
        models.MinorMuscleGroupUsageFrequency.ModeratelyUsed
      )
    )
  )
  def getExercises: Seq[Exercise] = Seq(
    deadlift
  )

  def getBackExercises: Seq[Exercise] = getExercises.filter(
    _.majorMuscleGroup.contains(models.MajorMuscleGroup.Back)
  )
}
