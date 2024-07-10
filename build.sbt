ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.14"

lazy val root = (project in file("."))
  .settings(
    name := "workout-tracker",
    idePackagePrefix := Some("com.raunakjodhawat")
  )
