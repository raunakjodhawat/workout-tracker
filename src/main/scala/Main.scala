package com.raunakjodhawat

import controller.{Controller, ExerciseController}

import cats.effect._
import com.comcast.ip4s._
import org.http4s.ember.server._

object Main extends IOApp {
  val ec = new ExerciseController()

  def run(args: List[String]): IO[ExitCode] =
    EmberServerBuilder
      .default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(port"8080")
      .withHttpApp(new Controller().httpApp)
      .build
      .use(_ => IO.never)
      .as(ExitCode.Success)
}
