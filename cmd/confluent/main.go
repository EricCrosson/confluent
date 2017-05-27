package main

import (
	"os"
	"fmt"

	"github.com/ericcrosson/confluent"
	"github.com/docopt/docopt-go"
	"github.com/Masterminds/semver"
)

var VERSION = semver.MustParse("0.0.0")

func main() {
	usage := `Enables fluency with Confluence.

Usage:
  confluent [--friendly]

Options:
  -h --help      Show this screen.
  -v --version   Show version.
  -f --friendly  Use the friendly merging-strategy.
`
	arguments, _ := docopt.Parse(usage, nil, true, "Firebird Build 2.0.0", false)

	strategy := confluent.StrategyOurs
	if arguments["--friendly"] != false {
		strategy = confluent.StrategyFriendly
	}

	err := confluent.Publish(strategy, os.Getenv("PWD"))
	if err != nil {
		// TODO stderr
		panic(err)
	}
}
