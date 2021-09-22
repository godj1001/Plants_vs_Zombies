export let vaultValue = 0

export const addValue = (value) => {
  vaultValue+=value
}

export const costValue = (value) => {
  vaultValue-=value
}

export const getValue = () => {
  return vaultValue
}
