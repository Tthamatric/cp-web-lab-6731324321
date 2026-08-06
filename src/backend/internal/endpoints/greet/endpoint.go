package greet

import "github.com/gofiber/fiber/v3"

type Router struct {
}

func NewRouter() Router {
	return Router{}
}

func (r Router) Greet(c fiber.Ctx) error {
	name := c.Query("name", "friend")

	return c.JSON(fiber.Map{
		"message": "Hello, " + name + "!",
	})
}
