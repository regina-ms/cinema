export function hideScroll() {
  document.documentElement.classList.add('hide-scroll')
}

export function enableScroll() {
  document.documentElement.classList.remove('hide-scroll')
}

export function toggleScroll() {
  const scrollHidden = document.documentElement.classList.contains('hide-scroll')

  if (scrollHidden) {
    enableScroll()
  } else {
    hideScroll()
  }
}
