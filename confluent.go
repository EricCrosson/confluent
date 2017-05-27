package confluent

type Strategy int

const (
	StrategyOurs Strategy = iota // 0
	StrategyFriendly             // 1
)

// TODO: create confluent object for authorized sessions

// Publish dir's master branch to confluent
func Publish(strategy Strategy, dir string) {
	switch strategy {
	case StrategyOurs:
		publishOurs(dir)
	case StrategyFriendly:
		publishFriendly(dir)
	}
}


// ## normal

// master (proposed), last and live

// 1. update live from confluence
// 2. clone master and replace last with it
// 3. push last to confluence

func publishOurs(dir string) {

}

// master (proposed), last and live

// <!-- TODO: update master with changes -->

// 1. update live from confluence
// 2. merge live into master (make the user commit, do not do it automatically)
// 4. rebase last onto master
// 5. push last to confluence
func publishFriendly(dir string) {

}
