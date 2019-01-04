workflow "Spitting out Eslint Version" {
  on = "push"
  resolves = ["docker:/widerin/alpine-eslint"]
}

action "docker:/widerin/alpine-eslint" {
  uses = "docker://widerin/alpine-eslint"
  runs = "eslint"
  args = "--version"
}
