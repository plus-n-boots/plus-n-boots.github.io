let fragment = `<login>
                  <a href="#">Login</a>
                </login>`

export default (mainElement) => {
	mainElement.insertAdjacentHTML('afterbegin', fragment)
}
