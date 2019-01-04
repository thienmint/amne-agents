workflow "Spitting out Eslint Version" {
  on = "push"
  resolves = ["docker:/widerin/alpine-eslint"]
}

action "docker:/widerin/alpine-eslint" {
  uses = "docker://mhart/alpine-node"
  runs = "eslint"
  args = "--version"
}
