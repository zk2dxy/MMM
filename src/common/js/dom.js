export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClasses (el, className) {
  if (hasClass(el, className)) {
    return false
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  // console.error(`newClass = ` + (newClass.join(' ')))
  return newClass.join(' ')
}
