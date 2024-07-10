package com.raunakjodhawat
package controller

import cats.data.Kleisli
import cats.effect._
import org.http4s.{Header, HttpRoutes, Request, Response}
import org.http4s.dsl.io._
import org.http4s.implicits._
import io.circe.generic.codec.DerivedAsObjectCodec.deriveCodec
import org.http4s.circe.CirceEntityCodec.circeEntityEncoder

import org.typelevel.ci.CIString

class Controller {
  private val ec = new ExerciseController()
  val httpApp: Kleisli[IO, Request[IO], Response[IO]] = HttpRoutes
    .of[IO] { case GET -> Root / "exercise" / "defaults" =>
      Ok(ec.getExerciseConstants).map(
        _.putHeaders(
          Header.Raw
            .apply(
              CIString("Access-Control-Allow-Origin"),
              "http://localhost:3000"
            )
        )
      )
    }
    .orNotFound
}
